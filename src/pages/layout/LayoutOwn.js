import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import HomeUser from "../homeUser/HomeUser";
import { useMoralis } from "react-moralis";
import DarkButton from "../../components/global/DarkButton";
import "./LayoutOwn.css"

const { Header, Sider, Content } = Layout;
const LayoutOwn = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useMoralis();
  return (
    <Layout >
      <Sider className="sider" onCollapse={(val) => setIsCollapsed(val)} collapsed={isCollapsed} collapsible={true} width="17.5vw">Sider</Sider>
      <Layout>
        <Header className="header d-flex">
          Header
          <DarkButton onClick={logout}>Logout</DarkButton>

        </Header>
        <Content>
          <Router>
            <Routes>
              <Route path="/" element={<HomeUser />} />
            </Routes>
          </Router>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutOwn;
