import { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const create_date = new Date().getDate();
      const newitem = {
        ...action.data,
        create_date
      }
      return [newitem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) =>
        it.id === action.targetId
          ? { ...it, content: action.newContent }
          : it
      );
    }
    default:
      return state;
  }
}

const App = () => {
  // 리팩토링) useState 대신에 useReducer 사용
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: 'INIT', data: initData })
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기를 추가하는 함수 onCreate
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    })
    dataId.current += 1;
  }, []);

  // 작성한 일기를 삭제하는 함수 onRemove
  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId })
  }, []);

  // 작성한 일기를 수정하는 함수 onEdit
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent })
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