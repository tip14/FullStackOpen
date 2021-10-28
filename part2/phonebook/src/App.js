import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    personService.getAll()
      .then(persons => setPersons(persons));
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const alreadySavedPerson = persons.find(p => p.name === newName);
    if (alreadySavedPerson) {
      const updateConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (updateConfirmed) {
        const updatedPerson = { ...alreadySavedPerson, number: newNumber };
        personService
          .update(updatedPerson)
          .then(updatedPerson => {
            const withUpdated = persons.map(p => {
              if (p.id === updatedPerson.id) {
                p.name = updatedPerson.name;
                p.number = updatedPerson.number;
              }

              return p;
            })
            setPersons(withUpdated);
            setDisposableNotification({ message: `Updated ${updatedPerson.name} number`, success: true });
          })
          .catch(error => {
            setDisposableNotification({message: error.response.data.error, success: false})
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.add(newPerson)
        .then((newPersonSaved) => {
          setPersons(persons.concat(newPersonSaved));
          setNewName('');
          setNewNumber('');
          setDisposableNotification({ message: `Added ${newPersonSaved.name}`, success: true });
        })
        .catch(error => {
          console.log('kek', error);
          setDisposableNotification({ message: error.response.data.error, success: false })
        })
    }
  }

  const setDisposableNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification({}), 5000);
  }

  const onNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const onNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const onFilterNameChange = (event) => {
    setFilterName(event.target.value);
  }

  const onPersonRemove = (deletedPersonId) => {
    const withoutDeleted = persons.filter(p => p.id !== deletedPersonId);
    setPersons(withoutDeleted);
  }


  const formControls = {
    onNewNameChange: onNewNameChange,
    onNewNumberChange: onNewNumberChange,
    addPerson: addPerson,
    newName: newName,
    newNumber: newNumber
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
      <Filter onFilterNameChange={onFilterNameChange} filterName={filterName} />
      <h3>add a new</h3>
      <PersonForm formControls={formControls} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} onRemove={onPersonRemove} />
    </div>
  )
}

export default App