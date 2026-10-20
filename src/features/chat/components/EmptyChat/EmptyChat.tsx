import { memo, type FC } from 'react';
import { Box, Typography } from '@mui/material';

const EmptyChatComponent: FC = () => (
  <Box sx={{
    height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}
  >
    <Typography color="text.secondary">
      Choose chat or create new one
    </Typography>
  </Box>
);

export const EmptyChat = memo(EmptyChatComponent);
