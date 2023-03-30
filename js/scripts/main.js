// scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details-pokemon')
const countPokemons = document.getElementById('js-count-pokemons');

cardPokemon.forEach(card => {
  card.addEventListener('click', openDetailsPokemon);
})

if (btnCloseModal) {
  btnCloseModal.addEventListener('click', closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
})

const areaPokemons = document.getElementById('js-list-pokemons');

function primeiraLEtraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCardPokemon(code, type, nome, imagePok) {
  let card = document.createElement('button');
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  card.setAttribute('code-pokemon', code)
  areaPokemons.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imagemSrc = document.createElement('img');
  imagemSrc.classList = 'thumb-img';
  imagemSrc.setAttribute('src', imagePok);
  image.appendChild(imagemSrc);

  let infoCardPokemon = document.createElement('div');
  infoCardPokemon.classList = 'info';
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement('div');
  infoTextPokemon.classList = 'text';
  infoCardPokemon.appendChild(infoTextPokemon);

  let codePokemon = document.createElement('span');
  codePokemon.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  namePokemon.textContent = primeiraLEtraMaiuscula(nome);
  infoTextPokemon.appendChild(namePokemon);

  let areaIcon = document.createElement('div');
  areaIcon.classList = 'icon';
  infoCardPokemon.appendChild(areaIcon);

  let imgType = document.createElement('img');
  imgType.setAttribute('src', `img/icon-types/${type}.svg`)
  areaIcon.appendChild(imgType);
}

function listingPokemons(urlAPI) {
  axios({
    method: 'GET',
    url: urlAPI
  })
    .then((response) => {

      const { results, next, count } = response.data;

      countPokemons.innerText = count;

      results.forEach(pokemon => {
        let urlApiDetails = pokemon.url;

        axios({
          method: 'GET',
          url: `${urlApiDetails}`
        })
          .then(response => {
            const { name, id, sprites, types } = response.data;

            const infoCard = {
              nome: name,
              code: id,
              image: sprites.other.dream_world.front_default,
              type: types[0].type.name
            }

            createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);

            const cardPokemon = document.querySelectorAll('.js-open-details-pokemon')

            cardPokemon.forEach(card => {
              card.addEventListener('click', openDetailsPokemon);
            });

          })
      })
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');

  let codePokemon = this.getAttribute('code-pokemon');
  let imagePokemon = this.querySelector('.thumb-img');
  let iconTypePokemon = this.querySelector('.info .icon img');
  let namePokemon = this.querySelector('.info h3');
  let codeStringPokemon = this.querySelector('.info span');

  const modalDetails = document.getElementById('js-modal-details');
  const imgPokemonModal = document.getElementById('js-image-pokemon-modal');
  const iconTypePokemonModal = document.getElementById('js-image-type-modal');
  const namePokemonModal = document.getElementById('js-name-pokemon-modal');
  const codePokemonModal = document.getElementById('js-code-pokemon-modal');

  imgPokemonModal.setAttribute('src', imagePokemon.getAttribute('src'));
  modalDetails.setAttribute('type-pokemon-modal', this.classList[2]);
  iconTypePokemonModal.setAttribute('src', iconTypePokemon.getAttribute('src'));

  namePokemonModal.textContent = namePokemon.textContent;
  codePokemonModal.textContent = codeStringPokemon.textContent;

  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
  })
    .then(response => {
      console.log(response.data);
    })
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

// Aqui é o Script para listar todos os tipos de pokemon

