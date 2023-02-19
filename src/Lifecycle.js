// Lifecycle : React 컴포넌트의 생애 주기 (생명 주기)

import React, { useEffect, useState } from "react";

const Lifecycle = () => {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Lifecycle "Mount" 시점에 뭘 하고 싶은 경우?
  // - Deps에 빈배열 전달
  // - 콜백함수에 하고 싶은 일 전달
  useEffect(() => {
    console.log("Mount!");
  }, []);

  // Lifecycle "Update" 시점에 뭘 하고 싶은 경우?
  // - Deps를 전달하지 않음
  // - 콜백함수에 하고 싶은 일 전달
  useEffect(() => {
    console.log("Update!");
  });

  // Deps에 있는 값이 변화하게 되면 그 순간 콜백함수가 실행됨
  // count state가 변화하는 순간 감지 하는 예제
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다 따라서 1로 초기화합니다.");
      setCount(1);
    }
  }, [count]);
  // text state가 변화하는 순간 감지 하는 예제
  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};
export default Lifecycle;