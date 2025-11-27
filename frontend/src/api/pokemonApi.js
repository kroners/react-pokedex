import axiosClient from "./axiosClient";

export async function fetchPokemons({ page = 1, limit = 20, search = "", sort = "number-asc" }) {
  const res = await axiosClient.get("/pokemons", {
    params: { page, limit }
  });

  let { results, ...rest } = res.data;

  if (search) {
    const normalized = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        String(p.number).includes(normalized)
    );
  }

  if (sort === "name-asc") {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    results = [...results].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "number-desc") {
    results = [...results].sort((a, b) => b.number - a.number);
  } else {
    results = [...results].sort((a, b) => a.number - b.number);
  }

  return { results, ...rest };
}

export async function fetchPokemonDetail(id) {
  const res = await axiosClient.get(`/pokemons/${id}`);
  return res.data;
}
