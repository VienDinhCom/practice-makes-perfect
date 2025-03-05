// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-pokemon-search-app-project/build-a-pokemon-search-app

import { expect } from 'jsr:@std/expect';

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprite: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

async function search(query: string): Promise<Pokemon> {
  const enpoint = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';
  const pokemon = await fetch(enpoint + query.toLowerCase()).then((res) => res.json());

  return {
    id: pokemon.id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    sprite: pokemon.sprites.front_default,
    stats: {
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      specialAttack: pokemon.stats[3].base_stat,
      specialDefense: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat,
    },
  };
}

Deno.test('Fetches a known Pokémon (Pikachu) and verifies its data', async () => {
  const pokemon = await search('pikachu');

  expect(pokemon).toStrictEqual({
    id: 25,
    name: 'pikachu',
    weight: expect.any(Number),
    height: expect.any(Number),
    sprite: expect.any(String),
    stats: {
      hp: expect.any(Number),
      attack: expect.any(Number),
      defense: expect.any(Number),
      specialAttack: expect.any(Number),
      specialDefense: expect.any(Number),
      speed: expect.any(Number),
    },
  });
});

Deno.test('Handles Pokémon name case insensitivity', async () => {
  const pokemon1 = await search('Pikachu');
  const pokemon2 = await search('pikachu');

  expect(pokemon1).toStrictEqual(pokemon2);
});

Deno.test('Fetches a Pokémon by ID', async () => {
  const pokemon = await search('1'); // Bulbasaur

  expect(pokemon.id).toBe(1);
  expect(pokemon.name).toBe('bulbasaur');
});

Deno.test('Handles invalid Pokémon name gracefully', async () => {
  await expect(search('invalidpokemonname')).rejects.toThrow();
});
