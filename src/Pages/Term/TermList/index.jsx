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
  Button as Btn,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request from "~/utils/request";
import useFetch from "~/hooks/useFetch";
// import "./index.scss";

function TermList() {
  const formRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubjectValues, setCurrentSubjectValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
      key: "subjectCode",
      render: (subjectCode) => <Typography.Text>{subjectCode}</Typography.Text>,
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      render: (subjectName) => <Typography.Text>{subjectName}</Typography.Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <Typography.Text>{description}</Typography.Text>,
    },
    {
      title: "Replace With",
      dataIndex: "replaceWith",
      key: "replaceWith",
      render: (replaceWith) => <Typography.Text>{replaceWith}</Typography.Text>,
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => handleGetSubjectById(id.key)}>
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
      subjectCode: "",
      subjectName: "",
      description: "",
      replaceWith: "",
    },
  ]);

  // GET AMOUNT OF SUBJECT
  //   const { data: amountSubject } = useFetch("subject/totalSubjects");

  // HANDLE SUBJECT LIST
  const handleSubjectDataList = (subjects) => {
    let subjectData = {};
    return subjects?.map((subject) => {
      subjectData = {
        key: subject?.subjectCode,
        subjectCode: subject?.subjectCode,
        subjectName: subject?.subjectName,
        description: subject?.description,
        replaceWith: subject?.replaceWith,
      };
      return subjectData;
    });
  };

  // GET SUBJECT LIST
  const handleCallSubjectList = async (pageNumber = 0) => {
    setIsLoading(true);
    try {
      const res = await request.get(`term/all?pageNumber=${pageNumber}`);
      const subjects = res?.data?.data;
      const result = handleSubjectDataList(subjects);
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
    handleCallSubjectList(currentPage);
    // Get current subject's data by id
    if (formRef.current) form.setFieldsValue(currentSubjectValues);
  }, [form, currentSubjectValues]);

  const handleGetSubjectById = async (id) => {
    try {
      const res = await request.get(
        `subject/filter?pageNumber=0&search=subjectCode:*${id}`
      );
      const subject = res?.data?.data[0];
      setSelectedId(subject?.subjectCode);
      setCurrentSubjectValues({
        key: subject?.subjectCode,
        subjectCode: subject?.subjectCode,
        subjectName: subject?.subjectName,
        description: subject?.description,
        replaceWith: subject?.replaceWith,
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
      const result = handleCallSubjectList(data?.students);
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
        caption="Term List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pageSize={15}
        // total={amountStudent}
        onChange={(pageNumber) => {
          --pageNumber;
          setCurrentPage(pageNumber);
          handleCallSubjectList(pageNumber);
        }}
      >
        <Link to="../term/add" className="ant-btn ant-btn-primary">
          <Btn>ADD NEW TERM</Btn>
        </Link>
      </Table>
      <Modal
        title="UPDATE A SUBJECT"
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
          onFinish={handleUpdateSubject}
          initialValues={currentSubjectValues}
          className="update-subject"
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="Subject Code" name="subjectCode">
              <Input />
            </Form.Item>
            <Form.Item label="Subject Name" name="subjectName">
              <Input />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Replace With" name="replaceWith">
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

export default TermList;
