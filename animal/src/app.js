import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnimalForm from "./pages/animalform";
import AnimalList from "./pages/animalList";
/**
 * Renders a specific route using react-router
 */
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AnimalList />
        </Route>
        <Route path="/new">
          <AnimalForm />
        </Route>
        <Route path="/:id/edit">
          <AnimalForm />
        </Route>
      </Switch>
    </Router>
  );
}
