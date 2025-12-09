// // // import React, { useState } from "react";
// // // import { Button, Divider, Table, Tag } from "antd";
// // // import ChecklistsPage from "./ChecklistsPage.jsx"; // Same import as ActiveDCLs
// // // import ReviewChecklistModal from "../../components/modals/CheckerReviewChecklistModal.jsx"; // Same import as ActiveDCLs
// // // import { useGetChecklistsQuery } from "../../api/checklistApi.js" // Same import

// // // // Theme Colors
// // // const PRIMARY_BLUE = "#164679";
// // // const ACCENT_LIME = "#b5d334";
// // // const HIGHLIGHT_GOLD = "#fcb116";
// // // const LIGHT_YELLOW = "#fcd716";
// // // const SECONDARY_PURPLE = "#7e6496";

// // // const CompletedDCLs = ({ userId }) => {
// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [selectedChecklist, setSelectedChecklist] = useState(null);

// // //   const { data: checklists = [], refetch } = useGetChecklistsQuery();

// // //   // Show checklists that have been completed (approved/rejected) by the co-checker
// // //   const completedChecklists = checklists.filter(
// // //     (c) =>
// // //       c.assignedToCoChecker?._id === userId &&
// // //       (c.status === "approved" || c.status === "rejected")
// // //   );

// // //   // Custom table styles (same as ActiveDCLs)
// // //   const customTableStyles = `
// // //     .ant-table-wrapper { border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08); border: 1px solid #e0e0e0; }
// // //     .ant-table-thead > tr > th { background-color: #f7f7f7 !important; color: ${PRIMARY_BLUE} !important; font-weight: 700; font-size: 15px; padding: 16px 16px !important; border-bottom: 3px solid ${ACCENT_LIME} !important; border-right: none !important; }
// // //     .ant-table-tbody > tr > td { border-bottom: 1px solid #f0f0f0 !important; border-right: none !important; padding: 14px 16px !important; font-size: 14px; color: #333; }
// // //     .ant-table-tbody > tr.ant-table-row:hover > td { background-color: rgba(181, 211, 52, 0.1) !important; cursor: pointer; }
// // //     .ant-table-bordered .ant-table-container, .ant-table-bordered .ant-table-tbody > tr > td, .ant-table-bordered .ant-table-thead > tr > th { border: none !important; }
// // //     .ant-pagination .ant-pagination-item-active { background-color: ${ACCENT_LIME} !important; border-color: ${ACCENT_LIME} !important; }
// // //     .ant-pagination .ant-pagination-item-active a { color: ${PRIMARY_BLUE} !important; font-weight: 600; }
// // //     .ant-pagination .ant-pagination-item:hover { border-color: ${ACCENT_LIME} !important; }
// // //     .ant-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
// // //     .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link { color: ${ACCENT_LIME} !important; }
// // //     .ant-pagination .ant-pagination-options .ant-select-selector { border-radius: 8px !important; }
// // //   `;

// // //   const columns = [
// // //     {
// // //       title: "DCL No",
// // //       dataIndex: "dclNo",
// // //       width: 200,
// // //       render: (text) => <span style={{ fontWeight: "bold", color: PRIMARY_BLUE }}>{text}</span>,
// // //     },
// // //     {
// // //       title: "Title",
// // //       dataIndex: "title",
// // //       width: 180,
// // //       render: (text) => <span style={{ color: SECONDARY_PURPLE }}>{text}</span>,
// // //     },
// // //     { title: "Loan Type", dataIndex: "loanType", width: 140 },
// // //     {
// // //       title: "Assigned RM",
// // //       dataIndex: "assignedToRM",
// // //       width: 120,
// // //       render: (rm) => <span style={{ color: PRIMARY_BLUE, fontWeight: "500" }}>{rm?.name || "Not Assigned"}</span>,
// // //     },
// // //     {
// // //       title: "# Docs",
// // //       dataIndex: "documents",
// // //       width: 80,
// // //       align: "center",
// // //       render: (docs) => (
// // //         <Tag
// // //           color={LIGHT_YELLOW}
// // //           style={{ fontSize: 12, borderRadius: 999, fontWeight: "bold", color: PRIMARY_BLUE, border: `1px solid ${HIGHLIGHT_GOLD}` }}
// // //         >
// // //           {docs.length}
// // //         </Tag>
// // //       ),
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "status",
// // //       width: 120,
// // //       render: (status) => {
// // //         let tagText = status === "approved" ? "Approved" : "Rejected";
// // //         let bgColor = status === "approved" ? ACCENT_LIME : HIGHLIGHT_GOLD;

