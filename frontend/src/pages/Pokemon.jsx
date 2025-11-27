import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { fetchPokemonDetail } from "../api/pokemonApi.js";

const typeColorMap = {
  bug: "var(--type-bug)",
  dark: "var(--type-dark)",
  dragon: "var(--type-dragon)",
  electric: "var(--type-electric)",
  fairy: "var(--type-fairy)",
  fighting: "var(--type-fighting)",
  fire: "var(--type-fire)",
  flying: "var(--type-flying)",
  ghost: "var(--type-ghost)",
  normal: "var(--type-normal)",
  grass: "var(--type-grass)",
  ground: "var(--type-ground)",
  ice: "var(--type-ice)",
  poison: "var(--type-poison)",
  psychic: "var(--type-psychic)",
  rock: "var(--type-rock)",
  steel: "var(--type-steel)",
  water: "var(--type-water)"
};

function Pokemon() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchPokemonDetail(id);
        setPokemon(data);
      } catch (err) {
        console.error(err);
        setError("Error loading pokemon details.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="error-text">{error}</p>
      </Layout>
    );
  }

  if (!pokemon) {
    return (
      <Layout>
        <p>Not found</p>
      </Layout>
    );
  }

  const primaryType = pokemon.types[0] || "normal";
  const heroColor = typeColorMap[primaryType] || "var(--color-primary)";

  return (
    <Layout title={pokemon.name}>
      <button className="btn-secondary back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <section className="pokemon-detail">
        <div className="pokemon-detail-hero" style={{ backgroundColor: heroColor }}>
          <div className="detail-hero-header">
            <h2 className="detail-hero-name">{pokemon.name}</h2>
            <span className="detail-hero-number">#{pokemon.number}</span>
          </div>
          <div className="detail-hero-image-wrapper">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="detail-image"
            />
          </div>
          <div className="detail-hero-types">
            {pokemon.types.map((t) => (
              <span key={t} className="type-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-section">
            <h3>About</h3>
            <div className="about-grid">
              <div>
                <p className="about-label">Weight</p>
                <p>{pokemon.weight}</p>
              </div>
              <div>
                <p className="about-label">Height</p>
                <p>{pokemon.height}</p>
              </div>
              <div>
                <p className="about-label">Abilities</p>
                <p>{pokemon.abilities.join(", ")}</p>
              </div>
            </div>
          </div>

          {pokemon.flavorText && (
            <div className="detail-section">
              <h3>About</h3>
              <p>{pokemon.flavorText}</p>
            </div>
          )}

          <div className="detail-section">
            <h3>Moves (first 20)</h3>
            <ul className="moves-list">
              {pokemon.moves.map((mv) => (
                <li key={mv}>{mv}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Forms</h3>
            {pokemon.forms.length ? (
              <ul>
                {pokemon.forms.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : (
              <p>Single form</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Pokemon;
