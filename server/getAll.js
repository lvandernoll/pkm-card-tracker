const fetch = require('node-fetch');
const fs = require('fs');

const authHeaders = {
  headers: {
    'X-API-Key': 'bca479b9-bd4a-4985-b8cd-38ad09682ff5'
  }
};

console.log('Fetching all standard sets..');
fetch('https://api.pokemontcg.io/v2/sets', authHeaders)
  .then(response => response.json())
  .then(data => {
    const setsArray = [];
    let shinySetCards = [];
    data.data.forEach(async (setData, i) => {
      if (new Date(setData.releaseDate) >= new Date("2019/05/02")) {
        const set = {
          ptcgoCode: setData.ptcgoCode,
          name: setData.name,
          series: setData.series,
          totalCards: setData.total,
          symbolUrl: setData.images.symbol,
          logoUrl: setData.images.logo,
          cards: [],
        };
        if (set.name !== 'Shiny Vault' || setData.id === 'sma') {
          setsArray.push(set);
        } else if (set.name === 'Shiny Vault') {
          setsArray.find(aSet => aSet.name === 'Shiny Vault').totalCards += set.totalCards;
        }

        console.log(`Fetching all ${setData.name} cards..`);
        await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:"${setData.id}"&pageSize=1000`, authHeaders)
          .then(response => response.json())
          .then(data => {
            const cardsArray = [];
            data.data.forEach(card => {
              cardsArray.push({
                name: card.name,
                imageUrl: card.images.small,
                imageUrlHiRes: card.images.large,
                types: card.types,
                supertype: card.supertype,
                number: card.number,
                rarity: card.rarity,
                cardmarketUrl: card.cardmarket ? card.cardmarket.url : undefined,
                price: card.cardmarket ? card.cardmarket.prices.averageSellPrice : undefined,
                priceUpdatedAt: card.cardmarket ? card.cardmarket.updatedAt : undefined,
              });
            });
            cardsArray.sort((a, b) => a.number - b.number);
            if (setData.name === 'Shiny Vault') {
              shinySetCards.push(...cardsArray);
            } else {
              set.cards = cardsArray;
              fs.writeFile(`../src/data/${setData.ptcgoCode || 'NULL'}-${setData.name}.json`, JSON.stringify(set, 'utf8'), () => { console.log(`Set with cards written to ../src/data/${setData.ptcgoCode}-${setData.name}.json`) });
            }
          })
          .catch(console.error);

        if(i === data.data.length - 1) {
          const shinySet = setsArray.find(aSet => aSet.name === 'Shiny Vault');
          shinySet.cards = shinySetCards;
          fs.writeFile(`../src/data/${shinySet.ptcgoCode || 'NULL'}-${shinySet.name}.json`, JSON.stringify(shinySet, 'utf8'), () => { console.log(`Set with cards written to ../src/data/${shinySet.ptcgoCode}-${shinySet.name}.json`) });
        }
      }
    });
    setsArray.reverse();
    fs.writeFile('../src/data/sets.json', JSON.stringify(setsArray, 'utf8'), () => { console.log('Sets written to ../src/data/sets.json') });
  })
  .catch(console.error);
