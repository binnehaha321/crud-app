import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Image,
  Upload,
  Input,
  Select,
  Modal,
  DatePicker,
  Form,
  Typography,
  Popover,
  Button,
} from "antd";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import { Table } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request from "~/utils/request";
import useFetch from "~/hooks/useFetch";
import "./index.scss";
import UploadCSV from "~/components/UploadCSV/UploadCSV";

function StudentList() {
  const formRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudentValues, setCurrentStudentValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
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
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => handleGetStudentById(id.key)}>
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button onClick={() => showDeleteConfirm(id.key)}>
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([
    {
      key: "",
      studentId: "",
      email: "",
      fullName: "",
      majorId: "",
      gender: "",
      status: "",
      dob: "",
      isActive: false,
    },
  ]);

  // GET AMOUNT OF STUDENT
  const { data: amountStudent } = useFetch("student/totalStudents");

  // HANDLE STUDENT LIST
  const handleStudentDataList = (students) => {
    let studentData = {};
    return students?.map((student) => {
      studentData = {
        key: student?.fptId,
        studentId: student?.fptId,
        fullName: student?.fullName,
        majorId: student?.majorId?.majorCode,
        email: student?.email,
        gender: student?.gender,
        status: student?.status,
        dob: moment(student?.dob + 1).format("DD-MM-YYYY"),
        isActive: student?.isActive,
      };
      return studentData;
    });
  };

  // GET STUDENT LIST
  const handleCallStudentList = async (pageNumber = 0) => {
    setIsLoading(true);
    try {
      const res = await request.get(`student/all?pageNumber=${pageNumber}`);
      const students = res?.data?.data;
      const result = handleStudentDataList(students);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // GET MAJOR LIST
  const { data: majorList } = useFetch("major/filter?pageNumber=0&search");

  // UPDATE STUDENT
  const [form] = Form.useForm();

  useEffect(() => {
    handleCallStudentList(currentPage);
    // Get current student's data by id
    if (formRef.current) form.setFieldsValue(currentStudentValues);
  }, [form, currentStudentValues]);

  const handleGetStudentById = async (id) => {
    try {
      const res = await request.get(
        `student/filter?pageNumber=0&search=fptId:${id}`
      );
      const student = res?.data?.data[0];
      setSelectedId(student?.fptId);
      setCurrentStudentValues({
        key: student?.fptId,
        studentId: student?.fptId,
        personId: student?.personId,
        uogId: student?.uogId,
        fullName: student?.fullName,
        majorId: student?.majorId?.majorId,
        email: student?.email,
        gender: student?.gender,
        status: student?.status,
        dob: moment(student?.dob + 1),
        isActive: student?.isActive,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStudent = async (values) => {
    setIsLoading(true);
    try {
      const res = await request.put(`student/edit/${selectedId}`, values);
      const data = res?.data;
      const result = handleCallStudentList(data?.students);
      setData(result);
      toast.success(data?.message);
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.data?.message);
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  // DELETE STUDENT
  const handleDelete = (id) => {
    request
      .delete(`student/delete/${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        const newStudentList = data.filter((student) => student?.key !== id);
        setData(newStudentList);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this student?",
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

  return (
    <>
      <Table
        caption="Student List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pageSize={15}
        total={amountStudent}
        onChange={(pageNumber) => {
          --pageNumber;
          setCurrentPage(pageNumber);
          handleCallStudentList(pageNumber);
        }}
      >
        <Popover
          content={
            <Space direction="vertical">
              <Link to="../students/add">
                <Button icon={<UserAddOutlined />} type={"text"}>
                  ADD NEW STUDENT
                </Button>
              </Link>
              <UploadCSV />
            </Space>
          }
          trigger="click"
        >
          <Button>ADD NEW STUDENT</Button>
        </Popover>
      </Table>
      <Modal
        title="UPDATE A STUDENT"
        forceRender
        open={isModalOpen}
        onOk={form.submit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          ref={formRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") form.submit();
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          form={form}
          onFinish={handleUpdateStudent}
          initialValues={currentStudentValues}
          className="update-student"
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="Student ID" name="studentId">
              <Input className="need-uppercase" />
            </Form.Item>
            <Form.Item label="Person ID" name="personId">
              <Input />
            </Form.Item>
            <Form.Item label="UOG ID" name="uogId">
              <Input />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Fullname" name="fullName">
              <Input className="need-capitalize" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Major" name="majorId">
              <Select allowClear>
                {majorList?.map((major) => (
                  <Select.Option key={major?.majorId} value={major?.majorId}>
                    {major?.majorCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select allowClear>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="DOB" name="dob">
              <DatePicker format={"DD-MM-YYYY"} />
            </Form.Item>
          </Space>
          {/* <Form.Item label="Avatar" valuePropName="fileList" name="avatar">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}

export default StudentList;
