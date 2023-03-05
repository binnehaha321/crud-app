import { useEffect, useRef, useState } from "react";
import {
  Card,
  Divider,
  Skeleton,
  Space,
  Typography,
  Button as Btn,
  Modal,
  Form,
  Input,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import request, { get, post } from "~/utils/request";
import Meta from "antd/lib/card/Meta";
import { ADMIN, TEACHER } from "~/constants/role";
import { toast } from "react-toastify";
import AddNewCardItem from "~/components/AddNewCardItem/AddNewCardItem";

const RoleList = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roles, setRoles] = useState([
    {
      key: 0,
      roleName: "",
      description: "",
    },
  ]);

  const getRoleList = async () => {
    setLoading(true);
    try {
      const res = await request.get("role/all?pageNumber=1");
      const data = await res?.data?.map((role) => {
        return {
          key: role?.roleId,
          roleName: role?.roleName,
          description: role?.description,
        };
      });
      setRoles(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoleList();
  }, []);

  // handle close modal
  const [formAddRole] = Form.useForm();
  const handleCloseModal = () => {
    setIsOpenModal(false);
    formAddRole.resetFields();
  };

  // handle add a new role
  const handleAddRole = async (values) => {
    if (values) {
      if (!values.description) values.description = "No description...";
      try {
        const res = await post("role/add", values);
        setRoles([
          ...roles,
          {
            key: res?.data?.roleId,
            roleName: res?.data?.roleName,
            description: res?.data?.description,
          },
        ]);
        toast.success(await res?.message);
        handleCloseModal();
      } catch (error) {
        console.log(error?.response?.data?.message);
        toast.error(await error?.response?.data?.message);
        throw new Error(error);
      }
    }
  };

  // handle delete a role
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await request.delete(`role/delete/${id}`);
      toast.success(await res?.data?.message);
      const newRoleList = roles.filter((role) => role?.key !== id);
      setRoles(newRoleList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      setLoading(false);
    }
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this role?",
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

  // update role
  const [isOpenUpdateRole, setIsOpenUpdateRole] = useState(false);
  const [formUpdate] = Form.useForm();
  const formUpdateRef = useRef();
  const [currentRoleValues, setCurrentRoleValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Get current role's data by id
  const handleGetRoleUpdate = async (id) => {
    setIsOpenUpdateRole(true);
    setSelectedId(id);
    try {
      const res = await get(`role/${id}`);
      const role = res?.data;
      setCurrentRoleValues({
        key: role?.roleId,
        role: role?.roleName,
        description: role?.description,
      });
      setIsOpenUpdateRole(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // set values to current role's fields
    if (formUpdateRef.current) formUpdate.setFieldsValue(currentRoleValues);
  }, [formUpdate, currentRoleValues]);

  // handle update role
  const handleUpdateRole = async (values) => {
    setLoading(true);
    try {
      const res = await request.put(`role/edit/${selectedId}`, values);
      const data = await res?.data;

      const index = roles.findIndex((item) => item.key === selectedId);

      setRoles([
        ...roles.slice(0, index),
        {
          ...roles[index],
          key: currentRoleValues.key,
          roleName: values.roleName || currentRoleValues.role,
          description: values.description || currentRoleValues.description,
        },
        ...roles.slice(index + 1),
      ]);

      toast.success(data?.message);
      setIsOpenUpdateRole(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      setIsOpenUpdateRole(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ marginBlock: "1rem" }}>
          Role List
        </Typography.Title>
        <Btn type={"primary"} onClick={() => setIsOpenModal(true)}>
          ADD NEW ROLE
        </Btn>
      </Space>
      <Divider style={{ margin: "0" }} />
      <Space wrap>
        {roles?.map((role) => (
          <Card
            loading={loading}
            key={role.key}
            style={{
              width: 300,
              height: "100%",
              marginTop: 16,
              backgroundColor:
                role.roleName === ADMIN
                  ? "#fff2e8"
                  : role.roleName === TEACHER
                  ? "#e6f7ff"
                  : "#EEE",
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined
                key="edit"
                onClick={() => handleGetRoleUpdate(role.key)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => showDeleteConfirm(role.key)}
              />,
            ]}
          >
            <Skeleton loading={loading} active>
              <Meta title={role.roleName} description={role.description} />
            </Skeleton>
          </Card>
        ))}
      </Space>
      {/* add */}
      <AddNewCardItem
        open={isOpenModal}
        onCancel={handleCloseModal}
        onFinish={handleAddRole}
        name="role"
        form={formAddRole}
      />
      {/* update */}
      <Modal
        title="UPDATE A ROLE"
        forceRender
        open={isOpenUpdateRole}
        onOk={formUpdate.submit}
        onCancel={() => setIsOpenUpdateRole(false)}
      >
        <Form
          ref={formUpdateRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") formUpdate.submit();
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          form={formUpdate}
          onFinish={handleUpdateRole}
          initialValues={currentRoleValues}
          className="update-student"
        >
          <Space style={{ display: "flex" }} direction="vertical">
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input a role name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default RoleList;
