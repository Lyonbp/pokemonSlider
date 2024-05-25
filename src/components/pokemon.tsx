import "./pokemon.css";
import { buttonsPokemon } from "./buttons";
import { useRef, useEffect, useState } from "react";
import { fetchPokemons } from "../api/fetchPokemon";

export default function pokemon() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buttonsPokemon();
  }, []);
  const [pokemons, setPokemons] = useState<any>([]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      const allPokemons = await fetchPokemons();
      await setPokemons(allPokemons);
      console.log(pokemons);

      localStorage.setItem("pokemon", JSON.stringify(allPokemons));
    };
    fetchAllPokemons();
  }, []);

  const storedPokemonsString = localStorage.getItem("pokemon");
  const storedPokemons = storedPokemonsString
    ? JSON.parse(storedPokemonsString)
    : null;

  // Verificar si hay datos y son un array antes de mapear
  const listItems = Array.isArray(storedPokemons)
    ? storedPokemons.slice(0, 51).map((pokemon: any) => (
        <div className="item" key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img className="pokemonImg" src={pokemon.imgSrc} alt={pokemon.name} />
          <div className="itemPokemon">
            <p className="pokemonStat">Number: {pokemon.id}</p>
            <p className="pokemonStat">Hp: {pokemon.hp}</p>
            <p className="pokemonStat">Type: {pokemon.type}</p>
            <p className="pokemonStat">Attack: {pokemon.attack}</p>
            <p className="pokemonStat">Deffense: {pokemon.defense}</p>
          </div>
        </div>
      ))
    : null;

  return (
    <>
      <div className="pokemon">
        <div className="slider">
          <ul>{listItems}</ul>
        </div>

        <div className="buttons" ref={sliderRef}>
          <button id="prev">{"<"}</button>
          <button id="next">{">"}</button>
        </div>
      </div>
    </>
  );
}
