## Usage
To retrieve all (legal) sets, run `node getSets` (for frontend only)  
To retrieve all legal sets and its cards, run `node getAllLegal`  
To retrieve a set and all cards within, run `node getSetCards <setname>` where `<setname>` is the exact name of the set (i.e. `Cosmic Eclipse`)

## Technical Specifications
This section contains information about what data we save and write to the json files (need) and what data can furthermore be implemented when necessary (have).
### Set:
What do we need?
```json
{
  "code": "CEC",
  "name": "Cosmic Eclipse",
  "series": "Sun & Moon",
  "totalCards": 236,
  "symbolUrl": "https://images.pokemontcg.io/sm12/symbol.png",
  "logoUrl": "https://images.pokemontcg.io/sm12/logo.png"
}
```
What do we have?
```json
{
  "code": "sm12",
  "ptcgoCode": "CEC",
  "name": "Cosmic Eclipse",
  "series": "Sun & Moon",
  "totalCards": 236,
  "standardLegal": true,
  "expandedLegal": true,
  "releaseDate": "11/01/2019",
  "symbolUrl": "https://images.pokemontcg.io/sm12/symbol.png",
  "logoUrl": "https://images.pokemontcg.io/sm12/logo.png",
  "updatedAt": "11/04/2019 20:21:00"
}
```

### Card:
What do we need?
```json
{
  "name": "Alolan Muk",
  "imageUrl": "https://images.pokemontcg.io/sm12/131.png",
  "imageUrlHiRes": "https://images.pokemontcg.io/sm12/131_hires.png",
  "types": [
    "Darkness"
  ],
  "supertype": "Pokémon",
  "number": "131",
  "rarity": "Rare",
}
```
What do we have?
```json
{
  "id": "sm12-131",
  "name": "Alolan Muk",
  "nationalPokedexNumber": 89,
  "imageUrl": "https://images.pokemontcg.io/sm12/131.png",
  "imageUrlHiRes": "https://images.pokemontcg.io/sm12/131_hires.png",
  "types": [
    "Darkness"
  ],
  "supertype": "Pokémon",
  "subtype": "Stage 1",
  "evolvesFrom": "Alolan Grimer",
  "hp": "140",
  "retreatCost": [
    "Colorless",
    "Colorless",
    "Colorless",
    "Colorless"
  ],
  "convertedRetreatCost": 4,
  "number": "131",
  "artist": "MAHOU",
  "rarity": "Rare",
  "series": "Sun & Moon",
  "set": "Cosmic Eclipse",
  "setCode": "sm12",
  "attacks": [
    {
      "cost": [
        "Darkness",
        "Colorless"
      ],
      "name": "Panic Poison",
      "text": "Your opponent's Active Pokémon is now Burned, Confused, and Poisoned.",
      "damage": "20",
      "convertedEnergyCost": 2
    },
    {
      "cost": [
        "Darkness",
        "Darkness",
        "Colorless"
      ],
      "name": "Sludge Bomb",
      "text": "",
      "damage": "110",
      "convertedEnergyCost": 3
    }
  ],
  "resistances": [
    {
      "type": "Psychic",
      "value": "-20"
    }
  ],
  "weaknesses": [
    {
      "type": "Fighting",
      "value": "×2"
    }
  ]
}
```
