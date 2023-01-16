import { Typography } from "antd";
import "./index.scss";

function Heading({ level, align }) {
  const { Title } = Typography;
  return (
    <Title level={level} align={align} className="heading">
      GREENWICH CMS
    </Title>
  );
}

export default Heading;
