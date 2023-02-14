import React from "react"
import './App.css';
import MyHeader from './MyHeader'

function App() {
  let name = 'Eve';
  return (
    <React.Fragment>
      <MyHeader />
      <header className="App-header">
        <h2>안녕 리액트 {name}</h2>
      </header>
    </React.Fragment>
    // JSX 규칙 1 : 닫는 태그 꼭 사용하기
    // ❌ <image> ⭕ <image /> (self closing tag)
    // JSX 규칙 2 : 최상위 태그를 사용해서 다른 모든 태그를 꼭 묶어주기 (must have one parent element)
    // 위에서는 최상위 태그 => <div className="App"></div>
    // 만일, 최상위 태그를 사용하고 싶지 않다면 <React.Fragment></React.Fragment> 사용
    // + 리액트 기능이기 때문에 import React from "react";
    // ++ <React.Fragment></React.Fragment> 대신 <></> 도 이용 가능
  );
}

export default App;
