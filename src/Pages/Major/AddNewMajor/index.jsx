import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Col, Divider, Input, Space, Typography, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { post } from "~/utils/request";
import { addMajorSuccess, addMajorFail } from "~/store/actions/majorAction";

function AddNewMajor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle add major
  const handleAddMajor = async (values) => {
    try {
      const res = await post("major/add", values);
      dispatch(addMajorSuccess(await res?.message));
      navigate("../majors");
    } catch (error) {
      dispatch(addMajorFail(await error?.response?.data?.message));
      throw new Error(error);
    }
  };

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
        <Typography.Title level={3}>ADD NEW MAJOR</Typography.Title>
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
        onFinish={handleAddMajor}
      >
        <Form.Item label="Major Code" name="majorCode">
          <Input className="need-uppercase" />
        </Form.Item>
        <Form.Item label="Major (EN)" name="vietnameseName">
          <Input className="need-capitalize" />
        </Form.Item>
        <Form.Item label="Major (VI)" name="englishName">
          <Input className="need-capitalize" />
        </Form.Item>
        <Form.Item align="center">
          <Button type="primary" htmlType="submit">
            Add Major
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}

export default AddNewMajor;
