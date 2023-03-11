import { Button, Upload, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
// import { cookies } from "~/utils/cookies";
import { saveAs } from "file-saver";

const UploadCSV = ({ url, type, upload_name }) => {
  const handleBeforeUpload = () => {
    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleCustomRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(url, formData, {
        responseType: "blob",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user_info"))?.token
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        onSuccess(res);
        const blob = new Blob([res?.data], {
          type: "text/csv; charset=UTF-8",
        });
        saveAs(blob, "Invalid_Students.csv");
      })
      .catch((error) => {
        onError(error);
      });
  };

  return (
    <Upload
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
      customRequest={handleCustomRequest}
      accept=".csv, .xls, .xlsx"
    >
      <Button icon={<UploadOutlined />} block type={type}>
        {upload_name}
      </Button>
    </Upload>
  );
};

export default UploadCSV;
