import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import request from "~/utils/request";

const handleDelete = (id) => {
  request
    .delete(`users?id=${id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showDeleteConfirm = (id) => {
  Modal.confirm({
    title: "Are you sure delete this user?",
    icon: <ExclamationCircleOutlined />,
    content: "Click No to cancel.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",

    onOk() {
      handleDelete(id);
    },

    onCancel() {
      console.log(false);
      // return false;
    },
  });
};

export default showDeleteConfirm;
