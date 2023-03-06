import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Modal, Space, Form, Typography, Button as Btn } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get } from "~/utils/request";
import {
  handleStudentInClassDataList,
  handleSubjectDataList,
} from "~/utils/handleList";

function StudentClassDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Class Code",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "FPT ID",
      dataIndex: "fptId",
      key: "fptId",
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => showDeleteConfirm(id.key)}>
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);

  // get students in the class list
  const { classCode } = useParams();
  const handleGetStudentsInClass = async (classCode) => {
    setIsLoading(true);
    try {
      const res = await get(`studentClass/${classCode}`);
      const result = handleStudentInClassDataList(await res?.data);
      setData(result);
      setTotalPages(res?.pageNumber * 15);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetStudentsInClass(classCode);
  }, [classCode]);

  // DELETE SUBJECT
  const handleDelete = async (id) => {
    try {
      const res = await request.delete(`subject/delete/${id}`);
      toast.success(res?.data?.message);
      const newData = data.filter((d) => d.subjectCode !== id);
      const result = handleSubjectDataList(newData);
      setData(result);
    } catch (error) {
      toast.error(error?.data?.message);
      throw new Error(error);
    }
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this subject?",
      icon: <ExclamationCircleOutlined />,
      content: "Click No to cancel.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        handleDelete(id);
      },
    });
  };

  // popup add success
  let { msg, flag } = useSelector((state) => state.subject);
  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, [msg, flag]);

  return (
    <>
      <Table
        caption="Subject List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(pageNumber) => {
          setCurrentPage(pageNumber);
          handleGetStudentsInClass(pageNumber);
        }}
      >
        <Link to="./add">
          <Btn type="primary">ASSIGN NEW STUDENT</Btn>
        </Link>
      </Table>
    </>
  );
}

export default StudentClassDetail;
