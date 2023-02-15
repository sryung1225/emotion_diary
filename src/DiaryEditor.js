/* "오늘의 일기" 만들기

목표 : 다양한 사용자 입력 처리하기
- 한 줄 입력 처리하기 : input
- 여러 줄 입력 처리하기 : textarea
- 선택 박스 입력 처리하기
- 사용자 입력 데이터 핸들링하기
*/

import { useState } from "react";

const DiaryEditor = () => {

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {
    console.log(state); // 저장된 state 확인
    alert("저장 성공!");
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;