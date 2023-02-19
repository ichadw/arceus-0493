import { IMAGE_URL, LS_POKE_KEY } from './constants';
import { getLocalStorage } from './localStorage';

export const getPokemonIdFromUrl = (url: string): string => url.split('/')[6];

export const getPokemonSprite = (id: string): string => `${IMAGE_URL}${id}.png`;

export const toProperCase = (text: string): string =>
  text.charAt(0).toUpperCase() + text.substring(1);

export const successCatch = (rate: number): boolean =>
  Math.random() * 100 < rate;

export const addCompare = (myPokemons: any, addedPokemon: any): any => {
  const idPokemon = addedPokemon.key;
  const newPokemon = {
    [idPokemon]: { count: 1, name: addedPokemon.name, id: idPokemon },
  };
  if (!myPokemons) return newPokemon;

  const objPokemons = myPokemons;
  const pokemonExists = objPokemons[idPokemon];
  if (pokemonExists) {
    objPokemons[idPokemon].count = objPokemons[idPokemon].count + 1;
    return objPokemons;
  } else {
    return Object.assign(objPokemons, newPokemon);
  }
};

export const getMyPokemonTotal = () => {
  const myPokemonList = getLocalStorage(LS_POKE_KEY, null);
  let count = 0;
  if (myPokemonList) {
    Object.values(myPokemonList).forEach((res: any) => {
      count += res.count;
    });
    return count;
  }
  return 0;
};

export const pokemonExist = (id: string) => {
  const myPokemonList = getLocalStorage(LS_POKE_KEY, null);
  if (myPokemonList) return !!myPokemonList[id];
  return false;
};
