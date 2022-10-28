import { useEffect, useState } from "react";
import { Card, Typography, Space, Row, Col } from "antd";
import * as icon from "~/assets/images/Home";
import request from "~/utils/request";
import "./index.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Home() {
  const [amountStudent, setAmountStudent] = useState(0);
  const [amountMajor, setAmountMajor] = useState(0);
  const [amountPayment, setAmountPayment] = useState(0);
  const [amountUser, setAmountUser] = useState(0);
  let { msg } = useSelector((state) => state.authen);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  // STUDENTS
  const callStudentList = () =>
    request.get("students").then((res) => {
      setAmountStudent(res?.data?.students?.length);
    });

  // MAJORS
  const callMajorList = () =>
    request.get("majors").then((res) => {
      setAmountMajor(res?.data?.majors?.length);
    });

  // PAYMENTS
  // const callPaymentList = () =>
  //   request.get("payments").then((res) => {
  //     setAmountPayment(res?.data?.payments?.length);
  //   });

  // USERS
  const callUserList = () =>
    request.get("users").then((res) => {
      setAmountUser(res?.data?.users?.length);
    });

  useEffect(() => {
    callStudentList();
    callMajorList();
    // callPaymentList();
    callUserList();
  }, []);

  const { Title, Text } = Typography;

  const items = [
    {
      label: "Students",
      path: "students",
      icon: icon.STUDENTS,
      amount: amountStudent,
      bgColor: "#F0F9FF",
      color: "#000",
    },
    {
      label: "Majors",
      path: "majors",
      icon: icon.MAJORS,
      amount: amountMajor,
      bgColor: "#FEF6FB",
      color: "#000",
    },
    {
      label: "Payments",
      path: "payments",
      icon: icon.PAYMENT,
      amount: "556,000",
      bgColor: "#FEFBEC",
      color: "#000",
    },
    {
      label: "User",
      path: "users",
      icon: icon.USERS,
      amount: amountUser,
      bgColor: "linear-gradient(110.42deg, #FEAF00 18.27%, #F8D442 91.84%)",
      color: "#FFF",
    },
  ];

  return (
    <>
      <Row
        gutter={[8, 8]}
        justify="space-between"
        style={{ paddingTop: "1rem" }}
      >
        {items.map((item, index) => (
          <Col key={index}>
            <Link to={item.path}>
              <Card
                hoverable
                style={{
                  width: 240,
                  background: item.bgColor,
                }}
              >
                <Space direction="vertical">
                  <img src={item.icon} alt={item.label} />
                  <Text style={{ color: item.color }}>{item.label}</Text>
                </Space>
                <Title level={4}>{item.amount}</Title>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Home;
