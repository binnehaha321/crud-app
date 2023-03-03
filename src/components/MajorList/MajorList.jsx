import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import request from "~/utils/request";

const MajorList = () => {
  const [majorList, setMajorList] = useState([]);

  // GET MAJOR LIST
  useEffect(() => {
    request
      .get("major/filter?pageNumber=0&search")
      .then((res) => setMajorList(res?.data));
  }, []);
  return (
    <Form.Item label="Major" name="majorId">
      <Select allowClear>
        {majorList?.map((major) => {
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
