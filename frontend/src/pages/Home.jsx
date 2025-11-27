import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import PokemonCard from "../components/PokemonCard.jsx";
import { fetchPokemons } from "../api/pokemonApi.js";
import SortButton from "../components/SortButton.jsx";
import SortMenu from "../components/SortMenu.jsx";

const PAGE_SIZE = 20;

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("number"); // "number" | "name"
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sortKey = sortBy === "number" ? "number-asc" : "name-asc";

  const load = async (page) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPokemons({
        page,
        limit: PAGE_SIZE,
        search,
        sort: sortKey
      });
      setPokemons(data.results);
      setPageInfo({ page: data.page, totalPages: data.totalPages });
    } catch (err) {
      console.error(err);
      setError("Error loading pokemons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortKey]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageInfo.totalPages) return;
    load(newPage);
  };

  const handleToggleSort = () => setIsSortOpen((prev) => !prev);

  const handleChangeSort = (value) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  return (
    <Layout title="Pokédex">
      <section className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <SortButton onClick={handleToggleSort} />
        {isSortOpen && (
          <div className="sort-menu-wrapper">
            <SortMenu sortBy={sortBy} onChange={handleChangeSort} />
          </div>
        )}
      </section>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <section className="pokemon-grid">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </section>

      <section className="pagination">
        <button
          className="btn-secondary"
          onClick={() => handlePageChange(pageInfo.page - 1)}
          disabled={pageInfo.page === 1}
        >
          Prev
        </button>
        <span>
          {pageInfo.page} / {pageInfo.totalPages}
        </span>
        <button
          className="btn-secondary"
          onClick={() => handlePageChange(pageInfo.page + 1)}
          disabled={pageInfo.page === pageInfo.totalPages}
        >
          Next
        </button>
      </section>
    </Layout>
  );
}

export default Home;
