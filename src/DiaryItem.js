import { useState } from 'react';
const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  create_date,
  onRemove
}) => {

  // 현재 수정 중이라면 true, 아니라면 false 라고 값을 보관할 용도로 사용
  const [isEdit, setIsEdit] = useState(false); // isEdit의 기본값이 false
  const toggleIsEdit = () => setIsEdit(!isEdit); // toggleIsEdit이 호출되는 순간 원래 isEdit이 갖고 있던 값을 반전

  const [localContent, setLocalContent] = useState(content);

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
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
          <button>수정 완료</button>
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
export default DiaryItem;