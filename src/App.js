/* 성능 최적화

목표 : 연산 결과값 재사용 하기
- 현재 일기 데이터를 분석하는 함수를 제작
- 해당 함수가 일기 데이터의 길이가 변화하지 않을 때에는 값을 다시 계산하지 않도록 하기
- 🧨 Memoization 이해하기
*/

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
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

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 1~5
        create_date: new Date().getTime(),
        id: dataId.current++
      }
    })
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기를 추가하는 함수 onCreate
  // Hook인 useCallback 사용
  // - useMemo는 값을 반환
  // - useCallback은 콜백 함수 반환
  const onCreate = useCallback((author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData(data => [(newItem), ...data]);
    // 원래 data에 덧붙여 새로운 데이터(일기)를 추가
    // (새로운 아이템이 상단에 오도록 배치 하기위해 newItem을 먼저 작성함)
    // 함수형 업데이트 : setData에 함수를 전달함
    // deps를 []로 비워도 항상 최신의 state를 data인자로 가져오도록 도와줌
  }, []);

  // 작성한 일기를 삭제하는 함수 onRemove
  const onRemove = useCallback((targetId) => {
    // targetId를 제외한 일기 리스트만 만들기 위해 filter 사용. setData로 갱신
    setData(data => (data.filter((it) => it.id !== targetId)));
  }, []);

  // 작성한 일기를 수정하는 함수 onEdit
  const onEdit = useCallback((targetId, newContent) => {
    setData(data => (
      // 데이터를 순환하면서
      data.map((it) =>
        // 수정 타겟(targetId)을 만나게 되면 콘텐츠를 newContent로 교체
        it.id === targetId ? { ...it, content: newContent } : it
      )
    ));
  }, []);

  // data state가 갖고 있는 일기들을 분석한 지역 함수 getDiaryAnalysis
  // 일기 리스트 중 일기 수정 시, content만 수정될 뿐 emotion은 영향이 없어 재수행될 필요가 없음(에도 수행되고 있음)
  // => 이를 위해 메모이제이션 이용 : useMemo
  const getDiaryAnalysis = useMemo(
    () => {
      // console.log("일기 분석 시작");
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };
    }, [data.length] // data.length가 변화할 때만 첫번째 인자로 작성된 콜백함수가 수행됨
  ); // getDiaryAnalysis = useMemo(~~) 형태이기에 함수가 아닌 값임
  // 할당이 아닌 선언 (+비구조화 할당)
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} /> {/* state이기 때문에 data를 바꾸면, diaryList도 변화 */}
    </div>
  );
}

export default App;