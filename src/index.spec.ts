
// Stap 1: maak een interface aan voor `Person` en `Pet`, en zorg ervoor dat de `persons` en `pets` arrays typed zijn

import { persons } from "./data";
import { GetMalePersons, GetPerson, GetFullNames, GetPersonWithCat, TransformPersons, AddPetDetails, updatePerson } from "./functions";

// Stap 2: implementeer de volgende testen door gerbuik te maken van JS Array methodes op een pure manier

it("wat is de naam van persoon met id 3", () => {
  const person = GetPerson(3);
  expect(person?.firstName).toBe("Bob");
});

it("hoeveel mannelijke personen zijn er", () => {
  expect(GetMalePersons()).toBe(2);
});

it("wat zijn de volledige namen van de personen", () => {
  expect(GetFullNames()).toEqual(["John Peeters", "Alice Peeters", "Bob Peeters"]);
});

it("zoek alle personen met een cat als pet", () => {
  expect(GetPersonWithCat()).toEqual([persons[0], persons[2]]);
});

it("transformeer de personen array naar een nieuwe array met properties {id, fullName, age} en sorteer by leeftijd", () => {
  expect(TransformPersons()).toEqual([{ id: 1, fullName: "John Peeters", age: 31 }, { id: 2, fullName: "Alice Peeters", age: 27 }, { id: 3, fullName: "Bob Peeters", age: 22 }]);
});

it("maak een nieuwe array waarbij de persoon de details bevat van de pets", () => {
  expect(AddPetDetails()).toEqual([{ id: 1, fullName: "John Peeters", age: 31, pets: [{ id: 10, name: "Bobby", type: "dog" }, { id: 20, name: "Mimi", type: "cat" }] }, { id: 2, fullName: "Alice Peeters", age: 27, pets: null }, { id: 3, fullName: "Bob Peeters", age: 22, pets: [ { id: 30, name: "Aiko", type: "cat" }]}]);
});

// Stap 3: functions testen

it("implementeer updatePerson (in functions.ts) en wijzig een persoon op een immutable manier", () => {
  const updatedPersonData = {
    firstName: "Updated John",
  };

  const updatedPerson = updatePerson(updatedPersonData, (person) => person.id === 1);

  expect(updatedPerson.firstName).toBe("Updated John");
});

// Stap 4: testen met gebruik te maken van Mocks

class DatetimeService {
  getCurrentTime() {
    return Date.now();
  }
}


it("zorg ervoor dat getCurrentTime altijd dezelfde waarde returned (via een mock)", () => {

  jest.spyOn(Date, 'now').mockReturnValue(1234567890);

  const datetimeService = new DatetimeService();

  const result = datetimeService.getCurrentTime();

  expect(result).toBe(1234567890);

  jest.spyOn(Date, 'now').mockRestore();
});

class GitHubProfileService {
  getUser(username: string): Promise<{ username: string }> {
    throw new Error("Not implemented");
  }
}


it("mock de getUser methode van GitHubProfileService zodat het een gemockte user returned", async () => {
  const mockUser = { username: 'mocked_user' };
  const profileService = new GitHubProfileService();
  jest.spyOn(profileService, 'getUser').mockResolvedValue(mockUser);

  const result = await profileService.getUser('mocker_user');

  expect(result).toEqual(mockUser);

  jest.spyOn(profileService, 'getUser').mockRestore();
});




