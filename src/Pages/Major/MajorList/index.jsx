import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Modal, Space, Form, Typography, Button as Btn } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import * as icon from "~/assets/images/ActionIcons";
import request, { get } from "~/utils/request";
import { useSelector } from "react-redux";

function MajorList() {
  const formRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
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
      render: (majorCode) => <Typography.Text>{majorCode}</Typography.Text>,
    },
    {
      title: "Major Name (EN)",
      dataIndex: "eName",
      key: "eName",
      render: (eName) => (
        <Typography.Text className="need-capitalize">{eName}</Typography.Text>
      ),
    },
    {
      title: "Major Name (VI)",
      dataIndex: "vName",
      key: "vName",
      render: (vName) => (
        <Typography.Text className="need-capitalize">{vName}</Typography.Text>
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
      eName: "",
      vName: "",
    },
  ]);

  // GET MAJOR LIST
  const handleMajorDataList = (majors) => {
    let majorData = {};
    return majors?.map((major) => {
      majorData = {
        key: major?.majorId,
        majorId: major?.majorId,
        majorCode: major?.majorCode,
        eName: major?.ename,
        vName: major?.vname,
      };
      return majorData;
    });
  };

  const handleCallMajorList = async () => {
    setIsLoading(true);
    try {
      const { data: majors } = await get(`major/all?pageNumber=1`);
      const result = handleMajorDataList(majors);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCallMajorList();
  }, []);

  // Get current major's data by id
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentMajorValues);
  }, [form, currentMajorValues]);

  const handleGetMajorById = (id) => {
    setId(id);
    request
      .get(`majors?majorId=${id}`)
      .then((res) => {
        const major = res?.data?.majors;
        setCurrentMajorValues({
          key: major?.majorId,
          majorId: major?.majorId,
          eName: major?.eName,
          vName: major?.vName,
          description: major?.description,
        });
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateMajor = (values) => {
    request
      .put(`majors?majorId=${id}`, values)
      .then((res) => {
        const data = res?.data;
        const majors = data?.majors;
        console.log(data);
        const result = handleMajorDataList(majors);
        setData(result);
        toast.success(data?.message);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // DELETE MAJOR
  const handleDelete = (id) => {
    request
      .delete(`majors?majorId=${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        const majors = res?.data?.majors;
        const result = handleMajorDataList(majors);
        setData(result);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this major?",
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
  let { msg, flag } = useSelector((state) => state.major);
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
        caption="Major List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
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
            <Input className="need-uppercase" />
          </Form.Item>
          <Form.Item label="Major Name (EN)" name="eName">
            <Input className="need-capitalize" />
          </Form.Item>
          <Form.Item label="Major Name (VI)" name="vName">
            <Input className="need-capitalize" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              maxLength="255"
              showCount="true"
              autoSize={{ minRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default MajorList;
