const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a')
const deleteUser = document.querySelector('#form-delete')

// need to compare one variable with another
// the query brings all child elements. this is to get one by one
for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) { // element has many props. this is to get the variable from inside the element
        item.classList.add('active') // this         
    }
}

deleteUser.addEventListener('submit', function (event) {
    const confirmation = confirm('Tem certeza que deseja excluir o usuário selecionado?\nEsta ação não poderá ser desfeita.')

    if (!confirmation) {
        event.preventDefault()
    }
})