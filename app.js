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
      mainMenu(searchResults, people);
      break;
    case 'no':
      let otherSearch = promptFor("Do you Know any other information about the person? Enter 'yes' or 'no'", yesNo).toLowerCase();
      switch (otherSearch) {
        case 'yes':
          searchResults = whichInfo(people);
          break;
        case 'no':
        default:
          app(people); // restart app
          break;
      }
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
      //IN PROGRESS - Trevor
      let descendantResults = [];
      descendantResults = getDescendants(person, people);
      if (descendantResults.length > 0) {
        //display their names
        //for (let i = 0; i < descendantResults.length; i++) {
        //console.log(descendantResults[i].firstName + " " + descendantResults[i].lastName + " is a descendant of " + person.firstName + " " + person.lastName);
        console.log("Here is a list of descendants: ");
        displayPeople(descendantResults);
        //}
      }
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

  function whichInfo(people) {
    let otherType = promptFor("Please enter 'gender' if you know the gender, 'dob' if you know the date of birth", chars);
    let otherResults;
    switch (otherType) {
      case "gender":
        otherResults = searchByGender(people);
        break;
      case "dob":
        console.log("dob");
        break;
      //defualt:
      default:
        console.log("Trevor fixed a typo.");//09-19-19
        return filterInfo(people);
    }
    console.log("hello");
    //mainMenu(otherResults, people);
  }

  function searchByGender(people) {
    let gender = promptFor("is thier gender 'male' or 'female' ?", chars);
    let genderResults;

    let foundGender = people.filter(function (person) {
      if (person.gender.toLowerCase() === gender.toLowerCase()) {
        return true;
      }
      else {
        return false;
      }

    });
    console.log(foundGender);
    //mainMenu(genderResults, people)
  }
}

function getDescendants(person, people) {
  //filter people on (people.parents.length > 0)
  //add to an array of people having parents
  //for each of those people having parents, return true if people[i].parents[j] === person.id;
  //if true is returned, add the people.ID values to a new array called foundDescendants
  //getDescendants should then return people filtered on the ids the foundDescendants.

  //default
  let foundDescendants = [];
  let tempPeopleWithParents = people.filter(function (people) {
    if (people.parents.length > 0) {
      return true;
    }
    else {
      return false;
    }
  });

  //tempPeopleWithParents is an array of people having parents
  for (let i = 0; i < tempPeopleWithParents.length; i++) {
    //if (tempPeopleWithParents[i].id === person.id) {
    for (let j = 0; j < Object(tempPeopleWithParents[i])["parents"].length; j++) {
      if (person.id === Object(tempPeopleWithParents[i])["parents"][j]) {
        //foundDescendants.push(tempPeopleWithParents[i].id);
        foundDescendants.push(tempPeopleWithParents[i]);
        //these foundDescendants may also be somebody's parent... so recursion???
        //foundDescendants = getDescendants(tempPeopleWithParents[i], tempPeopleWithParents);
      }
    }
  }



  return foundDescendants;
}