import { useEffect, useState } from "react";
import { Card, Divider, Skeleton, Space, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import request from "~/utils/request";
import Meta from "antd/lib/card/Meta";
import { ADMIN } from "~/constants/role";

const RoleList = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([
    {
      key: 0,
      title: "",
      description: "",
    },
  ]);

  const getRoleList = async () => {
    setLoading(true);
    const res = await request.get("role/all?pageNumber=0");
    const role = res?.data?.map((role) => {
      return {
        key: role?.roleId,
        title: role?.roleName,
        description: role?.description,
      };
    });
    setRoles(role);
    setLoading(false);
  };

  useEffect(() => {
    getRoleList();
  }, []);

  return (
    <>
      <Space>
        <Typography.Title level={3} style={{ marginBlock: "1rem" }}>
          Role List
        </Typography.Title>
      </Space>
      <Divider style={{ margin: "0" }} />
      {roles?.map((role) => (
        <Card
          key={role.key}
          style={{
            width: 300,
            marginTop: 16,
            backgroundColor: role.title === ADMIN ? "#fff2e8" : "#e6f7ff",
          }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={loading} active>
            <Meta title={role.title} description={role.description} />
          </Skeleton>
        </Card>
      ))}
    </>
  );
};
export default RoleList;
