import { useState } from 'react';
import md5 from 'crypto-js/md5';
import {
  CssBaseline,
  GlobalStyles,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Container,
  Card,
  Alert
} from '@mui/material';
import { SearchBar } from '@comps/SearchBar';
import { CharacterCard } from '@comps/CharacterCard';
import { ComicsGrid } from '@comps/ComicsGrid';
import { FavoritesTab } from '@comps/FavoritesTab';
import { ItemDialog } from '@comps/ItemDialog';
import { useFavorites } from '@hooks/useFavorites';
import { useAutocomplete } from '@hooks/useAutocomplete';
import { fetchCharacterById, fetchComics, fetchComicById } from '@api/fetch';

export const Main = () => {
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const ts = process.env.REACT_APP_MARVEL_TS;

  const [section, setSection] = useState(0);
  const [inputName, setInputName] = useState('');
  const suggestions = useAutocomplete(inputName);
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [alertError, setAlertError] = useState(false);
  const [favoriteChars, toggleCharFav] = useFavorites('favoriteChars');
  const [favoriteComics, toggleComicFav] = useFavorites('favoriteComics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleReset = () => {
    setInputName('');
    setCharacter(null);
    setComics([]);
    setAlertError(false);
  };

  const handleSearch = async () => {
    if (!inputName) return;
    try {
      const charRes = await fetch(
        `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(inputName)}&ts=${ts}&apikey=${publicKey}&hash=${md5(ts + privateKey + publicKey).toString()}`
      );
      const charData = await charRes.json();
      if (charData.data.results.length) {
        const p = charData.data.results[0];
        const charObj = {
          id: p.id,
          name: p.name,
          thumbnail: `${p.thumbnail.path}.${p.thumbnail.extension}`,
          description: p.description || 'Sin descripción',
        };
        setCharacter(charObj);
        setComics(await fetchComics(p.id));
        setAlertError(false);
        return;
      }
      const upcRes = await fetch(
        `https://gateway.marvel.com/v1/public/comics?upc=${encodeURIComponent(inputName)}&ts=${ts}&apikey=${publicKey}&hash=${md5(ts + privateKey + publicKey).toString()}`
      );
      const upcData = await upcRes.json();
      if (upcData.data.results.length) {
        const c = upcData.data.results[0];
        const comicObj = {
          id: c.id,
          title: c.title,
          thumbnail: `${c.thumbnail.path}.${c.thumbnail.extension}`,
          onsaleDate: c.dates.find(d => d.type === 'onsaleDate')?.date || null,
          creators: c.creators.items.map(i => i.name),
          description: c.description || 'Sin descripción',
        };
        setCharacter(null);
        setComics([comicObj]);
        setAlertError(false);
      } else {
        setAlertError(true);
      }
    } catch {
      setAlertError(true);
    }
  };

  const handleItemClick = async (item, type) => {
    setSelectedType(type);
    if (type === 'character') {
      const fullChar = await fetchCharacterById(item.id);
      setSelectedItem(fullChar);
      setComics(await fetchComics(item.id));
    } else {
      const fullComic = await fetchComicById(item.id);
      setSelectedItem(fullComic);
    }
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': { scrollbarWidth: 'thin', scrollbarColor: '#ED1D24 #f0f0f0' },
          '*::-webkit-scrollbar': { width: '8px', height: '8px' },
          '*::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
          '*::-webkit-scrollbar-thumb': { backgroundColor: '#ED1D24', borderRadius: '4px', border: '2px solid #f0f0f0' },
          '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#c01218' },
        }}
      />

      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Marvel Explorer</Typography>
          <Tabs value={section} onChange={(_, v) => setSection(v)} textColor="inherit">
            <Tab label="Inicio" />
            <Tab label="Favoritos" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/fondo.jpg)`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Card sx={{ p: 4, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.9)' }}>
            {section === 0 ? (
              <>
                <SearchBar
                  inputValue={inputName}
                  onInputChange={setInputName}
                  onSearch={handleSearch}
                  onReset={handleReset}
                  suggestions={suggestions}
                />
                {alertError && <Alert severity="error" sx={{ mb: 2 }}>No encontrado</Alert>}

                {character && (
                  <CharacterCard
                    character={character}
                    isFav={favoriteChars.some(f => f.id === character.id)}
                    onToggleFav={() => toggleCharFav(character)}
                    onClick={() => handleItemClick(character, 'character')} 
                  />
                )}

                <ComicsGrid
                  comics={comics}
                  favs={favoriteComics}
                  onToggleFav={toggleComicFav}
                  onItemClick={handleItemClick}
                />
              </>
            ) : (
              <FavoritesTab
                favChars={favoriteChars}
                favComics={favoriteComics}
                onCharClick={c => handleItemClick(c, 'character')}
                onComicClick={c => handleItemClick(c, 'comic')}
              />
            )}
          </Card>
        </Container>
      </Box>

      {selectedItem && (
        <ItemDialog
          open={Boolean(selectedItem)}
          item={selectedItem}
          type={selectedType}
          onClose={() => {
            setSelectedItem(null);
            setSelectedType(null);
          }}
        />
      )}
    </>
  );
};