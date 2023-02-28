import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { cookies } from "~/utils/cookies";
import { saveAs } from "file-saver";

const UploadCSV = () => {
  const [formData] = useState(new FormData());
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadCSV = () => {
    setIsUploading(true);
    axios
      .post("http://localhost:8080/student/insert/file", formData, {
        responseType: "blob",
        headers: {
          authorization: `Bearer ${
            cookies ? JSON.parse(cookies.cookies.user_info).data.token : null
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const blob = new Blob([res?.data], {
          type: "text/csv; charset=UTF-8",
        });
        saveAs(blob, "Invalid_Students.csv");
        setIsUploading(false);
      })
      .catch((err) => {
        setIsUploading(false);
        throw new Error(err);
      });
  };

  const handleFileChange = (e) => {
    if (e.file) {
      formData.append("file", e.file.originFileObj);
    }
  };

  return (
		<Upload
			name="file"
      maxCount={1}
      customRequest={handleUploadCSV}
      accept=".csv, .xls, .xlsx"
      onChange={handleFileChange}
    >
      <Button icon={<UploadOutlined />}>Upload File</Button>
    </Upload>
  );
};

export default UploadCSV;
