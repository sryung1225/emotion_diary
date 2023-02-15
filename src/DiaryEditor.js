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
    author: "이성령",
    content: "새로운 일기입니다",
  });

  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='DiaryEditor'>
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
    </div>
  );
};
export default DiaryEditor;