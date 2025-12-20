import React from "react";
import {
  Button,
  Select,
  Typography,
  Divider
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

export default function ApproverSelector({
  approvers,
  updateApprover,
  addApprover,
  removeApprover,
  onSubmitDeferral,
  isSubmitting
}) {
  return (
    <>
      <Title level={4} style={{ color: "#2B1C67", marginBottom: 8 }}>
        Approver Selection
      </Title>


      <Divider style={{ margin: "16px 0" }} />

      {approvers.map((approver, index) => (
        <div key={index} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <Text strong style={{ fontSize: 13 }}>
              Approver {index + 1}
            </Text>
            {approvers.length > 1 && (
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeApprover(index)}
                style={{ padding: 0, fontSize: 11, height: "auto" }}
              >
                Remove
              </Button>
            )}
          </div>
          
          <Select
            value={approver}
            onChange={(value) => updateApprover(index, value)}
            style={{ width: "100%" }}
            placeholder="-- Choose Approver --"
            size="middle"
          >
            <Option value=""> Choose Approver </Option>
            <Option value="James Mwangi">James Mwangi</Option>
            <Option value="Grace Nduta">Grace Nduta</Option>
            <Option value="Patrick Maingi">Patrick Maingi</Option>
            <Option value="Sarah Wambui">Sarah Wambui</Option>
            <Option value="Anthony Kariuki">Anthony Kariuki</Option>
          </Select>
        </div>
      ))}

      <Button
        onClick={addApprover}
        style={{ 
          width: "100%", 
          marginBottom: 24,
          backgroundColor: "#1e40af",
          borderColor: "#1e40af",
          color: "white",
          fontWeight: "500",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1e3a8a";
          e.currentTarget.style.borderColor = "#1e3a8a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#1e40af";
          e.currentTarget.style.borderColor = "#1e40af";
        }}
      >
        <PlusOutlined /> Add Another Approver
      </Button>

      <Divider style={{ margin: "16px 0" }} />

      <Button
        onClick={onSubmitDeferral}
        loading={isSubmitting}
        block
        size="large"
        style={{
          backgroundColor: "#16a34a",
          borderColor: "#16a34a",
          color: "white",
          fontWeight: "bold",
          marginBottom: 8,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#15803d";
          e.currentTarget.style.borderColor = "#15803d";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#16a34a";
          e.currentTarget.style.borderColor = "#16a34a";
        }}
        disabled={approvers.filter(a => a !== "").length === 0}
      >
        {isSubmitting ? "Submitting..." : "Submit Deferral"}
      </Button>

      <div style={{ fontSize: 11, color: "#999", textAlign: "center" }}>
        <Text type="secondary">
          {approvers.filter(a => a !== "").length} approver(s) selected
        </Text>
      </div>
    </>
  );
}