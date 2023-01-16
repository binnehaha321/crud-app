import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Upload,
  Space,
  Modal,
  Image,
  Typography,
  Tag,
  DatePicker,
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import * as icon from "~/assets/images/ActionIcons";
import { Table, Button } from "~/components";
import request from "~/utils/request";
import "./index.scss";
import { ROLE_ADMIN, ROLE_USER } from "~/constants/role";
import { UPDATE_USER_FAIL } from "~/utils/message";
import moment from "moment";

function UserList() {
  const formRef = useRef();
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      fixed: "left",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Typography.Text
          style={{ width: 100 }}
          ellipsis={{ tooltip: { email } }}
          className="need-lowercase"
        >
          {email}
        </Typography.Text>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      width: 250,
      render: (roles) => {
        return roles.map((role, index) => (
          <Tag
            key={index}
            color={
              role.roleName === ROLE_ADMIN
                ? "volcano"
                : role.roleName === ROLE_USER
                ? "blue"
                : "green"
            }
          >
            {role.roleName}
          </Tag>
        ));
      },
    },
    {
      title: "",
      key: "action",
      render: (student) => (
        <Space size="middle">
          <Button onClick={() => handleGetUserById(student.username)}>
            <img src={icon.EDIT} alt="edit" />
          </Button>
          <Button onClick={() => showDeleteConfirm(student.key)}>
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
      userId: "",
      avatar: "",
      email: "",
      fullName: "",
      username: "",
      phoneNumber: "",
      roles: [],
    },
  ]);

  const [currentUserValues, setCurrentUserValues] = useState({});

  // GET USERS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  const handleUserDataList = (users = []) => {
    let userData = {};
    return users?.map((user) => {
      userData = {
        key: user?.userId,
        userId: user?.userId,
        avatar: user?.avatar,
        email: user?.email,
        username: user?.username,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        roles: user?.roles,
      };
      return userData;
    });
  };

  const handleCallUserList = async () => {
    try {
      setIsLoading(true);
      const res = await request.get("users/all?pageNumber=0");
      const users = res?.data?.data;
      const result = handleUserDataList(users);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCallUserList();
  }, []);

  // UPDATE USER
  const [form] = Form.useForm();

  // Get current user's data by id
  useEffect(() => {
    if (formRef.current) form.setFieldsValue(currentUserValues);
  }, [form, currentUserValues]);

  const handleGetUserById = (username) => {
    setUsername(username);
    request
      .get(`users/filter?pageNumber=0&search=username:${username}`)
      .then(async (res) => {
        const user = res?.data?.data[0];
        setCurrentUserValues({
          key: user?.userId,
          dob: moment(user?.dob),
          // avatar: user?.avatar,
          email: user?.email,
          fullName: user?.fullName,
          departmentId: user?.departmentId?.departmentName,
          username: user?.username,
          address: user?.address,
          phoneNumber: user?.phoneNumber,
          roles: user?.roles,
        });
        await handleGetRoles();
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get roles
  const handleGetRoles = async () => {
    try {
      const res = await request.get("role/all?pageNumber=0");
      setRoles(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = (values) => {
    request
      .put(`users/edit/${username}`, values)
      .then((res) => {
        const data = res?.data;
        const users = data?.users;
        const result = handleUserDataList(users);
        setData(result);
        toast.success(data?.message);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(UPDATE_USER_FAIL);
      });
  };

  // DELETE USER
  const handleDelete = (id) => {
    request
      .delete(`users/delete/${id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        const users = res?.data?.users;
        const result = handleUserDataList(users);
        setData(result);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
    // su dung redux please
  };

  // Confirm modal
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
      <Table
        caption="User List"
        icon={icon.SORT}
        columns={columns}
        dataSource={data}
        loading={isLoading}
      >
        <Link to="./add" className="ant-btn ant-btn-primary">
          ADD NEW USER
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
          onFinish={handleUpdateUser}
          initialValues={currentUserValues}
          className="update-user"
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="Role" name="role">
              <Select allowClear maxTagCount="responsive" mode={"multiple"}>
                {roles?.map((role, index) => (
                  <Select.Option value={role.roleName} key={index}>
                    {role.roleName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Dob" name={"dob"}>
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item label="Department" name="departmentId">
              <Input className="need-capitalize" />
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
  );
}

export default UserList;
