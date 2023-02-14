import './App.css';
import MyHeader from './MyHeader'

function App() {
  let name = 'Eve';
  return (
    <div className="App">
      <MyHeader />
      <header className="App-header">
        <h2>안녕 리액트 {name}</h2>
      </header>
    </div>
  );
}

export default App;
