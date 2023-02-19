import { fireEvent, render, screen } from '@testing-library/react';
import PageMyPokemon from '@/pages/my-pokemon';
import matchMediaMock from '@/__mocks__/matchMediaMock';
import Layout from '@/components/Layout';
import { useRouterMock } from '@/__mocks__/routerMock';
import { localStorageMock } from '@/__mocks__/localStorageMock';
import { LS_POKE_KEY } from '@/utils/constants';
import { myPokemonMock } from '@/__data_mocks__/myPokemon';

describe('pages/my-pokemon', () => {
  beforeAll(() => {
    useRouterMock();
    matchMediaMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly without data', () => {
    render(
      <Layout>
        <PageMyPokemon />
      </Layout>
    );

    expect(screen.getByText(/No Pokémon Catched Yet/)).toBeInTheDocument();
    expect(screen.getByText(/Go Catch Your First Pokémon/)).toBeInTheDocument();
  });

  it('renders properly with data', () => {
    localStorageMock(LS_POKE_KEY, myPokemonMock);
    render(
      <Layout>
        <PageMyPokemon />
      </Layout>
    );

    expect(screen.getByTestId('divMyPokemon')).toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur#1/)).toBeInTheDocument();
    expect(screen.getByTestId('img-1')).toBeInTheDocument();
  });
});
