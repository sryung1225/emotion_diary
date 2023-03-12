import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from './MyButton';

const getStringDate = (date) => { // date 객체를 전달 받고
  return date.toISOString().slice(0, 10); // 사용 가능하게 가공한 뒤 YYYY-MM-DD까지만 자름
}

const DiaryEditor = () => {
  const navigate = useNavigate();

  // console.log(getStringDate(new Date()));
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;