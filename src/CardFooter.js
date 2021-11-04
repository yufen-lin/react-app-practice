const CardFooter = ({ className, todosNum, handleDeleteAllDoneTodo }) => {
  return (
    <div className={className}>
      <p>
        <span>{todosNum}</span> 個待完成項目
      </p>
      <button onClick={handleDeleteAllDoneTodo}>清除已完成項目</button>
    </div>
  );
};

export default CardFooter;
