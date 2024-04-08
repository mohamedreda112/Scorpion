window.addEventListener("scroll", ()=> {
  let scrollBtn = document.querySelector(".go-up");
  if (window.pageYOffset > 500) {
    scrollBtn.classList.add("return")
  }else {
    scrollBtn.classList.remove("return")
  }
})

document.querySelector(".go-up").addEventListener("click", ()=> {
  window.scrollTo({
    top:0,
  })
})


let mainLinks = document.querySelectorAll(".mainlinks li a");
let btn = document.querySelector(".btn");
let navLinks = document.querySelector(".nav-links")

btn.addEventListener("click", ()=> {
  btn.classList.contains("change") ? btn.classList.remove("change") : btn.classList.add("change");
  navLinks.classList.toggle("open");
});

mainLinks.forEach((link) => {
  link.addEventListener("click",function () {
    document.querySelector(".active") ?.classList.remove("active") ;
    this.classList.add("active");
    this.classList.add("active");
    navLinks.classList.remove("open");
    btn.classList.remove("change")
  })
})

document.addEventListener("click", (e)=> {
  if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
    navLinks.classList.remove("open");
    btn.classList.remove("change");
  }
})

let shop = document.querySelector(".shop");
let ulCards = document.querySelector(".listcards");
let total = document.querySelector(".total");

let products = [
  {
    id: 1,
    name: "Men's Watch",
    image:'../IMGS/shop-1.png',
    price: 350,
  },
  {
    id: 2,
    name: "Men's Watch",
    image:'../IMGS/shop-2.png',
    price: 400,
  },
  {
    id: 3,
    name: "Men's Watch",
    image:'../IMGS/shop-3.png',
    price: 250,
  },
  {
    id: 4,
    name: "Men's Watch",
    image:'../IMGS/shop-4.png',
    price: 100,
  },
  {
    id: 5,
    name: "Men's Watch",
    image:'../IMGS/shop-5.png',
    price: 500,
  },
  {
    id: 6,
    name: "Men's Watch",
    image:'../IMGS/shop-6.png',
    price: 600,
  },
  {
    id: 7,
    name: "Men's Watch",
    image:'../IMGS/shop-7.png',
    price: 450,
  },
  {
    id: 8,
    name: "Men's Watch",
    image:'../IMGS/shop-8.png',
    price: 800,
  },
];

let listcards = [];
function getProducts() {
  products.forEach((value, key) => {
    let box = document.createElement("div");
    box.className = 'product-box';
    box.innerHTML = `
    <img src ="IMGS/${value.image}"/>
    <div class = "info">
      <h6>${value.name}</h6>
      <div class = "icons">
        <i onclick="addToCart(${key})" class="fa-solid fa-plus"></i>
        <i onclick="changeIcon(this)" class="fa-regular fa-heart"></i>
      </div>
      <div class ="price">$${value.price}</div>
    </div>
    `
    shop.appendChild(box)
  })
}
getProducts();

function changeIcon(icon) {
  if (icon.classList.contains("active")) {
    icon.classList.remove("active");
    icon.classList.remove("fas");
    let popUp = document.createElement("div");
    popUp.className = 'popUpMessage';
    popUp.innerText = "Remove From Favorites";
    document.body.appendChild(popUp);
    setTimeout(()=> {
      document.body.removeChild(popUp);
    }, 2000)
  }else {
    icon.classList.add("active");
    icon.classList.add("fas");
    let popUp = document.createElement("div");
    popUp.className = 'popUpMessage';
    popUp.innerText = "Added To Favorites";
    document.body.appendChild(popUp);
    setTimeout(()=> {
      document.body.removeChild(popUp);
    }, 2000)
  }
}

function addToCart(key) {
  if (listcards[key] == null) {
    listcards[key] = {...products[key], quantity: 1};
  }else {
    listcards[key].quantity++;
  }
  reloadCard() 
}

function changeQuantity(key, newQuantity) {
  if(newQuantity >= 0) {
    listcards[key].quantity = newQuantity;
    reloadCard()
  }
}

function reloadCard() {
  ulCards.innerHTML = "";
  let totalPrice = 0;
  listcards.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    if (value != null) {
      let licard = document.createElement("li");
      licard.innerHTML = `
      <div class="product-info">
        <img src="IMGS/${value.image}"/>
        <span>$${value.price}</span>
        <div class="changeQ">
          <button onclick="changeQuantity(${key},${value.quantity - 1})">-</button>
          <div class="cont">${value.quantity}</div>
          <button onclick="changeQuantity(${key},${value.quantity + 1})">+</button>
        </div>
        <div class="clear" onclick="clearit(${key})">X</div>
      </div>
      `
      ulCards.appendChild(licard)
    }
  })
  total.innerHTML = "$" + totalPrice;
}
function clearit(key) {
  listcards.splice(key, 1)
  reloadCard()
}

let year = document.getElementById("year");
let currentYear = new Date().getFullYear();
year.innerHTML = currentYear;