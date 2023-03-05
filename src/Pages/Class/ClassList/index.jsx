import { useEffect, useState } from "react";
import { Card, Skeleton, Space, Typography, Form, Button as Btn } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import request, { post } from "~/utils/request";
import AssignStudentClass from "../AssignStudentClass";
import { toast } from "react-toastify";

const ClassList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [currentValues, setCurrentValues] = useState(null);

  // get class list
  const getClassList = async () => {
    setIsLoading(true);
    try {
      const res = await request.get("studentClass/all?pageNumber=1");
      setClasses(await res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  // add new class
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();

  // handle close form
  const handleCloseForm = () => {
    setIsOpenModal(false);
    form.resetFields();
    setIsLoading(false);
  };

  // handle open form
  const handleOpenForm = (code) => {
    setIsOpenModal(true);
    setCurrentValues({ ...currentValues, classCode: code });
  };

  // handle assign student to class
  const handleAssignStudent = async (values) => {
    setIsLoading(true);
    try {
      const res = await post("studentClass/add", values);
      toast.success(await res?.data?.message);
      console.log(res?.data?.classId);
      handleCloseForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      handleCloseForm();
    }
  };


  useEffect(() => {
    console.log("lan 1", currentValues);
  }, [currentValues]);

  return (
    <>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ marginBlock: "1rem" }}>
          Class List
        </Typography.Title>
        <Btn type="primary" onClick={() => setIsOpenModal(true)}>
          ADD NEW CLASS
        </Btn>
      </Space>

      <Space wrap>
        {classes?.map((clx) => (
          <Card
            loading={isLoading}
            key={clx}
            style={{
              width: 300,
              // height: "100%",
              marginTop: 16,
              backgroundColor: "#EEE",
            }}
            actions={[
              <PlusCircleOutlined
                key="add"
                onClick={() => handleOpenForm(clx)}
              />,
              <EditOutlined
                key="edit"
                // onClick={() => handleGetRoleUpdate(role.key)}
              />,
              <DeleteOutlined
                key="delete"
                // onClick={() => showDeleteConfirm(role.key)}
              />,
            ]}
          >
            <Skeleton loading={isLoading} active>
              <Meta title={clx} />
            </Skeleton>
          </Card>
        ))}
      </Space>

      {/* assign student to class */}
      <AssignStudentClass
        onOk={form.submit}
        onCancel={handleCloseForm}
        open={isOpenModal}
        onFinish={handleAssignStudent}
        form={form}
        initialValues={currentValues}
      />
    </>
  );
};
export default ClassList;
