'use: strict;'

// Times to display each number of cookie sales
var times = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];

// 1st and Pike
var pike = {
  minCustPerHr: 23,
  maxCustPerHr: 65,
  avgCookiesPerCust: 6.3,
  customersEachHour: [],
  cookiesEachHour : [],
  totalCookiesPerDay: 0,
  generateCustomers: function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour[i] = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1)) + this.minCustPerHr;
    }
  },
  generateSales: function() {
    for (var j = 0; j < times.length; j++) {
      this.cookiesEachHour[j] = Math.floor(this.customersEachHour[j] * this.avgCookiesPerCust);
    }
  },
  dailyTotal: function() {
    for (var k = 0; k < this.cookiesEachHour.length; k++) {
      this.totalCookiesPerDay += this.cookiesEachHour[k];
    }
  },
  render: function() {
    var pikeUL = document.getElementById("first_and_pike");
    // Need a for loop to iterate over the array of cookies per hour
    for (var l = 0; l < this.cookiesEachHour.length; l++) {

      // Step 1: Create an element
      var liEl = document.createElement("li");

      // Step 2: Give it content
      liEl.textContent = times[l] + ": " + this.cookiesEachHour[l] + " cookies";

      // Step 3: Append it to a certain place in the DOM
      pikeUL.appendChild(liEl);
    }
    var dailyTotal = document.createElement("li");
    dailyTotal.textContent = "Total: " + this.totalCookiesPerDay + " cookies";
    pikeUL.appendChild(dailyTotal);
  }
};
pike.generateCustomers();
pike.generateSales();
pike.dailyTotal();
pike.render();

// Seatac Airport
var seatac = {
  minCustPerHr: 3,
  maxCustPerHr: 24,
  avgCookiesPerCust: 1.2,
  customersEachHour: [],
  cookiesEachHour : [],
  totalCookiesPerDay: 0,
  generateCustomers: function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour[i] = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1)) + this.minCustPerHr;
    }
  },
  generateSales: function() {
    for (var j = 0; j < times.length; j++) {
      this.cookiesEachHour[j] = Math.floor(this.customersEachHour[j] * this.avgCookiesPerCust);
    }
  },
  dailyTotal: function() {
    for (var k = 0; k < this.cookiesEachHour.length; k++) {
      this.totalCookiesPerDay += this.cookiesEachHour[k];
    }
  },
  render: function() {
    var seatacUL = document.getElementById("seatac_airport");
    // Need a for loop to iterate over the array of cookies per hour
    for (var l = 0; l < this.cookiesEachHour.length; l++) {

      // Step 1: Create an element
      var liEl = document.createElement("li");

      // Step 2: Give it content
      liEl.textContent = times[l] + ": " + this.cookiesEachHour[l] + " cookies";

      // Step 3: Append it to a certain place in the DOM
      seatacUL.appendChild(liEl);
    }
    var liEL = document.createElement("li");
    liEl.textContent = "Total: " + this.totalCookiesPerDay + " cookies";
    seatacUL.appendChild(liEl);
  }
};
seatac.generateCustomers();
seatac.generateSales();
seatac.dailyTotal();
seatac.render();


// Seattle Center
var seattleCenter = {
  minCustPerHr: 11,
  maxCustPerHr: 38,
  avgCookiesPerCust: 3.7,
  customersEachHour: [],
  cookiesEachHour : [],
  totalCookiesPerDay: 0,
  generateCustomers: function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour[i] = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1)) + this.minCustPerHr;
    }
  },
  generateSales: function() {
    for (var j = 0; j < times.length; j++) {
      this.cookiesEachHour[j] = Math.floor(this.customersEachHour[j] * this.avgCookiesPerCust);
    }
  },
  dailyTotal: function() {
    for (var k = 0; k < this.cookiesEachHour.length; k++) {
      this.totalCookiesPerDay += this.cookiesEachHour[k];
    }
  },
  render: function() {
    var seattleCenterUL = document.getElementById("seattle_center");
    // Need a for loop to iterate over the array of cookies per hour
    for (var l = 0; l < this.cookiesEachHour.length; l++) {

      // Step 1: Create an element
      var liEl = document.createElement("li");

      // Step 2: Give it content
      liEl.textContent = times[l] + ": " + this.cookiesEachHour[l] + " cookies";

      // Step 3: Append it to a certain place in the DOM
      seattleCenterUL.appendChild(liEl);
    }
    var liEL = document.createElement("li");
    liEl.textContent = "Total: " + this.totalCookiesPerDay + " cookies";
    seattleCenterUL.appendChild(liEl);
  }
};
seattleCenter.generateCustomers();
seattleCenter.generateSales();
seattleCenter.dailyTotal();
seattleCenter.render();


