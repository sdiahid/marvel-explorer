import md5 from 'crypto-js/md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const ts = process.env.REACT_APP_MARVEL_TS;
const hash = md5(ts + privateKey + publicKey).toString();
const base = 'https://gateway.marvel.com/v1/public';

async function fetchCharacterById(id) {
  const res = await fetch(`${base}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  const { data } = await res.json();
  const p = data.results[0];
  return { id: p.id, name: p.name, thumbnail: `${p.thumbnail.path}.${p.thumbnail.extension}`, description: p.description || 'Sin descripción' };
}

async function fetchComics(id) {
  const res = await fetch(`${base}/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  const { data } = await res.json();
  return data.results.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description || 'Sin descripción',
    thumbnail: `${c.thumbnail.path}.${c.thumbnail.extension}`,
    upc: c.upc || 'Sin UPC',
    pageCount: c.pageCount || 0,
    prices: c.prices.map(p => ({ type: p.type, price: p.price })),
  }));
}

async function fetchComicById(id) {
  const res = await fetch(`${base}/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  const { data } = await res.json();
  const c = data.results[0];
  return {
    id: c.id,
    title: c.title,
    description: c.description || 'Sin descripción',
    thumbnail: `${c.thumbnail.path}.${c.thumbnail.extension}`,
    upc: c.upc || 'Sin UPC',
    pageCount: c.pageCount || 0,
    prices: c.prices.map(p => ({ type: p.type, price: p.price })),
    characters: c.characters.items.map(item => item.name),
  };
}

export { fetchCharacterById, fetchComics, fetchComicById };