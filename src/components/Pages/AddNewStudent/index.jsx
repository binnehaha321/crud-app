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
import "./index.scss";

function AddNewStudent() {
  return (
    <Col className="py-30">
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined style={{ fontSize: "2rem", color: "var(--btn-primary)" }} />
        <Typography.Title level={3}>ADD NEW STUDENT</Typography.Title>
      </Space>
      <Divider />
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="vertical"
      >
        <Row>
          <Col span="12">
            <Form.Item label="User ID">
              <Input />
            </Form.Item>
            <Form.Item label="Email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Fullname">
              <Input />
            </Form.Item>
            <Form.Item label="Gender">
              <Select>
                <Select.Option value="0">Male</Select.Option>
                <Select.Option value="1">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Avatar" valuePropName="fileList">
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
          <Col span="12">
            <Form.Item label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item label="Role">
              <Select>
                <Select.Option value="0">Admin</Select.Option>
                <Select.Option value="1">User</Select.Option>
                <Select.Option value="2">Teacher</Select.Option>
                <Select.Option value="3">Student</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Username">
              <Input />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Register</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default AddNewStudent;
