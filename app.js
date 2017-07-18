'use: strict;'

// Times to display each number of cookie sales
var times = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];

// Array to store the stores
var stores = [];

// Grab the "Parent Element" that will dictate where the sales table will go
var cookieTable = document.getElementById("sales_table");

// Grab the "Parent Element" that will dictate where the employees table will go
var employeeTable = document.getElementById("employee_table");

// object constructor for a single store
function Store(location, minCustomersPerHour, maxCustomersPerHour, averageCookiesPerCustomer) {
  this.location = location;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookiesPerDay = 0;

  this.generateCustomers = function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour.push(Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1)) + this.minCustomersPerHour);
    }
  };

  this.generateSales = function() {
    this.generateCustomers();
    for (var i = 0; i < times.length; i++) {
      this.cookiesEachHour.push(Math.ceil(this.customersEachHour[i] * this.averageCookiesPerCustomer));
    }
  };

  this.dailyTotal = function() {
    this.generateSales();
    for (var i = 0; i < times.length; i++) {
      this.totalCookiesPerDay += this.cookiesEachHour[i];
    }
  };

  this.render = function() {

    // Calls the dailyTotal method to generate cookies & customers per hours
    // i.e. generates the data to display
    this.dailyTotal();

    // Makes the row
    var trEl = document.createElement("tr");

    // For the store name data entry
    var storeName = document.createElement("td");
    storeName.textContent = this.location;
    trEl.appendChild(storeName);

    // For each cookies per hour
    for (var i = 0; i < times.length; i++) {
      var tdEl = document.createElement("td");
      tdEl.textContent = this.cookiesEachHour[i];
      trEl.appendChild(tdEl);
    }

    // For the daily total entry
    var dailyTotal = document.createElement("td");
    dailyTotal.textContent = this.totalCookiesPerDay;
    trEl.appendChild(dailyTotal);

    // Appends the completed row to the table tag
    cookieTable.appendChild(trEl);
  };
}

var pike = new Store("1st and Pike", 23, 65, 6.3);
var seatac = new Store("SeaTac Airport", 3, 24, 1.2);
var seattleCenter = new Store("Seattle Center", 11, 38, 3.7);
var capitolHill = new Store("Capitol Hill", 20, 38, 2.3);
var alki = new Store("Alki", 2, 16, 4.6);


stores.push(pike);
stores.push(seatac);
stores.push(seattleCenter);
stores.push(capitolHill);
stores.push(alki);

// Creates the header row of the table:
// Creates an entry for location
//    then creates entries for the times
//    then creates an entry for the total
function makeTableHeader() {

  // Creates the row element to hold the header row
  var trEl = document.createElement("tr");

  // Creates the header element for the store name label
  var locationHeader = document.createElement("th");
  locationHeader.textContent = "Location";
  trEl.appendChild(locationHeader);

  // Creates the header elements for the times
  for (var i = 0; i < times.length; i++) {
    var thEl = document.createElement("th");
    thEl.textContent = times[i];
    trEl.appendChild(thEl);
  }

  // Creates the header element for the total label
  var totalHeader = document.createElement("th");
  totalHeader.textContent = "Daily Location Total";
  trEl.appendChild(totalHeader);

  cookieTable.appendChild(trEl);
}

// Function to render each store
function makeTableRows() {
  for (var i = 0; i < stores.length; i++) {
    stores[i].render();
  }
}

// Stretch Goal
// Make the footer table that totals each column
function makeTableFooter() {
  var trEl = document.createElement("tr");

  var hourlyTotalsFooter = document.createElement("td");
  hourlyTotalsFooter.textContent = "Totals";
  trEl.appendChild(hourlyTotalsFooter);

  // Add up the totals for each column (time slot)
  for (var i = 0; i < times.length; i++) {
    var tdEl = document.createElement("td");
    var columnTotal = 0;
    for (var storeArrayIndex = 0; storeArrayIndex < stores.length; storeArrayIndex++) {
      columnTotal += stores[storeArrayIndex].cookiesEachHour[i];
    }
    tdEl.textContent = columnTotal;
    trEl.appendChild(tdEl);
  }

  // Adds up the store totals column
  var dailyTotalFooter = document.createElement("td");
  var dailyTotalCookies = 0;

  for (var i = 0; i < stores.length; i++) {
    dailyTotalCookies += stores[i].totalCookiesPerDay;
  }
  dailyTotalFooter.textContent = dailyTotalCookies;
  trEl.appendChild(dailyTotalFooter);

  // Adds the finished footer row to the table
  cookieTable.appendChild(trEl);
}

