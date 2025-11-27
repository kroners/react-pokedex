import { Router } from "express";
import { fetchPokemons, fetchPokemonById } from "../services/pokemonService.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

// Protected Routes
router.get("/pokemons", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page ?? "1", 10);
    const limit = parseInt(req.query.limit ?? "20", 10);

    const data = await fetchPokemons(page, limit);

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching pokemons" });
  }
});

router.get("/pokemons/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await fetchPokemonById(id);

    res.json(pokemon);
  } catch (error) {
    console.error(error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "Pokemon not found" });
    }
    res.status(500).json({ message: "Error fetching pokemon details" });
  }
});

export default router;
