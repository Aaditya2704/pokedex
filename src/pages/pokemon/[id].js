import axios from "axios";

export default function PokemonDetails({ pokemon }) {
  if (!pokemon) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center uppercase">{pokemon.name}</h1>
      <div className="flex justify-center my-6">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-40 h-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Type</h2>
          <p>{pokemon.types.map(type => type.type.name).join(", ")}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Abilities</h2>
          <p>{pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Stats</h2>
          <ul>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name}><span className="capitalize">{stat.stat.name}</span>: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Moves</h2>
          <p>{pokemon.moves.slice(0, 10).map(move => move.move.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return {
      props: { pokemon: response.data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}