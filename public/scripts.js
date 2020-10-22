const currentPath = location.pathname;
const menuItems = document.querySelectorAll('header .links a')
const deleteUser = document.querySelector('#form-delete')

// need to compare one variable with another
// the query brings all child elements. this is to get one by one
for (let item of menuItems) {
    if (currentPath.includes(item.getAttribute('href'))) { // element has many props. this is to get the variable from inside the element
        item.classList.add('active') // this         
    }
}

if (deleteUser) {
    deleteUser.addEventListener('submit', function (event) {
        const confirmation = confirm('Tem certeza que deseja excluir o usuário selecionado?\nEsta ação não poderá ser desfeita.')

        if (!confirmation) {
            event.preventDefault()
        }
    })
}

let totalPages = 20,
    currentPage = 6,
    pages = [],
    prevPage

for (let selectedPage = 1; selectedPage <= totalPages; selectedPage++) {

    const firstAndLastPages = selectedPage == 1 || selectedPage == totalPages
    const pagesBeforeSelected = selectedPage >= currentPage - 2
    const pagesAfterSelected = selectedPage <= currentPage + 2

    if (firstAndLastPages || pagesBeforeSelected && pagesAfterSelected) {

        if (prevPage && selectedPage - prevPage > 2) {
            pages.push('...')
        }

        if (prevPage && selectedPage - prevPage == 2) {
            pages.push(selectedPage - 1)
        }

        pages.push(selectedPage)

        prevPage = selectedPage
    }
}

console.log(pages)
