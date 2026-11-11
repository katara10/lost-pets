import { CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Загрузка...' }: LoaderProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '200px', 
      gap: '16px' 
    }}>
      <CircularProgress color="primary" />
      <Typography color="text.secondary">{message}</Typography>
    </div>
  );
};