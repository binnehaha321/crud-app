import { useSelector } from "react-redux";
import { Form, Input, Modal } from "antd";

function MoveStudentClass(props) {
  const { onOk, onCancel, onFinish, form, initialValues, open } = props;
  const { isOpen } = useSelector((state) => state.studentClass);

  return (
    <Modal
      open={isOpen || open}
      onCancel={onCancel}
      onOk={onOk}
      title="Move student to another class"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label="FPT ID"
          name="fptId"
          rules={[
            {
              required: true,
              message: "Please input student ID!",
            },
          ]}
        >
          <Input className="need-uppercase" />
        </Form.Item>
        <Form.Item
          label="Class Code"
          name="classCode"
          rules={[
            {
              required: true,
              message: "Please input class code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MoveStudentClass;
