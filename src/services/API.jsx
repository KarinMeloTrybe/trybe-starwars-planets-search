const endpoint = 'https://swapi.dev/api/planets';

const fetchApi = async () => {
  const { results } = await fetch(endpoint).then((result) => result.json());
  console.log(results);
  return results;
};

export default fetchApi;
