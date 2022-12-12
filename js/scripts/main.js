const cardPokemon = document.querySelectorAll('js-open-details-pokemon');
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

btnCloseModal.addEventListener('click', closeDetailsPokemon);