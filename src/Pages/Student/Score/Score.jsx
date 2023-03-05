import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useParams, useNavigate } from "react-router";
import useFetch from "~/hooks/useFetch";
import { UserAddOutlined } from "@ant-design/icons";
import StatusSelect from "~/components/StatusSelect";
import { post } from "~/utils/request";
import { addScoreFail, addScoreSuccess } from "~/store/actions/scoreAction";
import { toast } from "react-toastify";

const StudentScore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get term list
  const { data: termList, isLoading: loadingTerm } = useFetch(
    "term/all?pageNumber=1"
  );

  // Get program list
  const { data: programList, isLoading: loadingProgram } = useFetch(
    "program/all?pageNumber=1"
  );

  // Get subject list
  const { data: subjectList, isLoading: loadingSubject } = useFetch(
    "subject/all?pageNumber=1"
  );

  // handle add score
  const handleAddScore = async (values) => {
    try {
      const res = await post("student/subject/add", values);
      dispatch(addScoreSuccess(await res?.message));
      navigate("../students");
    } catch (error) {
      console.log(error);
      dispatch(addScoreFail("Add score fail!"));
      throw new Error(error);
    }
  };

  // toast
  const { flag, msg } = useSelector((state) => state.score);
  useEffect(() => {
    if (!flag) toast.error(msg);
  }, [msg, flag]);

  return (
    <Col className="py-30">
      <Space direction="horizental" size={"middle"}>
        <UserAddOutlined
          style={{ fontSize: "2rem", color: "var(--btn-primary)" }}
        />
        <Typography.Title level={3}>ADD SCORE</Typography.Title>
      </Space>
      <Divider />
      <Form
        initialValues={{
          fptId: id,
        }}
        onFinish={handleAddScore}
        layout="vertical"
        style={{ maxWidth: 800 }}
      >
        <Row gutter={16} align={"middle"}>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"FPT ID"} name={"fptId"}>
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"Term"} name={"termCode"}>
              <Select
                loading={loadingTerm}
                allowClear
                dropdownMatchSelectWidth={false}
              >
                {termList?.data?.map((term) => (
                  <Select.Option key={term.termCode} value={term.termCode}>
                    {term.termName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"Program"} name={"programId"}>
              <Select
                loading={loadingProgram}
                allowClear
                dropdownMatchSelectWidth={false}
              >
                {programList?.data?.map((program) => (
                  <Select.Option
                    key={program.programId}
                    value={program.programId}
                  >
                    {program.programName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} align={"middle"}>
          <Col xs={24} sm={16} md={6}>
            <Form.Item label={"Subject"} name={"subjectCode"}>
              <Select
                loading={loadingSubject}
                allowClear
                dropdownMatchSelectWidth={false}
              >
                {subjectList?.data?.map((subject) => (
                  <Select.Option
                    key={subject.subjectCode}
                    value={subject.subjectCode}
                  >
                    {subject.subjectName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={6}>
            <Form.Item label={"Mark"} name={"mark"}>
              <InputNumber type="number" max={10} min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={6}>
            <Form.Item label={"Attendance"} name={"attendancePercent"}>
              <InputNumber
                max={100}
                min={0}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={6}>
            <StatusSelect />
          </Col>
        </Row>
        <Row gutter={16} align={"middle"}>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"Re-study"} name={"countReStudyTime"}>
              <InputNumber type="number" min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"Start"} name={"startDate"}>
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                format="DD-MM-YYYY HH:mm"
                //   onChange={onChange}
                //   onOk={onOk}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={8}>
            <Form.Item label={"End"} name={"endDate"}>
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                format="DD-MM-YYYY HH:mm"
                //   onChange={onChange}
                //   onOk={onOk}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType={"submit"}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default StudentScore;
