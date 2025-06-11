const fs = require('fs');
const fetch = require('node-fetch').default;
const md5 = require('crypto-js/md5');

const publicKey = 'REACT_APP_MARVEL_PUBLIC_KEY';
const privateKey = 'REACT_APP_MARVEL_PRIVATE_KEY';
const timestamp = Date.now().toString();
const hash = md5(timestamp + privateKey + publicKey).toString();

async function fetchAll(endpoint, itemKey) {
  const limit = 100;
  let offset = 0;
  let total = Infinity;
  const items = [];

  while (offset < total) {
    const url = `https://gateway.marvel.com/v1/public/${endpoint}?limit=${limit}&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    const res = await fetch(url);
    const json = await res.json();
    total = json.data.total;
    items.push(...json.data.results);
    offset += limit;
    console.log(`Fetched ${offset} / ${total} from ${endpoint}`);
  }

  return items;
}

(async () => {
  try {
    const characters = await fetchAll('characters', 'characters');
    const names = characters.map((c) => c.name);
    fs.writeFileSync('names.json', JSON.stringify(names, null, 2), 'utf-8');
    console.log(`Saved ${names.length} character names to names.json`);

    const comics = await fetchAll('comics', 'comics');
    const upcs = comics
      .map((c) => c.upc)
      .filter((u) => u && u.trim().length > 0);
    fs.writeFileSync('upcs.json', JSON.stringify(upcs, null, 2), 'utf-8');
    console.log(`Saved ${upcs.length} UPC codes to upcs.json`);

  } catch (err) {
    console.error('Error generating lists:', err);
    process.exit(1);
  }
})();