/*
목표 : 일기 1개 삭제시, 나머지 일기 리스트 리렌더링 발생 방어
- DiaryItem에 React.memo 적용
- DiaryEditor 리렌더링 이유 추적 후 개선
*/

import React, { useState, useRef, useEffect } from 'react';

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  create_date,
  onRemove,
  onEdit
}) => {

  useEffect(() => {
    console.log(`${id}번째 일기 렌더링`);
  }); // 렌더링 발생 시점 확인

  // 현재 수정 중이라면 true, 아니라면 false 라고 값을 보관할 용도로 사용
  const [isEdit, setIsEdit] = useState(false); // isEdit의 기본값이 false
  const toggleIsEdit = () => setIsEdit(!isEdit); // toggleIsEdit이 호출되는 순간 원래 isEdit이 갖고 있던 값을 반전

  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  }

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정점수 : {emotion} </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span> {/* ms => 인간이 알아볼 수 있는 시간 */}
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);