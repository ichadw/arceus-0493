import React, { useState, useEffect, useContext } from 'react';
import { Button, message, Space, Table } from 'antd';
import { getAllPokemon, getCatchRate, ResultsResponse } from '@/api';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  getPokemonSprite,
  getPokemonIdFromUrl,
  toProperCase,
  successCatch,
  pokemonExist,
} from '@/utils';
import Image from 'next/image';
import { DataContext } from '@/context/data';
import { PokemonType } from '../types';
import { CheckCircleFilled } from '@ant-design/icons';

const PokeListTable: React.FC = () => {
  const { addPokemon } = useContext(DataContext);
  const [pokemonList, setPokemonList] = useState<ResultsResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const pokemons = await getAllPokemon({ offset, limit: limit });
      const mapped = pokemons.results.map((poke, idx) => ({
        ...poke,
        key: idx,
      }));
      setPokemonList(mapped);
      setTotal(pokemons.count);
    }
    fetchData();
  }, [limit, offset]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current ?? 0);
    setOffset((pagination.current ?? 0) * limit - limit);
    setLimit(pagination.pageSize ?? 10);
  };

  const handleCatch = async (value: PokemonType) => {
    const pokemonName = toProperCase(value.name);
    const pokemonId = getPokemonIdFromUrl(value.url);
    try {
      setLoading(true);
      const catchRate = await getCatchRate(pokemonId);
      const isSuccess = successCatch(catchRate.capture_rate);
      if (isSuccess) {
        addPokemon({ ...value, key: pokemonId });
        message.open({
          content: `Catch ${pokemonName} Success! Added to My Pokémon`,
          type: 'success',
        });
      } else
        message.open({
          content: `Catch ${pokemonName} Failed!`,
          type: 'error',
        });
    } catch (err) {
      console.error(err);
      message.open({ content: `Catch ${pokemonName} Failed!`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ResultsResponse> = [
    {
      title: 'Image',
      key: 'key',
      dataIndex: 'url',
      render: (value) => (
        <Image
          src={getPokemonSprite(getPokemonIdFromUrl(value))}
          alt="test"
          width={64}
          height={64}
        />
      ),
      width: '10%',
    },
    {
      title: 'Pokémon Name # ID',
      key: 'name',
      render: (value) => {
        const id = getPokemonIdFromUrl(value.url);
        return `${toProperCase(value.name)}#${id}`;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => {
        return (
          <Space>
            <Button type="primary" onClick={() => handleCatch(value)}>
              Catch
            </Button>
          </Space>
        );
      },
    },
    {
      title: 'In Box',
      key: 'id',
      render: (value) => {
        const id = getPokemonIdFromUrl(value.url);
        return (
          pokemonExist(id) && (
            <Space>
              <CheckCircleFilled />
            </Space>
          )
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={pokemonList}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize: limit,
          total,
        }}
        loading={loading}
      />
    </div>
  );
};

export default PokeListTable;
