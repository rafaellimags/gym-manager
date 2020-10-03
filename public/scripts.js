const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');


// need to compare one variable with another
// the query brings all child elements. this is to get one by one
for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) { // element has many props. this is to get the variable from inside the element
        item.classList.add('active') // this         
    }
}