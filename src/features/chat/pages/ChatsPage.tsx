import { memo, type FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Box, Button } from '@mui/material';

import { useLogout } from 'src/store/queries/auth/authQueries';
import { useUserCredentials } from 'src/store/queries/userCredentials/userCredentialsQueries';

import { ChatList } from '../components/ChatList';
import { NewChatForm } from '../components/NewChatForm';
import { useReceiveMessages } from '../hooks/useReceiveMessages';
import { NewChatProvider, useNewChat } from '../providers/NewChatProvider';

const ChatsPageContent: FC = () => {
  const { data: credentials = null, isPending } = useUserCredentials();
  const { mutate: logout } = useLogout();
  const { id: routeId = null } = useParams();
  const { newChatPhone, setNewChatPhone } = useNewChat();
  const activeChatId = routeId === 'new' && newChatPhone != null ? `${newChatPhone}@c.us` : routeId;
  const navigate = useNavigate();
  useReceiveMessages(credentials);

  const handleNewChat = (phone: string) => {
    setNewChatPhone(phone);
    navigate('/chat/new');
  };

  if (isPending) {
    return null;
  }

  if (credentials == null) {
    return null;
  }

  return (
    <Box
      sx={{
      display: 'grid', gridTemplateColumns: '320px 1fr', height: '100vh', bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          borderRight: 1, borderColor: 'divider', minHeight: 0, display: 'flex', flexDirection: 'column',
        }}
      >
        <NewChatForm onSubmit={handleNewChat} />
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ChatList activeChatId={activeChatId} />
        </Box>
        <Button onClick={() => logout()} sx={{ m: 2 }}>Log out</Button>
      </Box>
      <Box sx={{ minHeight: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const ChatsPageComponent: FC = () => (
  <NewChatProvider>
    <ChatsPageContent />
  </NewChatProvider>
);

/** Chats page: sidebar with chat list and an outlet for the opened chat. */
export const ChatsPage = memo(ChatsPageComponent);
