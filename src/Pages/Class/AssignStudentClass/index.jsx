import { Form, Input, Modal } from "antd";

function AssignStudentClass(props) {
  const { onOk, onCancel, onFinish, form, open, initialValues } = props;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title="Assign student to a class"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item label="FPT ID" name="fptId">
          <Input className="need-uppercase" />
        </Form.Item>
        <Form.Item label="Class Code" name="classCode">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AssignStudentClass;
