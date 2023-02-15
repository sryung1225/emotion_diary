/* "오늘의 일기" 만들기

목표 : 다양한 사용자 입력 처리하기
- 한 줄 입력 처리하기 : input
- 여러 줄 입력 처리하기 : textarea
- 선택 박스 입력 처리하기
- 사용자 입력 데이터 핸들링하기
*/

import { useState } from "react";

const DiaryEditor = () => {

  const [author, setAuthor] = useState("이성령");
  const [content, setContent] = useState("새로운 일기입니다");

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={author}
          onChange={(e) => {
            // console.log(e.target.value);
            // console.log(e.target.name); // ? author
            setAuthor(e.target.value);
          }} />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default DiaryEditor;