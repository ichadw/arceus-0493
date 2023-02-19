import qs from 'qs';
import fetcher from "@/utils/fetcher";

export interface ResultsResponse {
  name: string;
  url: string;
}

interface ApiAllResponse {
  // Define the shape of the API response object
  count: number;
  next: string;
  previous: string;
  results: ResultsResponse[];
}

interface QueryParams {
  offset: number;
  limit: number;
}

async function getAllPokemon(query: QueryParams): Promise<ApiAllResponse> {
  const response = await fetcher(`pokemon?${qs.stringify(query)}`, 'GET');
  
  return response;
}

async function getCatchRate(id: string) {
  const response = await fetcher(`pokemon-species/${id}`, 'GET');
  
  return response;
}

// async function getPokemon(id: number): Promise<ApiAllResponse> {
//   const response = await fetcher(`pokemon/${id}`, 'GET');

//   return response;
// }

export { getAllPokemon, getCatchRate }