import { useEffect, useState } from "react";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import request from "~/utils/request";

const ClassList = () => {
  const [majors, setMajors] = useState([
    {
      key: "",
      tab: "",
    },
  ]);
  const getMajorList = async () => {
    const res = await request.get("major/filter?pageNumber=1&search");
    const majorCode = res?.data?.map((major) => {
      return {
        key: major?.majorId,
        tab: major?.majorCode,
      };
    });
    setMajors(majorCode);
  };

  useEffect(() => {
    getMajorList();
  }, []);
  const tabListNoTitle = majors
  const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
  };
  const [activeTabKey2, setActiveTabKey2] = useState(majors[0]?.majorCode);
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <Card
      style={{
        width: "100%",
      }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      onTabChange={onTab2Change}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {contentListNoTitle[activeTabKey2]}
    </Card>
  );
};
export default ClassList;
