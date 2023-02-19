import {
  getPokemonIdFromUrl,
  getMyPokemonTotal,
  getPokemonSprite,
  toProperCase,
} from '@/utils';
import { LS_POKE_KEY } from '@/utils/constants';
import { myPokemonMock } from '@/__data_mocks__/myPokemon';
import { localStorageMock } from '@/__mocks__/localStorageMock';

describe('utils/index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getPokemonIdFromUrl', () => {
    expect(
      getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/1/')
    ).toStrictEqual('1');
    expect(
      getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/1222/')
    ).toStrictEqual('1222');
  });

  test('getPokemonSprite', () => {
    expect(getPokemonSprite('99')).toStrictEqual(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png'
    );
    expect(getPokemonSprite('123')).toStrictEqual(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png'
    );
  });

  test('getMyPokemonTotal', () => {
    expect(getMyPokemonTotal()).toStrictEqual(0);
    localStorageMock(LS_POKE_KEY, myPokemonMock);
    expect(getMyPokemonTotal()).toStrictEqual(25);
  });

  test('toProperCase', () => {
    expect(toProperCase('bulbasaur')).toStrictEqual('Bulbasaur');
    expect(toProperCase('pikachu')).toStrictEqual('Pikachu');
  })
});
