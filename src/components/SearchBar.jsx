import React from 'react';
import { Box, Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export const SearchBar = ({
  inputValue,
  onInputChange,
  onSearch,
  onReset,
  suggestions
}) => (
  <Box sx={{ display:'flex', gap:1, mb:2, width:'100%' }}>
    <Autocomplete
      freeSolo
      options={suggestions}
      value={inputValue}                 
      inputValue={inputValue}
      onInputChange={(e, v) => onInputChange(v)}
      onKeyDown={e => e.key === 'Enter' && onSearch()}
      renderInput={params => (
        <TextField {...params} label="Buscar personaje o UPC" fullWidth />
      )}
      sx={{ flexGrow: 1 }}
    />
    <Button onClick={onSearch} startIcon={<SearchIcon />} variant="contained">
      Buscar
    </Button>
    <Button onClick={onReset} startIcon={<DeleteIcon />} variant="outlined">
      Limpiar
    </Button>
  </Box>
);