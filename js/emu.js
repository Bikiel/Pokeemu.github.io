// Barra de búsqueda de juego Pokémon
const search = document.querySelector('.search');
const btn_search = document.querySelector('.btn_search');
const input = document.querySelector('.input');

btn_search.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});