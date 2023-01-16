import { useEffect, useState } from "react";
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
  DatePicker,
} from "antd";
import request from "~/utils/request";
import {
  addStudent,
  addStudentSuccess,
  addStudentFail,
} from "~/store/actions/studentAction";
import { toast } from "react-toastify";

function AddNewStudent() {
  const [majorList, setMajorList] = useState([]);

  // GET MAJOR LIST
  useEffect(() => {
    request
      .get("major/filter?pageNumber=0&search")
      .then((res) => setMajorList(res?.data));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleAddStudent = useCallback(
  //   (values) => {
  //     request
  //       .post("students/add", values)
  //       .then((res) => {
  //         if (!res) {
  //           dispatch(addStudent());
  //         } else {
  //           dispatch(addStudentSuccess(res?.data?.message));
  //           navigate("../students");
  //         }
  //       })
  //       .catch((err) => {
  //         dispatch(addStudentFail(err?.response?.data?.message));
  //       });
  //   },
  //   [dispatch, navigate]
  // );

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

  let { msg, flag } = useSelector((state) => state.student);
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
              <Col xs={24} md={8}>
                <Form.Item label="Major" name="majorId">
                  <Select allowClear>
                    {/* <Select.Option value="Male">Male</Select.Option> */}
                    {majorList?.map((major) => {
                      return (
                        <Select.Option
                          key={major?.majorId}
                          value={major?.majorId}
                        >
                          {major?.majorCode}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Gender" name="gender">
                  <Select allowClear>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="DOB" name="dob">
                  <DatePicker format={"DD-MM-YYYY"} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {/* <Col xs={24} lg={8}>
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
          </Col> */}
          <Col xs={{ span: 24 }}>
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
