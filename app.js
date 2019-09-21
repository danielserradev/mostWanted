"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function recursion(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      mainMenu(searchResults, people);
      break;
    case "no":
      whichInfo(people);
    default:
      whichInfo(people);
      break;
  }
}
function app(people) {
  // let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  // let searchResults;
  // switch (searchType) {
  //   case 'yes':
  //     searchResults = searchByName(people);
  //     mainMenu(searchResults, people);
  //     break;
  //   case 'no':
  //     let otherSearch = promptFor("Do you Know any other information about the person? Enter 'yes' or 'no'", yesNo).toLowerCase();
  //     switch (otherSearch) {
  //       case 'yes':
  //         searchResults = whichInfo(people);
  //         break;
  //       case 'no':
  //       default:
  //         whichInfo(people); // restart app
  //         break;
  //   }
  // if (people.length == 1) { //09-19-19 tlc
  //   //Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  //   displayPerson(person[0]);
  //   mainMenu(searchResults, people);
  // }
  // else {
  //   whichInfo(people);
  // }
  // }

  // mainMenu(searchResults, people);
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
      let immediateFamily = [];
      immediateFamily = getImmediateFamily(people, person);//09-20-19 tlc
      if (immediateFamily.length > 1) {
        displayPeople(immediateFamily)
      }
      else if (immediateFamily.length === 1) {
        displayPerson(person);
      }
      else {
        console.log("***PROBLEM AFTER CALL TO getImmediateFamily!!!***");
      }

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
      else {
        alert("this person has no descendants");
        mainMenu(person, people);
      }
      break;
    case "restart":
      whichInfo(people); // restart
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
    response = prompt(question);//{09-19-19 tlc}
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
    if (!(asciiChar > 47 && asciiChar < 58)) {
      tempResult = false;
      break;
    }
  }
  //return true; // default validation only
  return tempResult;
}


function whichInfo(people) {
  let otherType = promptFor("Based on the list below, Please enter the information that you know about the individual you are looking for. \n name \n gender \n Date of Birth \n eyecolor \n occupation \n idnumber or spouseid \n height or weight", chars, nums, yesNo);
  let otherResults;
  switch (otherType) {



    case "name":
      otherResults = searchByName(people);
      mainMenu(otherResults, people);
      break;


    case "gender":
      otherResults = searchByGender(people);
      break;
    case "height":
      otherResults = searchByHeight(people);
      break;
    case "weight":
      otherResults = searchByWeight(people);
      break;
    case "eyecolor":
      otherResults = searchByEyeColor(people);
      break;
    case "occupation":
      otherResults = searchByOccupation(people);
      break;
    case "idnumber":
      otherResults = searchByIdNumber(people);
      break;
    case "spouseid":
      otherResults = searchBySpouseIdNumber(people);
      break;
    default:
      return filterInfo(people);
  }
  displayPeople(otherResults);
  recursion(otherResults);
  whichInfo(otherResults);
}

function searchByGender(people) {
  let gender = promptFor("is thier gender 'male' or 'female' ?", chars);
  let foundGender = people.filter(function (person) {
    if (person.gender.toLowerCase() === gender.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundGender;
}

function searchByHeight(people) {
  let height = parseInt(promptFor("Please enter the height in inches?", nums));
  let foundHeight = people.filter(function (person) {
    if (person.height === height) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundHeight;
}

function searchByWeight(people) {
  let weight = parseInt(promptFor("Please enter the Weight?", nums));
  let foundWeight = people.filter(function (person) {
    if (person.weight === weight) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundWeight;
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("Please enter the individuals eyecolor?", chars);
  let foundEyeColor = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundEyeColor;
}

function searchByOccupation(people) {
  let occupation = promptFor("Please enter the individuals occupation?", chars);
  let foundOccupation = people.filter(function (person) {
    if (person.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundOccupation;
}

function searchByIdNumber(people) {
  let id = parseInt(promptFor("Please enter the id #?", nums));
  let foundId = people.filter(function (person) {
    if (person.id == id) {

      return true;
    }
    else {
      return false;
    }
  });
  //mainMenu(foundId[0]);
  mainMenu(foundId[0], people);//09-20-19
}

function searchBySpouseIdNumber(people) {
  let spouseId = parseInt(promptFor("Please enter the spouse's id #?", nums));
  let foundSpouseId = people.filter(function (person) {
    if (person.currentSpouse == spouseId) {

      return true;
    }
    else {
      return false;
    }
  });
  let spouse = foundSpouseId.currentSpouse;
  searchByIdNumber(people, true);
}


function getDescendants(person, people, foundDescendants = []) {
  //filter people on (people.parents.length > 0)
  //add to an array of people having parents
  //for each of those people having parents, add to foundDescendants if the ID of their parents matches person.id
  //the new foundDescendants may also have descendants... so call getDescendants again.

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
    for (let j = 0; j < Object(tempPeopleWithParents[i])["parents"].length; j++) {
      if (person.id === Object(tempPeopleWithParents[i])["parents"][j]) {
        foundDescendants.push(tempPeopleWithParents[i]);
        foundDescendants = getDescendants(tempPeopleWithParents[i], tempPeopleWithParents, foundDescendants);
      }
    }
  }
  return foundDescendants;
}

function getImmediateFamily(people, person) {
  //return this at the end
  let foundImmediateFamily = [];

  let tempFamilyPeople = people;
  //spouse
  //if the person has a spouse
  if (person.currentSpouse !== '') {
    //filter people on ID
    let tempFamilySpouse = people.filter(function (person) {
      if (people.id = person.currentSpouse) {
        return true;
      }
      else {
        return false;
      }
    });
    //add them if we found a person
    if (people.length == 1) {
      foundImmediateFamily.push(people[0]);
    }
  }

  //parents
  if (person.parents.length > 0) {
    let tempParents = [];
    for (let i = 0; i < person.parents.length; i++) {
      tempParents.push(person.parents[i]);
    }

    let tempFamily = [];
    tempFamily = people.filter(function (person) {
      if (person.id == tempParents[0] || person.id == tempParents[1]) {
        return true;
      }
      else {
        return false;
      }
    });

    for (let j = 0; j < tempFamily.length; j++) {
      foundImmediateFamily.push(tempFamily[j]);
    }

  }

  //children(other people claiming 'person' as parent[0] or parent[1]), but not grandchildren
  let tempPeopleWithParents = people.filter(function (person) {
    if (person.parents.length > 0) {
      return true;
    }
    else {
      return false;
    }
  });

  //tempPeopleWithParents is an array of people having parents
  for (let i = 0; i < tempPeopleWithParents.length; i++) {
    for (let j = 0; j < Object(tempPeopleWithParents[i])["parents"].length; j++) {
      if (person.id === Object(tempPeopleWithParents[i])["parents"][j]) {
        foundImmediateFamily.push(tempPeopleWithParents[i]);

      }
    }
  }
  return foundImmediateFamily;

}