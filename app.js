'use: strict';

// =========================== Global variables and Arrays ========================= //

var times = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var stores = [];    // Array to store the stores
var cookieTable = document.getElementById('sales_table');     // Table of stores sales
var employeeTable = document.getElementById('employee_table'); // Table of employees needed
var storeForm = document.getElementById('store_form');        // Form to create new stores

// Defines the constructor for a Store object
function Store(location, minCustomersPerHour, maxCustomersPerHour, averageCookiesPerCustomer) {
  this.location = location;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookiesPerDay;
}

// Fills a Store object's customersEachHour array with random number of customers each hours
//   based on the Store object's minCustomersPerHour and maxCustomersPerHour
Store.prototype.generateCustomers = function() {
  // this.customersEachHour = [];
  for (var i = 0; i < times.length; i++) {
    this.customersEachHour.push(Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1)) + this.minCustomersPerHour);
  }
};

// Fills a Store object's cookiesEachHour array with number of cookies sold for each hour
//   based on the values inside customersEachHour, and the Store object's avgCookiesPerCustomer
Store.prototype.generateSales = function() {
  // this.cookiesEachHour = [];
  this.generateCustomers();
  for (var i = 0; i < times.length; i++) {
    this.cookiesEachHour.push(Math.ceil(this.customersEachHour[i] * this.averageCookiesPerCustomer));
  }
};

// Sums all of a Store object's numbers of cookies sold each hour and assigns that value to
//   the Store object's totalCookiePerDay
Store.prototype.dailyTotal = function() {
  this.generateSales();
  this.totalCookiesPerDay = 0;
  for (var i = 0; i < times.length; i++) {
    this.totalCookiesPerDay += this.cookiesEachHour[i];
  }
};

// Renders a Store object's name, hourly cookies sold, and daily total of cookies sold
//   as a single row within a table to the DOM
Store.prototype.render = function() {



  // Calls the dailyTotal method to generate cookies & customers per hours
  // i.e. generates the data to display
  this.dailyTotal();

  // Makes the row element
  var trEl = document.createElement('tr');

  // For the store name data cell
  var storeName = document.createElement('td');
  storeName.textContent = this.location;
  trEl.appendChild(storeName);

  // Makes all the cookies per hour data cells
  for (var i = 0; i < times.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }

  // For the daily total data cell
  var dailyTotal = document.createElement('td');
  dailyTotal.textContent = this.totalCookiesPerDay;
  trEl.appendChild(dailyTotal);

  // Appends the completed row to the table element
  cookieTable.appendChild(trEl);
};

var pike = new Store('1st and Pike', 23, 65, 6.3);
var seatac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);


stores.push(pike);
stores.push(seatac);
stores.push(seattleCenter);
stores.push(capitolHill);
stores.push(alki);

// ========================================================================================= //

// The event handler
function handleStoreSubmit(event) {

  event.preventDefault(); // because Sam told me to

  var newLocation = event.target.location.value;
  var newMinCustomers = parseInt(event.target.min_customers.value);
  var newMaxCustomers = parseInt(event.target.max_customers.value);
  var newAvgCookies = parseFloat(event.target.avg_cookies.value);

  // clears the input fields
  event.target.location.value = null;
  event.target.min_customers.value = null;
  event.target.max_customers.value = null;
  event.target.avg_cookies.value = null;

  for (var i = 0; i < stores.length; i++) {
    if (newLocation === stores[i].location) {
      stores[i].minCustomersPerHour = newMinCustomers;
      stores[i].maxCustomersPerHour = newMaxCustomers;
      stores[i].averageCookiesPerCustomer = newAvgCookies;
      stores[i].customersEachHour = [];
      stores[i].cookiesEachHour = [];
      renderAllStores();
      return;
    }
  }

  var newStore = new Store(newLocation, newMinCustomers, newMaxCustomers, newAvgCookies);

  stores.push(newStore);
  renderAllStores();
}

// Creates the header row of the table:
// Creates an entry for location
//    then creates entries for the times
//    then creates an entry for the total
function makeTableHeader() {

  // Creates the row element to hold the header row
  var trEl = document.createElement('tr');

  // Creates the header element for the store name label
  makeTableElement(trEl, 'th', 'Location');

  // Creates the header elements for the times
  for (var i = 0; i < times.length; i++) {
    makeTableElement(trEl, 'th', times[i]);
  }

  // Creates the header element for the total label
  makeTableElement(trEl, 'th', 'Daily Location Total');

  cookieTable.appendChild(trEl);
}

