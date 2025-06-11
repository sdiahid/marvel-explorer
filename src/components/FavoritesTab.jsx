import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material';

export const FavoritesTab = ({
  favChars,
  favComics,
  onCharClick,
  onComicClick
}) => (
  <Box>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Superhéroes
    </Typography>
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {favChars.map(f => (
        <Grid item xs={6} sm={4} md={3} key={f.id}>
          <Card>
            <CardActionArea onClick={() => onCharClick(f)}>
              <CardMedia
                component="img"
                height="160"
                image={f.thumbnail}
                alt={f.name}
              />
              <CardContent>
                <Typography noWrap>{f.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Typography variant="h6" sx={{ mt: 2 }}>
      Cómics
    </Typography>
    <Grid container spacing={2}>
      {favComics.map(f => (
        <Grid item xs={6} sm={4} md={3} key={f.id}>
          <Card>
            <CardActionArea onClick={() => onComicClick(f)}>
              <CardMedia
                component="img"
                height="160"
                image={f.thumbnail}
                alt={f.title}
              />
              <CardContent>
                <Typography noWrap>{f.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
