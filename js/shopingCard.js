// shoping-cart.js

const myForm = document.querySelector('.shoping-cart-form');
const booksPrice = document.querySelector('.book-price-output');
const totalPrice = document.querySelector('.total-price-output');
const calcTotalBtn = document.querySelector('.calc-total-btn');
const orderBtn = document.querySelector('.order-btn');

let cart = {
  bookName: '',
  bookNum: 1,
  delHome: false,
  delPost: true,
  packaging: false,
  userName: '',
  userSurname: '',
  userAdress: '',
  bookPrice: 0,
  total: 0,
  basePrice: 0,
};

function order(event) {
  const target = event.target;

  switch (target.name) {
    case 'bookName':
      cart.bookName = target.value;

      const cartPrice = parseFloat(target[target.selectedIndex].dataset.price);
      cart.basePrice = cartPrice;

      break;

    case 'numerosity':
      cart.bookNum = parseInt(target.value) || 0;
      break;

    case 'delivery':
      if (target.id === 'post') {
        cart.delPost = target.checked;
        cart.delHome = false;
      } else if (target.id === 'home') {
        cart.delHome = target.checked;
        cart.delPost = false;
      }
      break;

    case 'packaging':
      cart.packaging = target.checked;
      break;

    case 'user-name':
      cart.userName = target.value;
      break;

    case 'user-surname':
      cart.userSurname = target.value;
      break;

    case 'user-adress':
      cart.userAdress = target.value;
      break;

    default:
    // Якщо не знайдено відповідного case, не робимо нічого
  }

  calc();
  if (cart.total < 0) {
    calcTotalBtn.disabled = true;
  } else {
    calcTotalBtn.disabled = false;
  }
}

function calc() {
  cart.bookPrice = cart.basePrice * cart.bookNum;
  booksPrice.textContent = cart.bookPrice.toFixed(2);
}
// if (totalPrice > 0) orderBtn.disabled = false;

function calcTotal() {
  const basePrice = cart.bookPrice;

  if (cart.delPost) {
    cart.total = basePrice + (5 / 100) * basePrice;
  } else if (cart.delHome) {
    cart.total = basePrice + (15 / 100) * basePrice;
  } else {
    cart.total = basePrice;
  }

  if (cart.packaging) {
    cart.total += (10 / 100) * basePrice;
  }
  if (cart.total !== 0) orderBtn.disabled = false;

  totalPrice.textContent = cart.total.toFixed(2);
}

myForm.addEventListener('change', order);
calcTotalBtn.addEventListener('click', calcTotal);
myForm.addEventListener('submit', submitForm);
