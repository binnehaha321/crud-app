import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Space, Modal, Button as Btn } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import * as icon from "~/assets/images/ActionIcons";
import { Table, Button } from "~/components";
import request, { get } from "~/utils/request";
import { UPDATE_DEPARTMENT_FAIL } from "~/utils/message";
import { handleDepartmentDataList } from "~/utils/handleList";

function DepartmentList() {
  const formRef = useRef();
  const columns = [
    {
      title: "Department ID",
      dataIndex: "departmentId",
      key: "departmentId",
    },
    {
      title: "Department",
      dataIndex: "departmentName",
      key: "departmentName",
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
          <Button onClick={() => handleGetDepartmentUpdate(id.key)}>
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button onClick={(e) => showDeleteConfirm(e, id.key)}>
            <img src={icon.DELETE} alt="delete" />
          </Button>
        </Space>
      ),
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      key: "",
      departmentId: "",
      departmentName: "",
      description: "",
    },
  ]);

  const [currentDepartmentValues, setCurrentDepartmentValues] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handleCallDepartmentList = async () => {
    setIsLoading(true);
    try {
      const res = await request.get("department/all?pageNumber=1");
      const departments = await res?.data?.data;
      const result = handleDepartmentDataList(await departments);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCallDepartmentList();
  }, []);

  // UPDATE DEPARTMENT
  const [form] = Form.useForm();

  // Reset fields after submit
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentDepartmentValues);
  }, [form, currentDepartmentValues]);

  // get department by id to update
  const handleGetDepartmentUpdate = async (id) => {
    setSelectedId(id);
    setIsLoading(true);
    try {
      const res = await get(`department/${id}`);
      const department = await res?.data;
      setCurrentDepartmentValues({
        key: department?.departmentId,
        departmentId: department?.departmentId,
        departmentName: department?.departmentName,
        description: department?.description,
      });
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // handle update department
  const handleUpdateDepartment = async (values) => {
    setIsLoading(true);
    try {
      const res = await request.put(`department/edit/${selectedId}`, values);
      const result = await res?.data;

      const index = data.findIndex((item) => item.key === selectedId);

      setData([
        ...data.slice(0, index),
        {
          ...data[index],
          key: currentDepartmentValues.key,
          departmentId:
            values.departmentId || currentDepartmentValues.departmentId,
          departmentName:
            values.departmentName || currentDepartmentValues.departmentName,
          description:
            values.description || currentDepartmentValues.description,
        },
        ...data.slice(index + 1),
      ]);

      toast.success(await result?.message);
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      toast.error(UPDATE_DEPARTMENT_FAIL);
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  // DELETE USER
  const handleDelete = (id) => {
    request
      .delete(`users/delete/${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        setData(data.filter((d) => d.userId !== id));
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure to delete this student?",
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
        caption="Department List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      >
        <Link to="./add">
          <Btn type={"primary"}>ADD NEW DEPARTMENT</Btn>
        </Link>
      </Table>

      <Modal
        title="UPDATE A USER"
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
          onFinish={handleUpdateDepartment}
          initialValues={currentDepartmentValues}
          className="update-user"
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="Department ID" name={"departmentId"}>
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Department" name={"departmentName"}>
              <Input />
            </Form.Item>
          </Space>
          <Space style={{ display: "flex" }}>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
}

export default DepartmentList;
