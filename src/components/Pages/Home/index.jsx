import { Card, Typography, Space, Row } from "antd";
import * as icon from "~/assets/images/Home";
import "./index.scss";

function Home() {
  const { Title, Text } = Typography;
  const items = [
    {
      label: "Students",
      icon: icon.STUDENTS,
      number: "243",
      bgColor: "#F0F9FF",
      color: "#000",
    },
    {
      label: "Course",
      icon: icon.COURSE,
      number: "13",
      bgColor: "#FEF6FB",
      color: "#000",
    },
    {
      label: "Payments",
      icon: icon.PAYMENT,
      number: "556,000",
      bgColor: "#FEFBEC",
      color: "#000",
    },
    {
      label: "User",
      icon: icon.USERS,
      number: "3",
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
          <Title level={4}>{item.number}</Title>
        </Card>
      ))}
    </Row>
  );
}

export default Home;
