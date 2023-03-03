import { Select, Form } from "antd";

const GenderSelect = () => {
  return (
    <Form.Item label="Gender" name="gender">
      <Select allowClear>
        <Select.Option value="Male">Male</Select.Option>
        <Select.Option value="Female">Female</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default GenderSelect;
