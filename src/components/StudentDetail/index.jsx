import { Descriptions, Modal } from "antd";

const StudentDetail = (props) => {
  const { title, open, onOk, ...info } = props;
  return (
    <Modal
      open={open}
      onOk={onOk}
      cancelButtonProps={{ style: { display: "none" } }}
      closable={false}
    >
      <Descriptions title={title}>
        <Descriptions.Item label={"Student ID"} span={3}>
          {info.studentId}
        </Descriptions.Item>
        <Descriptions.Item label={"Major"} span={3}>
          {info.majorId}
        </Descriptions.Item>
        <Descriptions.Item label={"Email"} span={3}>
          {info.email}
        </Descriptions.Item>
        <Descriptions.Item label={"Gender"} span={3}>
          {info.gender}
        </Descriptions.Item>
        <Descriptions.Item label={"Birthday"} span={3}>
          {info.dob}
        </Descriptions.Item>
        <Descriptions.Item label={"Active"} span={3}>
          {info.isActive?.toString()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default StudentDetail;
