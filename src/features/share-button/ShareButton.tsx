import { Button, Snackbar, Alert } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

export const ShareButton = () => {
  const [open, setOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpen(true);
    } catch (err) {
      console.error('Не удалось скопировать ссылку: ', err);
    }
  };

  return (
    <>
      <Button 
        variant="outlined" 
        startIcon={<ShareIcon />} 
        onClick={handleShare}
      >
        Поделиться
      </Button>
      
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {/* Используем Alert внутри Snackbar для красивого зеленого цвета */}
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Ссылка скопирована!
        </Alert>
      </Snackbar>
    </>
  );
};