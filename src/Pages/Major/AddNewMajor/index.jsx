import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Divider,
  Input,
  Space,
  Typography,
  Form,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import request from "~/utils/request";
import {
  addMajor,
  addMajorSuccess,
  addMajorFail,
} from "~/store/actions/majorAction";

function AddNewMajor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddMajor = useCallback(
    (values) => {
      request
        .post("majors/add", values)
        .then((res) => {
          if (!res) {
            dispatch(addMajor());
          } else {
            dispatch(addMajorSuccess(res?.data?.message));
          }
          navigate("../majors");
        })
        .catch((err) => {
          dispatch(addMajorFail(err?.response?.data?.message));
        });
    },
    [dispatch, navigate]
  );

  let { msg, flag } = useSelector((state) => state.major);
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
        <Form.Item label="Major ID" name="majorId">
          <Input className="need-uppercase" />
        </Form.Item>
        <Form.Item label="Major Name (EN)" name="majorName_EN">
          <Input className="need-capitalize" />
        </Form.Item>
        <Form.Item label="Major Name (VI)" name="majorName_VI">
          <Input className="need-capitalize" />
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
  );
}

export default AddNewMajor;
