import { useEffect, useState } from "react";
import { Card, Typography, Space, Row, Spin } from "antd";
import * as icon from "~/assets/images/Home";
import request from "~/utils/request";
import "./index.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
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
    request.get("majors?id=ALL").then((res) => {
      setAmountMajor(res?.data?.majors?.length);
    });

  // PAYMENTS
  // const callPaymentList = () =>
  //   request.get("payments?id=ALL").then((res) => {
  //     setAmountPayment(res?.data?.payments?.length);
  //   });

  // USERS
  const callUserList = () =>
    request.get("users?id=ALL").then((res) => {
      setAmountUser(res?.data?.users?.length);
    });

  useEffect(() => {
    setIsLoaded(false);
    callStudentList();
    callMajorList();
    // callPaymentList();
    callUserList();
    setIsLoaded(true);
  }, []);

  const { Title, Text } = Typography;

  const items = [
    {
      label: "Students",
      icon: icon.STUDENTS,
      amount: amountStudent,
      bgColor: "#F0F9FF",
      color: "#000",
    },
    {
      label: "Majors",
      icon: icon.MAJORS,
      amount: amountMajor,
      bgColor: "#FEF6FB",
      color: "#000",
    },
    {
      label: "Payments",
      icon: icon.PAYMENT,
      amount: "556,000",
      bgColor: "#FEFBEC",
      color: "#000",
    },
    {
      label: "User",
      icon: icon.USERS,
      amount: amountUser,
      bgColor: "linear-gradient(110.42deg, #FEAF00 18.27%, #F8D442 91.84%)",
      color: "#FFF",
    },
  ];

  return (
    <>
      {isLoaded ? (
        <Row
          justify="space-between"
          gutter={[16, 16]}
          style={{ paddingTop: "1rem" }}
        >
          {items.map((item, index) => (
            <Card
              key={index}
              hoverable
              style={{
                width: 240,
                background: item.bgColor,
              }}
            >
              <Space direction="vertical">
                <img src={item.icon} alt={item.label} key={index} />
                <Text style={{ color: item.color }}>{item.label}</Text>
              </Space>
              <Title level={4}>{item.amount}</Title>
            </Card>
          ))}
        </Row>
      ) : (
        <Spin />
      )}
    </>
  );
}

export default Home;
