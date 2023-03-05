import { Form, Input, Modal } from "antd";

const SearchSubject = (props) => {
  const { onOk, onCancel, open, onFinish, form } = props;
  return (
    <Modal
      title="Search subject"
      onOk={onOk}
      onCancel={onCancel}
      open={open}
      okText="Search"
    >
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item label="Subject Code" name="subjectCode">
          <Input />
        </Form.Item>
        <Form.Item label="Subject" name="subjectName">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SearchSubject;
