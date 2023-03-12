import { useState } from "react";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';

const Home = () => {

  const [curDate, setCurDate] = useState(new Date()); // 현재시간 저장
  console.log(curDate);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // getMoth()는 특이하게 0~11로 계산되므로, 우리는 원하는 바를 위해 1씩 더해줘야 함

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