// // //         return (
// // //           <Tag
// // //             color={bgColor}
// // //             style={{
// // //               fontSize: 12,
// // //               borderRadius: 999,
// // //               fontWeight: "bold",
// // //               padding: "4px 8px",
// // //               color: PRIMARY_BLUE,
// // //               backgroundColor: bgColor + "40",
// // //               borderColor: bgColor,
// // //             }}
// // //           >
// // //             {tagText}
// // //           </Tag>
// // //         );
// // //       },
// // //     },
// // //     {
// // //       title: "Actions",
// // //       width: 100,
// // //       render: (_, record) => (
// // //         <Button
// // //           size="small"
// // //           type="link"
// // //           onClick={() => setSelectedChecklist(record)}
// // //           style={{
// // //             color: SECONDARY_PURPLE,
// // //             fontWeight: "bold",
// // //             fontSize: 13,
// // //             borderRadius: 6,
// // //             "--antd-wave-shadow-color": ACCENT_LIME,
// // //           }}
// // //         >
// // //           View
// // //         </Button>
// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <div style={{ padding: 16 }}>
// // //       {drawerOpen && (
// // //         <ChecklistsPage
// // //           open={drawerOpen}
// // //           onClose={() => {
// // //             setDrawerOpen(false);
// // //             refetch();
// // //           }}
// // //           coCreatorId={userId}
// // //         />
// // //       )}

// // //       <Divider style={{ margin: "12px 0" }}>Completed Checklists</Divider>

// // //       <style>{customTableStyles}</style>

// // //       <Table
// // //         columns={columns}
// // //         dataSource={completedChecklists}
// // //         rowKey="_id"
// // //         size="large"
// // //         pagination={{ pageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "20", "50"], position: ["bottomCenter"] }}
// // //         rowClassName={(record, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
// // //       />

// // //       {selectedChecklist && (
// // //         <ReviewChecklistModal
// // //           checklist={selectedChecklist}
// // //           open={!!selectedChecklist}
// // //           onClose={() => setSelectedChecklist(null)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CompletedDCLs;
// // import React, { useState } from "react";
// // import { Table, Button, Divider, Tag } from "antd";
// // import ChecklistsPage from "./ChecklistsPage.jsx";
// // import CheckerReviewChecklistModal from "../../components/modals/CheckerReviewChecklistModal.jsx";
// // import { useGetChecklistsQuery } from "../../api/checklistApi";

// // const PRIMARY_BLUE = "#164679";
// // const SECONDARY_PURPLE = "#7e6496";
// // const LIGHT_GREEN = "#d4edda";
// // const HIGHLIGHT_YELLOW = "#fff3cd";

// // const CompletedDCLs = ({ userId }) => {
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [selectedChecklist, setSelectedChecklist] = useState(null);

// //   const { data: checklists = [], refetch, isLoading, isError } = useGetChecklistsQuery();

// //   // Filter for approved checklists
// //   const myCompleted = checklists.filter(c => c.status === "approved");

// //   const columns = [
// //     {
// //       title: "DCL No",
// //       dataIndex: "dclNo",
// //       render: (text, record) => (
// //         <span style={{
// //           fontWeight: "bold",
// //           color: PRIMARY_BLUE,
// //           backgroundColor: record.createdBy?._id === userId ? HIGHLIGHT_YELLOW : "transparent",
// //           padding: "2px 6px",
// //           borderRadius: 4
// //         }}>
// //           {text}
// //         </span>
// //       ),
// //     },
// //     {
// //       title: "Customer Number",
// //       dataIndex: "customerNumber",
// //       render: (text) => <span style={{ color: SECONDARY_PURPLE }}>{text}</span>,
// //     },
// //     {
// //       title: "Loan Type",
// //       dataIndex: "loanType",
// //     },
// //     {
// //       title: "Assigned RM",
// //       dataIndex: "assignedToRM",
// //       render: (rm) => <span style={{ color: PRIMARY_BLUE }}>{rm?.name || "Not Assigned"}</span>,
// //     },
// //     {
// //       title: "# Docs",
// //       dataIndex: "documents",
// //       render: (docs) => (
// //         <span style={{
// //           backgroundColor: LIGHT_GREEN,
// //           padding: "2px 8px",
// //           borderRadius: 12,
// //           fontWeight: "bold",
// //         }}>
// //           {docs.length}
// //         </span>
// //       ),
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       render: () => <Tag color="green">Completed</Tag>,
// //     },
// //     {
// //       title: "Actions",
// //       render: (_, record) => (
// //         <Button
// //           size="small"
// //           type="link"
// //           style={{ color: SECONDARY_PURPLE, fontWeight: "bold" }}
// //           onClick={() => setSelectedChecklist(record)}
// //         >
// //           View
// //         </Button>
// //       ),
// //     },
// //   ];

// //   if (isLoading) return <div>Loading completed DCLs...</div>;
// //   if (isError) return <div>Error loading completed DCLs.</div>;

// //   return (
// //     <div style={{ padding: 16 }}>
// //       {drawerOpen && (
// //         <ChecklistsPage
// //           open={drawerOpen}
// //           onClose={() => {
// //             setDrawerOpen(false);
// //             refetch();
// //           }}
// //           coCreatorId={userId}
// //         />
// //       )}