// Makes the header row for the employee table
function makeEmployeeHeader() {
  // Creates the row element to hold the header row
  var trEl = document.createElement("tr");

  // Creates the header element for the store name label
  var locationHeader = document.createElement("th");
  locationHeader.textContent = "Location";
  trEl.appendChild(locationHeader);

  // Creates the header elements for the times
  for (var i = 0; i < times.length; i++) {
    var thEl = document.createElement("th");
    thEl.textContent = times[i];
    trEl.appendChild(thEl);
  }

  // Creates the header element for the total label
  var totalHeader = document.createElement("th");
  totalHeader.textContent = "Daily Location Total";
  trEl.appendChild(totalHeader);

  employeeTable.appendChild(trEl);
}

// Makes the rows for the projected number of employees needed
function makeEmployeeRows() {

  // Makes the rows for each store
  for (var i = 0; i < stores.length; i++) {

    // Makes the row element
    var trEl = document.createElement("tr");

    // Gets the store names for each row
    var storeEl = document.createElement("td");
    storeEl.textContent = stores[i].location;
    trEl.appendChild(storeEl);

    // Creates counter variable for running number of employees needed
    var runningEmployeeCount = 0;

    // Gets the projected employees needed for each hour
    for (var hour = 0; hour < times.length; hour++) {
      var tdEl = document.createElement("td");
      var employeesNeeded = Math.ceil(stores[i].customersEachHour[hour] / 20);
      if (employeesNeeded < 2) {
        runningEmployeeCount += 2;
        tdEl.textContent = 2;
      } else {
        runningEmployeeCount += employeesNeeded;
        tdEl.textContent = employeesNeeded;
      }
      // tdEl.textContent = employeesNeeded;
      trEl.appendChild(tdEl);
    }

    // Adds the data entry for the total employees needed each day
    var totalTdEl = document.createElement("td");
    totalTdEl.textContent = runningEmployeeCount;

    // totalTdEl.textContent = Math.ceil(stores[i].totalCookiesPerDay / 20);
    trEl.appendChild(totalTdEl);

    // Appends the completed row to the table tag
    employeeTable.appendChild(trEl);
  }
}

// Make the footer row for the employees needed table
function makeEmployeeFooter() {
  var trEl = document.createElement("tr");

  var hourlyTotalsFooter = document.createElement("td");
  hourlyTotalsFooter.textContent = "Totals";
  trEl.appendChild(hourlyTotalsFooter);


  // Add up the totals for each column (time slot)
  for (var i = 0; i < times.length; i++) {
    var tdEl = document.createElement("td");
    var columnTotal = 0;
    for (var storeArrayIndex = 0; storeArrayIndex < stores.length; storeArrayIndex++) {
      if (Math.ceil(stores[storeArrayIndex].customersEachHour[i] / 20) < 2) {
        columnTotal += 2;
      } else {
        columnTotal += Math.ceil(stores[storeArrayIndex].customersEachHour[i] / 20);
      }
    }
    tdEl.textContent = columnTotal;
    trEl.appendChild(tdEl);
  }

  // Adds up the store totals column
  var dailyTotalFooter = document.createElement("td");

  // Make a counter for the daily total workers
  var dailyTotalWorkers = 0;

  for (var i = 0; i < stores.length; i++) {
    for (var hour = 0; hour < times.length; hour++) {
      if (Math.ceil(stores[i].customersEachHour[hour] / 20 < 2)) {
        dailyTotalWorkers += 2;
      } else {
        dailyTotalWorkers += Math.ceil(stores[i].customersEachHour[hour] / 20);
      }
    }
  }
  dailyTotalFooter.textContent = dailyTotalWorkers;
  trEl.appendChild(dailyTotalFooter);

  // Adds the finished footer row to the table
  employeeTable.appendChild(trEl);
}


// Creates the table for projected cookie sales
makeTableHeader();
makeTableRows();
makeTableFooter();

// Creates the table for projected employee table
makeEmployeeHeader();
makeEmployeeRows();
makeEmployeeFooter();
