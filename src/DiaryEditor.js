/* "오늘의 일기" 만들기

목표 : React에서 DOM 조작하기
- 일기 저장 버튼을 클릭했을 때 작성자와 일기가 정상적으로 입력되었는지 확인하고 아니라면 focus 하기
*/

import { useRef, useState } from "react";

const DiaryEditor = () => {

  const authorInput = useRef();
  const contentInput = useRef();
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
    if (state.author.length < 1) {
      // alert("작성자는 최소 1글자 이상 입력해주세요");
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      // alert("일기 본문은 최소 5글자 이상 입력해주세요");
      contentInput.current.focus();
      return;
    }
    console.log(state); // 저장된 state 확인
    alert("저장 성공!");
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
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