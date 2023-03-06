const MyButton = ({ text, type, onClick }) => {

  // positive, negative 외의 type이 들어오면 default로 변환 : 이상한 버튼이 안생기도록
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}>
      {text}
    </button>
  )
}

MyButton.defaultProps = {
  type: "default",

}

export default MyButton;