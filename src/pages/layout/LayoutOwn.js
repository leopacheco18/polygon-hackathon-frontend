import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Dropdown, Layout, Menu } from "antd";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import authProtectedRoutes from "../../routes/index";

import DonatyLogoLetter from "../../assets/logo/donaty-white.png";
import DonatyLogoMedium from "../../assets/logo/logo_medium.png";

import "./LayoutOwn.css";
import ModalFoundation from "../../components/layout/ModalFoundation";
import { DownOutlined, UserOutlined, LogoutOutlined, DownloadOutlined } from "@ant-design/icons";
import appMobileAndroid from '../../assets/apk/Donaty.apk';

const { Header, Sider, Content } = Layout;
const LayoutOwn = () => {
  const isMobile = () => window.matchMedia("(max-width: 800px)").matches;
  const [isCollapsed, setIsCollapsed] = useState(isMobile());
  const { logout, user } = useMoralis();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const validateOption = (e) => {
    if (e.key === "logout") {
      navigate("/");
      logout();
    }

    if (e.key === "profile") {
      navigate("/profile");
    }
  };

  const menu = (
    <Menu
      onClick={validateOption}
      className="menu-own"
      items={[
        {
          label: "Profile",
          key: "profile",
          icon: <UserOutlined />,
        },
        {
          label: "LogOut",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.get("ethAddress"));
    toast.success("Copy wallet to clipboard");
  };

  return (
    <Layout>
      <Sider
        className="sider"
        onCollapse={(val) => setIsCollapsed(val)}
        collapsed={isCollapsed}
        collapsible={true}
        width={isMobile() ? "80vw" : "17.5vw"}
      >
        <div
          className={`d-flex justify-center align-center donaty-logos ${
            isCollapsed ? "w-100" : "w-70"
          }`}
        >
          <img
            className={`donaty-logo-medium ${isCollapsed ? "w-50" : "w-20"}`}
            src={DonatyLogoMedium}
            alt="donaty-logo"
          />
          {!isCollapsed && (
            <img
              className="w-40 donaty-logo-letter"
              src={DonatyLogoLetter}
              alt="donaty-logo"
            />
          )}
        </div>
        <div>
          {authProtectedRoutes.map((route, index, row) => {
            return (
              route.isAvailableInMenu && (
                <Link
                  key={index}
                  to={route.path}
                  className="d-flex justify-center"
                >
                  <div
                    className={`d-flex flex-row route w-80 ${
                      isActive(route.path) ? "route-active" : ""
                    }  ${isCollapsed ? "route-logo-small" : ""}`}
                  >
                    <div className="route-logo">{route.icon}</div>
                    {!isCollapsed && (
                      <div className="route-title">{route.title}</div>
                    )}
                  </div>
                </Link>
              )
            );
          })}
          {isMobile() && (
            <>
              <div className="d-flex justify-center">
                <div
                  className={`d-flex flex-row route w-80 ${
                    isCollapsed
                      ? "route-logo-small route-logo-small-center"
                      : ""
                  }`}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <div className="route-logo">
                    <UserOutlined />
                  </div>
                  {!isCollapsed && <div className="route-title">Profile</div>}
                </div>
              </div>
              <div className="d-flex justify-center">
                <div
                  className={`d-flex flex-row route w-80 ${
                    isCollapsed
                      ? "route-logo-small route-logo-small-center"
                      : ""
                  }`}
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                >
                  <div className="route-logo">
                    <LogoutOutlined />
                  </div>
                  {!isCollapsed && <div className="route-title">Logout</div>}
                </div>
              </div>
            </>
          )}
          <ModalFoundation isCollapsed={isCollapsed} />
          <a
                  href={appMobileAndroid}
                  className="d-flex justify-center"
                  target="_blank" download rel="noreferrer"
                >
                  <div
                    className={`d-flex flex-row route w-80  ${isCollapsed ? "route-logo-small" : ""}`}
                  >
                    <div className="route-logo"><DownloadOutlined /></div>
                    {!isCollapsed && (
                      <div className="route-title">Download our app for Android</div>
                    )}
                  </div>
                </a>
                <br />
        </div>
        {!isCollapsed && (
          <div className="d-flex justify-center rights-reserved">
            © 2022 | Web Design Donaty | All Rights Reserved
          </div>
        )}
      </Sider>
      <Layout>
        {!isMobile() && (
          <Header className="header d-flex align-center justify-end">
            <Dropdown.Button
              className="dark-dropdown"
              onClick={copyToClipboard}
              overlay={menu}
              icon={<DownOutlined />}
            >
              <div className="d-flex align-center">
                <div className="logo-header donaty-logo-header">
                  <img src={DonatyLogoMedium} alt="logo-medium" />
                </div>
                <div className="wallet-header">
                  {getEllipsisTxt(user.get("ethAddress"), 4)}
                </div>
              </div>
            </Dropdown.Button>
          </Header>
        )}
        <Content>
          <div className="max-height">
            <Routes>
              {authProtectedRoutes.map((route, index, row) => (
                <Route
                  {...route}
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutOwn;
