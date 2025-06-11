import { useState, useEffect } from 'react';
import allNames from '../names.json';

export const useAutocomplete = (inputName, limit = 10) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!inputName) return setSuggestions([]);
    const lower = inputName.toLowerCase();
    setSuggestions(
      allNames
        .filter(n => n.toLowerCase().startsWith(lower))
        .slice(0, limit)
    );
  }, [inputName, limit]);

  return suggestions;
};