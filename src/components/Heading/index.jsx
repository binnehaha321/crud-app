import styles from "./index.module.scss";

import { Typography } from "antd";

function Heading({ level, align, className }) {
  const { Title } = Typography;
  return (
    <Title
      level={level}
      align={align}
      className={`${styles.heading} ${className}`}
    >
      CRUD OPERATIONS
    </Title>
  );
}

export default Heading;
