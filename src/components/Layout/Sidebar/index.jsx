import { Link, useNavigate } from "react-router-dom";
import { Menu, Space, Image, Typography } from "antd";
import Heading from "../Heading";
import Button from "../Button";
import * as icon from "~/assets/images/Sidebar";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";

function Sidebar({ className }) {
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
      label: <Link to="/course">Course</Link>,
      key: "course",
      icon: <img src={icon.COURSE} alt="course" />,
    },
    {
      label: <Link to="/students">Students</Link>,
      key: "students",
      icon: <img src={icon.STUDENTS} alt="students" />,
    },
    {
      label: <Link to="/payment">Payment</Link>,
      key: "payment",
      icon: <img src={icon.PAYMENT} alt="payment" />,
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

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/sign-in");
  };

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
          Khanh Truong
        </Typography.Title>
        <span className="role">Admin</span>
      </Space>
      <Menu
        items={sidebarElements}
        style={{ backgroundColor: "transparent" }}
        className="menu"
      />
      <Button onClick={handleLogout} value="Logout" className="logout">
        <img src={icon.LOGOUT} alt="logout" />
      </Button>
    </Space>
  );
}

export default Sidebar;
