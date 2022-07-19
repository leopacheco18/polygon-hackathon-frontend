import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";

import { Layout } from "antd";
import { useMoralis } from "react-moralis";
import DarkButton from "../../components/global/DarkButton";
import authProtectedRoutes from '../../routes/index'

import DonatyLogoLetter from '../../assets/logo/donaty-white.png'
import DonatyLogoMedium from '../../assets/logo/logo_medium.png'

import "./LayoutOwn.css"

const { Header, Sider, Content } = Layout;
const LayoutOwn = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useMoralis();


  const ListItemLink = ({ to, ...rest }) => {
    return (
      <Route
        path={to}
        children={({ match }) => (
          <li className={match ? "active" : ""}>
            <Link to={to} {...rest} />
          </li>
        )}
      />
    );
  }

  return (
    <Layout >
      <Sider className="sider" onCollapse={(val) => setIsCollapsed(val)} collapsed={isCollapsed} collapsible={true} width="17.5vw">
        <div className="w-70 d-flex justify-center align-center donaty-logos">
          <img className="w-20 donaty-logo-medium" src={DonatyLogoMedium} alt="donaty-logo" />
          <img className="w-40 donaty-logo-letter" src={DonatyLogoLetter} alt="donaty-logo" />
        </div>
        <div>
          {authProtectedRoutes.map((route, index, row) => {
            return (
              <Router>
                <NavLink key={index} to={route.path} className="d-flex justify-center">
                  <div className={`d-flex flex-row route w-80 ${index + 1 === row.length && 'route-border'}`}>
                    <div className="route-logo">
                      {route.icon}
                    </div>
                    <div className="route-title">
                      {route.title}
                    </div>
                  </div>
                </NavLink>
              </Router>
            )
          })}
        </div>
        <div className="d-flex justify-center rights-reserved">
          © 2022 | Web Design MP | All Rights Reserved
        </div>
      </Sider>
      <Layout>
        <Header className="header d-flex">
          Header
          <DarkButton onClick={logout}>Logout</DarkButton>
        </Header>
        <Content>
          <Router>
            <div className="max-height">
            <Routes>
              {authProtectedRoutes.map((route, index, row) => (<Route {...route} key={index} path={route.path} element={route.component} />))}
            </Routes>
            </div>
          </Router>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutOwn;
