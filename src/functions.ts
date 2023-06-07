import { persons, pets } from "./data";
import { Person, Pet } from "./types";
import  moment from 'moment';

export function GetPerson(id: number): Person | undefined{
    return persons.find(person => person.id === id)
}

export function GetMalePersons(): number | undefined{
    return persons.filter(person => person.sex === 'M').length
}

export function GetFullNames(): string[] {
    return persons.map(person => `${person.firstName} ${person.lastName}`)
  }

export function GetPersonWithCat(): Person[] {
    return persons.filter(person => person.pets?.some(pet => pets.find(p => p.id === pet)?.type === 'cat'))
}

export function TransformPersons(): {id: number, fullName: string, age: number}[] {
    return persons.map(person => ({id: person.id, fullName: `${person.firstName} ${person.lastName}`, age: moment().diff(person.birthday, 'years')}))
}

export function AddPetDetails(): {id: number, fullName: string , age: number, pets: Pet[] | null }[] {
    return persons.map(person => ({id: person.id, fullName: `${person.firstName} ${person.lastName}`, age: moment().diff(person.birthday, 'years'), pets: person.pets?.map(pet => pets.find(p => p.id === pet)!) ?? null}))
}

export function updatePerson(updatedPersonData: Partial<Person>, predicate: (person: Person) => boolean): Person {
    let updatedPerson : Person | undefined;
    const updatedPersons : Person[] = persons.map((person) => {
        if (predicate(person)) {
            
          return { ...person, ...updatedPersonData };
          
        }
        else{
            return person;
        }
        
      });
    
      updatedPerson = updatedPersons.find(predicate);
      if (updatedPerson) {
        return updatedPerson;
      }
    
      throw new Error("Person not found");
}