
// import React, { useState, useMemo } from "react";
// import { Table, Tag, Button, Input, Space } from "antd";
// import {
//   SearchOutlined,
//   EditOutlined,
//   PoweroffOutlined,
// } from "@ant-design/icons";

// import { getNextRole, getNextRoleLabel } from '../../components/admin/RoleUtils';

// const UserTable = ({ users, onToggleActive, onRoleChange }) => {
//   const [searchText, setSearchText] = useState("");

//   const filteredUsers = useMemo(() => {
//     if (!searchText.trim()) return users;

//     return users.filter((u) => {
//       const name = (u.name || "").toLowerCase();
//       const email = (u.email || "").toLowerCase();
//       const query = searchText.toLowerCase();
//       return name.includes(query) || email.includes(query);
//     });
//   }, [users, searchText]);

//   const columns = [
//     {
//       title: <span className="text-gray-700 dark:text-gray-300">Name</span>,
//       dataIndex: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       render: (name) => (
//         <span className="text-gray-900 dark:text-gray-100">{name}</span>
//       ),
//     },
//     {
//       title: <span className="text-gray-700 dark:text-gray-300">Email</span>,
//       dataIndex: "email",
//       sorter: (a, b) => a.email.localeCompare(b.email),
//       render: (email) => (
//         <span className="text-gray-700 dark:text-gray-300">{email}</span>
//       ),
//     },
//     {
//       title: <span className="text-gray-700 dark:text-gray-300">Role</span>,
//       dataIndex: "role",
//       filters: [
//         { text: "RM", value: "rm" },
//         { text: "CO Creator", value: "cocreator" },
//         { text: "CO Checker", value: "cochecker" },
//         { text: "Admin", value: "admin" },
//          { text: "Customer", value: "customer" },
//       ],
//       onFilter: (value, record) => record.role === value,
//       render: (role) => (
//         <Tag
//           color={
//             role === "admin"
//               ? "red"
//               : role === "cocreator"
//               ?
//               "green"
//                : role === "customer"
//               ? "blue"
//               : role === "cochecker"
//               ? "purple"
//               : "default"
//           }
//           className="capitalize dark:text-gray-200"
//         >
//           {role}
//         </Tag>
//       ),
//     },
//     {
//       title: <span className="text-gray-700 dark:text-gray-300">Status</span>,
//       dataIndex: "active",
//       filters: [
//         { text: "Active", value: true },
//         { text: "Inactive", value: false },
//       ],
//       onFilter: (value, record) => record.active === value,
//       render: (active) => (
//         <Tag color={active ? "green" : "volcano"} className="dark:text-gray-200">
//           {active ? "Active" : "Inactive"}
//         </Tag>
//       ),
//     },
//     {
//       title: <span className="text-gray-700 dark:text-gray-300">Actions</span>,
//       render: (_, record) => (
//         <Space>
//           <Button
//             size="small"
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => onRoleChange(record._id, getNextRole(record.role))}
//             className="bg-gray-700 dark:bg-gray-500 hover:bg-gray-800 border-none"
//           >
//             {getNextRoleLabel(record.role)}
//           </Button>

//           <Button
//             size="small"
//             danger={!record.active}
//             icon={<PoweroffOutlined />}
//             onClick={() => onToggleActive(record._id)}
//             className="dark:bg-gray-700 dark:text-gray-200"
//           >
//             {record.active ? "Deactivate" : "Activate"}
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
//       <div className="mb-4">
//         <Input
//           prefix={<SearchOutlined className="text-gray-400" />}
//           placeholder="Search name or email..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full sm:w-72 dark:bg-gray-800 dark:text-gray-200"
//           allowClear
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <Table
//           rowKey="_id"
//           columns={columns}
//           dataSource={filteredUsers}
//           pagination={{ pageSize: 6, showSizeChanger: false }}
//           bordered
//           className="rounded-lg dark:bg-gray-900 dark:text-gray-200"
//         />
//       </div>
//     </div>
//   );
// };

// export default UserTable;





// export default UserTable;
import { Table, Switch, Select, Input, Row, Col } from "antd";
import { useState } from "react";

const UserTable = ({ users = [], onToggleActive, onRoleChange }) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const [search, setSearch] = useState("");

  const filteredUsers = safeUsers.filter((u) => {
    const customerNumber = u?.customerNumber ?? "";
    const name = u?.name ?? "";
    const email = u?.email ?? "";
    const role = u?.role ?? "";

    const term = search.toLowerCase();

    return (
      customerNumber.toString().toLowerCase().includes(term) ||
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      role.toLowerCase().includes(term)
    );
  });

  const columns = [
    {
      title: "Customer No",
      dataIndex: "customerNumber", // FIXED
      render: (value) => value || "—",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value) => value || "—",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value) => value || "—",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role, record) => (
        <Select
          value={role || "customer"}
          style={{ width: 180 }}
          onChange={(r) => onRoleChange(record._id || record.id, r)}
          options={[
            { value: "rm", label: "Relationship Manager" },
            { value: "co-creator", label: "Co-Creator" },
            { value: "checker", label: "Checker" },
            { value: "customer", label: "Customer" },
          ]}
        />
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      render: (active, record) => (
        <Switch
          checked={!!active}
          onChange={() => onToggleActive(record._id || record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <Row className="mb-3">
        <Col span={8}>
          <Input
            placeholder="Search customerNumber / email / name / role"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Table
        rowKey={(record) => record._id || record.id}
        columns={columns}
        dataSource={filteredUsers}
      />
    </div>
  );
};

export default UserTable;