// Stretch Goal
// Make the footer table that totals each column
function makeTableFooter() {
  var trEl = document.createElement('tr');

  makeTableElement(trEl, 'td', 'Totals');

  // Add up the totals for each column (time slot)
  for (var i = 0; i < times.length; i++) {
    var columnTotal = 0;
    for (var storeArrayIndex = 0; storeArrayIndex < stores.length; storeArrayIndex++) {
      columnTotal += stores[storeArrayIndex].cookiesEachHour[i];
    }
    makeTableElement(trEl, 'td', columnTotal);
  }

  // Adds up the store totals column
  var dailyTotalCookies = 0;

  for (var j = 0; j < stores.length; j++) {
    dailyTotalCookies += stores[j].totalCookiesPerDay;
  }
  makeTableElement(trEl, 'td', dailyTotalCookies);

  // Adds the finished footer row to the table
  cookieTable.appendChild(trEl);
}

// Makes the header row for the employee table
function makeEmployeeHeader() {
  // Creates the row element to hold the header row
  var trEl = document.createElement('tr');

  // Creates the header element for the store name label
  makeTableElement(trEl, 'th', 'Location');

  // Creates the header elements for the times
  for (var i = 0; i < times.length; i++) {
    makeTableElement(trEl, 'th', times[i]);
  }

  // Creates the header element for the total label
  makeTableElement(trEl, 'th', 'Daily Location Total');

  employeeTable.appendChild(trEl);
}

// Makes the rows for the projected number of employees needed
function makeEmployeeRows() {


  // Makes the rows for each store
  for (var i = 0; i < stores.length; i++) {

    // Makes the row element
    var trEl = document.createElement('tr');

    // Gets the store names for each row
    makeTableElement(trEl, 'td', stores[i].location);

    // Creates counter variable for running number of employees needed
    var runningEmployeeCount = 0;

    // Gets the projected employees needed for each hour
    for (var hour = 0; hour < times.length; hour++) {
      // var tdEl = document.createElement('td');
      var employeesNeeded = Math.ceil(stores[i].customersEachHour[hour] / 20);
      if (employeesNeeded < 2) {
        runningEmployeeCount += 2;
        makeTableElement(trEl, 'td', 2);
      } else {
        runningEmployeeCount += employeesNeeded;
        makeTableElement(trEl, 'td', employeesNeeded);
      }
    }

    // Adds the data entry for the total employees needed each day
    makeTableElement(trEl, 'td', runningEmployeeCount);

    // Appends the completed row to the table tag
    employeeTable.appendChild(trEl);
  }
}

// Make the footer row for the employees needed table
function makeEmployeeFooter() {

  var trEl = document.createElement('tr');

  makeTableElement(trEl, 'td', 'Totals');

  // Add up the totals for each column (time slot)
  for (var i = 0; i < times.length; i++) {
    var columnTotal = 0;
    for (var storeArrayIndex = 0; storeArrayIndex < stores.length; storeArrayIndex++) {
      if (Math.ceil(stores[storeArrayIndex].customersEachHour[i] / 20) < 2) {
        columnTotal += 2;
      } else {
        columnTotal += Math.ceil(stores[storeArrayIndex].customersEachHour[i] / 20);
      }
    }
    makeTableElement(trEl, 'td', columnTotal);
  }


  // Make a counter for the daily total workers
  var dailyTotalWorkers = 0;

  // Adds up the store totals column
  for (var j = 0; j < stores.length; j++) {
    for (var hour = 0; hour < times.length; hour++) {
      if (Math.ceil(stores[j].customersEachHour[hour] / 20 < 2)) {
        dailyTotalWorkers += 2;
      } else {
        dailyTotalWorkers += Math.ceil(stores[j].customersEachHour[hour] / 20);
      }
    }
  }
  makeTableElement(trEl, 'td', dailyTotalWorkers);

  // Adds the finished footer row to the table
  employeeTable.appendChild(trEl);
}

// Creates table elements, gives them content, and appends them to the passed parent element
function makeTableElement(parentElement, childElement, textContent) {
  if (childElement === 'td') {
    tdEl = document.createElement('td');
    tdEl.textContent = textContent;
    parentElement.appendChild(tdEl);
  } else if (childElement === 'th') {
    thEl = document.createElement('th');
    thEl.textContent = textContent;
    parentElement.appendChild(thEl);
  }
}

// Function to render each store
function renderAllStores() {

  cookieTable.innerHTML = '';
  employeeTable.innerHTML = '';

  // This block is for making the cookie sales table
  makeTableHeader();
  for (var i = 0; i < stores.length; i++) {       // renders all the cookie sales rows
    stores[i].render();
  }
  makeTableFooter();

  // This block is for making the employees needed table
  makeEmployeeHeader();
  makeEmployeeRows();
  makeEmployeeFooter();
}

// Creates the table for projected cookie sales
renderAllStores();

storeForm.addEventListener('submit', handleStoreSubmit);
