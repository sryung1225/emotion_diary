const OddEvenResult = ({ count }) => { // count를 props로 받음
  // console.log(count);
  return <>{count % 2 === 0 ? '짝수' : '홀수'}</>;
  // state와 props를 이용해 동적인 데이터를 계속계속 바꿔가면서 props를 전달해줌
  // Counter의 state가 바뀔 때 마다 (부모의 props가 바뀔 때 마다) 리렌더 하는 것을 볼 수 있다
}

export default OddEvenResult;

// 정리하자면 리액트의 컴포넌트는
// 1. 본인이 관리하고, 본인이 가진 state가 바뀔 때 마다 리렌더가 된다
// 2. 나에게 내려오는 props가 바뀔 때 마다 리렌더가 된다
// 3. 둘 다 아니여도 내 부모가 리렌더 되면 나도 리렌더가 된다