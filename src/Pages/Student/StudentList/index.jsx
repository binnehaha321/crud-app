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
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request from "~/utils/request";
import "./index.scss";

function StudentList() {
  const formRef = useRef();
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
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Enroll No.",
      dataIndex: "enrollNumber",
      key: "enrollNumber",
    },
    {
      title: "Date Of Admission",
      dataIndex: "dateOfAdmission",
      key: "dateOfAdmission",
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
      gender: "",
      avatar: "",
      phoneNumber: "",
      address: "",
      enrollNumber: "",
      dateOfAdmission: "",
      majorId: "",
      classId: "",
    },
  ]);
  const [currentStudentValues, setCurrentStudentValues] = useState({});

  // GET STUDENTS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleStudentDataList = (students) => {
    let studentData = {};
    return students?.map((student) => {
      studentData = {
        key: student?.studentId,
        studentId: student?.studentId,
        avatar: student?.avatar,
        email: student?.email,
        fullName: student?.fullName,
        gender: student?.gender,
        phoneNumber: student?.phoneNumber,
        enrollNumber: student?.enrollNumber,
        dateOfAdmission: moment(student?.dateOfAdmission).format("YYYY-MM-DD"),
      };
      return studentData;
    });
  };

  const handleCallStudentList = () => {
    request.get("students").then((res) => {
      const students = res?.data?.students;
      const result = handleStudentDataList(students);
      setData(result);
    });
  };

  useEffect(() => {
    handleCallStudentList();
  }, []);

  // UPDATE STUDENT
  const [form] = Form.useForm();

  // Get current student's data by id
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentStudentValues);
    handleCallMajorList();
  }, [form, currentStudentValues]);

  const handleGetStudentById = (id) => {
    setId(id);
    request
      .get(`students?studentId=${id}`)
      .then((res) => {
        const student = res?.data?.students;
        setCurrentStudentValues({
          key: student?.studentId,
          studentId: student?.studentId,
          // avatar: student?.avatar,
          email: student?.email,
          fullName: student?.fullName,
          gender: student?.gender,
          phoneNumber: student?.phoneNumber,
          enrollNumber: student?.enrollNumber,
          dateOfAdmission: moment(student?.dateOfAdmission),
          majorId: student?.majorId,
          classId: student?.classId,
        });
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateStudent = (values) => {
    request
      .put(`students?studentId=${id}`, values)
      .then((res) => {
        const data = res?.data;
        const students = data?.students;
        const result = handleStudentDataList(students);
        setData(result);
        toast.success(data?.message);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // DELETE STUDENT
  const handleDelete = (id) => {
    request
      .delete(`students?studentId=${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        const students = res?.data?.students;
        const result = handleStudentDataList(students);
        setData(result);
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

  // GET MAJOR LIST
  const [majorList, setMajorList] = useState([]);
  const handleCallMajorList = () => {
    request.get("majors").then((res) => {
      setMajorList(res?.data?.majors);
    });
  };

  return (
    <>
      <Table
        caption="Student List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
      >
        <Link to="./add" className="ant-btn ant-btn-primary">
          ADD NEW STUDENT
        </Link>
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
              <Input />
            </Form.Item>
            <Form.Item label="Major" name="majorId">
              <Select allowClear>
                {majorList.map((major) => (
                  <Select.Option key={major.majorId} value={major.majorId}>
                    {major.majorName_EN}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Enroll Number" name="enrollNumber">
              <Input type="number" />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Fullname" name="fullName">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input maxLength={10} />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select allowClear>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date Of Admission" name="dateOfAdmission">
              <DatePicker format={"YYYY-MM-DD"} />
            </Form.Item>
          </Space>
          <Form.Item label="Avatar" valuePropName="fileList" name="avatar">
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default StudentList;
