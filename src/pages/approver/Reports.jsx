import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Reports = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ color: "#164679" }}>Reports</Title>
      <p>Reports content will be displayed here...</p>
    </div>
  );
};

export default Reports;