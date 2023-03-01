import { Divider, Space, Table as TableAnt, Typography } from "antd";
import "./index.scss";

function Table({
  caption,
  icon,
  children,
  columns,
  dataSource,
  loading,
  pageSize,
  total,
  onChange,
  onRow,
}) {
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
        onRow={onRow}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "fit-content" }}
        loading={loading}
        pagination={{ pageSize, total, onChange, showSizeChanger: false }}
      />
    </>
  );
}

export default Table;
