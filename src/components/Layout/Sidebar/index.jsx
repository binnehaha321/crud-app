import { Link } from "react-router-dom";
import { Menu, Space, Image, Typography } from "antd";
import Heading from "../Heading";
import Button from "../Button";
import * as icon from "~/assets/images/Sidebar";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logOut } from "~/store/actions/authenAction";

function Sidebar({ className }) {
  const dispatch = useDispatch();
  const sidebarElements = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <img src={icon.HOME} alt="home" />,
    },
    {
      label: <Link to="/users">Users</Link>,
      key: "user",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/majors">Majors</Link>,
      key: "majors",
      icon: <img src={icon.MAJORS} alt="majors" />,
    },
    {
      label: <Link to="/students">Students</Link>,
      key: "students",
      icon: <img src={icon.STUDENTS} alt="students" />,
    },
    {
      label: <Link to="/payments">Payments</Link>,
      key: "payments",
      icon: <img src={icon.PAYMENT} alt="payments" />,
    },
    {
      label: <Link to="/report">Report</Link>,
      key: "report",
      icon: <img src={icon.REPORT} alt="report" />,
    },
    {
      label: <Link to="/settings">Settings</Link>,
      key: "settings",
      icon: <img src={icon.SETTINGS} alt="settings" />,
    },
  ];

  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  return (
    <Space
      direction="vertical"
      align="center"
      className={`fixed-sidebar ${className}`}
    >
      <Heading level={4} className="heading" />
      <Space direction="vertical" align="center" className="profile">
        <Image src={icon.AVATAR} alt="avatar" className="avatar" />
        <Typography.Title level={5} style={{ fontWeight: "700" }}>
          {userInfo.fullName}
        </Typography.Title>
        <span className="role">{userInfo.roleId}</span>
      </Space>
      <Menu
        items={sidebarElements}
        style={{ backgroundColor: "transparent", border: "none" }}
        className="menu"
      />
      <Button
        onClick={() => dispatch(logOut("Log out successfully!"))}
        value="Logout"
        className="logout"
      >
        <img src={icon.LOGOUT} alt="logout" />
      </Button>
    </Space>
  );
}

export default Sidebar;
