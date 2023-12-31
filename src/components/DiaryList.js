import React, { useState } from "react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"

const sortOptionList = [
  { value : "latest", name : "최신순"},
  { value : "oldest", name : "오래된순"}
]

const filterOptionList = [
  { value : "all" , name : "전부 다" },
  { value : "good" , name : "좋은 감정만" },
  { value : "bad" , name : "안 좋은 감정만" },
]

// React.memo : 전달받은 prop이 변하지 않으면, 랜더링되지 않음

const ControlMenu = React.memo(({value,onChange,optionList}) => {
  return(
  <select 
    className="ControlMenu" 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
  >
    {
      optionList.map((it,idx) => 
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      )
    }
  </select>
  )
})


const DiaryList = ({diaryList}) => {

  const navigate = useNavigate();

  const [sortType ,setSortType] = useState('latest');
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {

    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if(sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      }else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList));  // 원본 데이트 복사하기 위해
    const filteredList = filter === 'all' ? copyList : copyList.filter ( it => filterCallBack(it) );
    const sortedList = filteredList.sort(compare);
    return sortedList;
  }



  return(
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu 
          value = {sortType} 
          onChange={setSortType} 
          optionList={sortOptionList} 
        />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Button 
            text={"새 일기쓰기"} 
            type={"positive"} 
            onClick={() => {navigate('/new')}}
          />
        </div>
      </div>
      {
        getProcessedDiaryList().map(it => 
          <DiaryItem key={it.id} {...it}  />
        )
      }
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList : []
}
export default DiaryList ;