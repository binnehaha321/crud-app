import { Space, Image, Typography, Button as ButtonAnt } from "antd";
import Button from "~/components/Layout/Button";
import * as icon from "~/assets/images/StudentList";
import "./index.scss";
import Table from "~/components/Layout/Table";

const columns = [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (img) => <Image src={img} width={65} height={55} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => <Typography.Link>{email}</Typography.Link>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Enroll Number",
    dataIndex: "enrollNumber",
    key: "enrollNumber",
  },
  {
    title: "Date of admission",
    dataIndex: "dateOfAdmission",
    key: "dateOfAdmission",
  },
  {
    title: "",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button>
          <img src={icon.EDIT} alt="edit" />
        </Button>
        <Button>
          <img src={icon.DELETE} alt="delete" />
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "John Brown",
    email: "johnbrown@gmail.com",
    phone: "0902340123",
    enrollNumber: "190795",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "2",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=81",
    name: "Jim Green",
    email: "jumgreen@gmail.com",
    phone: "0382772823",
    enrollNumber: "187293",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "3",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=83",
    name: "Joe Black",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "4",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=93",
    name: "Daniel Truong",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "5",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=85",
    name: "Brian Lee",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "6",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=86",
    name: "Joe Black",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "7",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=87",
    name: "John Smith",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "8",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=88",
    name: "Lewandoski",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "9",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=89",
    name: "Kylian Mbappe",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "10",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=90",
    name: "Lionel Messi",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
  {
    key: "11",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=91",
    name: "David Brown",
    email: "joeblack@gmail.com",
    phone: "0782992632",
    enrollNumber: "178932",
    dateOfAdmission: "05/10/2022",
  },
];

function StudentList() {
  return (
    <Table
      caption="Student List"
      icon={icon.SORT}
      columns={columns}
      data={data}
    >
      <ButtonAnt type="primary">ADD NEW STUDENT</ButtonAnt>
    </Table>
  );
}

export default StudentList;
