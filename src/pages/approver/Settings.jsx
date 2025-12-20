import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Settings = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: "#164679" }}>Settings</Title>
      <p>Settings content will be displayed here...</p>
    </div>
  );
};

export default Settings;