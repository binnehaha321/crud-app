import { Divider, Space, Table as TableAnt, Typography } from "antd";
import "./index.scss";

function Table({ caption, icon, children, columns, dataSource }) {
  return (
    <>
      <Space
        direction="horizental"
        align="center"
        className="gap-2"
        style={{ paddingBlock: "1rem" }}
      >
        <Space>
          <Typography.Title level={3}>{caption}</Typography.Title>
        </Space>
        <Space direction="horizental" className="gap-2">
          <img src={icon} alt={icon} />
          {children}
        </Space>
      </Space>
      <Divider style={{ margin: "0" }} />
      <TableAnt
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "fit-content" }}
      />
    </>
  );
}

export default Table;
