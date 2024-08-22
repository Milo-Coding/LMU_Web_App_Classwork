import './Images.css'

export function getImages() {
    const imageElements = [];

    // decide how many sprites we want
    const pokemonWanted = 20
    for (let i = 1; i <= pokemonWanted; i++) {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
        const altText = `Pokémon #${i} image`;

        const imageElement = (
            <img key={i} src={imageUrl} alt={altText} num = {i}/>
        );

        imageElements.push(imageElement);
    }
    
    return <div className = "images">{imageElements}</div>;
}