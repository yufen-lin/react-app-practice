import { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Weather from "./Weather";
import Todo from "./Todo";
import { Container, ButtonGroup, Button } from "./styledComponent";

const App = () => {
  // 紀錄當前頁面狀態
  const [activePage, setActivePage] = useState("weather");

  // 更改當前頁面
  const switchPage = (page) => {
    setActivePage(page);
  };

  // 判斷目前在哪個 page
  const isActive = (page) => {
    return page === activePage;
  };

  return (
    <Container>
      <BrowserRouter>
        <ButtonGroup>
          <Link to="/">
            <Button
              active={isActive("weather")}
              onClick={() => switchPage("weather")}
            >
              即時天氣預報
            </Button>
          </Link>
          <Link to="/todoapp">
            <Button
              active={isActive("todo")}
              onClick={() => switchPage("todo")}
            >
              待辦清單
            </Button>
          </Link>
        </ButtonGroup>
        <Route path="/" exact component={Weather} />
        <Route path="/todoapp" component={Todo} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
