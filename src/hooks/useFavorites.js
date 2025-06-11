import { useState, useEffect } from 'react';

export function useFavorites(key) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(key)) || []);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);
  const toggle = item => {
    setItems(prev => prev.some(f=>f.id===item.id)
      ? prev.filter(f=>f.id!==item.id)
      : [...prev, item]
    );
  };
  return [items, toggle];
}