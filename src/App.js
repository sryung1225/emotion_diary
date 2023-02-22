/* "오늘의 일기"

목표 : React에서 API 호출하기
- useEffect를 이용하여 컴포넌트 Mount 시점에 API를 호출하고, 해당 API의 결과값을 일기 데이터의 초기값으로 이용하기
- 자바스크립트 API 호출 내장 함수인 "fetch"를 사용
- API의 응답 데이터를 App 컴포넌트가 가지고 있는 일기 데이터 data state에 저장
*/

// https://jsonplaceholder.typicode.com/comments

import { useRef, useState, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  // DiaryEditor와 Diary가 함께 사용할 일기 데이터 data (state)
  // 일기 상태 변환 함수 setData 도 함께 함
  const [data, setData] = useState([]);
  // [] 빈객체인 이유? 일기가 없는 상태로 시작할거니까

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기를 추가하는 함수 onCreate
  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
    // 원래 data에 덧붙여 새로운 데이터(일기)를 추가
    // (새로운 아이템이 상단에 오도록 배치 하기위해 newItem을 먼저 작성함)
  }

  // 작성한 일기를 삭제하는 함수 onRemove
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    // targetId를 제외한 일기 리스트만 만들기 위해 filter 사용. setData로 갱신
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  }

  // 작성한 일기를 수정하는 함수 onEdit
  const onEdit = (targetId, newContent) => {
    setData(
      // 데이터를 순환하면서
      data.map((it) =>
        // 수정 타겟(targetId)을 만나게 되면 콘텐츠를 newContent로 교체
        it.id === targetId ? { ...it, content: newContent } : it
      )
    )
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} /> {/* state이기 때문에 data를 바꾸면, diaryList도 변화 */}
    </div>
  );
}

export default App;