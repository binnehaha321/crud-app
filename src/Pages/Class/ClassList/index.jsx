import { useEffect, useRef, useState } from "react";
import {
  Card,
  Skeleton,
  Space,
  Typography,
  Form,
  Button as Btn,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import request, { post } from "~/utils/request";
import AssignStudentClass from "../AssignStudentClass";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAssignModal,
  openAssignModalByClassCode,
} from "~/store/actions/studentClassAction";
import { useNavigate } from "react-router";

const ClassList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);

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
  const { fptId, classCode, isOpen } = useSelector(
    (state) => state.studentClass
  );
  const initialValues = { fptId, classCode };
  const dispatch = useDispatch();
  const handleCloseForm = () => {
    setIsOpenModal(false);
    if (isOpen) dispatch(closeAssignModal());
    setIsLoading(false);
    form.resetFields();
  };

  // handle open form
  const handleOpenForm = (code) => {
    setIsOpenModal(true);
    dispatch(openAssignModalByClassCode(code));
  };

  // handle assign student to class
  const handleAssignStudent = async (values) => {
    setIsLoading(true);
    try {
      const res = await post("studentClass/add", values);
      toast.success(await res?.data?.message);
      handleCloseForm();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      handleCloseForm();
    }
  };

  // handle get data update
  const handleGetDataUpdate = (id) => {};

  // remove student from class
  // const handleDelete = async (classCode) => {
  //   try {
  //     const res = await request.delete(`student/delete/${id}`);
  //     toast.success(await res?.data?.message);
  //     const newStudentList = data.filter((student) => student?.key !== id);
  //     setData(newStudentList);
  //   } catch (error) {
  //     toast.error(error?.data?.message);
  //     setIsLoading(false);
  //   }
  // };

  // Confirm modal
  // const showDeleteConfirm = (e, id) => {
  //   e.stopPropagation();
  //   Modal.confirm({
  //     title: "Are you sure delete this student?",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "Click No to cancel.",
  //     okText: "Yes",
  //     okType: "danger",
  //     cancelText: "No",

  //     onOk() {
  //       handleDelete(id);
  //     },
  //   });
  // };

  const navigate = useNavigate()

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
              marginTop: 16,
              backgroundColor: "#EEE",
            }}
            actions={[
              <EyeFilled key="view" onClick={() => navigate(`${clx}/student-list`)} />,
              <EditOutlined
                key="edit"
                // onClick={() => handleGetDataUpdate(clx)}
              />,
              <DeleteOutlined
                key="delete"
                // onClick={() => showDeleteConfirm(clx)}
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
        initialValues={initialValues}
      />
    </>
  );
};
export default ClassList;
