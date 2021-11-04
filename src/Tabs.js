import { useState } from "react";
import styled from "styled-components";

const TabList = styled.ul`
  display: flex;
  text-align: center;
  font-size: 1.5rem;
  list-style: none;
`;

const Tab = styled.li`
  font-size: 18px;
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
  @media (min-width: 992px) {
    font-size: 1.5rem;
  }
`;

const Tabs = ({ changeTab, isActive }) => {
  return (
    <TabList>
      <Tab
        tab="all"
        active={isActive("all")}
        onClick={() => {
          changeTab("all");
        }}
      >
        全部
      </Tab>
      <Tab
        tab="doing"
        active={isActive("doing")}
        onClick={() => {
          changeTab("doing");
        }}
      >
        待完成
      </Tab>
      <Tab
        tab="done"
        active={isActive("done")}
        onClick={() => {
          changeTab("done");
        }}
      >
        已完成
      </Tab>
    </TabList>
  );
};

export default Tabs;
