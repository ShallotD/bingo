import React from "react";
import { Typography, Card } from "antd";

const { Title } = Typography;

const DeferralHistory = () => {
  return (
    <div>
      <Title level={3}>Decision History</Title>
      <Card>
        {/* Decision history content */}
        <p>Decision history page coming soon...</p>
      </Card>
    </div>
  );
};

export default DeferralHistory;