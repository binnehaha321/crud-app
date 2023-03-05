import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Table } from "~/components";
import request from "~/utils/request";

function FailSubjectList() {
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
      title: "Subject",
      dataIndex: "subjectCode",
      key: "subjectCode",
    },
    {
      title: "Term",
      dataIndex: "termCode",
      key: "termCode",
    },
    {
      title: "Program",
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getFailSubjectList = async () => {
    setIsLoading(true);
    try {
      const res = await request("student/get/getFailSubjectList");
      setData(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getFailSubjectList();
  }, []);

  return (
    <Table
      caption="Fail Subjects List"
      columns={columns}
      dataSource={data}
      loading={isLoading}
    />
  );
}

export default FailSubjectList;
