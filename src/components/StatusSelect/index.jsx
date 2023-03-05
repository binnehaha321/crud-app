import { Form, Select } from "antd";
import React from "react";
import status from "./status";

const StatusSelect = () => {
  return (
    <Form.Item label="Status" name="status">
      <Select allowClear dropdownMatchSelectWidth={false}>
        {status.map((stt, index) => (
          <Select.Option key={index} value={stt.value}>
            {stt.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default StatusSelect;