// //       <Divider style={{ margin: "12px 0" }}>Completed DCLs</Divider>

// //       <Table
// //         columns={columns}
// //         dataSource={myCompleted}
// //         rowKey="_id"
// //         pagination={{ pageSize: 5, showSizeChanger: true }}
// //       />

// //       {selectedChecklist && (
// //         <CheckerReviewChecklistModal
// //           checklist={selectedChecklist}
// //           open={!!selectedChecklist}
// //           onClose={() => {
// //             setSelectedChecklist(null);
// //             refetch();
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default CompletedDCLs;



// // src/pages/checker/Completed.jsx
// import React, { useState } from "react";
// import { 
//   Table, 
//   Button, 
//   Divider, 
//   Tag, 
//   Spin, 
//   Empty, 
//   Tooltip, 
//   Progress,
//   Card,
//   Row,
//   Col,
//   Statistic
// } from "antd";
// import { 
//   CheckCircleOutlined, 
//   FileTextOutlined, 
//   ClockCircleOutlined,
//   UserOutlined,
//   DollarOutlined,
//   SafetyCertificateOutlined
// } from "@ant-design/icons";

// // Checker-specific theme colors
// const CHECKER_TEAL = "#36cfc9";
// const CHECKER_BLUE = "#164679";
// const CHECKER_GREEN = "#52c41a";
// const CHECKER_GOLD = "#faad14";
// const CHECKER_RED = "#ff4d4f";
// const CHECKER_LIME = "#b5d334";

// // Mock API hook for Checker Completed DCLs
// const useCheckerCompletedData = (userId) => {
//   const [data, setData] = useState([
//     {
//       _id: "1",
//       dclNo: "DCL-2024-001",
//       customerNumber: "CUST-001",
//       customerName: "ABC Corporation",
//       loanType: "Business Loan",
//       loanAmount: 5000000,
//       submittedForCheck: "2024-01-14T09:00:00Z",
//       checkedAt: "2024-01-15T10:30:00Z",
//       qualityScore: 95,
//       checkerDecision: "approved",
//       checkerName: "John Doe",
//       documentsCount: 12
//     },
//     {
//       _id: "2",
//       dclNo: "DCL-2024-002",
//       customerNumber: "CUST-002",
//       customerName: "XYZ Ltd",
//       loanType: "Personal Loan",
//       loanAmount: 1000000,
//       submittedForCheck: "2024-01-13T14:00:00Z",
//       checkedAt: "2024-01-14T11:30:00Z",
//       qualityScore: 82,
//       checkerDecision: "approved",
//       checkerName: "Jane Smith",
//       documentsCount: 8
//     },
//     {
//       _id: "3",
//       dclNo: "DCL-2024-003",
//       customerNumber: "CUST-003",
//       customerName: "DEF Enterprises",
//       loanType: "Equipment Loan",
//       loanAmount: 3000000,
//       submittedForCheck: "2024-01-12T10:00:00Z",
//       checkedAt: "2024-01-13T09:45:00Z",
//       qualityScore: 75,
//       checkerDecision: "approved",
//       checkerName: "Mike Johnson",
//       documentsCount: 15
//     },
//     {
//       _id: "4",
//       dclNo: "DCL-2024-004",
//       customerNumber: "CUST-004",
//       customerName: "GHI Manufacturers",
//       loanType: "Mortgage Loan",
//       loanAmount: 8000000,
//       submittedForCheck: "2024-01-11T11:00:00Z",
//       checkedAt: "2024-01-12T16:20:00Z",
//       qualityScore: 88,
//       checkerDecision: "approved",
//       checkerName: "Sarah Williams",
//       documentsCount: 22
//     }
//   ]);

//   return {
//     data,
//     isLoading: false,
//     error: null,
//     refetch: () => {
//       console.log("Refetching checker completed data");
//       // In real app, this would fetch from API
//     }
//   };
// };

// // ✅ CHANGED THIS: Renamed from CompletedDCLs to Completed
// const Completed = ({ userId }) => {
//   const [selectedDCL, setSelectedDCL] = useState(null);
//   const { data: rawData, isLoading, error, refetch } = useCheckerCompletedData(userId);

//   // Calculate checker statistics
//   const stats = React.useMemo(() => {
//     const total = rawData.length;
//     const approved = rawData.filter(d => d.checkerDecision === 'approved').length;
//     const avgScore = rawData.reduce((sum, d) => sum + (d.qualityScore || 0), 0) / total || 0;
    
//     // Calculate average check time
//     let totalHours = 0;
//     let count = 0;
//     rawData.forEach(d => {
//       if (d.submittedForCheck && d.checkedAt) {
//         const submitted = new Date(d.submittedForCheck);
//         const checked = new Date(d.checkedAt);
//         const hours = (checked - submitted) / (1000 * 60 * 60);
//         totalHours += hours;
//         count++;
//       }
//     });

