/* "일기 리스트" 만들기

목표 : React에서 리스트 렌더링 하기
- 배열을 이용하여 React에서 LIST를 렌더링 해보고 개별적인 컴포넌트로 만들어보기
*/

import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ diaryList, onRemove, onEdit }) => {
  console.log(diaryList); // ? (4) [{...}, {...}, {...}, {...}]
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
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