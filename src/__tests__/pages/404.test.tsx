import { fireEvent, render, screen } from '@testing-library/react';
import Page404 from '@/pages/404';
import matchMediaMock from '@/__mocks__/matchMediaMock';
import Layout from '@/components/Layout';
import { useRouterMock } from '@/__mocks__/routerMock';

describe('pages/404', () => {
  beforeAll(() => {
    matchMediaMock();
  });

  it('renders properly with', () => {
    const { pushMock } = useRouterMock();
    render(
      <Layout>
        <Page404 />
      </Layout>
    );

    expect(screen.getByText(/Pokémon Gotta Catch Em All/)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, the page you visited does not exist./)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('btnHome'));
    expect(pushMock).toBeCalledWith('/');
  });
});
