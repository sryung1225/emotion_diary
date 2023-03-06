import { useSearchParams } from "react-router-dom";

const Edit = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "sryung" })}>
        QS바꾸기
      </button> {/* 버튼 클릭시 url이 edit?who=sryung */}
    </div>
  );
};

export default Edit;