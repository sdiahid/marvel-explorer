import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,
  Typography,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ComicsGrid = ({ comics, favs, onToggleFav, onItemClick }) => (
  <Grid container spacing={2}>
    {comics.map(c => (
      <Grid item xs={12} sm={6} md={4} key={c.id}>
        <Card>
          <CardActionArea onClick={() => onItemClick(c, 'comic')}>
            <CardMedia component="img" height="200" image={c.thumbnail} alt={c.title} />
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" noWrap>{c.title}</Typography>
                <IconButton
                  onClick={e => {
                    e.stopPropagation();
                    onToggleFav(c);
                  }}
                >
                  {favs.some(f => f.id === c.id)
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon />
                  }
                </IconButton>
              </Stack>
              <Typography variant="caption" display="block">
                Salida: {c.onsaleDate
                  ? new Date(c.onsaleDate).toLocaleDateString()
                  : '—'}
              </Typography>
              <Typography variant="body2" noWrap>{c.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);