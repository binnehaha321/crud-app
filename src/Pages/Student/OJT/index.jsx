import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Table } from "~/components";
import request from "~/utils/request";

function OJTList() {
  const columns = [
    {
      title: "FPT ID",
      dataIndex: "fptId",
      key: "fptId",
      render: (fptId) => (
        <Typography.Text className="need-uppercase">{fptId}</Typography.Text>
      ),
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName) => (
        <Typography.Text className="need-capitalize">
          {fullName}
        </Typography.Text>
      ),
    },
    {
      title: "Major",
      dataIndex: "majorName",
      key: "majorName",
    },
    {
      title: "No. of Terms",
      dataIndex: "numberOfTerms",
      key: "numberOfTerms",
    },
    {
      title: "BTEC passed",
      dataIndex: "btecPassed",
      key: "btecPassed",
    },
    {
      title: "BTEC studied",
      dataIndex: "btecStudied",
      key: "btecStudied",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getOJTList = async () => {
    setIsLoading(true);
    try {
      const res = await request("student/get/studentJoinOJT");
      setData(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getOJTList();
  }, []);

  return (
    <>
      <Table
        caption="OJT List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      ></Table>
    </>
  );
}

export default OJTList;
