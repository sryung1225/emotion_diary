// 컴포넌트 자체를 props 로 전달해보기
// 컴포넌트를 컴포넌트로 감싸서 미관 문제를 해결해보자

const Container = ({ children }) => {
  console.log(children); // ? $$typeof: Symbol(react.element)
  return (
    <div style={{ margin: 20, padding: 20, border: '1px solid gray' }}>
      {children}
    </div>
  )
}

export default Container;