//     return {
//       total,
//       approved,
//       approvalRate: total > 0 ? ((approved / total) * 100).toFixed(1) : 0,
//       avgScore: avgScore.toFixed(1),
//       avgCheckTime: count > 0 ? (totalHours / count).toFixed(1) : 0,
//       totalLoanAmount: rawData.reduce((sum, d) => sum + (d.loanAmount || 0), 0)
//     };
//   }, [rawData]);

//   const columns = [
//     {
//       title: "DCL No",
//       dataIndex: "dclNo",
//       width: 180,
//       render: (text) => (
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <CheckCircleOutlined style={{ color: CHECKER_GREEN }} />
//           <span style={{
//             fontWeight: "bold",
//             color: CHECKER_BLUE,
//             backgroundColor: `${CHECKER_TEAL}20`,
//             padding: "4px 8px",
//             borderRadius: 4,
//           }}>
//             {text}
//           </span>
//         </div>
//       ),
//     },
//     {
//       title: "Customer",
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div style={{ fontWeight: 500, color: CHECKER_BLUE }}>{record.customerNumber}</div>
//           <div style={{ fontSize: 12, color: "#666" }}>
//             {record.customerName || "N/A"}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Loan Details",
//       width: 150,
//       render: (_, record) => (
//         <div>
//           <div style={{ fontWeight: 500 }}>{record.loanType}</div>
//           {record.loanAmount && (
//             <div style={{ fontSize: 11, color: CHECKER_GOLD }}>
//               Ksh {record.loanAmount.toLocaleString()}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Documents",
//       dataIndex: "documentsCount",
//       width: 100,
//       render: (count) => (
//         <Tag color={CHECKER_LIME} style={{ fontWeight: "bold" }}>
//           {count} docs
//         </Tag>
//       ),
//     },
//     {
//       title: "Check Date",
//       dataIndex: "checkedAt",
//       width: 120,
//       render: (date) => (
//         <Tooltip title={date ? new Date(date).toLocaleString() : "N/A"}>
//           <Tag color="blue" style={{ fontSize: 11 }}>
//             {date ? new Date(date).toLocaleDateString() : "N/A"}
//           </Tag>
//         </Tooltip>
//       ),
//     },
//     {
//       title: "Quality Score",
//       dataIndex: "qualityScore",
//       width: 120,
//       render: (score) => {
//         const normalizedScore = score || 0;
//         const color = normalizedScore >= 90 ? CHECKER_GREEN : 
//                      normalizedScore >= 70 ? CHECKER_GOLD : CHECKER_RED;
        
//         return (
//           <div style={{ textAlign: "center" }}>
//             <Progress
//               type="circle"
//               percent={normalizedScore}
//               size={40}
//               strokeColor={color}
//               format={(percent) => `${percent}`}
//             />
//             <div style={{ fontSize: 10, marginTop: 4 }}>Score</div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "Check Time",
//       width: 120,
//       render: (_, record) => {
//         if (!record.submittedForCheck || !record.checkedAt) return "N/A";
        
//         const submitted = new Date(record.submittedForCheck);
//         const checked = new Date(record.checkedAt);
//         const hours = (checked - submitted) / (1000 * 60 * 60);
        
//         return (
//           <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             <ClockCircleOutlined />
//             <span style={{ fontWeight: 500 }}>{hours.toFixed(1)}h</span>
//           </div>
//         );
//       },
//     },
//     {
//       title: "Decision",
//       dataIndex: "checkerDecision",
//       width: 100,
//       render: (decision) => (
//         <Tag 
//           color={decision === 'approved' ? 'success' : 'error'} 
//           style={{ fontWeight: "bold" }}
//         >
//           {decision === 'approved' ? 'Approved' : 'Rejected'}
//         </Tag>
//       ),
//     },
//     {
//       title: "Actions",
//       width: 120,
//       render: (_, record) => (
//         <div style={{ display: "flex", gap: 8 }}>
//           <Tooltip title="View Details">
//             <Button
//               size="small"
//               onClick={() => setSelectedDCL({...record, view: 'details'})}
//               style={{
//                 backgroundColor: CHECKER_TEAL,
//                 borderColor: CHECKER_TEAL,
//                 color: "white",
//                 fontSize: 12,
//                 padding: "2px 8px",
//                 height: 28
//               }}
//             >
//               View
//             </Button>
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   const checkerTableStyles = `
//     .checker-completed-table .ant-table-thead > tr > th {
//       background-color: #f7f7f7 !important;
//       color: ${CHECKER_BLUE} !important;
//       font-weight: 700;
//       border-bottom: 3px solid ${CHECKER_TEAL} !important;
//       padding: 16px 16px !important;
//     }
//     .checker-completed-table .ant-table-tbody > tr:hover > td {
//       background-color: rgba(54, 207, 201, 0.1) !important;
//       cursor: pointer;
//     }
//     .checker-completed-table .ant-table-tbody > tr > td {
//       padding: 14px 16px !important;
//       border-bottom: 1px solid #f0f0f0 !important;
//     }
//   `;

