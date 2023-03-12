import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" }
]

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>{it.name}</option>
      ))}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {

  const [sortType, setSortType] = useState("latest");

  const getProcessedDiaryList = () => {

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }; // 비교함수

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 원본이 파괴되지 않도록 깊은 복사 (배열=>문자열=>배열)
    const sortedList = copyList.sort(compare);
    return sortedList;
  }

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content}
        </div>
      ))}
    </div>
  )
}


DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;