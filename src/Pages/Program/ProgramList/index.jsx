import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Image,
  Upload,
  Input,
  Select,
  Modal,
  Form,
  Typography,
  Button as Btn,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request from "~/utils/request";
import useFetch from "~/hooks/useFetch";

function ProgramList() {
  const formRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProgramValues, setCurrentProgramValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const columns = [
    {
      title: "Program ID",
      dataIndex: "programId",
      key: "programId",
      render: (programId) => <Typography.Text>{programId}</Typography.Text>,
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "programName",
      render: (programName) => <Typography.Text>{programName}</Typography.Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <Typography.Text>{description}</Typography.Text>,
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => handleGetProgramById(id.key)}>
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
      programId: "",
      programName: "",
      description: "",
    },
  ]);

  // HANDLE SUBJECT LIST
  const handleProgramDataList = (programs) => {
    let programData = {};
    return programs?.map((program) => {
      programData = {
        key: program?.programId,
        programId: program?.programId,
        programName: program?.programName,
        description: program?.description,
      };
      return programData;
    });
  };

  // GET SUBJECT LIST
  const handleCallProgramList = async (pageNumber = 0) => {
    setIsLoading(true);
    try {
      const res = await request.get(`program/all?pageNumber=${pageNumber}`);
      const programs = res?.data?.data;
      const result = handleProgramDataList(programs);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // UPDATE STUDENT
  const [form] = Form.useForm();

  useEffect(() => {
    handleCallProgramList(currentPage);
  }, []);

  useEffect(() => {
    // Get current subject's data by id
    if (formRef.current) form.setFieldsValue(currentProgramValues);
  }, [form, currentProgramValues]);

  const handleGetProgramById = async (id) => {
    try {
      const res = await request.get(`program/${id}`);
      const program = res?.data?.data;
      setSelectedId(program?.programId);
      setCurrentProgramValues({
        key: program?.programId,
        programId: program?.programId,
        programName: program?.programName,
        description: program?.description,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubject = async (values) => {
    setIsLoading(true);
    try {
      const res = await request.put(`subject/edit/${selectedId}`, values);
      const data = res?.data;
      console.log(data);
      const result = handleCallProgramList(data?.students);
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
    //     request
    //       .delete(`student/delete/${id}`)
    //       .then((res) => {
    //         toast.success(res?.data?.message);
    //         const newStudentList = data.filter((student) => student?.key !== id);
    //         setData(newStudentList);
    //       })
    //       .catch((err) => {
    //         toast.error(err?.data?.message);
    //       });
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    //     Modal.confirm({
    //       title: "Are you sure delete this student?",
    //       icon: <ExclamationCircleOutlined />,
    //       content: "Click No to cancel.",
    //       okText: "Yes",
    //       okType: "danger",
    //       cancelText: "No",
    //       onOk() {
    //         handleDelete(id);
    //       },
    //     });
  };

  return (
    <>
      <Table
        caption="Program List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pageSize={15}
        // total={amountStudent}
        onChange={(pageNumber) => {
          --pageNumber;
          setCurrentPage(pageNumber);
          handleCallProgramList(pageNumber);
        }}
      >
        <Link to="../subject/add" className="ant-btn ant-btn-primary">
          <Btn>ADD NEW SUBJECT</Btn>
        </Link>
      </Table>
      <Modal
        title="UPDATE A SUBJECT"
        forceRender
        open={isModalOpen}
        onOk={() => {
          form.submit();
          setIsModalOpen(false);
        }}
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
          onFinish={handleUpdateSubject}
          initialValues={currentProgramValues}
          className="update-subject"
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="Program ID" name="programId">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Program Name" name="programName">
              <Input />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Description" name="description">
              <Input />
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

export default ProgramList;
