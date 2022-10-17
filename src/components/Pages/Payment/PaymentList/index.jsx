import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "~/components/Layout";
import moment from "moment";
import { SORT } from "~/assets/images/ActionIcons";
import EYE from "~/assets/images/Payment/eye.png";
import request from "~/utils/request";
import "./index.scss";
import { Typography } from "antd";

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
      title: "Payment Schedule",
      dataIndex: "paymentSchedule",
      key: "paymentSchedule",
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
      render: () => (
        <Button>
          <img src={EYE} alt="view" />
        </Button>
      ),
    },
  ];

  const [data, setData] = useState([
    {
      key: "",
      studentId: "",
      fullName: "",
      paymentSchedule: "",
      billNumber: 0,
      amountPaid: 0,
      balanceAmount: 0,
      date: "",
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  // GET PAYMENT LIST
  const handlePaymentDataList = (payments) => {
    let paymentData = {};
    return payments?.map((payment) => {
      paymentData = {
        key: payment?.id,
        studentId: payment?.studentId,
        paymentId: payment?.paymentId,
        fullName: payment?.fullName,
        paymentSchedule: payment?.paymentSchedule,
        billNumber: payment?.billNumber,
        amountPaid: payment?.amountPaid,
        balanceAmount: payment?.balanceAmount,
        date: moment(payment?.date).format("YYYY-MM-DD"),
      };
      return paymentData;
    });
  };

  const handleCallPaymentList = () => {
    request.get("payments?id=ALL").then((res) => {
      const payments = res?.data?.payments;
      const result = handlePaymentDataList(payments);
      setData(result);
    });
  };

  useEffect(() => {
    setIsLoaded(false);
    handleCallPaymentList();
    setIsLoaded(true);
  }, [isLoaded]);

  return (
    <Table caption="Payment Details" icon={SORT} columns={columns} data={data}>
      <Link to="./add" className="ant-btn ant-btn-primary">
        ADD NEW PAYMENT
      </Link>
    </Table>
  );
}

export default Payment;
