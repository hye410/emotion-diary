const Button = ({type, text, onClick}) => {

  const btnType = ['positive','negative'].includes(type) ? type : 'default';

  // type으로 전달되는 prop이 있으면 type 그대로 전달되고, 없으면 default값으로 설정하게함
  
  return(
    <button 
      className={["Button",`Button_${type}`].join(" ")} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  type : "default"
};

export default Button;