"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      promptFor("Please enter the number that corrisponds to the information you know about the individual 1: Gender 2: Date of Birth 3: Height 4: Weight 5: Eye Color 6: Occupation");
      searchResults = newFunction(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  if (people.length == 1) { //09-19-19 tlc
    // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
    mainMenu(searchResults, people);
  }
  else {
    app(people);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      console.log(person.firstName + " " + person.lastName + ",s date of birth is " + person.dob + ". Their gender is " + person.gender + ", thier eye color is " + person.eyeColor + ",they have a height of " + person.height + " inches, and a weight of " + person.weight + " pounds. Their job title is " + person.occupation);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person using the name they entered
  //return foundPerson;
  return foundPerson[0];//09-19-19 tlc
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  let response = "";//09-19-19 tlc
  do {
    //let response = prompt(question).trim();
    response = prompt(question).trim();//{09-19-19 tlc}
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  let tempResult = true;
  for (let i = 0; i < input.length; i++) {
    let asciiChar = 0;
    asciiChar = input.charCodeAt(i);
    if (!(asciiChar > 96 && asciiChar < 122)) {
      tempResult = false;
      break;
    }
  }
  //return true; // default validation only
  return tempResult;
}

// helper function to pass in as default promptFor validation
function nums(input) {
  let tempResult = true;
  for (let i = 0; i < input.length; i++) {
    let asciiChar = 0;
    asciiChar = input.charCodeAt(i);
    if (!(asciiChar > 48 && asciiChar < 57)) {
      tempResult = false;
      break;
    }
  }
  //return true; // default validation only
  return tempResult;
}

function newFunction() {

}

