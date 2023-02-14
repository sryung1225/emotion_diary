import './App.css';

import MyHeader from './MyHeader';
import Counter from "./Counter";

function App() {
  const number = 5;
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    initialValue: 5,
  };
  return (
    <div>
      <MyHeader />
      {/* <Counter initialValue={5} a={1} b={2} c={3} /> */}
      {/* prop (property) */}
      {/* 부모 컴포넌트(App)에서 자식 컴포넌트(Counter)한테 어떤 값을 이름을 붙여서 전달하는 방식 */}
      {/* 전달되는 데이터들이 복수면 props */}
      <Counter {...counterProps} />
      {/* props를 변수로 지정하고 스프레드 연산자를 이용해 가져와 적용도 가능 */}
    </div>
  );
}

export default App;


