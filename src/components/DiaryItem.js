import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`./diary/${id}`)
  }

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div
        className="info_wrapper"
        onClick={goDetail}
      >
        <p className="diary_date">{strDate}</p>
        <p className="diary_content_preview">{content.slice(0, 25)}</p>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={() => navigate('./edit')} />
      </div>
    </div>
  )
};

export default DiaryItem;