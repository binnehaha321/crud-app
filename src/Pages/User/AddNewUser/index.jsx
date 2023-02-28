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

import {
  addUser,
  addUserSuccess,
  addUserFail,
} from "~/store/actions/userAction";
import request from "~/utils/request.js";
import { ADD_USER_FAIL } from "~/utils/message";
import { toast } from "react-toastify";

function AddNewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const handleAddUser = useCallback(
  //   (values) => {
  //     request
  //       .post("register", values)
  //       .then((res) => {
  //         if (!res) {
  //           dispatch(addUser());
  //         } else {
  //           dispatch(addUserSuccess(res?.data?.message));
  //           navigate("../users");
  //         }
  //       })
  //       .catch((err) => dispatch(addUserFail(err?.response?.data?.message)));
  //   },
  //   [dispatch, navigate]
  // );

  const handleGetRoles = async () => {
    try {
      const res = await request.get("role/all?pageNumber=0");
      setRoles(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleGetDepartments = async () => {
    try {
      const res = await request.get("department/all?pageNumber=0");
      setDepartments(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (values) => {
    // Format date on submit event
    values.dob = values?.dob?.format("YYYY-MM-DD");
    try {
      dispatch(addUser());
      const res = await request.post("users/add", values);
      if (!res) {
        dispatch(addUser());
      } else {
        dispatch(addUserSuccess(res?.data?.message));
        navigate("../users");
      }
    } catch (error) {
      console.log(error);
      dispatch(addUserFail(ADD_USER_FAIL));
    }
  };

  let { msg, flag } = useSelector((state) => state.user);

  useEffect(() => {
    handleGetRoles();
    handleGetDepartments();
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
              <Col md={12} xs={24}>
                <Form.Item label="Role" name={"role"}>
                  <Select allowClear maxTagCount="responsive" mode={"multiple"}>
                    {roles?.map((role, index) => (
                      <Select.Option value={role.roleName} key={index}>
                        {role.roleName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col md={6} xs={24}>
                <Form.Item label="Gender" name={"gender"}>
                  <Select allowClear>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col> */}
              <Col md={12} xs={24}>
                <Form.Item label="Dob" name={"dob"}>
                  <DatePicker format={"DD-MM-YYYY"} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="Fullname" name={"fullName"}>
                  <Input className="need-capitalize" />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Email" name={"email"}>
                  <Input type="email" className="need-lowercase" />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Department" name={"departmentId"}>
                  <Select allowClear>
                    {departments?.map((department, index) => (
                      <Select.Option
                        value={department.departmentId}
                        key={index}
                      >
                        {department.departmentName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} xs={24}>
                <Form.Item label="Phone Number" name={"phoneNumber"}>
                  <Input maxLength={10} />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Username" name={"username"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item label="Password" name={"password"}>
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={18} xs={24}>
            <Form.Item label="Address" name={"address"}>
              <Input.TextArea
                maxLength="255"
                showCount="true"
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              name={"avatar"}
              hidden // this function is building
              label="Avatar"
              valuePropName="fileList"
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
