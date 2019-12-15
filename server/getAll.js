const childProcess = require('child_process');

// Fetch sets
childProcess.fork('getSets.js').on('exit', () => {
  // Read sets and fetch its cards
  const sets = require('../src/data/sets.json');
  sets.forEach(set => {
    childProcess.fork('getCardsInSet.js', [set.name]);
  });
});