// Capitol Hill
var capitolHill = {
  minCustPerHr: 20,
  maxCustPerHr: 38,
  avgCookiesPerCust: 2.3,
  customersEachHour: [],
  cookiesEachHour : [],
  totalCookiesPerDay: 0,
  generateCustomers: function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour[i] = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1)) + this.minCustPerHr;
    }
  },
  generateSales: function() {
    for (var j = 0; j < times.length; j++) {
      this.cookiesEachHour[j] = Math.floor(this.customersEachHour[j] * this.avgCookiesPerCust);
    }
  },
  dailyTotal: function() {
    for (var k = 0; k < this.cookiesEachHour.length; k++) {
      this.totalCookiesPerDay += this.cookiesEachHour[k];
    }
  },
  render: function() {
    var capitolHillUL = document.getElementById("capitol_hill");
    // Need a for loop to iterate over the array of cookies per hour
    for (var l = 0; l < this.cookiesEachHour.length; l++) {

      // Step 1: Create an element
      var liEl = document.createElement("li");

      // Step 2: Give it content
      liEl.textContent = times[l] + ": " + this.cookiesEachHour[l] + " cookies";

      // Step 3: Append it to a certain place in the DOM
      capitolHillUL.appendChild(liEl);
    }
    var liEL = document.createElement("li");
    liEl.textContent = "Total: " + this.totalCookiesPerDay + " cookies";
    capitolHillUL.appendChild(liEl);
  }
};
capitolHill.generateCustomers();
capitolHill.generateSales();
capitolHill.dailyTotal();
capitolHill.render();


// Alki
var alki = {
  minCustPerHr: 2,
  maxCustPerHr: 16,
  avgCookiesPerCust: 4.6,
  customersEachHour: [],
  cookiesEachHour : [],
  totalCookiesPerDay: 0,
  generateCustomers: function() {
    for (var i = 0; i < times.length; i++) {
      this.customersEachHour[i] = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1)) + this.minCustPerHr;
    }
  },
  generateSales: function() {
    for (var j = 0; j < times.length; j++) {
      this.cookiesEachHour[j] = Math.floor(this.customersEachHour[j] * this.avgCookiesPerCust);
    }
  },
  dailyTotal: function() {
    for (var k = 0; k < this.cookiesEachHour.length; k++) {
      this.totalCookiesPerDay += this.cookiesEachHour[k];
    }
  },
  render: function() {
    var alkiUL = document.getElementById("alki");
    // Need a for loop to iterate over the array of cookies per hour
    for (var l = 0; l < this.cookiesEachHour.length; l++) {

      // Step 1: Create an element
      var liEl = document.createElement("li");

      // Step 2: Give it content
      liEl.textContent = times[l] + ": " + this.cookiesEachHour[l] + " cookies";

      // Step 3: Append it to a certain place in the DOM
      alkiUL.appendChild(liEl);
    }
    var liEL = document.createElement("li");
    liEl.textContent = "Total: " + this.totalCookiesPerDay + " cookies";
    alkiUL.appendChild(liEl);
  }
};
alki.generateCustomers();
alki.generateSales();
alki.dailyTotal();
alki.render();
