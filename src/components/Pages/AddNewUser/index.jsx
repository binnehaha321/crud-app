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
import request from "~/utils/request";
import "./index.scss";

function AddNewUser() {
  const handleSubmit = (values) => {
    request
      .post("register", values, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Col className="py-30">
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
        onFinish={handleSubmit}
      >
        <Row className="add-new-user" align="space-between">
          <Col span="13">
            <Space style={{ display: "flex" }}>
              <Form.Item label="User ID" name="userId">
                <Input />
              </Form.Item>
              <Form.Item label="Role" name="roleId">
                <Select allowClear mode="multiple">
                  <Select.Option value={0}>ADMIN</Select.Option>
                  <Select.Option value={1}>USER</Select.Option>
                  <Select.Option value={2}>TEACHER</Select.Option>
                  <Select.Option value={3}>STUDENT</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Select allowClear="true">
                  <Select.Option value="0">Male</Select.Option>
                  <Select.Option value="1">Female</Select.Option>
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
                <Input />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
            </Space>
          </Col>
          <Col span="10">
            <Form.Item label="Address" name="address">
              <Input.TextArea
                maxLength="255"
                showCount="true"
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="Avatar" valuePropName="fileList" name="avatar">
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
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
}

export default AddNewUser;
