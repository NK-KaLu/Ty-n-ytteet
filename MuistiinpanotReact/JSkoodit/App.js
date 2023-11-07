import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation";
import NotePage from "./pages/NotePage";

const App = () => {

  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/addnote">
          <NotePage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
