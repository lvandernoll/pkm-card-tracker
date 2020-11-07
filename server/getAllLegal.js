const fetch = require('node-fetch');
const fs = require('fs');

console.log('Fetching all standard sets..');
fetch('https://api.pokemontcg.io/v1/sets?standardLegal=true')
.then(response => response.json())
.then(data => {
  data.sets.forEach(setData => {
    const set = {
      code: setData.ptcgoCode,
      name: setData.name,
      series: setData.series,
      totalCards: setData.totalCards,
      symbolUrl: setData.symbolUrl,
      logoUrl: setData.logoUrl,
    };
    console.log(`Fetching all ${setData.name} cards..`);
    const setName = setData.name.split("'").join('');
    fetch(`https://api.pokemontcg.io/v1/cards?set=${setName}&pageSize=1000`)
    .then(response => response.json())
    .then(data => {
      const cardsArray = [];
      data.cards.forEach(card => {
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
      fs.writeFile(`../src/data/${setData.name}.json`, JSON.stringify(set, 'utf8'), () => {console.log(`Set with cards written to ../src/data/${setData.name}.json`)});
    })
    .catch(console.error);
  });
})
.catch(console.error);
