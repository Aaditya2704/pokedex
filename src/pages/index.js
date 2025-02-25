import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        const pokemonList = response.data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png,
        }));
        setPokemons(pokemonList);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-10">
        <h1 className="text-3xl font-bold text-center">PokeDex</h1>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg shadow-sm"
          />
        </div>
      </div>
      <div className="mt-4 pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.id} href={/pokemon/${pokemon.id}}>
            <div className="p-4 shadow-lg border rounded-lg cursor-pointer">
              <div className="flex flex-col items-center">
                <img src={pokemon.image} alt={pokemon.name} className="rounded-lg mb-4" />
                <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}