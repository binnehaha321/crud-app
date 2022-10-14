import { Col, Divider, Space, Table as TableAnt, Typography } from "antd";
import Button from "../Button";
import REFRESH_ICON from "~/assets/images/refresh.svg";
import "./index.scss";

function Table({ caption, icon, children, columns, data, onHandleRefresh }) {
  return (
    <Col>
      <Space
        direction="horizental"
        align="center"
        className="gap-2"
        style={{ paddingBlock: "1rem" }}
      >
        <Space>
          <Typography.Title level={3}>{caption}</Typography.Title>
          <Button
            style={{
              color: "var(--btn-primary)",
              cursor: "pointer",
            }}
            onClick={onHandleRefresh}
          >
            <img src={REFRESH_ICON} alt="refresh" style={{ width: "70%" }} />
          </Button>
        </Space>
        <Space direction="horizental" className="gap-2">
          <img src={icon} alt={icon} />
          {children}
        </Space>
      </Space>
      <Divider style={{ margin: "0" }} />
      <TableAnt columns={columns} dataSource={data} />
    </Col>
  );
}

export default Table;
