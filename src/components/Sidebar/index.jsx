import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, Space, Image, Typography } from "antd";
import {
  AimOutlined,
  AppstoreOutlined,
  BarsOutlined,
  CompassOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  HomeOutlined,
  IdcardOutlined,
  LoginOutlined,
  ReadOutlined,
  TeamOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Heading from "../Heading";
import Button from "../Button";
import * as icon from "~/assets/images/Sidebar";
import { logOut, logOutSuccess } from "~/store/actions/authenAction";
import { cookies } from "~/utils/cookies";
import "./index.scss";

function Sidebar({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const sidebarElements = [
    getItem(<Link to="/">Home</Link>, null, <HomeOutlined />),
    getItem("Facuty", "sub1", <ExpandOutlined />, [
      getItem(<Link to={"/users"}>Users</Link>, "user1", <UserOutlined />),
      getItem(
        <Link to={"/departments"}>Departments</Link>,
        "user2",
        <TeamOutlined />
      ),
      getItem(<Link to={"/roles"}>Roles</Link>, "user3", <AimOutlined />),
    ]),
    getItem("Education", "sub2", <ExperimentOutlined />, [
      getItem(<Link to={"/terms"}>Terms</Link>, "edu1", <DashboardOutlined />),
      getItem(<Link to={"/majors"}>Majors</Link>, "edu2", <BarsOutlined />),
      getItem(
        <Link to={"/programs"}>Programs</Link>,
        "edu3",
        <DatabaseOutlined />
      ),
      getItem(<Link to={"/subjects"}>Subjects</Link>, "edu4", <ReadOutlined />),
      getItem(<Link to={"/class"}>Class</Link>, "edu5", <CompassOutlined />),
    ]),
    getItem("Students", "sub3", <AppstoreOutlined />, [
      getItem(
        <Link to={"/students"}>Student List</Link>,
        "stu1",
        <UnorderedListOutlined />
      ),
      getItem(
        <Link to={"../students/honour"}>Honour</Link>,
        "stu4",
        <TrophyOutlined />
      ),
      getItem(
        <Link to={"../students/ojt"}>OJT</Link>,
        "stu2",
        <IdcardOutlined />
      ),
      getItem(
        <Link to={"../students/fail-subject"}>Fail</Link>,
        "stu3",
        <WarningOutlined />
      ),
    ]),
  ];

  let fullName = "",
    roleId = "";
  if (cookies.get("user_info")) {
    const user = cookies.get("user_info");
    fullName = user?.data?.fullName;
    roleId = user?.data?.roles?.map((role) => role);
  }

  return (
    <Space
      direction="vertical"
      align="center"
      className={`fixed-sidebar ${className}`}
    >
      <Heading level={4} className="heading" />
      <Space direction="vertical" align="center" className="profile">
        <Image src={icon.AVATAR} alt="avatar" className="avatar" />
        <Typography.Title
          level={5}
          style={{ fontWeight: "700" }}
          className="need-capitalize"
        >
          {fullName}
        </Typography.Title>
        <Space direction={"vertical"} align={"center"} className="role">
          {roleId}
        </Space>
      </Space>
      <Menu
        items={sidebarElements}
        style={{ backgroundColor: "transparent", border: "none" }}
        className="menu"
      />
      <Button
        onClick={() => {
          dispatch(logOut());
          dispatch(logOutSuccess("Log out successfully!"));
          navigate("/sign-in");
        }}
        value="Logout"
        className="logout"
      >
        <LoginOutlined />
      </Button>
    </Space>
  );
}

export default Sidebar;
