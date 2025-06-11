import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const CharacterCard = ({ character, isFav, onToggleFav, onClick }) => (
  <Card sx={{ mb: 3 }}>
    <CardActionArea onClick={onClick}>
      <CardMedia
        component="img"
        height="240"
        image={character.thumbnail}
        alt={character.name}
      />
      <CardContent>
        <Typography variant="h5">{character.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {character.description}
        </Typography>
        <Button
          onClick={e => { e.stopPropagation(); onToggleFav(); }}
          startIcon={isFav ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
        >
          {isFav ? 'Quitar favorito' : 'Añadir favorito'}
        </Button>
      </CardContent>
    </CardActionArea>
  </Card>
);