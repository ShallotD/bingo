// src/pages/relationship-manager/Completed.jsx
import React, { useState, useMemo } from "react";
import { Table, Button, Divider, Tag, Spin, Empty, Badge } from "antd";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";

// RM-specific constants
const RM_GOLD = "#fcb116";
const RM_BLUE = "#164679";
const RM_PURPLE = "#7e6496";
const RM_GREEN = "#52c41a";

// RM-specific API hook (mock - replace with actual)
const useRMCompletedData = (userId) => {
  return {
    data: [
      {
        _id: "1",
        dclNo: "DCL-2024-001",
        customerNumber: "CUST-001",
        customerName: "ABC Corporation",
        loanType: "Business Loan",
        createdBy: { name: "Creator 1" },
        rmSubmittedAt: "2024-01-10T09:00:00Z",
        documents: [
          { uploadedBy: "rm123" },
          { uploadedBy: "rm123" }
        ],
        checkerApproved: true,
        completedAt: "2024-01-15T10:30:00Z"
      },
      {
        _id: "2",
        dclNo: "DCL-2024-003",
        customerNumber: "CUST-003",
        customerName: "XYZ Ltd",
        loanType: "Equipment Loan",
        createdBy: { name: "Creator 2" },
        rmSubmittedAt: "2024-01-11T11:00:00Z",
        documents: [
          { uploadedBy: "rm123" }
        ],
        checkerApproved: true,
        completedAt: "2024-01-16T14:00:00Z"
      }
    ],
    isLoading: false,
    error: null,
    refetch: () => console.log("Refetching RM data")
  };
};

const Completed = ({ userId }) => {
  const [selectedDCL, setSelectedDCL] = useState(null);
  
  const { data: rawData, isLoading, error, refetch } = useRMCompletedData(userId);
  
  const completedDCLs = useMemo(() => {
    if (!rawData) return [];
    return Array.isArray(rawData) ? rawData : [];
  }, [rawData]);
  
  const rmTableStyles = `
    .rm-completed-table .ant-table-thead > tr > th {
      background-color: #f7f7f7 !important;
      color: ${RM_BLUE} !important;
      font-weight: 700;
      border-bottom: 3px solid ${RM_GOLD} !important;
    }
    .rm-completed-table .ant-table-tbody > tr:hover > td {
      background-color: rgba(252, 177, 22, 0.1) !important;
    }
  `;
  
  const columns = [
    {
      title: "DCL No",
      dataIndex: "dclNo",
      width: 180,
      render: (text) => (
        <span style={{
          fontWeight: "bold",
          color: RM_BLUE,
          backgroundColor: `${RM_GOLD}20`,
          padding: "4px 8px",
          borderRadius: 4,
        }}>
          {text}
        </span>
      ),
    },
    {
      title: "Customer",
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.customerNumber}</div>
          <div style={{ fontSize: 11, color: "#666" }}>
            {record.customerName || "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      width: 140,
    },
    {
      title: "Creator",
      dataIndex: "createdBy",
      width: 120,
      render: (creator) => (
        <Badge 
          status="success" 
          text={creator?.name || "Unknown"} 
          style={{ fontSize: 12 }}
        />
      ),
    },
    {
      title: "My Submission",
      dataIndex: "rmSubmittedAt",
      width: 140,
      render: (date) => (
        <Tag style={{
          backgroundColor: `${RM_GOLD}20`,
          color: RM_GOLD,
          fontSize: 11,
          fontWeight: "bold",
          border: `1px solid ${RM_GOLD}`,
        }}>
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </Tag>
      ),
    },
    {
      title: "My Docs",
      dataIndex: "documents",
      width: 80,
      align: "center",
      render: (docs) => {
        const myDocs = Array.isArray(docs) 
          ? docs.filter(d => d.uploadedBy === userId)
          : [];
        return (
          <Tag color="blue" style={{ fontWeight: "bold" }}>
            {myDocs.length}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CheckCircleOutlined style={{ color: RM_GREEN }} />
          <span style={{ color: RM_GREEN, fontWeight: "bold" }}>
            {record.checkerApproved ? "Approved" : "Completed"}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => setSelectedDCL(record)}
          style={{
            backgroundColor: RM_GOLD,
            borderColor: RM_GOLD,
            color: "white",
            fontWeight: "bold",
          }}
        >
          View
        </Button>
      ),
    },
  ];
  
  // RM-specific stats
  const rmStats = useMemo(() => {
    const total = completedDCLs.length;
    const thisMonth = completedDCLs.filter(d => {
      if (!d.completedAt) return false;
      const date = new Date(d.completedAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && 
             date.getFullYear() === now.getFullYear();
    }).length;
    
    return { total, thisMonth };
  }, [completedDCLs]);
  
  return (
    <div style={{ padding: 16 }}>
      <style>{rmTableStyles}</style>
      
      <Divider style={{ margin: "12px 0" }}>My Completed DCLs</Divider>
      
      {/* RM Stats */}
      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 16,
        flexWrap: "wrap",
      }}>
        <div style={{
          padding: 12,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          minWidth: 150,
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 20, fontWeight: "bold", color: RM_BLUE }}>
            {rmStats.total}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>Total Completed</div>
        </div>
        
        <div style={{
          padding: 12,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          minWidth: 150,
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 20, fontWeight: "bold", color: RM_GREEN }}>
            {rmStats.thisMonth}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>This Month</div>
        </div>
      </div>
      
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin tip="Loading your completed DCLs..." />
        </div>
      ) : error ? (
        <Empty description="Failed to load completed DCLs" />
      ) : completedDCLs.length === 0 ? (
        <Empty description="You have no completed DCLs" />
      ) : (
        <Table
          columns={columns}
          dataSource={completedDCLs}
          rowKey="_id"
          className="rm-completed-table"
          pagination={{ pageSize: 10 }}
        />
      )}
      
      {selectedDCL && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 8,
            maxWidth: 500,
            width: "90%",
          }}>
            <h3 style={{ color: RM_BLUE }}>RM View: {selectedDCL.dclNo}</h3>
            <p><strong>Customer:</strong> {selectedDCL.customerNumber}</p>
            <p><strong>Customer Name:</strong> {selectedDCL.customerName}</p>
            <p><strong>Loan Type:</strong> {selectedDCL.loanType}</p>
            <p><strong>Creator:</strong> {selectedDCL.createdBy?.name}</p>
            <p><strong>My Submission Date:</strong> {selectedDCL.rmSubmittedAt ? new Date(selectedDCL.rmSubmittedAt).toLocaleDateString() : "N/A"}</p>
            <p><strong>My Documents:</strong> {
              Array.isArray(selectedDCL.documents) 
                ? selectedDCL.documents.filter(d => d.uploadedBy === userId).length
                : 0
            }</p>
            <Button 
              onClick={() => setSelectedDCL(null)}
              style={{ marginTop: 16, backgroundColor: RM_GOLD, borderColor: RM_GOLD }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Completed;