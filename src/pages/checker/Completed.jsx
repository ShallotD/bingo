// src/pages/checker/Completed.jsx
import React, { useState, useMemo } from "react";
import { Table, Button, Divider, Tag, Spin, Empty, Tooltip, Progress } from "antd";
import { CheckCircleOutlined, FileTextOutlined, ClockCircleOutlined } from "@ant-design/icons";

// Checker-specific constants
const CHECKER_TEAL = "#36cfc9";
const CHECKER_BLUE = "#164679";
const CHECKER_GREEN = "#52c41a";
const CHECKER_GOLD = "#faad14";
const CHECKER_RED = "#ff4d4f";

// Checker-specific API hook (mock - replace with actual)
const useCheckerCompletedData = (userId) => {
  return {
    data: [
      {
        _id: "1",
        dclNo: "DCL-2024-001",
        customerNumber: "CUST-001",
        customerName: "ABC Corporation",
        loanType: "Business Loan",
        loanAmount: 5000000,
        submittedForCheck: "2024-01-14T09:00:00Z",
        checkedAt: "2024-01-15T10:30:00Z",
        qualityScore: 95,
        checkerDecision: "approved"
      },
      {
        _id: "2",
        dclNo: "DCL-2024-002",
        customerNumber: "CUST-002",
        customerName: "XYZ Ltd",
        loanType: "Personal Loan",
        loanAmount: 1000000,
        submittedForCheck: "2024-01-13T14:00:00Z",
        checkedAt: "2024-01-14T11:30:00Z",
        qualityScore: 82,
        checkerDecision: "approved"
      },
      {
        _id: "3",
        dclNo: "DCL-2024-003",
        customerNumber: "CUST-003",
        customerName: "DEF Enterprises",
        loanType: "Equipment Loan",
        loanAmount: 3000000,
        submittedForCheck: "2024-01-12T10:00:00Z",
        checkedAt: "2024-01-13T09:45:00Z",
        qualityScore: 75,
        checkerDecision: "approved"
      }
    ],
    isLoading: false,
    error: null,
    refetch: () => console.log("Refetching checker data")
  };
};

