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

// 자식 컴포넌트 CounterA, CounterB
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`); // ? CounterA Update - count: 1
  })
  return <div>{count}</div>
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - obj: ${obj.count}`); // ? CounterB Update - obj: 1
  })
  // B button 클릭마다 콘솔창 출력
  // = prop이 동일한데도 React.memo로 리렌더링이 막아지지 않음
  // 이유는 React.memo가 얕은 비교(객체의 주소 비교)를 기본으로 하기 때문
  return <div>{obj.count}</div>
};
// React.memo 두번째 인자로 넣을 별도 함수 areEqual
const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count; // 깊은 비교 결과 boolean 반환
}
// 얕은 비교가 아닌 다른 비교 동작을 원하는 경우, 두번째 인자로 별도 함수 제공
const MemoizedCounterB = React.memo(CounterB, areEqual);

// 부모 컴포넌트 OptimizeTest
// button 조작 시 state 변화 => 자식 컴포넌트 리렌더링
const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1
  }); // Object Prop

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
        {/* SetCount(count) : 상태 변화를 일으키지만 같은 값으로 */}
        {/* 때문에 자식 컴포넌트에서 React.memo 사용해서 prop 변화만 감지한다면 */}
        {/* 이 버튼을 눌러도 자식 컴포넌트가 리렌더링 할 일은 없을 예정 */}
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() =>
          setObj({
            count: obj.count,
          })
        }>B button</button>
        {/* CounterA와 상황은 같음. 상태 변화는 있지만 같은 값 */}
        {/* 차이점은 객체라는 것 */}
      </div>
    </div>
  )
};
export default OptimizeTest;