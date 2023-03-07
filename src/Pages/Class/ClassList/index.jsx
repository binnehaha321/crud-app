import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Skeleton,
  Space,
  Typography,
  Form,
  Button as Btn,
  Pagination,
} from "antd";
import { EyeFilled } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { get, post } from "~/utils/request";
import AssignStudentClass from "../AssignStudentClass";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeAssignModal } from "~/store/actions/studentClassAction";

const ClassList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  // get class list
  const getClassList = async (pageNumber) => {
    setIsLoading(true);
    try {
      const res = await get(`studentClass/all?pageNumber=${pageNumber}`);
      setClasses(await res?.data);
      setTotalItems(res?.pageNumber * 15);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getClassList(currentPage);
  }, [currentPage]);

  // add new class
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();

  // handle close form
  const dispatch = useDispatch();
  const handleCloseForm = () => {
    setIsOpenModal(false);
    dispatch(closeAssignModal());
    setIsLoading(false);
    form.resetFields();
  };

  // handle assign student to class
  const handleAssignStudent = async (values) => {
    setIsLoading(true);
    try {
      const res = await post("studentClass/add", values);
      toast.success(await res?.message);
      handleCloseForm();
    } catch (error) {
      if (error?.response?.status === 500)
        toast.error("The class does not exist!");
      toast.error(error?.response?.data?.message);
      handleCloseForm();
    }
  };

  // get init value (fptId)
  const { fptId } = useSelector((state) => state.studentClass);
  const initialValues = { fptId };

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
              <EyeFilled
                key="view"
                onClick={() => navigate(`${clx}/student-list`)}
              />,
            ]}
          >
            <Skeleton loading={isLoading} active>
              <Meta title={clx} />
            </Skeleton>
          </Card>
        ))}
      </Space>
      {!isLoading && (
        <Pagination
          current={currentPage}
          pageSize={15}
          showSizeChanger={false}
          total={totalItems}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
          style={{ marginTop: "2rem" }}
        />
      )}

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
