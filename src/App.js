import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// DiaryList에 prop으로 임시 데이터 전달해보기 연습
const dummyList = [
  {
    id: 1, // 모든 데이터는 고유한 id를 갖는다
    author: "이성령",
    content: "오늘은 몰래 막창을 시켰다. 짜릿했다.",
    emotion: 5,
    create_date: new Date().getTime() // 일기를 작성하는 시점을 담은 데이터 : new Date()로 현재시간 표기 후 ms로 변환
  }, {
    id: 2,
    author: "이브",
    content: "오늘은 카페라떼를 시켰다. 냠",
    emotion: 4,
    create_date: new Date().getTime()
  }, {
    id: 3,
    author: "성령",
    content: "카페모카는 사랑이다",
    emotion: 5,
    create_date: new Date().getTime()
  }, {
    id: 4,
    author: "령",
    content: "리액트 공부.. 망했다",
    emotion: 2,
    create_date: new Date().getTime()
  }
]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;