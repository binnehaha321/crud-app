import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Divider, Input, Space, Typography, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { post } from "~/utils/request";
import {
  addSubjectFail,
  addSubjectSuccess,
} from "~/store/actions/subjectAction";
import { toast } from "react-toastify";

function AddNewSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle add subject
  const handleAddSubject = async (values) => {
    try {
      const res = await post("subject/add", values);
      dispatch(addSubjectSuccess(await res?.message));
      navigate("../subjects");
    } catch (error) {
      dispatch(addSubjectFail(await error?.response?.data?.message));
      throw new Error(error);
    }
  };

  // popup add success
  let { msg, flag } = useSelector((state) => state.subject);
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
      sm={{ span: 18 }}
      md={{ span: 14 }}
      lg={{ span: 10 }}
      xl={{ span: 8 }}
    >
      <Space direction="horizental" size={"middle"}>
        <InfoCircleOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD NEW SUBJECT</Typography.Title>
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
        onFinish={handleAddSubject}
      >
        <Form.Item label="Subject Code" name="subjectCode">
          <Input className="need-uppercase" />
        </Form.Item>
        <Form.Item label="Subject" name="subjectName">
          <Input className="need-capitalize" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Replaced" name="replaceWith">
          <Input />
        </Form.Item>
        <Form.Item align="center">
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}

export default AddNewSubject;
