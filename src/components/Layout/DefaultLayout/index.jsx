import { Col, Row } from "antd";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.scss";

function DefaultLayout({ children }) {
  return (
    <Row className="default-layout">
      <Sidebar className="sidebar" />
      <Header className="header" />
      <Col style={{ overflow: "auto" }}>{children}</Col>
    </Row>
  );
}

export default DefaultLayout;
