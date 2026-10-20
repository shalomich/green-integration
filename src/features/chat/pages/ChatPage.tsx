import {
  memo, type FC, type FormEventHandler, useEffect, useMemo, useRef, useState,
} from 'react';
import { Box, CircularProgress, IconButton, InputBase, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import { DateTime } from 'luxon';

import { Navigate, useNavigate, useParams } from 'react-router';

import { useQueryClient } from '@tanstack/react-query';

import {
  useChatHistory, useChats, useFindCreatedChatId, useSendMessage,
} from 'src/store/queries/greenApi/greenApiQueries';
import { greenApiKeys } from 'src/store/queries/greenApi/keys';
import { useUserCredentials } from 'src/store/queries/userCredentials/userCredentialsQueries';

import { useNewChat } from '../providers/NewChatProvider';

/** Id of the route for a chat that is not created yet (phone number is taken from `NewChatProvider`). */
const NEW_CHAT_ID = 'new';

/** Delay before looking for the created chat in the chat list, milliseconds. */
const FIND_CHAT_DELAY_MS = 2000;

/**
 * Wait for the given time.
 * @param ms Milliseconds.
 */
const delay = (ms: number) => new Promise<void>(resolve => {
  setTimeout(resolve, ms);
});

const ChatPageComponent: FC = () => {
  const { id: routeId = null } = useParams();
  const { newChatPhone } = useNewChat();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = routeId === NEW_CHAT_ID;
  const id = isNew ? newChatPhone != null ? `${newChatPhone}@c.us` : null : routeId;
  const { data: credentials = null } = useUserCredentials();
  const { data: chats } = useChats(credentials);
  const { data: history, isPending } = useChatHistory(credentials, isNew ? null : id);
  const { mutateAsync: findCreatedChatId } = useFindCreatedChatId(credentials);
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage(credentials);

  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(
    () => isNew ? [] : [...history ?? []].sort((a, b) => a.timestamp - b.timestamp),
    [history, isNew],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages.length, id]);

  useEffect(() => {
    setText('');
    setError(null);
  }, [id]);

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault();
    const message = text.trim();
    if (message === '' || id == null || isSending || isSubmitting) {
      return;
    }
    setText('');
    setError(null);
    setIsSubmitting(true);
    try {
      try {
        await sendMessage({ chatId: id, message });
      } catch {
        setError('Failed to send the message');
        setText(message);
        return;
      }
      if (!isNew) {
        return;
      }
      try {
        await delay(FIND_CHAT_DELAY_MS);
        const realId = await findCreatedChatId();
        await queryClient.invalidateQueries({ queryKey: greenApiKeys.chats(credentials) });
        await queryClient.invalidateQueries({ queryKey: greenApiKeys.chatHistory(credentials, realId) });
        navigate(`/chat/${encodeURIComponent(realId)}`, { replace: true });
      } catch (openError: unknown) {
        setError(`The message is sent, but the chat could not be opened: ${
          openError instanceof Error ? openError.message : String(openError)}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isNew && newChatPhone == null) {
    return <Navigate to="/" replace />;
  }

  if (credentials == null || id == null) {
    return null;
  }

  if (isPending && !isNew) {
    return (
      <Box sx={{
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const title = chats?.find(chat => chat.id === id)?.title ?? `+${id.replace('@c.us', '')}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#f4f4f7' }}>
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      </Box>
      <Box sx={{
        flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1,
      }}
      >
        {messages.map(message => (
          <Box
            key={message.id}
            sx={{
              alignSelf: message.outgoing ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              px: 1.5,
              py: 1,
              borderRadius: 3,
              color: message.outgoing ? '#fff' : 'text.primary',
              bgcolor: message.outgoing ? '#6a3df5' : '#fff',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.text}
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', opacity: 0.7 }}>
              {DateTime.fromMillis(message.timestamp).toFormat('HH:mm')}
            </Typography>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>
      {error != null && <Typography color="error" sx={{ px: 2 }}>{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          m: 2, pl: 2, pr: 1, display: 'flex', alignItems: 'center', bgcolor: '#fff', borderRadius: 6,
        }}
      >
        <InputBase
          fullWidth
          placeholder="Message"
          value={text}
          onChange={e => setText(e.target.value)}
          inputProps={{ 'aria-label': 'Message' }}
        />
        <IconButton type="submit" aria-label="Send" disabled={isSending || isSubmitting} sx={{ color: '#6a3df5' }}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

/** Chat page with messages and input. Chat id comes from the URL. */
export const ChatPage = memo(ChatPageComponent);
