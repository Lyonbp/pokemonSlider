import "./pokemon.css";
import { buttonsPokemon } from "./buttons";
import { useRef, useEffect, useState } from "react";
import Header from "./header";
import { fetchPokemons } from "../api/fetchPokemon";
import { Pokemon } from "../types/types.d";

export default function pokemon() {
  const [query, setQuery] = useState("");
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
      
      localStorage.setItem('pokemon', JSON.stringify(allPokemons))
      
    };
    fetchAllPokemons();
  }, []);

  const listItems = JSON.parse(localStorage.getItem('pokemon'))?.slice(0, 5).map((pokemon:any) =>
    <div className="item" key={pokemon.id}>{pokemon.name}</div>
  );

  return (
    <>
      
      <div className="pokemon">
        <div className="slider">
        <ul>
          {listItems}
        </ul>

        </div>
        
        <div className="buttons" ref={sliderRef}>
          <button id="prev">{"<"}</button>
          <button id="next">{">"}</button>
        </div>
      </div>
    </>
  );
}
