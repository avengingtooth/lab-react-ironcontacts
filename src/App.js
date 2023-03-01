// src/App.js
import { useState } from 'react';
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  let values = []
  for (let i = 0; i < contactsData.length; i++){
    if (i < 5 || i >= 10){
      values.push(i)
    }
  }
  const [unusedContacts, setUnused] = useState(values)
  const [contacts, setContact] = useState(contactsData.slice(5, 10))
  
  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={() => {
          if (unusedContacts.length > 0){
            let ind = Math.round(Math.random() * (unusedContacts.length - 1))
            let newCeleb = contactsData[unusedContacts[ind]]
            setContact([newCeleb, ...contacts])
            setUnused([...unusedContacts.slice(0, ind), ...unusedContacts.slice(ind + 1)])
          }
      }}>Add Random Contact</button>

      <button onClick={() => {
        setContact([...contacts.sort((a, b) => { return a.name.localeCompare(b.name)})])
      }}>Sort by name</button>
      <button onClick={() => {
        setContact([...contacts.sort((a, b) => { return b.popularity - a.popularity})])
      }}>Sort by popularity</button>
      {
        <table>
          <thead>
            <tr><th>Profile</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>wonOscar</th>
              <th>wonEmmy</th>
              <th>Actions</th></tr>
          </thead>
          <tbody>
            {console.log(unusedContacts)}
            {
              contacts.map((curContact) => {
                return(
                  <tr key={curContact.id}>
                    <td>
                      <img src={curContact.pictureUrl} alt="pfp"/>
                    </td>
                    <td>
                      <p>{curContact.name}</p>
                    </td>
                    <td>
                      <p>{Math.round(curContact.popularity * 100)/100}</p>
                    </td>
                    <td>
                      <p>{curContact.wonOscar ? "🏆": ""}</p>
                    </td>
                    <td>
                      <p>{curContact.wonEmmy ? "🏆": ""}</p>
                    </td>
                    <td>
                      <button onClick={() => {
                        setContact(contacts.filter((contact) => contact.id !== curContact.id))
                        setUnused([...unusedContacts, contactsData.indexOf(curContact)])
                      }}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  );
}
export default App;