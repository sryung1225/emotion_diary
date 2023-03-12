import style from "./DiaryList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from './MyButton';

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" }
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className={`${style.ControlMenu}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>{it.name}</option>
      ))}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }; // 비교함수

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else if (filter === "bad") {
        return parseInt(item.emotion) > 3;
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 원본이 파괴되지 않도록 깊은 복사 (배열=>문자열=>배열)

    const filteredList = (filter === "all") ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className={`${style.DiaryList}`} >

      <div className={`${style.menu_wrapper}`}>
        <div className={`${style.left_col}`}>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className={`${style.right_col}`}>
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate('./new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div >
  )
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;