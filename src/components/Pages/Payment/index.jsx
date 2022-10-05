import Table from "~/components/Layout/Table";
import Button from "~/components/Layout/Button";
import { SORT } from "~/assets/images/StudentList";
import EYE from "~/assets/images/Payment/eye.png";
import "./index.scss";

function Payment() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
  const data = [
    {
      key: "1",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "John Brown",
      paymentSchedule: "First",
      billNumber: "0902340123",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "2",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=81",
      name: "Jim Green",
      paymentSchedule: "First",
      billNumber: "0382772823",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "3",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=83",
      name: "Joe Black",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "4",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=93",
      name: "Daniel Truong",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "5",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=85",
      name: "Brian Lee",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "6",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=86",
      name: "Joe Black",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "7",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=87",
      name: "John Smith",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "8",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=88",
      name: "Lewandoski",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "9",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=89",
      name: "Kylian Mbappe",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "10",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=90",
      name: "Lionel Messi",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
    {
      key: "11",
      avatar:
        "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=91",
      name: "David Brown",
      paymentSchedule: "First",
      billNumber: "0782992632",
      amountPaid: "4,000",
      balanceAmount: "300",
      date: "05/10/2022",
    },
  ];
  return (
    <Table
      caption="Payment Details"
      icon={SORT}
      columns={columns}
      data={data}
    ></Table>
  );
}

export default Payment;
