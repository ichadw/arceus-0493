import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <title>Pokémon - Gotta Catch Em All</title>
      <link rel="shortcut icon" href="/pokeico.ico" />
      <meta
        name="description"
        content={`Pokémon - Gotta Catch Em All`}
      />
    </Head>
  );
};

export default Meta;
