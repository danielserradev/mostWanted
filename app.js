"use strict"
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
function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return whichInfo(people);
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch (displayOption) {
    case "info":
      alert(person.firstName + " " + person.lastName + ",s date of birth is " + person.dob + ". Their gender is " + person.gender + ", thier eye color is " + person.eyeColor + ",they have a height of " + person.height + " inches, and a weight of " + person.weight + " pounds. Their job title is " + person.occupation);
      break;
    case "family":
      let immediateFamily = [];
      immediateFamily = getImmediateFamily(people, person);
      if (immediateFamily.length > 1) {
        displayPeople(immediateFamily);
        }
      else if (immediateFamily.length === 1) {
        displayPerson(immediateFamily[0]);
      }
      else {
        mainMenu(person, people);
      }      
      break;
    case "descendants":
      let descendantResults = [];
      descendantResults = getDescendants(person, people);
      if (descendantResults.length > 0) {
        console.log("Here is a list of descendants: ");
        displayPeople(descendantResults);
      }
      else {
        alert("this person has no descendants");
        mainMenu(person, people);
      }
      break;
    case "restart":
      whichInfo(people); 
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, people); 
  }
  mainMenu(person, people);
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
  return foundPerson[0];
}

function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  alert(personInfo);
}

function promptFor(question, valid) {
  let response = "";
  do {
    response = prompt(question);
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

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
  return tempResult;
}

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
  return tempResult;
}


function whichInfo(people) {
  let otherType = promptFor("Based on the list below, Please enter the number that corrisponds with the information you know about the individual you are looking for. \n 1. Name \n 2. Gender \n 3. Eye Color \n 4. Occupation \n 5. Id Number \n 6. Spouse Id Number \n 7. Height \n 8. Weight", nums);
  let otherResults;
  switch (otherType) {
    case "1":
      otherResults = searchByName(people);
      mainMenu(otherResults, people);
      break;
    case "2":
      otherResults = searchByGender(people);
      break;
    case "3":
      otherResults = searchByEyeColor(people);
      break;
    case "4":
      otherResults = searchByOccupation(people);
      break;
    case "5":
      otherResults = searchByIdNumber(people);
      break;
    case "6":
      otherResults = searchBySpouseIdNumber(people);
      break;
    case "7":
      otherResults = searchByHeight(people);
      break;
    case "8":
      otherResults = searchByWeight(people);
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
  mainMenu(foundId[0], people);
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
  let tempPeopleWithParents = people.filter(function (people) {
    if (people.parents.length > 0) {
      return true;
    }
    else {
      return false;
    }
  });

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
  let foundImmediateFamily = [];
  let tempFamilyPeople = people;
   if (person.currentSpouse !== '') {
    tempFamilyPeople = tempFamilyPeople.filter(function (tempFamilyPerson) {
      if (tempFamilyPerson.id === person.currentSpouse) {
        return true;
      }
      else {
        return false;
      }
    });
    if (tempFamilyPeople.length == 1) {
      foundImmediateFamily.push(tempFamilyPeople[0]);
    }
  }
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
  let tempPeopleWithParents = people.filter(function (person) {
    if (person.parents.length > 0) {
      return true;
    }
    else {
      return false;
    }
  });
  for (let i = 0; i < tempPeopleWithParents.length; i++) {
    for (let j = 0; j < Object(tempPeopleWithParents[i])["parents"].length; j++) {
      if (person.id === Object(tempPeopleWithParents[i])["parents"][j]) {
        foundImmediateFamily.push(tempPeopleWithParents[i]);

      }
    }
  }
  return foundImmediateFamily;

}