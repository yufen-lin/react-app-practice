import { useState } from "react";
import styled from "styled-components";
import Tabs from "./Tabs";
import StyleTodoItem from "./TodoItem";
import {
  EmptyListHint,
  TodoInput,
  TodoCard,
  TodosList,
  StyledTodoItem,
  StyledCardFooter,
} from "./styledComponent";

const Todo = () => {
  // 待辦事項陣列;
  const [todos, setTodos] = useState([
    {
      id: Math.floor(Math.random() * 10000),
      content: "打掃房間",
      isChecked: false,
    },
    {
      id: Math.floor(Math.random() * 10000),
      content: "買雞蛋",
      isChecked: true,
    },
    {
      id: Math.floor(Math.random() * 10000),
      content: "遛狗",
      isChecked: false,
    },
  ]);
  // 欲新增事項
  const [value, setValue] = useState("");
  // 目前頁籤
  const [activeTab, setActiveTab] = useState("all");

  // 新增待辦事項
  const addTodo = (e) => {
    if (e.key === "Enter") {
      // 把要新增的事項放入待辦清單陣列中
      const newTodo = {
        id: Math.floor(Math.random() * 10000),
        content: value,
        isChecked: false,
      };
      setTodos([newTodo, ...todos]);

      // 新增完 todo 後清空 value
      setValue("");
    }
  };

  // 從 input 的 value取得要新增的事項
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // 刪除待辦事項
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 清除所有已完成的事項
  const handleDeleteAllDoneTodo = () => {
    setTodos(todos.filter((todo) => todo.isChecked === false));
  };

  // 修改事項完成狀態
  const handleChecked = (todo) => {
    const updateTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setTodos(updateTodos);
  };

  // 修改清單狀態
  const handleTabChanged = (activeTab) => {
    setActiveTab(activeTab);
  };

  // 根據欲顯示清單狀態過濾 todos
  const filterTodoList = (activeTab) => {
    let filterList = [];
    if (activeTab === "doing") {
      filterList = todos.filter((todo) => todo.isChecked === false);
    } else if (activeTab === "done") {
      filterList = todos.filter((todo) => todo.isChecked === true);
    } else {
      filterList = todos;
    }
    return filterList;
  };

  // 計算目前待完成項目數量
  const computeListNum = () => {
    const list = todos.filter((todo) => todo.isChecked === false);
    return list.length;
  };

  // 判斷當前 tab
  const isActive = (tab) => {
    return tab === activeTab;
  };

  return (
    <div>
      <TodoInput
        type="text"
        placeholder="請輸入待辦事項"
        value={value}
        onChange={handleInputChange}
        onKeyDown={addTodo}
      />
      <TodoCard>
        <Tabs
          activeTab={activeTab}
          changeTab={handleTabChanged}
          isActive={isActive}
        />
        <TodosList>
          {filterTodoList(activeTab).map((todo) => (
            <StyledTodoItem
              key={todo.id}
              todo={todo}
              handleChecked={handleChecked}
              handleDelete={handleDeleteTodo}
            />
          ))}
          <EmptyListHint isEmpty={todos.length === 0}>
            <p>
              未有待辦事項，請由上方輸入
              <br />
              輸入完成後按Enter即可將項目加入清單
            </p>
          </EmptyListHint>
        </TodosList>
        <StyledCardFooter
          todosNum={computeListNum()}
          handleDeleteAllDoneTodo={handleDeleteAllDoneTodo}
        />
      </TodoCard>
    </div>
  );
};

export default Todo;
