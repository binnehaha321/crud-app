import { Link } from "react-router-dom";
import { Space, Image } from "antd";
import Button from "~/components/Layout/Button";
import * as icon from "~/assets/images/StudentList";
import Table from "~/components/Layout/Table";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import request from "~/utils/request";
import moment from "moment";
import "./index.scss";

function StudentList() {
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
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
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
      title: "Enroll Number",
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
      render: () => (
        <Space size="middle">
          <Button>
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button>
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([
    {
      key: 0,
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

  const handleStudentDataList = (students) => {
    let studentData = {};
    return students?.map((student) => {
      studentData = {
        key: student?.id,
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
    request.get("students?id=ALL").then((res) => {
      console.log(res);
      const students = res?.data?.students;
      const result = handleStudentDataList(students);
      setData(result);
    });
  };

  useEffect(() => {
    setIsLoaded(false);
    handleCallStudentList();
    setIsLoaded(true);
  }, [isLoaded]);
  return (
    <>
      <ToastContainer />
      <Table
        caption="Student List"
        icon={icon.SORT}
        columns={columns}
        data={data}
      >
        <Link to="./add" className="ant-btn ant-btn-primary">
          ADD NEW STUDENT
        </Link>
      </Table>
    </>
  );
}

export default StudentList;
