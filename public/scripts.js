const currentPath = location.pathname;
const menuItems = document.querySelectorAll('header .links a')
const deleteUser = document.querySelector('#form-delete')

for (let item of menuItems) {
    if (currentPath.includes(item.getAttribute('href'))) {
        item.classList.add('active')
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

function paginate(currentPage, totalPages) {
    let pages = [],
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

    return pages
}

const pagination = document.querySelector('.pagination')

if (pagination) {

    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ''

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    pagination.innerHTML = elements

}