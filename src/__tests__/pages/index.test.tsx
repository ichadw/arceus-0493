import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import matchMediaMock from '@/__mocks__/matchMediaMock';
import Layout from '@/components/Layout';
import { useRouterMock } from '@/__mocks__/routerMock';

describe('pages/index', () => {
  beforeAll(() => {
    matchMediaMock();
  });
  const { pushMock } = useRouterMock();

  it('renders properly', () => {
    render(
      <Layout>
        <Home />
      </Layout>
    );

    expect(screen.getByText(/Pokémon Gotta Catch Em All/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('txtHeading'));
    expect(pushMock).toBeCalledWith('/');
    fireEvent.click(screen.getByTestId('txtMyPokemon'));
    expect(pushMock).toBeCalledWith('/my-pokemon');
  });
});
