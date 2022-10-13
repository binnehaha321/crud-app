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
  DatePicker,
} from "antd";
import "./index.scss";

function AddNewStudent() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const majorList = [
    {
      label: "Computing",
      value: "computing",
    },
    {
      label: "BUSINESS",
      value: "business",
    },
    {
      label: "MARKETING",
      value: "marketing",
    },
  ];
  return (
    <Col className="py-30">
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD NEW STUDENT</Typography.Title>
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
      >
        <Row className="add-new-student" align="space-between">
          <Col span="13">
            <Space style={{ display: "flex" }}>
              <Form.Item label="Student ID">
                <Input />
              </Form.Item>
              <Form.Item label="Major">
                <Select allowClear options={majorList} />
              </Form.Item>
              <Form.Item label="Enroll Number">
                <Input type="number" />
              </Form.Item>
            </Space>
            <Space style={{ display: "flex" }}>
              <Form.Item label="Fullname">
                <Input />
              </Form.Item>
              <Form.Item label="Email">
                <Input type="email" />
              </Form.Item>
            </Space>
            <Space style={{ display: "flex" }}>
              <Form.Item label="Phone Number">
                <Input />
              </Form.Item>
              <Form.Item label="Gender">
                <Select allowClear>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date Of Admission">
                <DatePicker onChange={onChange} />
              </Form.Item>
            </Space>
          </Col>
          <Col span="10">
            <Form.Item label="Address">
              <Input.TextArea
                maxLength="255"
                showCount="true"
                autoSize={{ minRows: 5 }}
              />
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
          <Form.Item>
            <Button type="primary">Add Student</Button>
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
}

export default AddNewStudent;
