import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { addCompare } from '@/utils';
import { LS_POKE_KEY } from '@/utils/constants';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import noop from '@/utils/noop';

type DataContextType = {
  myPokemons: any;
  addPokemon: (value: any) => void;
};

const initValue = {
  myPokemons: null,
  addPokemon: noop,
};

const DataContext = createContext<DataContextType>(initValue);

const useDataContext = (): DataContextType => useContext(DataContext);

const DataContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const myPokemonList = useMemo(() => getLocalStorage(LS_POKE_KEY, null),[])

  const addPokemon = useCallback((newPokemon: any): void => {
    const response = addCompare(myPokemonList, newPokemon);
    setLocalStorage(LS_POKE_KEY, response);
  }, [myPokemonList]);

  const value = useMemo(
    () => ({
      ...initValue,
      addPokemon,
      myPokemons: myPokemonList,
    }),
    [addPokemon, myPokemonList]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { useDataContext, DataContext, DataContextProvider };
