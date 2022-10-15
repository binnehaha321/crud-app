import { useEffect, useState } from "react";
import { Card, Typography, Space, Row } from "antd";
import * as icon from "~/assets/images/Home";
import request from "~/utils/request";
import "./index.scss";

function Home() {
  const [amountUser, setAmountUser] = useState(0);

  useEffect(() => {
    request.get("users?id=ALL").then((res) => {
      setAmountUser(res?.data?.users?.length);
    });
  }, []);

  const { Title, Text } = Typography;

  const items = [
    {
      label: "Students",
      icon: icon.STUDENTS,
      amount: "243",
      bgColor: "#F0F9FF",
      color: "#000",
    },
    {
      label: "Courses",
      icon: icon.COURSES,
      amount: "13",
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
    <Row justify="space-between" style={{ backgroundColor: "transparent" }}>
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
  );
}

export default Home;
