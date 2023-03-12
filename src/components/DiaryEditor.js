import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from './MyButton';
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date) => { // date 객체를 전달 받고
  return date.toISOString().slice(0, 10); // 사용 가능하게 가공한 뒤 YYYY-MM-DD까지만 자름
}

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: '최고임'
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: '좋음'
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: '그럭저럭'
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: '나쁨'
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: '끔찍함'
  },
]; // 감정 데이터

const DiaryEditor = () => {
  const navigate = useNavigate();

  // console.log(getStringDate(new Date()));
  const [date, setDate] = useState(getStringDate(new Date()));

  const [emotion, setEmotion] = useState(3);
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  }

  const [content, setContent] = useState("");
  const contentRef = useRef();

  const { onCreate } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    } // 적어도 1자라도 쓰지 않으면 넘어가지 않도록
    onCreate(date, content, emotion); // *작성 순서 유의
    navigate('/', { replace: true }) // 뒤로가기를 통해 일기 작성 페이지로 오지 않도록 옵션 걸어줌
  }

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
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) =>
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion} // 현재 감정 아이템의 emotion_id가 선택된 emotion과 같다면 true 전달
              />
            )}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text={"취소하기"}
              onClick={() => navigate(-1)}
            />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;