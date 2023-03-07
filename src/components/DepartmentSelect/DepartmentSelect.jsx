import { Select, Form } from "antd";

const DepartmentSelect = ({ departments = [] }) => {
  return (
    <Form.Item label="Department" name="departmentId">
      <Select allowClear>
        {departments?.map((department, index) => (
          <Select.Option value={department?.departmentId} key={index}>
            {department?.departmentName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DepartmentSelect;
