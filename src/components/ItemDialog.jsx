import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CardMedia, Typography } from '@mui/material';

export function ItemDialog({ open, onClose, item, type }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{type==='character' ? item?.name : item?.title}</DialogTitle>
      <DialogContent dividers>
        {item && (
          <>
            <CardMedia component="img" height="300" image={item.thumbnail} alt={type==='character'?item.name:item.title} sx={{ mb:2 }}/>
            <DialogContentText>{item.description}</DialogContentText>
            {type==='comic' && item.onsaleDate && (
              <>
                <Typography variant="body2" sx={{ mt:2 }}><strong>Fecha de salida:</strong> {new Date(item.onsaleDate).toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>Autores:</strong> {item.creators.join(', ')}</Typography>
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}