const Completed = ({ userId }) => {
  const [selectedDCL, setSelectedDCL] = useState(null);
  
  const { data: rawData, isLoading, error, refetch } = useCheckerCompletedData(userId);
  
  const completedDCLs = useMemo(() => {
    if (!rawData) return [];
    return Array.isArray(rawData) ? rawData : [];
  }, [rawData]);
  
  const checkerTableStyles = `
    .checker-completed-table .ant-table-thead > tr > th {
      background-color: #f7f7f7 !important;
      color: ${CHECKER_BLUE} !important;
      font-weight: 700;
      border-bottom: 3px solid ${CHECKER_TEAL} !important;
    }
    .checker-completed-table .ant-table-tbody > tr:hover > td {
      background-color: rgba(54, 207, 201, 0.1) !important;
    }
  `;
  
  // Checker-specific stats
  const checkerStats = useMemo(() => {
    const total = completedDCLs.length;
    const approved = completedDCLs.filter(d => d.checkerDecision === 'approved').length;
    const avgScore = completedDCLs.reduce((sum, d) => sum + (d.qualityScore || 0), 0) / total || 0;
    
    // Calculate average check time
    let totalHours = 0;
    let count = 0;
    completedDCLs.forEach(d => {
      if (d.submittedForCheck && d.checkedAt) {
        const submitted = new Date(d.submittedForCheck);
        const checked = new Date(d.checkedAt);
        const hours = (checked - submitted) / (1000 * 60 * 60);
        totalHours += hours;
        count++;
      }
    });
    
    return {
      total,
      approved,
      approvalRate: total > 0 ? ((approved / total) * 100).toFixed(1) : 0,
      avgScore: avgScore.toFixed(1),
      avgCheckTime: count > 0 ? (totalHours / count).toFixed(1) : 0,
    };
  }, [completedDCLs]);
  
  const columns = [
    {
      title: "DCL No",
      dataIndex: "dclNo",
      width: 180,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircleOutlined style={{ color: CHECKER_GREEN }} />
          <span style={{
            fontWeight: "bold",
            color: CHECKER_BLUE,
            backgroundColor: `${CHECKER_TEAL}20`,
            padding: "4px 8px",
            borderRadius: 4,
          }}>
            {text}
          </span>
        </div>
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
      title: "Loan Details",
      width: 150,
      render: (_, record) => (
        <div>
          <div>{record.loanType}</div>
          {record.loanAmount && (
            <div style={{ fontSize: 11, color: "#666" }}>
              Ksh {record.loanAmount.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Check Date",
      dataIndex: "checkedAt",
      width: 120,
      render: (date) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : "N/A"}>
          <Tag color="blue" style={{ fontSize: 11 }}>
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Quality Score",
      dataIndex: "qualityScore",
      width: 120,
      render: (score) => {
        const normalizedScore = score || 0;
        const color = normalizedScore >= 90 ? CHECKER_GREEN : 
                     normalizedScore >= 70 ? CHECKER_GOLD : CHECKER_RED;
        
        return (
          <div style={{ textAlign: "center" }}>
            <Progress
              type="circle"
              percent={normalizedScore}
              size={40}
              strokeColor={color}
              format={(percent) => `${percent}`}
            />
            <div style={{ fontSize: 10, marginTop: 4 }}>Score</div>
          </div>
        );
      },
    },
    {
      title: "Check Time",
      width: 120,
      render: (_, record) => {
        if (!record.submittedForCheck || !record.checkedAt) return "N/A";
        
        const submitted = new Date(record.submittedForCheck);
        const checked = new Date(record.checkedAt);
        const hours = (checked - submitted) / (1000 * 60 * 60);
        
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ClockCircleOutlined />
            <span style={{ fontWeight: 500 }}>{hours.toFixed(1)}h</span>
          </div>
        );
      },
    },
    {
      title: "Decision",
      dataIndex: "checkerDecision",
      width: 100,
      render: (decision) => (
        <Tag color={decision === 'approved' ? 'success' : 'error'} style={{ fontWeight: "bold" }}>
          {decision === 'approved' ? 'Approved' : 'Rejected'}
        </Tag>
      ),
    },
    {
      title: "Actions",
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Audit Trail">
            <Button
              size="small"
              icon={<FileTextOutlined />}
              onClick={() => setSelectedDCL({...record, view: 'audit'})}
              style={{ color: CHECKER_TEAL }}
            />
          </Tooltip>
          <Button
            size="small"
            onClick={() => setSelectedDCL({...record, view: 'details'})}
            style={{
              backgroundColor: CHECKER_TEAL,
              borderColor: CHECKER_TEAL,
              color: "white",
            }}
          >
            Details
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <div style={{ padding: 16 }}>
      <style>{checkerTableStyles}</style>
      
      <Divider style={{ margin: "12px 0" }}>Completed DCLs</Divider>
      
      {/* Checker Stats Dashboard */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}>
        <div style={{
          padding: 16,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: CHECKER_BLUE }}>
            {checkerStats.total}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>Total Checked</div>
        </div>
        
        <div style={{
          padding: 16,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: CHECKER_GREEN }}>
            {checkerStats.approvalRate}%
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>Approval Rate</div>
        </div>
        
        <div style={{
          padding: 16,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: CHECKER_TEAL }}>
            {checkerStats.avgScore}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>Avg Quality Score</div>
        </div>
        
        <div style={{
          padding: 16,
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: CHECKER_GOLD }}>
            {checkerStats.avgCheckTime}h
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>Avg Check Time</div>
        </div>
      </div>
      
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin tip="Loading completed DCLs..." />
        </div>
      ) : error ? (
        <Empty description="Failed to load completed DCLs" />
      ) : completedDCLs.length === 0 ? (
        <Empty description="No completed DCLs found" />
      ) : (
        <Table
          columns={columns}
          dataSource={completedDCLs}
          rowKey="_id"
          className="checker-completed-table"
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
            <h3 style={{ color: CHECKER_BLUE }}>
              {selectedDCL.view === 'audit' ? 'Audit Trail' : 'Checker Details'}: {selectedDCL.dclNo}
            </h3>
            
            {selectedDCL.view === 'details' ? (
              <>
                <p><strong>Customer:</strong> {selectedDCL.customerNumber}</p>
                <p><strong>Customer Name:</strong> {selectedDCL.customerName}</p>
                <p><strong>Loan Type:</strong> {selectedDCL.loanType}</p>
                <p><strong>Loan Amount:</strong> Ksh {selectedDCL.loanAmount?.toLocaleString() || "N/A"}</p>
                <p><strong>Quality Score:</strong> {selectedDCL.qualityScore || "N/A"}</p>
                <p><strong>Decision:</strong> 
                  <Tag color={selectedDCL.checkerDecision === 'approved' ? 'success' : 'error'} style={{ marginLeft: 8 }}>
                    {selectedDCL.checkerDecision === 'approved' ? 'Approved' : 'Rejected'}
                  </Tag>
                </p>
                <p><strong>Check Date:</strong> {selectedDCL.checkedAt ? new Date(selectedDCL.checkedAt).toLocaleString() : "N/A"}</p>
              </>
            ) : (
              <>
                <p><strong>Audit Trail for:</strong> {selectedDCL.dclNo}</p>
                <div style={{ 
                  backgroundColor: "#f5f5f5", 
                  padding: 12, 
                  borderRadius: 4,
                  marginTop: 8,
                  maxHeight: 200,
                  overflowY: 'auto'
                }}>
                  <p>✓ Created by Creator on 2024-01-10</p>
                  <p>✓ Assigned to RM on 2024-01-11</p>
                  <p>✓ Documents uploaded by RM on 2024-01-12</p>
                  <p>✓ Reviewed by Creator on 2024-01-13</p>
                  <p>✓ Final check by Checker on 2024-01-14</p>
                  <p>✓ Completed on 2024-01-15</p>
                </div>
              </>
            )}
            
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <Button 
                onClick={() => setSelectedDCL(null)}
                style={{ backgroundColor: CHECKER_TEAL, borderColor: CHECKER_TEAL, color: "white" }}
              >
                Close
              </Button>
              {selectedDCL.view === 'details' && (
                <Button 
                  onClick={() => setSelectedDCL({...selectedDCL, view: 'audit'})}
                  icon={<FileTextOutlined />}
                >
                  View Audit Trail
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Completed;