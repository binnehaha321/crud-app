import { useEffect, useRef, useState } from "react";
import {
  Card,
  Divider,
  Skeleton,
  Space,
  Typography,
  Button as Btn,
  Modal,
  Form,
  Input,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import request, { get, post } from "~/utils/request";
import Meta from "antd/lib/card/Meta";
import { ENGLISH, BTEC } from "~/constants/program";
import { toast } from "react-toastify";
import AddNewCardItem from "~/components/AddNewCardItem/AddNewCardItem";

const ProgramList = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [programs, setPrograms] = useState([
    {
      key: 0,
      programId: 0,
      programName: "",
      description: "",
    },
  ]);

  const getProgramList = async () => {
    setLoading(true);
    try {
      const res = await request.get("program/all?pageNumber=1");
      const data = await res?.data?.data?.map((program) => {
        return {
          key: program?.programId,
          programId: program?.programId,
          programName: program?.programName,
          description: program?.description,
        };
      });
      setPrograms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProgramList();
  }, []);

  // handle close modal
  const [formAddProgram] = Form.useForm();
  const handleCloseModal = () => {
    setIsOpenModal(false);
    formAddProgram.resetFields();
  };

  // handle add a new program
  const handleAddProgram = async (values) => {
    if (values) {
      if (!values.description) values.description = "No description...";
      try {
        const res = await post("program/add", values);
        setPrograms([
          ...programs,
          {
            key: res?.data?.roleId,
            programId: res?.data?.programId,
            programName: res?.data?.programName,
            description: res?.data?.description,
          },
        ]);

        toast.success(await res?.message);
        handleCloseModal();
      } catch (error) {
        console.log(error?.response?.data?.message);
        toast.error(await error?.response?.data?.message);
        throw new Error(error);
      }
    }
  };

  // handle delete a program
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await request.delete(`program/delete/${id}`);
      toast.success(await res?.data?.message);
      const newProgramList = programs.filter((program) => program?.key !== id);
      setPrograms(newProgramList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      setLoading(false);
    }
  };

  // Confirm modal
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this program?",
      icon: <ExclamationCircleOutlined />,
      content: "Click No to cancel.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        handleDelete(id);
      },
    });
  };

  // update program
  const [isOpenUpdateProgram, setIsOpenUpdateProgram] = useState(false);
  const [formUpdate] = Form.useForm();
  const formUpdateRef = useRef();
  const [currentProgramValues, setCurrentProgramValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Get current program's data by id
  const handleGetProgramUpdate = async (id) => {
    setIsOpenUpdateProgram(true);
    setSelectedId(id);
    try {
      const res = await get(`program/${id}`);
      const program = res?.data;
      setCurrentProgramValues({
        key: program?.programId,
        programId: program?.programId,
        program: program?.programName,
        description: program?.description,
      });
      setIsOpenUpdateProgram(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // set values to current program's fields
    if (formUpdateRef.current) formUpdate.setFieldsValue(currentProgramValues);
  }, [formUpdate, currentProgramValues]);

  // handle update program
  const handleUpdateProgram = async (values) => {
    setLoading(true);
    try {
      const res = await request.put(`program/edit/${selectedId}`, values);
      const data = await res?.data;

      const index = programs.findIndex((item) => item.key === selectedId);

      setPrograms([
        ...programs.slice(0, index),
        {
          ...programs[index],
          key: currentProgramValues.programId,
          programId: values.programId || currentProgramValues.programId,
          program: values.programName || currentProgramValues.programName,
          description: values.description || currentProgramValues.description,
        },
        ...programs.slice(index + 1),
      ]);

      toast.success(data?.message);
      setIsOpenUpdateProgram(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      setIsOpenUpdateProgram(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ marginBlock: "1rem" }}>
          Program List
        </Typography.Title>
        <Btn type={"primary"} onClick={() => setIsOpenModal(true)}>
          ADD NEW PROGRAM
        </Btn>
      </Space>
      <Divider style={{ margin: "0" }} />
      <Space wrap>
        {programs?.map((program) => (
          <Card
            loading={loading}
            key={program.programId}
            style={{
              width: 300,
              height: "100%",
              marginTop: 16,
              backgroundColor:
                program.programName === ENGLISH
                  ? "#fff2e8"
                  : program.programName === BTEC
                  ? "#e6f7ff"
                  : "#eee",
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined
                key="edit"
                onClick={() => handleGetProgramUpdate(program.programId)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => showDeleteConfirm(program.programId)}
              />,
            ]}
          >
            <Skeleton loading={loading} active>
              <Meta
                title={program.programName}
                description={program.description}
              />
            </Skeleton>
          </Card>
        ))}
      </Space>
      {/* add */}
      <AddNewCardItem
        open={isOpenModal}
        onCancel={handleCloseModal}
        onFinish={handleAddProgram}
        name={"program"}
        form={formAddProgram}
      />
      {/* update */}
      <Modal
        title="UPDATE A PROGRAM"
        forceRender
        open={isOpenUpdateProgram}
        onOk={formUpdate.submit}
        onCancel={() => setIsOpenUpdateProgram(false)}
      >
        <Form
          ref={formUpdateRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") formUpdate.submit();
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          form={formUpdate}
          onFinish={handleUpdateProgram}
          initialValues={currentProgramValues}
          className="update-student"
        >
          <Space style={{ display: "flex" }} direction="vertical">
            <Form.Item
              label="Program"
              name="program"
              rules={[
                {
                  required: true,
                  message: "Please input a program name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default ProgramList;