//   if (isLoading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//         <Spin tip="Loading completed DCLs..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Empty 
//         description="Failed to load completed DCLs" 
//         style={{ marginTop: 40 }}
//       />
//     );
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <style>{checkerTableStyles}</style>

//       {/* Header */}
//       <Card
//         style={{ 
//           marginBottom: 24,
//           borderRadius: 8,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           borderLeft: `4px solid ${CHECKER_TEAL}`
//         }}
//         bodyStyle={{ padding: 16 }}
//       >
//         <Row justify="space-between" align="middle">
//           <Col>
//             <h2 style={{ margin: 0, color: CHECKER_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
//               Completed DCLs
//               <Tag color={CHECKER_TEAL} style={{ fontSize: 14, fontWeight: "bold" }}>
//                 {stats.total} Completed
//               </Tag>
//             </h2>
//             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
//               DCLs you have checked and completed
//             </p>
//           </Col>
//         </Row>
//       </Card>

//       {/* Stats Dashboard */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ textAlign: "center", borderRadius: 8 }}>
//             <Statistic
//               title="Total Checked"
//               value={stats.total}
//               prefix={<UserOutlined />}
//               valueStyle={{ color: CHECKER_BLUE }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ textAlign: "center", borderRadius: 8 }}>
//             <Statistic
//               title="Approval Rate"
//               value={stats.approvalRate}
//               suffix="%"
//               prefix={<SafetyCertificateOutlined />}
//               valueStyle={{ color: CHECKER_GREEN }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ textAlign: "center", borderRadius: 8 }}>
//             <Statistic
//               title="Avg Quality Score"
//               value={stats.avgScore}
//               suffix="/100"
//               prefix={<CheckCircleOutlined />}
//               valueStyle={{ color: CHECKER_TEAL }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ textAlign: "center", borderRadius: 8 }}>
//             <Statistic
//               title="Avg Check Time"
//               value={stats.avgCheckTime}
//               suffix="hours"
//               prefix={<ClockCircleOutlined />}
//               valueStyle={{ color: CHECKER_GOLD }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Divider style={{ margin: "12px 0", color: CHECKER_BLUE, fontWeight: 600 }}>
//         Completed Checklist ({rawData.length} items)
//       </Divider>

