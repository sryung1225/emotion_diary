import { useState, useContext, useEffect } from "react";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from '../App';

const Home = () => {

  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date()); // 현재시간 저장
  // console.log(curDate);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // getMoth()는 특이하게 0~11로 계산되므로, 우리는 원하는 바를 위해 1씩 더해줘야 함

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 // 이번년도 이번월 1일
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0 // 이번년도 이번월 마지막일 (31/30일 구분 없이 편하게 계산)
      ).getTime();
      // console.log(new Date(firstDay), new Date(lastDay)); // 확인

      // n년 n월 에 해당되는 일기들만 뽑아냄
      setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  }
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  }

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
    </div>
  );
};

export default Home;