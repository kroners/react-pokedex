import axios from "axios";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemons(page = 1, limit = 20) {
  const offset = (page - 1) * limit;

  const res = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, {
    params: { offset, limit }
  });

  const { results, count } = res.data;

  const enrichedResults = await Promise.all(
    results.map(async (pokemon) => {
      const detailRes = await axios.get(pokemon.url);
      const data = detailRes.data;

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        number: data.id
      };
    })
  );

  const totalPages = Math.ceil(count / limit);

  return {
    results: enrichedResults,
    page,
    totalPages,
    total: count
  };
}

export async function fetchPokemonById(id) {
  const res = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
  const data = res.data;

  const speciesRes = await axios.get(data.species.url);
  const species = speciesRes.data;

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default,
    number: data.id,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => a.ability.name),
    moves: data.moves.slice(0, 20).map((m) => m.move.name),
    forms: data.forms.map((f) => f.name),
    flavorText: species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text
  };
}
