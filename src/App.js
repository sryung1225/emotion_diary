import { useReducer } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {

  const reducer = (state, action) => {
    let newState = [];

    // 7-5 기초공사 : 5분
    switch (action.type) {
      case 'INIT': {
        return action.data;
      }
      case 'CREATE': {
        const newItem = { ...action.data };
        newState = [newItem, ...state];
        break;
      }
      case 'REMOVE': {
        newState = state.filter((it) => it.id !== action.target.id);
        break;
      }
      case 'EDIT': {
        newState = state.map((it) => it.id === action.target.id ? {...action.data} : it);
        break;
      }
      default:
        return state;
    }
    return newState;
  }

  const [data, dispatch] = useReducer(reducer, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
