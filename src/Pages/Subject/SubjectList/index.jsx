import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Modal, Space, Form, Typography, Button as Btn } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get } from "~/utils/request";
import { handleSubjectDataList } from "~/utils/handleList";
import SearchSubject from "~/components/SearchSubject";

function SubjectList() {
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form] = Form.useForm();
  const [currentSubjectValues, setCurrentSubjectValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
      key: "subjectCode",
      render: (subjectCode) => (
        <Typography.Text className="need-uppercase">
          {subjectCode}
        </Typography.Text>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Replaced",
      dataIndex: "replaceWith",
      key: "replaceWith",
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
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // get subject list
  const handleGetSubjectList = async (pageNumber) => {
    setIsLoading(true);
    try {
      const res = await get(`subject/all?pageNumber=${pageNumber}`);
      const result = handleSubjectDataList(await res?.data);
      setData(result);
      setTotalItems((await res?.pageNumber) * 15);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSubjectList(currentPage);
  }, [currentPage]);

  // Get current subject's data by id
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentSubjectValues);
  }, [form, currentSubjectValues]);

  const handleGetSubjectById = async (id) => {
    setSelectedId(id);
    setIsLoading(true);
    try {
      const { data: res } = await get(
        `subject/filter?pageNumber=1&search=subjectCode:${id}`
      );
      const _sub = await res[0];
      setCurrentSubjectValues({
        key: _sub?.subjectCode,
        subjectCode: _sub?.subjectCode,
        subjectName: _sub?.subjectName,
        description: _sub?.description,
        replaceWith: _sub?.replaceWith,
      });
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // handle update subject
  const handleUpdateSubject = async (values) => {
    setIsLoading(true);
    try {
      const res = await request.put(`subject/edit/${selectedId}`, values);
      const data = await res?.data;
      const result = handleSubjectDataList(data?.data);
      setData(result);
      toast.success(data?.message);
      handleCloseUpdateModal();
      setIsLoading(false);
    } catch (error) {
      handleCloseUpdateModal();
      setIsLoading(false);
    }
  };

  // handle close modal update
  const handleCloseUpdateModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

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
      title: "Are you sure to delete this subject?",
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

  // filter search
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [formFilter] = Form.useForm();

  const handleCloseFilter = () => {
    setIsOpenFilter(false);
    formFilter.resetFields();
  };

  const handleFilter = async (values) => {
    const _subCode = values?.subjectCode;
    const _subName = values?.subjectName;
    if (values) {
      try {
        if (
          typeof _subCode !== "undefined" &&
          typeof _subName === "undefined"
        ) {
          setIsLoading(true);
          const res = await get(
            `subject/filter?pageNumber=1&search=subjectCode:${_subCode}`
          );
          const result = handleSubjectDataList(await res?.data);
          setData(result);
        } else if (
          typeof _subCode === "undefined" &&
          typeof _subName !== "undefined"
        ) {
          setIsLoading(true);
          const res = await get(
            `subject/filter?pageNumber=1&search=subjectName:${_subName}`
          );
          const result = handleSubjectDataList(await res?.data);
          setData(result);
        } else if (
          typeof _subCode !== "undefined" &&
          typeof _subName !== "undefined"
        ) {
          setIsLoading(true);
          const res = await get(
            `subject/filter?pageNumber=1&search=subjectCode:${_subCode}&subjectName:${_subName}`
          );
          const result = handleSubjectDataList(await res?.data);
          setData(result);
        } else {
          return;
        }
        handleCloseFilter();
        setIsLoading(false);
      } catch (error) {
        handleCloseFilter();
        setIsLoading(false);
      }
    } else return;
  };

  return (
    <>
      <Table
        caption="Subject List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(pageNumber) => {
          setCurrentPage(pageNumber);
          handleGetSubjectList(pageNumber);
        }}
        onOpenFilter={() => setIsOpenFilter(true)}
      >
        <Link to="./add">
          <Btn type="primary">ADD NEW SUBJECT</Btn>
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
          <Form.Item label="Subject Code" name="subjectCode">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Subject" name="subjectName">
            <Input className="need-uppercase" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Replaced" name="replaceWith">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <SearchSubject
        form={formFilter}
        open={isOpenFilter}
        onOk={formFilter.submit}
        onFinish={handleFilter}
        onCancel={handleCloseFilter}
      />
    </>
  );
}

export default SubjectList;
