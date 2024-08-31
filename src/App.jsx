import React, { useState, useEffect } from "react";

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState("bg-black");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        const fetchDetailedData = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(fetchDetailedData).then((detailedPokemon) => {
          setPokemonList(detailedPokemon);
          setDisplayedPokemon(detailedPokemon.slice(0, 8));
        });
      });
  }, []);

  const showNextPokemon = () => {
    const newIndex = (currentIndex + 8) % pokemonList.length;
    setCurrentIndex(newIndex);
    setDisplayedPokemon(pokemonList.slice(newIndex, newIndex + 8));
  };

  const showPreviousPokemon = () => {
    const newIndex =
      (currentIndex - 8 + pokemonList.length) % pokemonList.length;
    setCurrentIndex(newIndex);
    setDisplayedPokemon(pokemonList.slice(newIndex, newIndex + 8));
  };

  const handlePokemonClick = (pokemon) => {
    const primaryType = pokemon.types[0].type.name;
    setBgColor(typeColors[primaryType] || "bg-black");
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${bgColor} text-gray-300 transition-colors duration-300`}
    >
      {/* Header */}
      <header className="bg-gray-900 p-4">
        // ... (keep existing header code)
      </header>

      {/* Main content wrapper */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        // ... (keep existing hero section code)
        {/* Pokémon Selection Section */}
        <section className="py-12 sm:py-20 bg-opacity-75 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">
              Choose Your Pokémon
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayedPokemon.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className="bg-gray-700 p-4 rounded text-center cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handlePokemonClick(pokemon)}
                >
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mx-auto mb-2"
                  />
                  <h3 className="font-bold text-white mb-1">{pokemon.name}</h3>
                  <p className="text-sm">Type: {pokemon.types[0].type.name}</p>
                  <p className="text-sm">HP: {pokemon.stats[0].base_stat}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={showPreviousPokemon}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={showNextPokemon}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </section>
        {/* Features Section */}
        // ... (keep existing features section code)
        {/* CTA Section */}
        // ... (keep existing CTA section code)
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 sm:py-8">
        // ... (keep existing footer code)
      </footer>
    </div>
  );
}

export default App;
