import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <header className="header">
      <h2>Web Notes</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Notes</Link>
          </li>
          <li>
            <Link to="/addnote">Add Note</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
