import styled from "styled-components";
import TodoItem from "./TodoItem";
import CardFooter from "./CardFooter";
import "antd/dist/antd.css";

// App
export const Container = styled.div`
  margin: 2rem auto;
  width: 90%;
  @media (min-width: 768px) {
    max-width: 946px;
  } ;
`;

export const ButtonGroup = styled.div`
  background: #fff;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 2.5rem;
  @media (min-width: 768px) {
    margin-bottom: 3rem;
    margin-top: 8rem;
  }
`;

export const Button = styled.button`
  width: 50%;
  background: ${(props) => (props.active ? "#2b2b2b" : "#ffffff")};
  color: ${(props) => (props.active ? "#fec753" : "#464646")};
  font-size: 1.125rem;
  padding: 1rem;
  border: 0;
  border-radius: 2.5rem;
  @media (min-width: 768px) {
    padding: 0.5rem;
    font-size: 1.5rem;
  }
`;

// Weather

export const WeatherCardWrapper = styled.div`
  margin-bottom: 0.5rem;
  max-width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.foregroundColor};
  box-shadow: 0 3px 6px #00000029;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    padding: 3.75rem;
    align-items: stretch;
  }
`;

export const StyledSelect = styled.select`
  display: none;
  display: block;
  width: 200px;
  box-sizing: border-box;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 16px;
  padding: 7px 10px;
  font-size: 36px;
  color: ${({ theme }) => theme.titleColor};
  order: 0;

  option {
    font-size: 24px;
    background-color: #fff;
  }
  @media (min-width: 992px) {
    font-size: 3rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }
`;

export const Description = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  order: 3;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    order: -1;
    margin-bottom: 0;
  }
`;

export const Temperature = styled.div`
  font-size: 8rem;
  color: ${({ theme }) => theme.temperatureColor};
  font-weight: 300;
  display: flex;
  margin: 1rem 0;
  @media (min-width: 768px) {
    font-size: 8rem;
    margin: 2rem 0;
  }
`;

export const Celsius = styled.div`
  font-weight: normal;
  font-size: 3rem;
`;

export const AirFlow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1.5rem;
  padding-left: 1rem;

  svg {
    width: 2rem;
    height: auto;
    margin-right: 2rem;
  }
`;

export const Rain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  padding-left: 1rem;

  svg {
    width: 2rem;
    height: auto;
    margin-right: 2rem;
  }
`;

export const Refresh = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  color: #aaaaaa;

  svg {
    width: 18px;
    height: auto;
    margin-left: 1rem;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
    font-size: 18px;

    svg {
      width: 18px;
    }
  }
`;

// Todo
export const EmptyListHint = styled.div`
  display: ${(props) => (props.isEmpty ? "flex" : "none")};
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 213px;
  line-height: 1.5;
  text-align: center;
  color: #aaaaaa;
  p {
    padding: 0 2rem;
  }
  @media (min-width: 768px) {
    height: 508px;
  }
`;

export const TodoInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 0;
  border-radius: 1rem;
  font-size: 1.125rem;
  box-sizing: border-box;
  box-shadow: 0 3px 6px #00000029;
  margin-bottom: 1rem;
  ::placeholder {
    color: #aaaaaa;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

export const TodoCard = styled.div`
  display: ${(props) => (props.isEmpty ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  color: #aaaaaa;
  font-size: 18px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    min-height: 500px;
  }
`;

export const TabList = styled.ul`
  display: flex;
  text-align: center;
`;

export const Tab = styled.li`
  font-size: 1.125rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 4px solid #f0f0f0;
  color: ${(props) => (props.active ? "#2b2b2b" : "#AAAAAA")};
  border-color: ${(props) => (props.active ? "#2b2b2b" : "#f0f0f0")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  :hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const TodosList = styled.ul`
  padding: 1rem 0;
  flex-grow: 1;
`;

export const StyledTodoItem = styled(TodoItem)`
  position: relative;
  padding: 0 1.125rem;

  .checkbox {
    position: relative;
    display: block;
    padding-left: 2.75rem;
    cursor: pointer;

    .checked-icon {
      position: absolute;
      left: 0rem;
      top: 25%;
      opacity: 0;
      width: 1.5rem;
      height: 1.5rem;
    }

    .checked-icon path {
      stroke: #fec753;
      stroke-width: 4px;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }

    span {
      display: block;
      color: #2b2b2b;
      font-size: 1.125rem;
      padding: 1.125rem 1rem;
      border-bottom: 1px solid #eee;
      line-height: 1.5;
    }

    span::before {
      content: "";
      position: absolute;
      left: 0rem;
      top: 50%;
      transform: translateY(-50%) scale(1);
      height: 1.5rem;
      width: 1.5rem;
      border: 1px solid #333;
      border-radius: 8px;
      pointer-events: none;
    }

    input:checked {
      ~ span {
        color: #aaaaaa;
        text-decoration: line-through;
      }
      ~ span::before {
        border-color: transparent;
        transform: translateY(-50%) scale(0);
      }
      ~ .checked-icon {
        opacity: 1;
      }
    }
  }

  button.delete {
    background: 0;
    border: 0;
    position: absolute;
    opacity: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 1rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  :hover button.delete {
    opacity: 1;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    padding: 0 3rem;

    .checkbox {
      span {
        font-size: 1.5rem;
      }

      span::before {
        height: 2rem;
        width: 2rem;
      }

      .checked-icon {
        width: 2rem;
        height: 2rem;
      }
    }

    button.delete {
      margin-right: 3.75rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const StyledCardFooter = styled(CardFooter)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #2b2b2b;
  padding: 1rem 0;

  p {
    margin: 1rem 0;
  }

  button {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    background: #fff;
    border: 1px solid #fec753;
    border-radius: 13px;
    cursor: pointer;
    margin: 1rem 0;

    &:hover {
      background: #fec753;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 1.5rem 3rem;

    button {
      font-size: 1.5rem;
      padding: 0.5rem 1.5rem;
    }

    .checkbox
  }
`;
