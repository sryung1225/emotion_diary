import React, { useState } from 'react';
import OddEvenResult from './OddEvenResult';

const Counter = ({ initialValue }) => {
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
      {/* 자식 컴포넌트에게 정적인 데이터 뿐만 아니라 동적인 데이터도 전달할 수 있다 */}
      {/* 리액트에서 동적인 데이터 중 대장은 바로 state */}
      {/* 자식 컴포넌트 OddEvenResult 에게 count를 전달해보자 */}
      <OddEvenResult count={count} />
    </div>
  );
};

Counter.defaultProps = {
  initialValue: 0
}

export default Counter;