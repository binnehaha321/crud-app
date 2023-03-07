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
// import { ENGLISH, BTEC } from "~/constants/term";
import { toast } from "react-toastify";
import AddNewCardItem from "~/components/AddNewCardItem/AddNewCardItem";

const TermList = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [terms, setTerms] = useState([
    {
      key: "",
      termCode: "",
      termName: "",
      description: "",
    },
  ]);

  const getTermList = async () => {
    setLoading(true);
    try {
      const res = await request.get("term/all?pageNumber=1");
      const data = await res?.data?.data?.map((term) => {
        return {
          key: term?.termCode,
          termCode: term?.termCode,
          termName: term?.termName,
          description: term?.description,
        };
      });
      setTerms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTermList();
  }, []);

  // handle close modal
  const [formAddTerm] = Form.useForm();
  const handleCloseModal = () => {
    setIsOpenModal(false);
    formAddTerm.resetFields();
  };

  // handle add a new term
  const handleAddTerm = async (values) => {
    if (values) {
      if (!values.description) values.description = "No description...";
      try {
        const res = await post("term/add", values);
        setTerms([
          ...terms,
          {
            key: res?.data?.termCode,
            termCode: res?.data?.termCode,
            termName: res?.data?.termName,
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

  // handle delete a term
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await request.delete(`term/delete/${id}`);
      toast.success(await res?.data?.message);
      const newTermList = terms.filter((term) => term?.key !== id);
      setTerms(newTermList);
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
      title: "Are you sure to delete this term?",
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

  // update term
  const [isOpenUpdateTerm, setIsOpenUpdateTerm] = useState(false);
  const [formUpdate] = Form.useForm();
  const formUpdateRef = useRef();
  const [currentTermValues, setCurrentTermValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Get current term's data by id
  const handleGetTermUpdate = async (id) => {
    setIsOpenUpdateTerm(true);
    setSelectedId(id);
    try {
      const res = await get(`term/${id}`);
      const term = res?.data;
      setCurrentTermValues({
        key: term?.termId,
        termId: term?.termId,
        term: term?.termName,
        description: term?.description,
      });
      setIsOpenUpdateTerm(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // set values to current term's fields
    if (formUpdateRef.current) formUpdate.setFieldsValue(currentTermValues);
  }, [formUpdate, currentTermValues]);

  // handle update term
  const handleUpdateTerm = async (values) => {
    setLoading(true);
    try {
      const res = await request.put(`term/edit/${selectedId}`, values);
      const data = await res?.data;

      const index = terms.findIndex((item) => item.key === selectedId);

      setTerms([
        ...terms.slice(0, index),
        {
          ...terms[index],
          key: currentTermValues.termId,
          termId: values.termId || currentTermValues.termId,
          term: values.termName || currentTermValues.termName,
          description: values.description || currentTermValues.description,
        },
        ...terms.slice(index + 1),
      ]);

      toast.success(data?.message);
      setIsOpenUpdateTerm(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
      setIsOpenUpdateTerm(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ marginBlock: "1rem" }}>
          Term List
        </Typography.Title>
        <Btn type={"primary"} onClick={() => setIsOpenModal(true)}>
          ADD NEW TERM
        </Btn>
      </Space>
      <Divider style={{ margin: "0" }} />
      <Space wrap>
        {terms?.map((term) => (
          <Card
            loading={loading}
            key={term.termCode}
            style={{
              width: 300,
              height: "100%",
              marginTop: 16,
              backgroundColor: "#eee",
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined
                key="edit"
                onClick={() => handleGetTermUpdate(term.termCode)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => showDeleteConfirm(term.termCode)}
              />,
            ]}
          >
            <Skeleton loading={loading} active>
              <Meta title={term.termName} description={term.termCode} />
            </Skeleton>
          </Card>
        ))}
      </Space>
      {/* add */}
      <AddNewCardItem
        open={isOpenModal}
        onCancel={handleCloseModal}
        onFinish={handleAddTerm}
        name={"term"}
        form={formAddTerm}
        term
      />
      {/* update */}
      <Modal
        title="UPDATE A TERM"
        forceRender
        open={isOpenUpdateTerm}
        onOk={formUpdate.submit}
        onCancel={() => setIsOpenUpdateTerm(false)}
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
          onFinish={handleUpdateTerm}
          initialValues={currentTermValues}
          className="update-student"
        >
          <Space style={{ display: "flex" }} direction="vertical">
            <Form.Item
              label="Term Code"
              name="termCode"
              rules={[
                {
                  required: true,
                  message: "Please input a term code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Term"
              name="termName"
              rules={[
                {
                  required: true,
                  message: "Please input a term name!",
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
export default TermList;