//       {/* Table */}
//       {rawData.length === 0 ? (
//         <Empty 
//           description={
//             <div>
//               <p style={{ fontSize: 16, marginBottom: 8 }}>No completed DCLs found</p>
//               <p style={{ color: "#999" }}>
//                 Completed DCLs will appear here once you finish reviewing them
//               </p>
//             </div>
//           } 
//           style={{ padding: 40 }} 
//         />
//       ) : (
//         <div className="checker-completed-table">
//           <Table 
//             columns={columns} 
//             dataSource={rawData} 
//             rowKey="_id"
//             size="middle"
//             pagination={{ 
//               pageSize: 10, 
//               showSizeChanger: true, 
//               pageSizeOptions: ["10", "20", "50"], 
//               position: ["bottomCenter"],
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} DCLs`
//             }}
//             scroll={{ x: 1100 }}
//           />
//         </div>
//       )}

//       {/* Modal for DCL Details */}
//       {selectedDCL && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1000,
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             padding: 24,
//             borderRadius: 8,
//             maxWidth: 600,
//             width: "90%",
//             maxHeight: "80vh",
//             overflowY: "auto"
//           }}>
//             <h3 style={{ color: CHECKER_BLUE, marginBottom: 16 }}>
//               DCL Details: {selectedDCL.dclNo}
//             </h3>
            
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <strong>Customer Number:</strong>
//                 <div style={{ marginTop: 4 }}>{selectedDCL.customerNumber}</div>
//               </Col>
//               <Col span={12}>
//                 <strong>Customer Name:</strong>
//                 <div style={{ marginTop: 4 }}>{selectedDCL.customerName}</div>
//               </Col>
//               <Col span={12}>
//                 <strong>Loan Type:</strong>
//                 <div style={{ marginTop: 4 }}>{selectedDCL.loanType}</div>
//               </Col>
//               <Col span={12}>
//                 <strong>Loan Amount:</strong>
//                 <div style={{ marginTop: 4, color: CHECKER_GOLD, fontWeight: "bold" }}>
//                   Ksh {selectedDCL.loanAmount?.toLocaleString() || "N/A"}
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <strong>Quality Score:</strong>
//                 <div style={{ marginTop: 4 }}>
//                   <Tag color={selectedDCL.qualityScore >= 90 ? CHECKER_GREEN : CHECKER_GOLD}>
//                     {selectedDCL.qualityScore || "N/A"}
//                   </Tag>
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <strong>Decision:</strong>
//                 <div style={{ marginTop: 4 }}>
//                   <Tag color={selectedDCL.checkerDecision === 'approved' ? 'success' : 'error'} style={{ fontWeight: "bold" }}>
//                     {selectedDCL.checkerDecision === 'approved' ? 'Approved' : 'Rejected'}
//                   </Tag>
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <strong>Submitted for Check:</strong>
//                 <div style={{ marginTop: 4 }}>
//                   {selectedDCL.submittedForCheck ? new Date(selectedDCL.submittedForCheck).toLocaleString() : "N/A"}
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <strong>Check Completed:</strong>
//                 <div style={{ marginTop: 4 }}>
//                   {selectedDCL.checkedAt ? new Date(selectedDCL.checkedAt).toLocaleString() : "N/A"}
//                 </div>
//               </Col>
//               <Col span={24}>
//                 <strong>Check Time Duration:</strong>
//                 <div style={{ marginTop: 4 }}>
//                   {selectedDCL.submittedForCheck && selectedDCL.checkedAt ? (
//                     <>
//                       <ClockCircleOutlined style={{ marginRight: 8 }} />
//                       {((new Date(selectedDCL.checkedAt) - new Date(selectedDCL.submittedForCheck)) / (1000 * 60 * 60)).toFixed(1)} hours
//                     </>
//                   ) : "N/A"}
//                 </div>
//               </Col>
//             </Row>
            
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
//               <Button 
//                 onClick={() => setSelectedDCL(null)}
//                 style={{ backgroundColor: CHECKER_TEAL, borderColor: CHECKER_TEAL, color: "white" }}
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ CHANGED THIS: Export as Completed
// export default Completed;


import React, { useMemo, useState, useEffect } from "react";
import { 
  Button, 
  Divider, 
  Table, 
  Tag, 
  Spin, 
  Empty, 
  Card, 
  Row, 
  Col,
  Input,
  Badge,
  Typography
} from "antd";
import { 
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import CreatorQueueChecklistModal from "../../components/modals/CreatorQueueChecklistModal";
import dayjs from "dayjs";

// Theme Colors (same as other queues)
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const HIGHLIGHT_GOLD = "#fcb116";
const LIGHT_YELLOW = "#fcd716";
const SECONDARY_PURPLE = "#7e6496";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";

const { Text } = Typography;

// MOCK DATA for Creator's Completed Checklists (4 ITEMS)
const MOCK_CREATOR_COMPLETED = [
  {
    _id: "c1",
    dclNo: "DCL-2024-001",
    customerNumber: "CUST001",
    customerName: "Alpha Enterprises Ltd",
    loanType: "Business Loan",
    title: "Business Expansion Loan",
    assignedToRM: { _id: "rm1", name: "John Kamau", email: "john.k@ncba.co.ke" },
    approvedBy: { _id: "checker1", name: "Michael Chen", email: "michael.c@ncba.co.ke" },
    checkerComments: "All documents properly verified and complete. Excellent work!",
    status: "approved",
    priority: "high",
    completionDate: "2024-12-18T10:30:00Z",
    submittedToCheckerAt: "2024-12-16T14:20:00Z",
    createdAt: "2024-12-01T09:30:00Z",
    updatedAt: "2024-12-18T10:30:00Z",
    documents: [
      {
        category: "Business Registration",
        docList: [
          { 
            _id: "doc1_1", 
            name: "Certificate of Incorporation", 
            status: "approved", 
            fileUrl: "https://example.com/doc1.pdf"
          }
        ]
      }
    ]
  },
  {
    _id: "c2",
    dclNo: "DCL-2024-002",
    customerNumber: "CUST002",
    customerName: "Beta Manufacturing Inc",
    loanType: "Equipment Finance",
    title: "Machinery Upgrade - $350,000",
    assignedToRM: { _id: "rm2", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
    approvedBy: { _id: "checker2", name: "David Omondi", email: "david.o@ncba.co.ke" },
    checkerComments: "Minor revisions required on invoice. Overall good work.",
    status: "approved_with_revisions",
    priority: "medium",
    completionDate: "2024-12-17T14:15:00Z",
    submittedToCheckerAt: "2024-12-16T09:45:00Z",
    createdAt: "2024-12-03T14:15:00Z",
    updatedAt: "2024-12-17T14:15:00Z",
    documents: [
      {
        category: "Technical Documents",
        docList: [
          { 
            _id: "doc2_1", 
            name: "Equipment Quotations", 
            status: "approved", 
            fileUrl: "https://example.com/doc2.pdf"
          },
          { 
            _id: "doc2_2", 
            name: "Technical Specifications", 
            status: "approved", 
            fileUrl: "https://example.com/doc2_2.pdf"
          }
        ]
      }
    ]
  },
  {
    _id: "c3",
    dclNo: "DCL-2024-003",
    customerNumber: "CUST003",
    customerName: "Premium Motors Ltd",
    loanType: "Asset Finance",
    title: "Fleet Vehicle Purchase - 5 Units",
    assignedToRM: { _id: "rm1", name: "John Kamau", email: "john.k@ncba.co.ke" },
    approvedBy: { _id: "checker1", name: "Michael Chen", email: "michael.c@ncba.co.ke" },
    checkerComments: "Complete documentation. Ready for processing.",
    status: "approved",
    priority: "medium",
    completionDate: "2024-12-18T09:20:00Z",
    submittedToCheckerAt: "2024-12-16T10:45:00Z",
    createdAt: "2024-12-05T11:15:00Z",
    updatedAt: "2024-12-18T09:20:00Z",
    documents: [
      {
        category: "Vehicle Documents",
        docList: [
          { 
            _id: "doc3_1", 
            name: "Proforma Invoice", 
            status: "approved", 
            fileUrl: "https://example.com/doc3_1.pdf"
          },
          { 
            _id: "doc3_2", 
            name: "Logbook Copies", 
            status: "approved", 
            fileUrl: "https://example.com/doc3_2.pdf"
          },
          { 
            _id: "doc3_3", 
            name: "Insurance Certificates", 
            status: "approved", 
            fileUrl: "https://example.com/doc3_3.pdf"
          }
        ]
      }
    ]
  },
  {
    _id: "c4",
    dclNo: "DCL-2024-004",
    customerNumber: "CUST004",
    customerName: "Tech Solutions Ltd",
    loanType: "Technology Loan",
    title: "Software Development - $200,000",
    assignedToRM: { _id: "rm3", name: "Peter Kariuki", email: "peter.k@ncba.co.ke" },
    approvedBy: { _id: "checker2", name: "David Omondi", email: "david.o@ncba.co.ke" },
    checkerComments: "Excellent documentation. No issues found.",
    status: "approved",
    priority: "low",
    completionDate: "2024-12-19T11:45:00Z",
    submittedToCheckerAt: "2024-12-17T15:30:00Z",
    createdAt: "2024-12-06T10:00:00Z",
    updatedAt: "2024-12-19T11:45:00Z",
    documents: [
      {
        category: "Technical Documents",
        docList: [
          { 
            _id: "doc4_1", 
            name: "Project Proposal", 
            status: "approved", 
            fileUrl: "https://example.com/doc4_1.pdf"
          },
          { 
            _id: "doc4_2", 
            name: "Budget Breakdown", 
            status: "approved", 
            fileUrl: "https://example.com/doc4_2.pdf"
          }
        ]
      }
    ]
  }
];

const Completed = ({ userId = "creator_current" }) => {
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mockData, setMockData] = useState([]);
  
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMockData(MOCK_CREATOR_COMPLETED);
      setLoading(false);
    }, 300);
  }, []);

  const filteredData = useMemo(() => {
    let filtered = mockData;
    
    if (searchText) {
      filtered = filtered.filter(c => 
        c.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
        c.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        c.loanType.toLowerCase().includes(searchText.toLowerCase()) ||
        c.approvedBy?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  }, [mockData, searchText]);

  const clearFilters = () => setSearchText("");

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setMockData([...MOCK_CREATOR_COMPLETED]);
      setLoading(false);
    }, 200);
  };

  const columns = [
    { 
      title: "DCL No", 
      dataIndex: "dclNo", 
      width: 140,
      fixed: "left",
      render: (text) => (
        <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
          {text}
        </div>
      )
    },
    { 
      title: "Customer No", 
      dataIndex: "customerNumber", 
      width: 110,
      render: (text) => (
        <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
          {text}
        </div>
      )
    },
    { 
      title: "Customer Name", 
      dataIndex: "customerName", 
      width: 160,
      render: (text) => (
        <div style={{ 
          fontWeight: 600, 
          color: PRIMARY_BLUE,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <CustomerServiceOutlined style={{ fontSize: 12 }} />
          {text}
        </div>
      )
    },
    { 
      title: "Loan Type", 
      dataIndex: "loanType", 
      width: 120,
      render: (text) => (
        <div style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>
          {text}
        </div>
      )
    },
    { 
      title: "Checker - Approver", 
      dataIndex: "approvedBy", 
      width: 140,
      render: (approver) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <UserOutlined style={{ color: PRIMARY_BLUE, fontSize: 12 }} />
          <span style={{ color: PRIMARY_BLUE, fontWeight: 500, fontSize: 13 }}>{approver?.name || "N/A"}</span>
        </div>
      )
    },
    { 
      title: "Docs", 
      dataIndex: "documents", 
      width: 70, 
      align: "center", 
      render: (docs) => {
        const totalDocs = docs?.reduce((total, category) => total + (category.docList?.length || 0), 0) || 0;
        return (
          <Tag 
            color={LIGHT_YELLOW} 
            style={{ 
              fontSize: 11, 
              borderRadius: 999, 
              fontWeight: "bold", 
              color: PRIMARY_BLUE, 
              border: `1px solid ${HIGHLIGHT_GOLD}`,
              minWidth: 28,
              textAlign: "center"
            }}
          >
            {totalDocs}
          </Tag>
        );
      } 
    },
    { 
      title: "Completed Date", 
      dataIndex: "completionDate", 
      width: 120,
      render: (date) => (
        <div style={{ fontSize: 12, fontWeight: 500 }}>
          {dayjs(date).format('DD/MM/YYYY')}
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      width: 100,
      fixed: "right",
      render: (status) => {
        const statusConfig = {
          approved: { color: "success", text: "Approved", icon: <CheckCircleOutlined /> },
          approved_with_revisions: { color: "processing", text: "Revised", icon: <CheckCircleOutlined /> }
        };
        const config = statusConfig[status] || { color: "default", text: status };
        return (
          <Tag 
            color={config.color}
            style={{ fontWeight: "bold", fontSize: 11 }}
            icon={config.icon}
          >
            {config.text}
          </Tag>
        );
      }
    }
  ];

  const customTableStyles = `
    .creator-completed-table .ant-table-wrapper { 
      border-radius: 12px; 
      overflow: hidden; 
      box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08); 
      border: 1px solid #e0e0e0; 
    }
    .creator-completed-table .ant-table-thead > tr > th { 
      background-color: #f7f7f7 !important; 
      color: ${PRIMARY_BLUE} !important; 
      font-weight: 700; 
      fontSize: 13px; 
      padding: 14px 12px !important; 
      border-bottom: 3px solid ${SUCCESS_GREEN} !important; 
      border-right: none !important; 
    }
    .creator-completed-table .ant-table-tbody > tr > td { 
      border-bottom: 1px solid #f0f0f0 !important; 
      border-right: none !important; 
      padding: 12px 12px !important; 
      fontSize: 13px; 
      color: #333; 
    }
    .creator-completed-table .ant-table-tbody > tr.ant-table-row:hover > td { 
      background-color: rgba(82, 196, 26, 0.1) !important; 
      cursor: pointer;
    }
    .creator-completed-table .ant-pagination .ant-pagination-item-active { 
      background-color: ${SUCCESS_GREEN} !important; 
      border-color: ${SUCCESS_GREEN} !important; 
    }
    .creator-completed-table .ant-pagination .ant-pagination-item-active a { 
      color: ${PRIMARY_BLUE} !important; 
      font-weight: 600; 
    }
  `;

  return (
    <div style={{ padding: 24 }}>
      <style>{customTableStyles}</style>

      {/* Header */}
      <Card
        style={{ 
          marginBottom: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderLeft: `4px solid ${SUCCESS_GREEN}`
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
              Completed Checklists
              <Badge 
                count={filteredData.length} 
                style={{ 
                  backgroundColor: SUCCESS_GREEN,
                  fontSize: 12
                }}
              />
            </h2>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
              Checklists approved by checkers
            </p>
          </Col>
        </Row>
      </Card>

      {/* Filters */}
      <Card 
        style={{ 
          marginBottom: 16,
          background: "#fafafa",
          border: `1px solid ${PRIMARY_BLUE}20`,
          borderRadius: 8
        }}
        size="small"
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by DCL No, Customer, Loan Type, or Checker"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="middle"
            />
          </Col>
          
          <Col xs={24} sm={12} md={4}>
            <Button 
              onClick={clearFilters}
              style={{ width: '100%' }}
              size="middle"
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table Title */}
      <Divider style={{ margin: "12px 0" }}>
        <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
          Approved Checklists ({filteredData.length} items)
        </span>
      </Divider>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Spin tip="Loading completed checklists..." />
        </div>
      ) : filteredData.length === 0 ? (
        <Empty 
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No completed checklists found</p>
              <p style={{ color: "#999" }}>
                {searchText 
                  ? 'Try changing your search term' 
                  : 'No checklists have been completed yet'}
              </p>
            </div>
          } 
          style={{ padding: 40 }} 
        />
      ) : (
        <div className="creator-completed-table">
          <Table 
            columns={columns} 
            dataSource={filteredData} 
            rowKey="_id"
            size="middle"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true, 
              pageSizeOptions: ["10", "20", "50"], 
              position: ["bottomCenter"],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} checklists`
            }}
            scroll={{ x: 1000 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedChecklist(record);
                setModalOpen(true);
              },
            })}
          />
        </div>
      )}

      {/* Footer Info */}
      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        background: "#f8f9fa", 
        borderRadius: 8,
        fontSize: 12,
        color: "#666",
        border: `1px solid ${PRIMARY_BLUE}10`
      }}>
        <Row justify="space-between" align="middle">
          <Col>
            Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
          </Col>
          <Col>
            <Text type="secondary">
              Showing {filteredData.length} items • Data as of latest system update
            </Text>
          </Col>
        </Row>
      </div>

      {/* Action Modal */}
      {selectedChecklist && (
        <CreatorQueueChecklistModal
          checklist={selectedChecklist}
          open={modalOpen}
          onClose={() => { 
            setModalOpen(false);
            setSelectedChecklist(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default Completed;