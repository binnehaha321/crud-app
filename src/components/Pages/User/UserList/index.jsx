import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Select, Upload, Space, Modal, Spin, Image } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "~/components/Layout/Button";
import * as icon from "~/assets/images/StudentList";
import Table from "~/components/Layout/Table";
import request from "~/utils/request";
import roles from "../roleList";
import { toast, ToastContainer } from "react-toastify";
import "./index.scss";

function UserList() {
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
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
    },
    {
      title: "",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => handleGetUserById(id.key)}>
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
      userId: "",
      avatar: "",
      email: "",
      fullName: "",
      username: "",
      gender: "",
      address: "",
      phoneNumber: "",
      roleId: "",
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUserValues, setCurrentUserValues] = useState({});

  // GET USERS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setIsLoaded(false);
    request
      .get("users?id=ALL", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        const users = res?.data?.users;
        let userData = {};
        const result = users.map((user) => {
          userData = {
            key: user.id,
            userId: user.userId,
            avatar: user.avatar,
            email: user.email,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            address: user.address,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
          };
          return userData;
        });
        setData(result);
      });
    setIsLoaded(true);
  }, [isLoaded]);

  // UPDATE USER
  const [form] = Form.useForm();

  // Get current user's data by id
  useEffect(() => {
    form.setFieldsValue(currentUserValues);
  }, [form, currentUserValues]);

  const handleGetUserById = (id) => {
    setId(id);
    request
      .get(`users?id=${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        const user = res?.data?.users;
        setCurrentUserValues({
          key: user?.id,
          userId: user?.userId,
          // avatar: user?.avatar,
          email: user?.email,
          fullName: user?.fullName,
          username: user?.username,
          gender: user?.gender,
          address: user?.address,
          phoneNumber: user?.phoneNumber,
          roleId: user?.roleId,
        });
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (values) => {
    request
      .put(`users?id=${id}`, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const data = res?.data;
        let userData = {};
        const users = data?.users;
        const result = users.map((user) => {
          userData = {
            key: user.id,
            userId: user.userId,
            avatar: user.avatar,
            email: user.email,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            address: user.address,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
          };
          return userData;
        });
        setData(result);
        toast.success(data?.message);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  // DELETE USER
  const handleDelete = (id) => {
    request
      .delete(`users?id=${id}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        const users = res?.data?.users;
        let userData = {};
        const result = users.map((user) => {
          userData = {
            key: user.id,
            userId: user.userId,
            avatar: user.avatar,
            email: user.email,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            address: user.address,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
          };
          return userData;
        });
        setData(result);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this user?",
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
            caption="User List"
            icon={icon.SORT}
            columns={columns}
            data={data}
          >
            <Link to="./add" className="ant-btn ant-btn-primary">
              ADD NEW USER
            </Link>
          </Table>
          <Modal
            title="UPDATE A USER"
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
              onFinish={handleUpdateUser}
              initialValues={currentUserValues}
              className="update-user"
            >
              <Space style={{ display: "flex" }}>
                <Form.Item label="User ID" name="userId">
                  <Input />
                </Form.Item>
                <Form.Item label="Role" name="roleId">
                  <Select allowClear>
                    {roles?.map((role, index) => (
                      <Select.Option value={role.value} key={index}>
                        {role.label}
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
              </Space>
              <Space style={{ display: "flex" }}>
                <Form.Item label="Fullname" name="fullName">
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input type="email" />
                </Form.Item>
              </Space>
              <Space style={{ display: "flex" }}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Username" name="username">
                  <Input />
                </Form.Item>
              </Space>
              <Form.Item label="Address" name="address">
                <Input.TextArea
                  maxLength="255"
                  showCount="true"
                  autoSize={{ minRows: 5 }}
                />
              </Form.Item>
              <Form.Item
                hidden // this function is building
                label="Avatar"
                valuePropName="fileList"
                name="avatar"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload
                  hidden
                  // action={process.env.REACT_APP_BACKEND_URL}
                  listType="picture-card"
                  type="image/*"
                >
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

export default UserList;
