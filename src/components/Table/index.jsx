import { Button, Divider, Space, Table as TableAnt, Typography } from "antd";
import "./index.scss";
import { FilterOutlined } from "@ant-design/icons";

function Table({
  caption,
  children,
  columns,
  dataSource,
  loading,
  totalItems,
  currentPage,
  onChange,
  onRow,
  onOpenFilter,
}) {
  const paginationConfig = {
    pageSize: 15,
    current: currentPage,
    total: totalItems,
    showSizeChanger: false,
    onChange: onChange,
    hideOnSinglePage: true,
  };

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
          <Button
            onClick={onOpenFilter}
            type={"text"}
            style={{ color: "#feaf00" }}
          >
            <FilterOutlined style={{ fontSize: "20px" }} />
          </Button>
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
        pagination={paginationConfig}
        // pagination={{ pageSize, total, onChange, showSizeChanger: false }}
      />
    </>
  );
}

export default Table;
