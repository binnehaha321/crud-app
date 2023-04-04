import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, Space, Button as Btn, Form, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get, post } from "~/utils/request";
import {
  handleStudentInClassDataList,
} from "~/utils/handleList";
import AssignStudentClass from "../AssignStudentClass";
import MoveStudentClass from "../MoveStudentClass";

function StudentClassDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
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
      render: (fptId) => (
        <Typography.Text className="need-uppercase">{fptId}</Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button
            onClick={() => handleMoveStudent(id.fptId)}
            title="Move student to another class"
          >
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button
            onClick={() => showDeleteConfirm(id.fptId)}
            title="Remove student from this class"
          >
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const { classCode } = useParams();
  const [form] = Form.useForm();
  const [formMove] = Form.useForm();

  // get students in the class list
  const handleGetStudentsInClass = async (classCode, pageNumber) => {
    setIsLoading(true);
    try {
      const res = await get(
        `studentClass/${classCode}?pageNumber=${pageNumber}`
      );
      const result = handleStudentInClassDataList(await res?.data);
      setData(result);
      setTotalItems(res?.pageNumber * 15);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetStudentsInClass(classCode, currentPage);
  }, [classCode, currentPage]);

  // DELETE STUDENT IN CLASS
  const navigate = useNavigate();
  const handleDelete = async (fptId) => {
    try {
      const res = await request.delete(
        `studentClass/delete/${classCode}/${fptId}`
      );
      toast.success(res?.data?.message);
      const newData = data.filter((d) => d.fptId !== fptId);
      const result = handleStudentInClassDataList(newData);
      if (result.length === 0) {
        navigate("../class");
      }
      setData(result);
    } catch (error) {
      toast.error(error?.data?.message);
      throw new Error(error);
    }
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure to remove this student?",
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
  let { msg, flag } = useSelector((state) => state.studentClass);
  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, [msg, flag]);

  // assign new student to class
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const handleAssignNewStd = async (values) => {
    setIsLoading(true);
    try {
      const res = await post(`studentClass/add`, values);
      // const newData = assignStudentInClassDataList(await res?.data?.classId);
      console.log(res?.data?.classId);
      // console.log([...data, { newData }]);
      // setData([...data, { newData }]);
      toast.success(await res?.message);
      handleCloseAssign();
    } catch (error) {
      if (error?.response?.status === 500)
        toast.error("The student does not exist!");
      toast.error(error?.response?.data?.message);
      handleCloseAssign();
    }
  };

  // handle open assign modal
  const handleOpenAssign = () => {
    setIsOpenAssign(true);
  };

  // handle close assign modal
  const handleCloseAssign = () => {
    if (isOpenAssign) setIsOpenAssign(false);
    form.resetFields();
    setIsLoading(false);
  };

  // move student to another class
  const [isOpenMove, setIsOpenMove] = useState(false);
  const [studentIdMove, setStudentIdMove] = useState(null);
  const handleMoveStudent = (id) => {
    setIsOpenMove(true);
    setStudentIdMove(id);
  };

  // handle close move modal
  const handleCloseMove = () => {
    if (isOpenMove) setIsOpenMove(false);
    form.resetFields();
    setIsLoading(false);
  };

  const handleMoveStd = async (values) => {
    setIsLoading(true);
    try {
      const res = await request.put(
        `studentClass/edit/${studentIdMove}`, // fptId or classCode???
        values
      );
      console.log(res);
      handleCloseMove();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      handleCloseMove();
      throw new Error(error);
    }
  };

  return (
    <>
      <Table
        caption="Student List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
      >
        <Btn type="primary" onClick={handleOpenAssign}>
          ASSIGN NEW STUDENT
        </Btn>
      </Table>

      {/* assign student to class */}
      <AssignStudentClass
        onOk={form.submit}
        onCancel={handleCloseAssign}
        onFinish={handleAssignNewStd}
        form={form}
        initialValues={{ classCode }}
        open={isOpenAssign}
      />

      {/* move student to another class */}
      <MoveStudentClass
        onOk={formMove.submit}
        onCancel={handleCloseMove}
        onFinish={handleMoveStd}
        form={formMove}
        initialValues={{ fptId: studentIdMove }}
        open={isOpenMove}
      />
    </>
  );
}

export default StudentClassDetail;
