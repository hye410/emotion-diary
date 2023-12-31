import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContent } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import Header from "../components/Header";
import Button from "../components/Button";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContent);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = ` 감정일기장 - ${id}번 일기`;
  },[])

  const navigate = useNavigate();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(it => 
        parseInt(it.id) === parseInt(id)
      );

      if(targetDiary) {
        setData(targetDiary);
      } else{
        alert("없는 일기입니다.");
        navigate('/',{ replace : true });
      }
    }
  },[id,diaryList]);

  if(!data) {
    return <div className="DiaryPage">
      로딩 중입니다..
    </div>
  }else {

    const curEmotionData = emotionList.find(
      it => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return(
      <div className="DiaryPage">
        <Header 
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <Button 
              text={"< 뒤로가기"} 
              onClick={() => navigate(-1,{ replace : true })}
            />
          }
          rightChild={
            <Button 
              text={"수정하기"} 
              onClick={() => navigate(`/edit/${data.id}`)}
            />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={[
              "diary_img_wrapper",`diary_img_wrapper_${data.emotion}`]
              .join(" ")
            }
            >
                <img src={curEmotionData.emotion_img} alt={curEmotionData.emotion_descript} />
                <div className="emotion_descript">
                  {curEmotionData.emotion_descript}
                </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default Diary;