// scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details-pokemon')

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

cardPokemon.forEach(card => {
  card.addEventListener('click', openDetailsPokemon);
})

if (btnCloseModal) {
  btnCloseModal.addEventListener('click', closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector('.js-open-select-custom')

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active')
})

function listingPokemons(urlAPI) {
  axios({
    method: 'GET',
    url: urlAPI
  })
  .then((response) => {
    const countPokemons = document.getElementById('js-count-pokemons')

    const { results, next, count } = response.data;

    countPokemons.innerText = count;

    results.forEach(pokemon =>{
      let urlApiDetails = pokemon.url;

      axios({
        method: 'GET',
        url: `${urlApiDetails}`
      })
      .then(response => {
        const {name, id, sprites, types } = response.data;

        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default
        }
      })
    })
  })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?pokemon?limit=9&offset=0')