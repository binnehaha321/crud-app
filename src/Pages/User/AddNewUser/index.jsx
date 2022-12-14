import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Space,
  Typography,
  Divider,
} from "antd";
import { toast } from "react-toastify";
import roles from "../roleList.js";
import {
  addUser,
  addUserSuccess,
  addUserFail,
} from "~/store/actions/userAction";
import request from "~/utils/request.js";

function AddNewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddUser = useCallback(
    (values) => {
      request
        .post("register", values)
        .then((res) => {
          if (!res) {
            dispatch(addUser());
          } else {
            dispatch(addUserSuccess(res?.data?.message));
            navigate("../users");
          }
        })
        .catch((err) => dispatch(addUserFail(err?.response?.data?.message)));
    },
    [dispatch, navigate]
  );

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
    <Col
      className="py-30"
      xs={{ span: 24 }}
      xl={{ span: 20 }}
      xxl={{ span: 16 }}
    >
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD NEW USER</Typography.Title>
      </Space>
      <Divider />
      <Form
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        onFinish={handleAddUser}
      >
        <Row className="add-new-user" gutter={[16, 16]}>
          <Col xl={12} lg={18} xs={24}>
            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="User ID" name="userId">
                  <Input className="need-uppercase" />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Role" name="roleId">
                  <Select allowClear maxTagCount="responsive">
                    {roles?.map((role, index) => (
                      <Select.Option value={role.value} key={index}>
                        {role.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Gender" name="gender">
                  <Select allowClear="true">
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={12} xs={24}>
                <Form.Item label="Fullname" name="fullName">
                  <Input className="need-capitalize" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item label="Email" name="email">
                  <Input type="email" className="need-lowercase" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input maxLength={10} />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Username" name="username">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={18} xs={24}>
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
          </Col>
        </Row>
        <Form.Item align="center">
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}

export default AddNewUser;
