import { Space, Image, Typography } from "antd";
import { Link } from "react-router-dom";
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    // render: (email) => <Typography.Link>{email}</Typography.Link>,
  },
  {
    title: "Fullname",
    dataIndex: "fullname",
    key: "fullname",
    // render: (fullname) => <Typography.Text>{fullname}</Typography.Text>,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    // render: (gender) => <Typography.Text>{gender}</Typography.Text>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
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
    email: "johnbrown@gmail.com",
    fullname: "John Brown",
    username: "John Brown",
    gender: "Male",
    phone: "0902340123",
    role: "Admin",
  },
  {
    key: "2",
    avatar:
      "https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=256&h=256&q=81",
    email: "jumgreen@gmail.com",
    fullname: "Jim Green",
    username: "Jim Green",
    gender: "Female",
    phone: "0382772823",
    role: "User",
  },
];

function UserList() {
  return (
    <Table
      caption="User List"
      icon={icon.SORT}
      columns={columns}
      data={data}
    >
      <Link to="./add" className="ant-btn ant-btn-primary">
        ADD NEW USER
      </Link>
    </Table>
  );
}

export default UserList;
