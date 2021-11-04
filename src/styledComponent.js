import styled from "styled-components";
import TodoItem from "./TodoItem";
import CardFooter from "./CardFooter";

// App
export const Container = styled.div`
  margin: 1rem auto;
  width: 90%;
  @media (min-width: 768px) {
    max-width: 900px;
  } ;
`;

export const ButtonGroup = styled.div`
  background: #fff;
  margin-top: 4rem;
  margin-bottom: 2rem;
  border-radius: 2.5rem;
`;

export const Button = styled.button`
  width: 50%;
  background: ${(props) => (props.active ? "#2b2b2b" : "#ffffff")};
  color: ${(props) => (props.active ? "#fec753" : "#464646")};
  font-size: 1.125rem;
  padding: 0.75rem;
  border: 0;
  border-radius: 2.5rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Todo
export const EmptyListHint = styled.div`
  display: ${(props) => (props.isEmpty ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

export const TodoInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 1rem;
  font-size: 1.5rem;
  color: #aaaaaa;
  box-sizing: border-box;
  box-shadow: 0 3px 6px #00000029;
  margin-bottom: 1rem;
`;

export const TodoCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  color: #aaaaaa;
  font-size: 18px;
  line-height: 1.5;
  min-height: 500px;
`;

export const TodosList = styled.ul`
  padding: 1rem 0;
`;

export const StyledTodoItem = styled(TodoItem)`
  position: relative;
  padding: 0 1rem;

  button {
    background: 0;
    border: 0;
  }
  button.delete {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 2rem;
  }
  &:hover button.delete {
    opacity: 1;
    cursor: pointer;
  }

  .checkbox {
    position: relative;
    user-select: none;
    width: 100%;
    display: block;
    padding-left: 44px;
    cursor: pointer;

    span {
      display: block;
      width: 90%;
      color: #2b2b2b;
      font-size: 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      line-height: 1.5;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      display: block;
      height: 100%;
      width: 100%;
      margin: 0;
    }
    span::before {
      content: "";
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%) scale(1);
      height: 20px;
      width: 20px;
      border: 1px solid #333;
      border-radius: 5px;
      pointer-events: none;
      transition: 0.3s ease;
    }
    span::after {
      content: "";
      position: absolute;
      left: 14px;
      top: 27%;
      transform: rotate(45deg);
      height: 15px;
      width: 0.5rem;
      border-radius: 1px;
      border-bottom: 3px solid #ffd370;
      border-right: 3px solid #ffd370;
      pointer-events: none;
      opacity: 0;
      transition: 0.3s ease;
    }
    input:checked {
      ~ span {
        color: #9f9a91;
        text-decoration: line-through;
      }
      ~ span::before {
        border-color: transparent;
        transform: translateY(-50%) scale(0);
      }
      ~ span::after {
        opacity: 1;
      }
    }
  }

  @media (min-width: 992px) {
    padding: 0 3rem;
  }
`;

export const StyledCardFooter = styled(CardFooter)`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #2b2b2b;
  padding: 1rem 0;

  button {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    background: #fff;
    border: 1px solid #fec753;
    border-radius: 13px;
    cursor: pointer;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 1.5rem 3rem;

    button {
      font-size: 1.5rem;
      padding: 0.5rem 1.5rem;
    }
  }
`;
