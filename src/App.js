import './App.css';
import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {

  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1678617350202, // ms (빠르게 예시 만드는 법 : new Date().getTime() 해서 현재시간 ms로 값 가져와보기)
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1678617350203,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1678617350204,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1678617350205,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1678617350206, // 가장 최신 일기
  },
];

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  // console.log(new Date().getTime()); // 현재시간 ms로 계산

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  }
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE", targetId
    });
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "Edit", data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;