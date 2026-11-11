import { Typography, Button } from '@mui/material';
import { ErrorOutlined as ErrorOutlineIcon } from '@mui/icons-material';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ 
  message = 'Произошла ошибка при загрузке данных.', 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '300px', 
      gap: '16px', 
      textAlign: 'center' 
    }}>
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h6" color="text.primary">
        Что-то пошло не так
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      
      {onRetry && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onRetry}
          style={{ marginTop: '16px' }}
        >
          Попробовать снова
        </Button>
      )}
    </div>
  );
};