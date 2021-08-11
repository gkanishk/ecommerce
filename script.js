const rootContainer = document.querySelector("#root");
const productContainer = document.querySelector("#product-container");
const url = "https://devbazar.herokuapp.com/products";
let products = [];

// Filters
const sortByFilter = document.querySelector("#sortByFilter");
const searchBox = document.querySelector("#search-box");
const sizesFilter = document.querySelector("#sizes-filter");
const filters = {
    sortBy: "",
    searchValue: "",
    sizes: []
}

function fetchProducts() {
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        products = data?.response ?? [];
    }).then(()=>{
        renderProducts(products)
    })
    .catch((error)=>{
        console.error(error);
    })
}

function renderProducts(productItems=[]) {
    productContainer.innerHTML = "";
    if(productItems.length===0){
        productContainer.innerHTML = `<h1>No products available</h1>`
    }else {
        productItems.forEach((value)=>{
            productContainer.innerHTML += 
            `<div class="product-card-container">
                <img src=${value.attributes.img} alt="product image" />
                <span>${value.name}</span>
                <div>
                Sizes:
                ${value.attributes.sizes.map((size)=>(`
                <span>${size}</span>`))}
                </div>
                <span>Rs.${value.price}</span>
            </div>`
        })
    }
}

function applyAllFilters() {
    let tempProducts = [...products];
    if(filters.searchValue.length>0) {
        tempProducts = tempProducts.filter(({name})=>{
            return name.toLowerCase().includes(filters.searchValue.toLowerCase());
        })
    }
    if(filters.sizes.length > 0) {
        tempProducts = tempProducts.filter(({attributes})=>filters.sizes.filter((size)=>attributes.sizes.includes(size)).length>0)
    }
    if(filters.sortBy === "low") {
        tempProducts = tempProducts.sort((productOne,productTwo)=>productOne.price - productTwo.price);
    }
    else if(filters.sortBy === "high") {
        tempProducts = tempProducts.sort((productOne,productTwo)=>productTwo.price - productOne.price);
    }
    renderProducts(tempProducts);
}


// Event Listners:
sortByFilter.addEventListener("change",function applySortByFilter(event) {
    filters.sortBy = event.target.value;
    applyAllFilters();
});

searchBox.addEventListener("input",function applySearchFilter(event) {
    filters.searchValue = event.target.value;
    applyAllFilters();
})

sizesFilter.addEventListener("change", function applySizeFilter(event){
    const index = filters.sizes.indexOf(event.target.value);
    if(index>=0) {
        filters.sizes.splice(index,1);
    }else {
        filters.sizes.push(event.target.value);
    }
    applyAllFilters();
})

fetchProducts();