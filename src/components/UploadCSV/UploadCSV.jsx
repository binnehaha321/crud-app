import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { cookies } from "~/utils/cookies";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const UploadCSV = ({ url, type, file, danger }) => {
  const [formData] = useState(new FormData());
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadCSV = () => {
    setIsUploading(true);
    axios
      .post(url, formData, {
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

  // useEffect(() => {
  //   if (!isUploading) return () => toast.success("Uploaded successfully!");
  // }, [isUploading]);

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
      <Button
        icon={<UploadOutlined />}
        danger={danger}
        block
        type={type}
      >{`Upload ${file}`}</Button>
    </Upload>
  );
};

export default UploadCSV;
