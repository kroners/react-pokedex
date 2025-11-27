import React from "react";
import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <button className="pokemon-card" onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="pokemon-card-info">
        <span className="pokemon-number">#{pokemon.number}</span>
        <span className="pokemon-name">{pokemon.name}</span>
      </div>
    </button>
  );
}

export default PokemonCard;
