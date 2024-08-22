import { useEffect, useState } from 'react';

export default function SelectBox() {
    const pokemonWanted = 20
    const [options, setOptions] = useState([]);

    // useing useEffect to limit how often this loop is called
    useEffect(() => {
        // Create an array of options and update the state with it
        const newOptions = [
          {
            id: 0,
            name: '-Choose a Pokemon to talk about-'
          }
        ];
        for (let i = 1; i <= pokemonWanted; i++) {
          newOptions.push({
            id: i,
            // If I had more time: make the names = pokemon names using pokeAPI
            name: `Pokemon #${i}`
          })
        }
        setOptions(newOptions);
      }, [pokemonWanted]);

    return options
}
