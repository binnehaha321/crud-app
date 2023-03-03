import { Space, Spin } from "antd";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <Space className={styles.loading}>
      <Spin />
    </Space>
  );
};

export default Loading;
