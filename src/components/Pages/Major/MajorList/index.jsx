import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Modal, Space, Spin, Form } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { Table, Button } from "~/components/Layout";
import * as icon from "~/assets/images/ActionIcons";
import request from "~/utils/request";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function MajorList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMajorValues, setCurrentMajorValues] = useState({});
  const columns = [
    {
      title: "Major ID",
      dataIndex: "majorId",
      key: "majorId",
    },
    {
      title: "Major Name (EN)",
      dataIndex: "majorName_EN",
      key: "majorName_EN",
    },
    {
      title: "Major Name (VI)",
      dataIndex: "majorName_VI",
      key: "majorName_VI",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      majorName_EN: "",
      majorName_VI: "",
      description: "",
    },
  ]);

  // GET MAJOR LIST
  const handleMajorDataList = (majors) => {
    let majorData = {};
    return majors?.map((major) => {
      majorData = {
        key: major?.id,
        majorId: major?.majorId,
        majorName_EN: major?.majorName_EN,
        majorName_VI: major?.majorName_VI,
        description: major?.description,
      };
      return majorData;
    });
  };

  const handleCallMajorList = () => {
    request.get("majors?id=ALL").then((res) => {
      const majors = res?.data?.majors;
      const result = handleMajorDataList(majors);
      setData(result);
    });
  };

  useEffect(() => {
    setIsLoaded(false);
    handleCallMajorList();
    setIsLoaded(true);
  }, [isLoaded]);

  // Get current major's data by id
  useEffect(() => {
    form.setFieldsValue(currentMajorValues);
  }, [form, currentMajorValues]);

  const handleGetMajorById = (id) => {
    setId(id);
    request
      .get(`majors?id=${id}`)
      .then((res) => {
        const major = res?.data?.majors;
        setCurrentMajorValues({
          key: major?.id,
          majorId: major?.majorId,
          majorName_EN: major?.majorName_EN,
          majorName_VI: major?.majorName_VI,
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
      .put(`majors?id=${id}`, values)
      .then((res) => {
        const data = res?.data;
        const majors = data?.majors;
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
      .delete(`majors?id=${id}`)
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

  return (
    <>
      {isLoaded ? (
        <>
          <ToastContainer />
          <Table
            caption="Major List"
            icon={icon.SORT}
            columns={columns}
            data={data}
          >
            <Link to="./add" className="ant-btn ant-btn-primary">
              ADD NEW MAJOR
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
                <Input />
              </Form.Item>
              <Form.Item label="Major Name (EN)" name="majorName_EN">
                <Input />
              </Form.Item>
              <Form.Item label="Major Name (VI)" name="majorName_VI">
                <Input />
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
      ) : (
        <Spin />
      )}
    </>
  );
}

export default MajorList;