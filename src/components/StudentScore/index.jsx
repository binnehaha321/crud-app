import { Descriptions } from "antd";

const StudentScore = (props) => {
  const { title, tabList, ...info } = props;

  return (
    <Descriptions title={title} column={[24, 24]} bordered>
      <Descriptions.Item label={"Program"} span={3}>
        {info.program}
      </Descriptions.Item>
      <Descriptions.Item label={"Term"} span={3}>
        {info.term}
      </Descriptions.Item>
      <Descriptions.Item label={"Subject"} span={3}>
        {info.subject}
      </Descriptions.Item>
      <Descriptions.Item label={"Mark"} span={3}>
        {info.mark}
      </Descriptions.Item>
      <Descriptions.Item label={"Status"} span={3}>
        {info.status}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default StudentScore;
