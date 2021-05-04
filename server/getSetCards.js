const fetch = require('node-fetch');
const fs = require('fs');

const authHeaders = {
  headers: {
    'X-API-Key': ''
  }
};

process.argv.shift();
process.argv.shift();
const setName = process.argv.join(' ');

if(setName === '') {
  console.error('Please enter a setname');
  return;
}

console.log('Fetching all standard sets..');
fetch(`https://api.pokemontcg.io/v2/sets?name=${setName}`, authHeaders)
.then(response => response.json())
.then(data => {
  if(!data.data[0]) throw `No set with name '${setName}'`;
  const setData = data.data[0];
  const set = {
    code: setData.ptcgoCode,
    name: setData.name,
    series: setData.series,
    totalCards: setData.totalCards,
    symbolUrl: setData.symbolUrl,
    logoUrl: setData.logoUrl,
  };
  console.log(`Fetching all ${setName} cards..`);
  fetch(`https://api.pokemontcg.io/v2/cards?set=${setName}&pageSize=1000`, authHeaders)
  .then(response => response.json())
  .then(data => {
    const cardsArray = [];
    data.data.forEach(card => {
      cardsArray.push({
        name: card.name,
        imageUrl: card.imageUrl,
        imageUrlHiRes: card.imageUrlHiRes,
        types: card.types,
        supertype: card.supertype,
        number: card.number,
        rarity: card.rarity,
      });
    });
    cardsArray.sort((a, b) => a.number - b.number);
    set.cards = cardsArray;
    fs.writeFile(`../src/data/${setName}.json`, JSON.stringify(set, 'utf8'), () => {console.log(`Set with cards written to ../src/data/${setName}.json`)});
  })
  .catch(console.error);
})
.catch(console.error);
