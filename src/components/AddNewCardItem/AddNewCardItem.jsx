import { Form, Input, Modal } from "antd";

const AddNewCardItem = (props) => {
  const { open, onCancel, onFinish, name, form, term } = props;

  return (
    <Modal onOk={form.submit} open={open} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label={<label className="need-capitalize">{name}</label>}
          name={`${name}Name`}
          rules={[
            {
              required: true,
              message: `Please input a ${name} name!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {term && (
          <Form.Item
            label={<label className="need-capitalize">{`${name} Code`}</label>}
            name={`${name}Code`}
            rules={[
              {
                required: true,
                message: `Please input a ${name} code!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCardItem;
