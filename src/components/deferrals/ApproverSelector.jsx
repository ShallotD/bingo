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
  isSubmitting,
  onCancel
}) {
  const selectedCount = approvers.filter(a => a !== "").length;
  
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
                style={{ 
                  padding: 0, 
                  fontSize: 11, 
                  height: "auto",
                  color: "#ff4d4f" // Red for destructive action
                }}
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
          backgroundColor: "#1890ff", // Blue for add/action
          borderColor: "#1890ff",
          color: "white",
          fontWeight: "500",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#40a9ff";
          e.currentTarget.style.borderColor = "#40a9ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#1890ff";
          e.currentTarget.style.borderColor = "#1890ff";
        }}
      >
        <PlusOutlined /> Add Another Approver
      </Button>

      <Divider style={{ margin: "16px 0" }} />

      {/* Both buttons at the same level */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Button
          type="default"
          size="large"
          onClick={onCancel}
          style={{
            flex: 1,
            fontWeight: "bold",
            backgroundColor: "#f5f5f5", // Light gray for cancel
            borderColor: "#d9d9d9",
            color: "#595959"
          }}
          disabled={isSubmitting}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = "#e8e8e8";
              e.currentTarget.style.borderColor = "#bfbfbf";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.borderColor = "#d9d9d9";
            }
          }}
        >
          Cancel
        </Button>
        
        <Button
          onClick={onSubmitDeferral}
          loading={isSubmitting}
          size="large"
          type="primary"
          style={{
            flex: 1,
            backgroundColor: selectedCount > 0 ? "#52c41a" : "#d9d9d9", // Green when ready, gray when disabled
            borderColor: selectedCount > 0 ? "#52c41a" : "#d9d9d9",
            color: "white",
            fontWeight: "bold",
          }}
          disabled={selectedCount === 0}
          onMouseEnter={(e) => {
            if (selectedCount > 0) {
              e.currentTarget.style.backgroundColor = "#73d13d";
              e.currentTarget.style.borderColor = "#73d13d";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCount > 0) {
              e.currentTarget.style.backgroundColor = "#52c41a";
              e.currentTarget.style.borderColor = "#52c41a";
            }
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Deferral"}
        </Button>
      </div>

      <div style={{ fontSize: 11, color: "#999", textAlign: "center" }}>
        <Text type="secondary">
          {selectedCount} approver(s) selected
        </Text>
      </div>
    </>
  );
}