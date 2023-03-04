import { Form, Select } from "antd";

const MajorList = ({ majors }) => {
  return (
    <Form.Item label="Major" name="majorId">
      <Select allowClear>
        {majors?.map((major) => {
          return (
            <Select.Option key={major?.majorId} value={major?.majorId}>
              {major?.majorCode}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default MajorList;
