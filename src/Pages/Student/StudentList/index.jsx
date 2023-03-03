import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Image,
  Input,
  Select,
  Modal,
  DatePicker,
  Form,
  Typography,
  Popover,
  Button as Btn,
  Tooltip,
} from "antd";
import { ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get } from "~/utils/request";
import useFetch from "~/hooks/useFetch";
import UploadCSV from "~/components/UploadCSV/UploadCSV";
import StudentDetail from "~/components/StudentDetail";
import "./index.scss";
import FilterSearch from "~/components/FilterSearch/FilterSearch";

function StudentList() {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudentValues, setCurrentStudentValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSearchOpen, setIsFilterSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedId, setSelectedId] = useState("");
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
        <Tooltip
          placement="topLeft"
          title={"Double click on to view student's details"}
          color={"#feaf00"}
        >
          <Typography.Text className="need-capitalize">
            {fullName}
          </Typography.Text>
        </Tooltip>
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
          <Button onClick={(e) => handleGetStudentUpdate(e, id.key)}>
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button onClick={(e) => showDeleteConfirm(e, id.key)}>
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([
    {
      key: "",
      fptId: "",
      email: "",
      fullName: "",
      majorId: "",
      gender: "",
      status: "",
      dob: "",
      isActive: false,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [detailStd, setDetailStd] = useState({});

  // GET AMOUNT OF STUDENT
  const { data: amountStudent } = useFetch("student/totalStudents");

  // HANDLE STUDENT LIST
  const handleStudentDataList = (students) => {
    let studentData = {};
    return students?.map((student) => {
      studentData = {
        key: student?.fptId,
        fptId: student?.fptId,
        fullName: student?.fullName,
        majorId: student?.majorId?.majorCode,
        email: student?.email,
        gender: student?.gender,
        status: student?.status,
        dob: moment(student?.dob).format("DD-MM-YYYY"),
        isActive: student?.isActive,
      };
      return studentData;
    });
  };

  // GET STUDENT LIST
  const handleCallStudentList = async (pageNumber = 0) => {
    setIsLoading(true);
    try {
      const res = await get(`student/all?pageNumber=${pageNumber}`);
      const students = res?.data;
      const result = handleStudentDataList(students);
      setData(result);
      setTotalPages(res?.pageNumber * 15);
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
  }, [currentPage]);

  useEffect(() => {
    // Get current student's data by id
    if (formRef.current) form.setFieldsValue(currentStudentValues);
  }, [form, currentStudentValues]);

  const handleGetStudentUpdate = async (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    try {
      const res = await get(`student/filter?pageNumber=0&search=fptId:${id}`);
      const student = res?.data[0];
      setCurrentStudentValues({
        key: student?.fptId,
        fptId: student?.fptId,
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
  const showDeleteConfirm = (e, id) => {
    e.stopPropagation();
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

  // Detail student
  const handleOpenDetailStudent = (record) => {
    setIsOpen(true);
    setDetailStd(record);
  };

  // Handle filter search
  const [formFilter] = Form.useForm();

  const handleFilterSearch = async (values) => {
    let query = "";
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        // only add non-empty values to the query string
        if (query === "") {
          query += `?${key}:${encodeURIComponent(value)}`;
        } else {
          query += `&${key}:${encodeURIComponent(value)}`;
        }
      }
    }
    setIsLoading(true);
    const res = await get(`student/filter?pageNumber=0&search=${query}`);
    setData(res?.data);
    setTotalPages(res?.pageNumber * 15);
    handleCloseFilter();
    setIsLoading(false);
  };

  const handleCloseFilter = () => {
    setIsFilterSearchOpen(false);
    formFilter.resetFields();
  };

  return (
    <>
      <Table
        caption="Student List"
        onOpenFilter={() => setIsFilterSearchOpen(true)}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(pageNumber) => {
          setCurrentPage(pageNumber);
          handleCallStudentList(pageNumber);
        }}
        onRow={(record) => {
          return {
            onDoubleClick: () => handleOpenDetailStudent(record),
          };
        }}
      >
        <Popover
          content={
            <Space direction="vertical">
              <Link to="../students/add">
                <Btn icon={<UserAddOutlined />} type={"primary"}>
                  ADD NEW STUDENT
                </Btn>
              </Link>
              <UploadCSV />
            </Space>
          }
          trigger="click"
        >
          <Btn>ADD NEW STUDENT</Btn>
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
            <Form.Item label="FPT ID" name="fptId">
              <Input className="need-uppercase" readOnly />
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
              <DatePicker />
              {/* <DatePicker format={"DD-MM-YYYY"} /> */}
            </Form.Item>
          </Space>
        </Form>
      </Modal>

      {/* Student detail */}
      <StudentDetail
        open={isOpen}
        onOk={() => setIsOpen(false)}
        title={detailStd?.fullName}
        fptId={detailStd?.fptId}
        email={detailStd?.email}
        gender={detailStd?.gender}
        majorId={detailStd?.majorId}
        dob={detailStd?.dob}
        status={detailStd.status}
        isActive={detailStd?.isActive}
      />

      {/* Filter search */}
      <FilterSearch
        open={isFilterSearchOpen}
        onOk={formFilter.submit}
        onCancel={handleCloseFilter}
        form={formFilter}
        onFinish={handleFilterSearch}
        onKeyPress={(e) => {
          if (e.key === "Enter") formFilter.submit();
        }}
      />
    </>
  );
}

export default StudentList;
