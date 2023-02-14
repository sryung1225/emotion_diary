import React, { useState } from 'react';

const Counter = () => {

  // count의 State : 0에서 시작해서, 1씩 증가하고, 1씩 감소

  // 아래와 같이 작성하고 원리를 정리하자면
  // App 컴포넌트가 Counter 컴포넌트를 호출하고, 반환받은 html을 화면에 표시하는 것이기 때문에
  // Counter 컴포넌트가 return을 계속해서 다시 하는 것
  // 즉, count의 state가 바뀔 때 마다 Counter 라는 함수가 반환(return)을 다시 한다
  // = 화면이 실시간으로 바뀐다 (계속해서 새로 그린다)
  // = Rerender
  // ==> 컴포넌트는 자신이 가진 state(상태)가 변화하면 화면을 다시 그려 리렌더를 한다

  console.log("counter 호출!"); // Counter 함수가 계속해서 호출됨을 확인하게 하는 용도. 버튼 클릭마다 수행됨

  const [count, setCount] = useState(0);
  const onIncrease = () => {
    setCount(count + 1);
  };
  const onDecrease = () => {
    setCount(count - 1);
  };
  // 여러개의 state를 하나의 컴포넌트가 가져도 상관 없음
  const [count2, setCount2] = useState(0);
  const onIncrease2 = () => {
    setCount2(count2 + 1);
  };
  const onDecrease2 = () => {
    setCount2(count2 - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <h2>{count2}</h2>
      <button onClick={onIncrease2}>+</button>
      <button onClick={onDecrease2}>-</button>
    </div>
  );
};

export default Counter;