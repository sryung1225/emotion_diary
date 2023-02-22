/* 성능 최적화

목표 : 일기 삭제시, 오늘의 일기 에디터 리렌더링 발생 방어
- DiaryEditor에 React.memo 적용
- DiaryEditor 리렌더링 이유 추적 후 개선
*/

import React, { useRef, useState, useEffect } from "react";

// (3) onCreate 함수를 받는 DiaryEditor도 계속해서 다시 렌더링되는 모양새
// (4) 결론 : onCreate 함수가 재생성되지 않아야 함
const DiaryEditor = ({ onCreate }) => {

  useEffect(() => {
    console.log("DiaryEditor 렌더링!");
  }); // 렌더링 발생 시점 확인

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
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
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
export default React.memo(DiaryEditor);