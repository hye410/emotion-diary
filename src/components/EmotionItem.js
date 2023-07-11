const EmotionItems = ({
  emotion_id,
  emotion_descript,
  emotion_img,
  onClick,
  isSelected
}) => {
  return(
    <div 
      className={
        ["EmotionItems",
        isSelected ? 
        `EmotionItem_on_${emotion_id}` 
        : 'EmotionItem_off'].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItems;