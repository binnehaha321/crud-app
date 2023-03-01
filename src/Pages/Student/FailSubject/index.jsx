import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Upload,
  Space,
  Modal,
  Image,
  Typography,
  Tag,
  DatePicker,
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import * as icon from "~/assets/images/ActionIcons";
import { Table, Button } from "~/components";
import request from "~/utils/request";

function FailSubjectList() {
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      // render: (img) => <Image src={img} width={65} height={55} />,
      render: () => (
        <Image
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=573"
          alt="avatar"
          width={65}
          height={55}
        />
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      render: (studentId) => (
        <Typography.Text className="need-uppercase">
          {studentId}
        </Typography.Text>
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <a className="need-lowercase" href={`mailto:${email}`}>
          {email}
        </a>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getFailSubjectList = async () => {
    setIsLoading(true);
    const res = await request("student/get/getFailSubjectList");
    setData(res?.data?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getFailSubjectList();
  }, []);

  return (
    <>
      <Table
        caption="Fail Subjects List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
        loading={isLoading}
      ></Table>
    </>
  );
}

export default FailSubjectList;
