import { useHistory } from "react-router-dom";
import AddItem from "../components/AddNote";
import "./NotePage.css"
const NotePage = () => {
const history = useHistory();
const addItemsHandler = async (items) => {
  console.log(items);
  const response = await fetch(
    "/*FIREBASE OSOITE*//notes.json",
    {
      method: "POST",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  history.push("/");
};
return (
    <body className="body2">
    <div>
    <h1>Add Note</h1>    
      <section>
        <AddItem onAddItems={addItemsHandler}/>
      </section>
      </div>
    </body>
  );
};
export default NotePage;