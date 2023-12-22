import './App.css';
import MyNavbar from './components/NavBar';
import MyFooter from './components/footer';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Home />
      <MyFooter />
    </div>
  );
}

export default App;
