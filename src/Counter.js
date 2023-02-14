import React, { useState } from 'react';

// const Counter = (props) => {
//   console.log(props); // 부모 컴포넌트(App)으로 받은 값인 props 확인
//   const [count, setCount] = useState(props.initialValue); // 점 표기법으로 props 가져옴

const Counter = ({ initialValue }) => { // 비구조화 할당을 통해 props 라는 객체에서 특정 값만 받는 것도 가능
  console.log(initialValue);
  const [count, setCount] = useState(initialValue);
  const onIncrease = () => {
    setCount(count + 1);
  };
  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

// 만일 부모 컴포넌트에서 initialValue를 실수로 깜빡하고 내려주지 않은 경우를 방어 하기 위해
// 자식 컴포넌트에서도 기본값을 지정해줄 수 있다
Counter.defaultProps = {
  initialValue: 0
}

export default Counter;