import React from "react";
import { TabList, Tab } from "./styledComponent";

const Tabs = ({ changeTab, isActive }) => (
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

export default Tabs;
