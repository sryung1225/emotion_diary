/* "오늘의 일기" + "일기 리스트"

목표 : React에서 리스트 데이터 추가하기
- 배열을 이용한 React의 List에 아이템을 동적으로 추가해보기
- With React처럼 생각하기
*/

import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';

// DiaryList에 prop으로 임시 데이터 전달해보기 연습
// const dummyList = [
//   {
//     id: 1, // 모든 데이터는 고유한 id를 갖는다
//     author: "이성령",
//     content: "오늘은 몰래 막창을 시켰다. 짜릿했다.",
//     emotion: 5,
//     create_date: new Date().getTime() // 일기를 작성하는 시점을 담은 데이터 : new Date()로 현재시간 표기 후 ms로 변환
//   }, {
//     id: 2,
//     author: "이브",
//     content: "오늘은 카페라떼를 시켰다. 냠",
//     emotion: 4,
//     create_date: new Date().getTime()
//   }, {
//     id: 3,
//     author: "성령",
//     content: "카페모카는 사랑이다",
//     emotion: 5,
//     create_date: new Date().getTime()
//   }, {
//     id: 4,
//     author: "령",
//     content: "리액트 공부.. 망했다",
//     emotion: 2,
//     create_date: new Date().getTime()
//   }
// ]

function App() {
  // DiaryEditor와 Diary가 함께 사용할 일기 데이터 data (state)
  // 일기 상태 변환 함수 setData 도 함께 함
  const [data, setData] = useState([]);
  // [] 빈객체인 이유? 일기가 없는 상태로 시작할거니까

  const dateId = useRef(0);

  // 새로운 일기를 추가하는 함수 onCreate
  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dateId.current
    }
    dateId.current += 1;
    setData([newItem, ...data]);
    // 원래 data에 덧붙여 새로운 데이터(일기)를 추가
    // (새로운 아이템이 상단에 오도록 배치 하기위해 newItem을 먼저 작성함)
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    // targetId를 제외한 일기 리스트만 만들기 위해 filter 사용. setData로 갱신
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} diaryList={data} /> {/* state이기 때문에 data를 바꾸면, diaryList도 변화 */}
    </div>
  );
}

export default App;