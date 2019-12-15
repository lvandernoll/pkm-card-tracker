const fetch = require('node-fetch');
const fs = require('fs');

process.argv.shift();
process.argv.shift();
const set = process.argv.join(' ');

if(set === '') {
  console.error('Please enter a setname');
  return;
}

console.log(`Fetching all ${set} cards..`);
fetch(`https://api.pokemontcg.io/v1/cards?set=${set}&pageSize=1000`)
.then(response => response.json())
.then(data => {
  if(data.cards.length === 0) {
    console.error(`Set '${set}' does not exist`)
    return;
  }
  const cardsArray = [];
  data.cards.forEach(card => {
    cardsArray.push({
      name: card.name,
      imageUrl: card.imageUrl,
      types: card.types,
      supertype: card.supertype,
      number: card.number,
      rarity: card.rarity,
    });
  });
  cardsArray.sort((a, b) => a.number - b.number);
  fs.writeFile(`../src/data/cards/${set}.json`, JSON.stringify(cardsArray, 'utf8'), () => {console.log(`Cards written to ../src/data/cards/${set}.json`)});
})
.catch(console.error);
