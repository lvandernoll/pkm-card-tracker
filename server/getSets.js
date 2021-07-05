const fetch = require('node-fetch');
const fs = require('fs');

const authHeaders = {
  headers: {
    'X-API-Key': ''
  }
};

console.log('Fetching all standard sets..');
fetch('https://api.pokemontcg.io/v2/sets?q=legalities.standard:legal&pageSize=1000', authHeaders)
.then(response => response.json())
.then(data => {
  const setsArray = [];
  data.data.forEach(set => {
    setsArray.push({
      ptcgoCode: set.ptcgoCode,
      name: set.name,
      series: set.series,
      totalCards: set.total,
      standardLegal: set.legalities.standard === 'Legal',
      symbolUrl: set.images.symbol,
      logoUrl: set.images.logo,
    });
  });
  setsArray.reverse();
  fs.writeFile('../src/data/sets.json', JSON.stringify(setsArray, 'utf8'), () => {console.log('Sets written to ../src/data/sets.json')});
})
.catch(console.error);
