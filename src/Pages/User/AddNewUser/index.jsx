import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Space,
  Typography,
  Divider,
  DatePicker,
} from "antd";
import { toast } from "react-toastify";

import {
  addUser,
  addUserSuccess,
  addUserFail,
} from "~/store/actions/userAction";
import request, { get } from "~/utils/request.js";
import { ADD_USER_FAIL } from "~/utils/message";
import DepartmentSelect from "~/components/DepartmentSelect/DepartmentSelect";
import Loading from "~/components/Loading/Loading";

function AddNewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // get role list
  const [roles, setRoles] = useState([]);

  const handleGetRoles = async () => {
    setIsLoading(true);
    try {
      const res = await get("role/all?pageNumber=1");
      setRoles(await res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      throw new Error(error);
    }
  };

  // get department list
  const [departments, setDepartments] = useState([]);

  const handleGetDepartments = async () => {
    setIsLoading(true);
    try {
      const res = await get("department/all?pageNumber=1");
      setDepartments(await res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // run func
  useEffect(() => {
    handleGetDepartments();
    handleGetRoles();
  }, []);

  const handleAddUser = async (values) => {
    // Format date on submit event
    // values.dob = values?.dob?.format("YYYY-MM-DD");
    setIsLoading(true);
    try {
      dispatch(addUser());
      const res = await request.post("users/add", values);
      if (!res) {
        dispatch(addUser());
      } else {
        dispatch(addUserSuccess(res?.data?.message));
        navigate("../users");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(addUserFail(ADD_USER_FAIL));
      setIsLoading(false);
    }
  };

  // run toast
  let { msg, flag } = useSelector((state) => state.user);

  useEffect(() => {
    if (msg) {
      if (flag) {
        toast.success(msg);
        dispatch(addUserSuccess(""));
      } else {
        toast.error(msg);
        dispatch(addUserFail(""));
      }
    }
  }, [msg, flag, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                    <Form.Item label="Role" name="role">
                      <Select
                        allowClear
                        maxTagCount="responsive"
                        mode={"multiple"}
                      >
                        {roles?.map((role, index) => (
                          <Select.Option value={role.roleName} key={index}>
                            {role.roleName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
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
                    <DepartmentSelect departments={departments} />
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
              </Col>
            </Row>
            <Form.Item align="center">
              <Button type="primary" htmlType="submit">
                Add User
              </Button>
            </Form.Item>
          </Form>
        </Col>
      )}
    </>
  );
}

export default AddNewUser;
