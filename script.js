const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");

let allPokemon = [];

// Fetch 200 Pokémon
async function loadPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=200";

    const res = await fetch(url);
    const data = await res.json();

    for (let pokemon of data.results) {
        const pokemonData = await fetch(pokemon.url);
        const pokemonInfo = await pokemonData.json();

        allPokemon.push({
            name: pokemonInfo.name,
            image: pokemonInfo.sprites.front_default
        });
    }

    displayPokemon(allPokemon);
}

// Display Pokémon Cards
function displayPokemon(list) {
    pokemonContainer.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <p>${p.name}</p>
        `;

        pokemonContainer.appendChild(card);
    });
}

// Real-time Search
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allPokemon.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    displayPokemon(filtered);
});

// Load data on page load
loadPokemon();
