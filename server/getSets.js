const fetch = require('node-fetch');
const fs = require('fs');

console.log('Fetching all standard sets..');
fetch('https://api.pokemontcg.io/v1/sets?standardLegal=true&pageSize=1000')
.then(response => response.json())
.then(data => {
  const setsArray = [];
  data.sets.forEach(set => {
    setsArray.push({
      ptcgoCode: set.ptcgoCode,
      name: set.name,
      series: set.series,
      totalCards: set.totalCards,
      standardLegal: set.standardLegal,
      symbolUrl: set.symbolUrl,
      logoUrl: set.logoUrl,
    });
  });
  setsArray.reverse();
  fs.writeFile('../src/data/sets.json', JSON.stringify(setsArray, 'utf8'), () => {console.log('Sets written to ../src/data/sets.json')});
})
.catch(console.error);
