const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType1 = document.querySelector('.pokemon_type1');
const pokemonType2 = document.querySelector('.pokemon_type2');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;

// Busca o Pokemon
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Renderiza o pokemon no pokedex
async function renderPokemon(pokemon) {

    pokemonName.innerHTML = 'Loading .....';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
   
    if (data) {
        
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        
    } else {
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        input.value = '';
        pokemonName.innerHTML = 'Not Found';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
      
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);  
    }
});
buttonNext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon); 

});

renderPokemon('1');
