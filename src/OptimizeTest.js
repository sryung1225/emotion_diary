/* 성능 최적화

목표 : 컴포넌트 재사용 하기
- 부모 컴포넌트가 리렌더 될 때 자식도 함께 렌더링되는 기본 설정에서 벗어나
- 특정 렌더링 조건, 업데이트 조건 걸어보기
- 🧨 React.Memo 이해하기
*/

/*
React.Memo
- 고차 컴포넌트 : 함수를 호출해서 매개변수로 컴포넌트를 전달하면, 더 진보된 컴포넌트를 반환
- const A = React.memo(function A(props){...});
- 컴포넌트 A가 똑같은 prop을 받으면 계산하지 않음(리렌더링 하지 않음)
*/

import React, { useState, useEffect } from "react";

// 자식 컴포넌트 Textview, Countview
const Textview = ({ text }) => {
  useEffect(() => {
    console.log(`Update :: Text : ${text}`);
  }) // 리렌더링할 때의 props 확인
  return <div>{text}</div>
}
const Countview = ({ count }) => {
  useEffect(() => {
    console.log(`Update :: Count : ${count}`);
  })
  return <div>{count}</div>
}

// 부모 컴포넌트 OptimizeTest
// button, input 조작 시 state 변화 => 자식 컴포넌트 리렌더링
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  )
};
export default OptimizeTest;