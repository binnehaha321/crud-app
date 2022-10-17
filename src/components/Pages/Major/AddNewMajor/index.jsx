import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Divider,
  Input,
  Space,
  Typography,
  Form,
  Row,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

function AddNewMajor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddMajor = useCallback(
    (values) => {
      dispatch({ type: "ADD_MAJOR", payload: values });
      navigate("../majors");
    },
    [dispatch, navigate]
  );

  return (
    <Col className="py-30">
      <ToastContainer />
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD NEW MAJOR</Typography.Title>
      </Space>
      <Divider />
      <Row>
        <Col span={12}>
          <Form
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            layout="vertical"
            onFinish={handleAddMajor}
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
            <Form.Item align="center">
              <Button type="primary" htmlType="submit">
                Add Major
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default AddNewMajor;
