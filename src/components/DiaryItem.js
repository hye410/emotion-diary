import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({id,emotion,content,date}) => {

  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${id}`)
  }


  return(
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`]
          .join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `img/emotion${emotion}.png`} />
      </div>
      <div 
        onClick={goDetail}
        className="info_wrapper"
      >
        <div className="diary_date">
          {strDate}
        </div>
        <div className="diary_content_preview">
          {content} 
        </div>
      </div>
      <div className="btn_wrapper">
        <Button 
          text={"수정하기"}
          onClick={goEdit}
        />
      </div>
    </div>
  )
}

export default DiaryItem;