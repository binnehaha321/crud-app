import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Divider,
  DatePicker,
} from "antd";
import request from "~/utils/request";
import {
  addStudent,
  addStudentSuccess,
  addStudentFail,
} from "~/store/actions/studentAction";
import GenderSelect from "~/components/GenderSelect/GenderSelect";
import MajorList from "~/components/MajorList/MajorList";

function AddNewStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddStudent = async (values) => {
    try {
      dispatch(addStudent());
      const res = await request.post("student/add", values);
      dispatch(addStudentSuccess(res?.data?.message));
      navigate("../students");
    } catch (error) {
      dispatch(addStudentFail(error?.response?.data?.message));
    }
  };

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
        onFinish={handleAddStudent}
      >
        <Row className="add-new-student" gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={8}>
                <Form.Item label="Student ID" name="fptId">
                  <Input className="need-uppercase" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Person ID" name="personId">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="UOG ID" name="uogId">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Form.Item label="Fullname" name="fullName">
                  <Input className="need-capitalize" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Email" name="email">
                  <Input type="email" className="need-lowercase" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={6}>
                <MajorList />
              </Col>
              <Col xs={24} md={6}>
                <GenderSelect />
              </Col>
              <Col xs={24} md={6}>
                <Form.Item label="DOB" name="dob">
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Student
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default AddNewStudent;
