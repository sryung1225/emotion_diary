import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>EDIT</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "sryung" })}>
        QS바꾸기
      </button> {/* 버튼 클릭시 url이 edit?who=sryung */}
      <button onClick={() => navigate("/home")}>
        HOME으로 가기
      </button> {/* Link를 클릭하지 않았을 때도 의도적으로 이동 */}
      <button onClick={() => navigate(-1)}>
        뒤로 가기
      </button> {/* Link를 클릭하지 않았을 때도 의도적으로 이동 */}
    </div>
  )
}

export default Edit;