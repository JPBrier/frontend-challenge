import './App.css';
import Home from './screens/Home';
import BookDetails from './screens/BookDetails';
import SearchScreen from './screens/SearchScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}>
            
          </Route>
          <Route path="/bookdetails" component={BookDetails}>
            
          </Route>
          <Route path="/search" component={SearchScreen}>
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
