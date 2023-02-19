import { getPokemonSprite, toProperCase } from '@/utils';
import { LS_POKE_KEY } from '@/utils/constants';
import { getLocalStorage } from '@/utils/localStorage';
import { Button, Card, Col, Result, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PokemonDetail: React.FC = () => {
  const myPokemons = getLocalStorage(LS_POKE_KEY, null);
  const data = Object.values(myPokemons || {});
  const router = useRouter();

  if (!data.length)
    return (
      <Result
        status="warning"
        title="No Pokémon Catched Yet"
        extra={
          <Button onClick={() => router.push('/')}>
            Go Catch Your First Pokémon
          </Button>
        }
      />
    );

  return (
    <div data-testid="divMyPokemon">
      <Row>
        {data.map((dt: any) => {
          return (
            <Col key={`pokemon-${dt.id}`}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image
                    alt={`pokemon${dt.id}`}
                    src={getPokemonSprite(String(dt.id))}
                    width={240}
                    height={240}
                    data-testid={`img-${dt.id}`}
                  />
                }
              >
                <Card.Meta title={`${toProperCase(dt.name)}#${dt.id}`} description={`Qty: ${dt.count}`} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default PokemonDetail;
