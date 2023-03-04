import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Select, Modal, Image, Typography } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Table, Button } from "~/components";
import request from "~/utils/request";
import useFetch from "~/hooks/useFetch";

function HonourList() {
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      // render: (img) => <Image src={img} width={65} height={55} />,
      render: () => (
        <Image
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=573"
          alt="avatar"
          width={65}
          height={55}
        />
      ),
    },
    {
      title: "FPT ID",
      dataIndex: "fptId",
      key: "fptId",
      render: (fptId) => (
        <Typography.Text className="need-uppercase">{fptId}</Typography.Text>
      ),
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName) => (
        <Typography.Text className="need-capitalize">
          {fullName}
        </Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <a className="need-lowercase" href={`mailto:${email}`}>
          {email}
        </a>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      key: "",
      fptId: "",
      email: "",
      fullName: "",
      majorId: "",
      gender: "",
      status: "",
      dob: "",
      isActive: false,
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // GET PROGRAM LIST
  const { data: programList } = useFetch("program/all?pageNumber=1");
  // GET MAJOR LIST
  const { data: termList } = useFetch("term/filter?pageNumber=1&search");
  // GET MAJOR LIST
  const { data: majorList } = useFetch("major/filter?pageNumber=1&search");

  const getHonourList = async (values) => {
    if (values) {
      const { programId, termCode, majorId } = values;
      setIsLoading(true);
      try {
        const res = await request(
          `student/get/honorList/${programId}/${termCode}/${majorId}`
        );
        console.log(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    getHonourList();
  }, []);

  // handle close modal
  const [form] = Form.useForm();
  const handleCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={isOpenModal}
        onCancel={handleCloseModal}
        title="FILTER HONOURS"
        forceRender
        onOk={() => {
          form.submit();
          // setIsOpenModal(false);
          // form.resetFields();
        }}
      >
        <Form
          layout={"vertical"}
          form={form}
          onFinish={getHonourList}
          onKeyPress={(e) => {
            if (e.key === "Enter") form.submit();
          }}
        >
          <Form.Item
            label="Program"
            name={"programId"}
            rules={[
              {
                required: true,
                message: "Please select program!",
              },
            ]}
          >
            <Select allowClear>
              {programList?.data?.map((item) => (
                <Select.Option key={item.programId} value={item.programId}>
                  {item.programName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Term"
            name={"termCode"}
            rules={[
              {
                required: true,
                message: "Please select term!",
              },
            ]}
          >
            <Select allowClear>
              {termList?.data?.map((item) => (
                <Select.Option key={item.termCode} value={item.termCode}>
                  {item.termName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Major"
            name={"majorId"}
            rules={[
              {
                required: true,
                message: "Please select major!",
              },
            ]}
          >
            <Select allowClear>
              {majorList?.data?.map((item) => (
                <Select.Option key={item.majorId} value={item.majorId}>
                  {item.majorCode}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        caption="Honours List"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onOpenFilter={() => setIsOpenModal(true)}
      />
    </>
  );
}

export default HonourList;
