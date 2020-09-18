// querySelector() é um metodo seletor de elementos e classes ou id CSS através do JS.
// querySelectorAll() pega todos os elementos com a mesma class, id ou tipo
const modalOverlay = document.querySelector('.modal-overlay')
const closeModal = document.querySelector('.close-modal')
const cards = document.querySelectorAll('.card')

/**
 * addEventListender("", callback()) é uma função do DOM que
 * observa todos os movimentos realizados na página que geram
 * eventos. a função recebe como primeiro parâmetro o tipo de
 * evento que queremos capturar e no segundo, uma função que 
 * realizará a ação que se quer quando tal evento for capturado */

for ( let card of cards ) {
    card.addEventListener('click', function() {
        // pega o elemento e adiciona uma classe à ele usando 
        // classList.add('nome_da_classe')
        // modalOverlay.classList.add('active')
        // ADiciona dinamicamente a URL correspondente à cada 
        // vídeo do card no iframe do modal
        const videoId = card.getAttribute('id')
        window.location.href = `/video?id=${videoId}`
        // window.location.href = `/video/${videoId}`
        // modalOverlay.querySelector('iframe').src=`http://www.youtube.com/embed/${videoId}`
    })
}

// Setar vazio ao src, evita que o vídeo continue reproduzindo 
// mesmo depois que o modal é fechado
// closeModal.addEventListener('click', function() {
//     modalOverlay.classList.remove('active')
//     modalOverlay.querySelector('iframe').src=""
// })