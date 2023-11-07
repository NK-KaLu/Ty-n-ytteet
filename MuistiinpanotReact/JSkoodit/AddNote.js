import { useRef } from "react";
import { useHistory } from "react-router-dom";
const AddNote = (props) => {
  const history = useHistory();
  const textRef = useRef("");
  const dateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const items = {
      name: textRef.current.value,
      date: dateRef.current.value,
    };
    props.onAddItems(items);
    textRef.current.value = "";
    dateRef.current.value = "";  
  };
  const cancelHandler = () =>{
    history.push("/");
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Note: </label>
        <textarea required rows="1" id="name" ref={textRef}></textarea>
      </div>
      <br></br>
      <div>
        <label htmlFor="date">Date: </label>
        <input type="date" id="date" ref={dateRef} />
      </div>
      <br></br>
      <button class="bcancel" onClick={cancelHandler}>Cancel</button>
      <button class="bsubmit">Submit</button>
      
    </form>
  );
};
export default AddNote;