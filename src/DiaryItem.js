const DiaryItem = ({ id, author, content, emotion, create_date, onRemove }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author} | 감정점수 : {emotion} </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span> {/* ms => 인간이 알아볼 수 있는 시간 */}
      </div>
      <div className="content">{content}</div>
      <button onClick={() => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
          onRemove(id);
        }
      }}>삭제하기</button>
    </div>
  );
};
export default DiaryItem;