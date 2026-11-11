import { Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({ 
  title = 'Ничего не найдено', 
  message = 'Попробуйте изменить фильтры или загляните позже.' 
}: EmptyStateProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '300px', 
      gap: '16px', 
      textAlign: 'center', 
      color: 'rgba(0, 0, 0, 0.6)' 
    }}>
      <SearchOffIcon sx={{ fontSize: 64, opacity: 0.5 }} />
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="body1">
        {message}
      </Typography>
    </div>
  );
};