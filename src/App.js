import { Route } from "react-router-dom";
import { Router, Switch } from "react-router-dom";
import history from "@/utils/history";
import "./App.less";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
