// createOrder.js

function submitForm(event) {
  const sampleData = {
    date: new Date().toLocaleDateString(),
    productName: cart.bookName,
    quantity: cart.bookNum,
    packagingType: cart.packaging ? 'Звичайне пакування' : 'Подарункове пакування',
    firstName: cart.userName,
    lastName: cart.userSurname,
    deliveryType: cart.delPost || cart.delHome ? 'доставка на пошту' : 'доставка до дому',
    userAdress: cart.userAdress,
    price: cart.total.toFixed(2),
  };

  addRowToTable(sampleData);

  // Очищення форми
  event.preventDefault();
}

function addRowToTable(data) {
  const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.rows.length);

  for (const value of Object.values(data)) {
    const cell = newRow.insertCell();
    cell.appendChild(document.createTextNode(value));
  }

  myForm.reset();
}
