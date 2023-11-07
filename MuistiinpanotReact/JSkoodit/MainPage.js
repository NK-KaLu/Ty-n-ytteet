import { useHistory } from "react-router-dom";
import NoteList from "../components/NoteList";
import "./MainPage.css"
import { useState } from "react";
import { useEffect } from "react";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const history = useHistory();
  const fetchItems = async () => {
    const response = await fetch(
      "/*FIREBASE OSOITE*//notes.json"
    );
    const data = await response.json();
  
    const fetchedItems = [];
  
    for (const key in data) {
      fetchedItems.push({
        id: key,
        name: data[key].name,
        date: data[key].date,
      });
    } 
    setItems(fetchedItems);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const addNew = () => {
    history.push("/addnote");
  }
    return (
      <body className="body"> 
      <div>
      <h1>Notes</h1>    
      <section>
        <NoteList items = {items}/>
      </section>
      <br></br>
      <br></br>
      <button className="b1" onClick={addNew}>Add new note ➕</button>
      </div> 
    </body>
    );
  };
  export default MainPage;