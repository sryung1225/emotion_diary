/* "일기 리스트" 만들기

목표 : React에서 리스트 렌더링 하기
- 배열을 이용하여 React에서 LIST를 렌더링 해보고 개별적인 컴포넌트로 만들어보기
*/

const DiaryList = ({ diaryList }) => {
  console.log(diaryList); // ? (4) [{...}, {...}, {...}, {...}]
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          // <div>일기 아이템</div>
          <div>
            <div>작성자 : {it.author}</div>
            <div>일기 : {it.content}</div>
            <div>감정 : {it.emotion}</div>
            <div>작성 시간(ms) : {it.create_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// diaryList에 들어온 데이터가 없는 경우(undefined)
// diaryList.length 에서 오류가 나는 것을 방지해 default props 지정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;