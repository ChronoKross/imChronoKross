import React, { useState, useEffect } from "react";

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
    <Card className=" flex justify-center items-center h-screen">
      <CardBody>This is a card body</CardBody>
      <CardFooter className="">
        <Button>Hello World</Button>
      </CardFooter>
    </Card>
  );
}

export default App;
