import { memo, type FC } from 'react';
import {
  Avatar, Box, ListItemAvatar, ListItemButton, ListItemText, Skeleton,
} from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { useNavigate } from 'react-router';

import { useChats } from 'src/store/queries/greenApi/greenApiQueries';
import { useUserCredentials } from 'src/store/queries/userCredentials/userCredentialsQueries';

const SKELETON_COUNT = 8;

const ChatListSkeleton: FC = () => (
  <Box>
    {Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.5 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="80%" />
        </Box>
      </Box>
    ))}
  </Box>
);

type Props = Readonly<{

  /** Active chat id. */
  activeChatId: string | null;
}>;

const ChatListComponent: FC<Props> = ({ activeChatId }) => {
  const navigate = useNavigate();
  const { data: credentials = null } = useUserCredentials();
  const { data: chats = [], isPending } = useChats(credentials);

  if (isPending) {
    return <ChatListSkeleton />;
  }

  return (
    <Virtuoso
      style={{ height: '100%' }}
      data={chats}
      computeItemKey={(_, chat) => chat.id}
      itemContent={(_, chat) => (
        <ListItemButton selected={chat.id === activeChatId} onClick={() => navigate(`/chat/${encodeURIComponent(chat.id)}`)}>
          <ListItemAvatar>
            <Avatar>{chat.title.replace('+', '').charAt(0).toUpperCase()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={chat.title}
            secondary={chat.username}
            slotProps={{ secondary: { noWrap: true } }}
          />
        </ListItemButton>
      )}
    />
  );
};

/** Sidebar with chat list. */
export const ChatList = memo(ChatListComponent);
