import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "~/components/Layout";
import { Tag, Typography } from "antd";
import moment from "moment";
import { SORT } from "~/assets/images/ActionIcons";
import EYE from "~/assets/images/Payment/eye.png";
import request from "~/utils/request";

function Payment() {
  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      render: (studentId) => (
        <Typography.Text className="need-uppercase">
          {studentId}
        </Typography.Text>
      ),
    },
    {
      title: "Payment Schedule",
      dataIndex: "paymentSchedule",
      key: "paymentSchedule",
      render: (paymentSchedule) => (
        <Tag
          color={
            paymentSchedule === "First"
              ? "volcano"
              : paymentSchedule === "Second"
              ? "blue"
              : paymentSchedule === "Third"
              ? "green"
              : "red"
          }
        >
          {paymentSchedule}
        </Tag>
      ),
    },
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },
    {
      title: "Balance Amount",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "",
      key: "view",
      render: (record) => (
        <Link to={`${record.studentId}`}>
          <img src={EYE} alt="view-detail" />
        </Link>
      ),
    },
  ];

  const [data, setData] = useState([
    {
      key: "",
      studentId: "",
      paymentSchedule: "",
      billNumber: 0,
      amountPaid: 0,
      balanceAmount: 0,
      date: "",
    },
  ]);

  // GET PAYMENT LIST
  const handlePaymentDataList = (payments) => {
    let paymentData = {};
    return payments?.map((payment) => {
      paymentData = {
        key: payment?.paymentId,
        studentId: payment?.studentId,
        paymentId: payment?.paymentId,
        paymentSchedule: payment?.paymentSchedule,
        billNumber: payment?.billNumber,
        amountPaid: payment?.amountPaid,
        balanceAmount: payment?.balanceAmount,
        date: moment(payment?.paymentDate).format("YYYY-MM-DD"),
      };
      return paymentData;
    });
  };

  const handleCallPaymentList = () => {
    request.get("payments").then((res) => {
      const payments = res?.data?.payments;
      const result = handlePaymentDataList(payments);
      setData(result);
    });
  };

  useEffect(() => {
    handleCallPaymentList();
  }, []);

  return (
    <Table
      caption="Payment List"
      icon={SORT}
      columns={columns}
      dataSource={data}
    >
      <Link to="./add" className="ant-btn ant-btn-primary">
        ADD NEW PAYMENT
      </Link>
    </Table>
  );
}

export default Payment;
