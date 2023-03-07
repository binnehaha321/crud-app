import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Modal, Space, Form, Typography, Button as Btn } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get } from "~/utils/request";
import { handleMajorDataList } from "~/utils/handleList";

function MajorList() {
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form] = Form.useForm();
  const [currentMajorValues, setCurrentMajorValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "Major ID",
      dataIndex: "majorId",
      key: "majorId",
      render: (majorId) => (
        <Typography.Text className="need-uppercase">{majorId}</Typography.Text>
      ),
    },
    {
      title: "Major Code",
      dataIndex: "majorCode",
      key: "majorCode",
      render: (majorCode) => (
        <Typography.Text className="need-uppercase">
          {majorCode}
        </Typography.Text>
      ),
    },
    {
      title: "Major (EN)",
      dataIndex: "ename",
      key: "ename",
      render: (ename) => (
        <Typography.Text className="need-capitalize">{ename}</Typography.Text>
      ),
    },
    {
      title: "Major (VI)",
      dataIndex: "vname",
      key: "vname",
      render: (vname) => (
        <Typography.Text className="need-capitalize">{vname}</Typography.Text>
      ),
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => handleGetMajorById(id.key)}>
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
      key: 0,
      majorId: "",
      majorCode: "",
      ename: "",
      vname: "",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // get major list
  const handleCallMajorList = async (pageNumber) => {
    setIsLoading(true);
    try {
      const res = await get(`major/all?pageNumber=${pageNumber}`);
      const result = handleMajorDataList(await res?.data);
      setData(result);
      setTotalItems((await res?.pageNumber) * 15);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCallMajorList(currentPage);
  }, [currentPage]);

  // Get current major's data by id
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentMajorValues);
  }, [form, currentMajorValues]);

  const handleGetMajorById = async (id) => {
    setSelectedId(id);
    setIsLoading(true);
    try {
      const { data: res } = await get(`major/${id}`);
      setCurrentMajorValues({
        key: res?.majorId,
        majorId: res?.majorId,
        majorCode: res?.majorCode,
        ename: res?.ename,
        vname: res?.vname,
      });
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // handle update major
  const handleUpdateMajor = async (values) => {
    setIsLoading(true);
    if (values) {
      try {
        const res = await request.put(`major/edit/${selectedId}`, values);
        const data = await res?.data;
        toast.success(await data?.message);
        const result = handleMajorDataList(await data?.data);
        setData(await result);
        handleCloseUpdateModal();
      } catch (error) {
        toast.error(error?.response?.data?.message);
        handleCloseUpdateModal();
      }
    } else {
      setIsLoading(false);
      return;
    }
  };

  // handle close modal update
  const handleCloseUpdateModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsLoading(false);
  };

  // DELETE MAJOR
  const handleDelete = async (id) => {
    try {
      const res = await request.delete(`major/delete/${id}`);
      toast.success(res?.data?.message);

      const newData = data.filter((d) => d.majorId !== id);
      const result = handleMajorDataList(newData);
      setData(result);
    } catch (error) {
      toast.error(error?.data?.message);
      throw new Error(error);
    }
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure to delete this major?",
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
        caption="Major List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(pageNumber) => {
          setCurrentPage(pageNumber);
          handleCallMajorList(pageNumber);
        }}
      >
        <Link to="./add">
          <Btn type="primary">ADD NEW MAJOR</Btn>
        </Link>
      </Table>
      <Modal
        title="UPDATE A MAJOR"
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
          onFinish={handleUpdateMajor}
          initialValues={currentMajorValues}
          className="update-major"
        >
          <Form.Item label="Major ID" name="majorId">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Major Code" name="majorCode">
            <Input className="need-uppercase" />
          </Form.Item>
          <Form.Item label="Major (EN)" name="ename">
            <Input className="need-capitalize" />
          </Form.Item>
          <Form.Item label="Major (VI)" name="vname">
            <Input className="need-capitalize" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default MajorList;
