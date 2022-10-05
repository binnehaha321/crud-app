import { Row } from "antd";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.scss";

function DefaultLayout({ children }) {
  return (
    <Row className="default-layout">
      <Sidebar className="sidebar" />
      <Header className="header" />
      {children}
    </Row>
  );
}

export default DefaultLayout;