const areaTypes = document.getElementById("js-type-area")
const areaTypesMobile = document.querySelector(".dropdown-select")

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type'
})
  .then(response => {
    const { results } = response.data;

    results.forEach((type, index) => {
      if (index < 18) {
        let itemType = document.createElement('li');
        areaTypes.appendChild(itemType);

        let buttonType = document.createElement('button');
        buttonType.classList = `type-filter ${type.name}.svg`;
        buttonType.setAttribute('code-type', index)
        itemType.appendChild(buttonType);

        let iconType = document.createElement('div');
        iconType.classList = 'icon';
        buttonType.appendChild(iconType);

        let srcType = document.createElement('img');
        srcType.setAttribute('src', `img/icon-types/${type.name}.svg`);
        iconType.appendChild(srcType);

        let nameType = document.createElement('span');
        nameType.textContent = primeiraLEtraMaiuscula(type.name);
        buttonType.appendChild(nameType);

        // Aqui é o preenchimento do select mobile dos tipos

        let itemTypeMobile = document.createElement('li');
        areaTypesMobile.appendChild(itemTypeMobile);

        let buttonTypeMobile = document.createElement('button');
        buttonTypeMobile.classList = `type-filter ${type.name}.svg`;
        buttonTypeMobile.setAttribute('code-type', index + 1)
        itemTypeMobile.appendChild(buttonTypeMobile);

        let iconTypeMobile = document.createElement('div');
        iconTypeMobile.classList = 'icon';
        buttonTypeMobile.appendChild(iconTypeMobile);

        let srcTypeMobile = document.createElement('img');
        srcTypeMobile.setAttribute('src', `img/icon-types/${type.name}.svg`);
        iconTypeMobile.appendChild(srcTypeMobile);

        let nameTypeMobile = document.createElement('span');
        nameTypeMobile.textContent = primeiraLEtraMaiuscula(type.name);
        buttonTypeMobile.appendChild(nameTypeMobile);

        const allTypes = document.querySelectorAll('.type-filter');

        allTypes.forEach(btn => {
          btn.addEventListener('click', filterByTypes)
        })
      }
    })
  })

//Aqui é o script que realiza a funcionalidade do load more

const btnLoadMore = document.getElementById('js-btn-load-more');

let countPagination = 10;

function showMorePokemon() {
  listingPokemons(`https://pokeapi.co/api/v2/pokemon?pokemon?limit=9&offset=${countPagination}`)

  countPagination = countPagination + 9;
}

btnLoadMore.addEventListener('click', showMorePokemon);

//Funcao para filtrar os pokemons por tipo

function filterByTypes() {
  let idPokemon = this.getAttribute('code-type');

  const areaPokemons = document.getElementById('js-list-pokemons');
  const btnLoadmore = document.getElementById('js-btn-load-more');
  const countPokemonsType = document.getElementById('js-count-pokemons');
  const allTypes = document.querySelectorAll('.type-filter');

  areaPokemons.innerHTML = '';
  btnLoadmore.style.display = "none";

  const sectionPokemons = document.querySelector('.s-all-info-pokemons')
  const topSection = sectionPokemons.offsetTop;

  window.scrollTo({
    top: topSection + 288,
    behavior: 'smooth'
  })

  allTypes.forEach(type => {
    type.classList.remove('active');
  });

  this.classList.add('active');

  if (idPokemon) {
    axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`
    })
      .then(response => {

        const { pokemon } = response.data;
        countPokemonsType.textContent = pokemon.length;

        pokemon.forEach(pok => {

          const { url } = pok.pokemon;

          axios({
            method: 'GET',
            url: `${url}`
          })
            .then(response => {
              const { name, id, sprites, types } = response.data;

              const infoCard = {
                nome: name,
                code: id,
                image: sprites.other.dream_world.front_default,
                type: types[0].type.name
              }

              if (infoCard.image) {
                createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);
              }

              const cardPokemon = document.querySelectorAll('.js-open-details-pokemon')

              cardPokemon.forEach(card => {
                card.addEventListener('click', openDetailsPokemon);
              })
            })
        })
      })
  } else {
    areaPokemons.innerHTML = '';
    listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')
    btnLoadmore.style.display = "block";
  }
}

// funcao para buscar pokemons

const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

btnSearch.addEventListener('click', searchPokemon);

inputSearch.addEventListener('keyup', (event) => {
  if (event.code == 'Enter') {
    searchPokemon()
  }
})

function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilter = document.querySelectorAll('.type-filter');

  typeFilter.forEach(type => {
    type.classList.remove('active');
  })


  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`
  }).then(response => {
    areaPokemons.innerHTML = "";
    btnLoadMore.style.display = 'none';
    countPokemons.textContent = '1'

    const { name, id, sprites, types } = response.data;

    const infoCard = {
      nome: name,
      code: id,
      image: sprites.other.dream_world.front_default,
      type: types[0].type.name
    }

    if (infoCard.image) {
      createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);
    }

    const cardPokemon = document.querySelectorAll('.js-open-details-pokemon')

    cardPokemon.forEach(card => {
      card.addEventListener('click', openDetailsPokemon);
    })
  })
    .catch((error) => {
      if (error.response) {
        areaPokemons.innerHTML = "";
        btnLoadMore.style.display = 'none';
        countPokemons.textContent = '0';
        alert('Não foi encontrado nenhum resultado com essa pesquisa');
      }
    })
}