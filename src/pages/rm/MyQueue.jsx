// import React, { useMemo, useState, useEffect } from "react";
// import { 
//   Divider, 
//   Table, 
//   Tag, 
//   Spin, 
//   Empty, 
//   Card, 
//   Row, 
//   Col,
//   Input,
//   Badge,
//   Typography
// } from "antd";
// import { 
//   SearchOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   CustomerServiceOutlined
// } from "@ant-design/icons";
// import RMActionModal from "../../components/modals/RMActionModal";
// import dayjs from "dayjs";

// // Theme Colors (same as other queues)
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const HIGHLIGHT_GOLD = "#fcb116";
// const LIGHT_YELLOW = "#fcd716";
// const SECONDARY_PURPLE = "#7e6496";
// const SUCCESS_GREEN = "#52c41a";
// const ERROR_RED = "#ff4d4f";
// const WARNING_ORANGE = "#faad14";

// const { Text } = Typography;

// // MOCK DATA for RM Queue (3 ITEMS)
// const MOCK_RM_CHECKLISTS = [
//   {
//     _id: "1",
//     dclNo: "DCL-2024-001",
//     customerNumber: "CUST001",
//     customerName: "Alpha Enterprises Ltd",
//     loanType: "Business Loan",
//     title: "Business Expansion Loan - $500,000",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator1", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
//     creatorComments: "Please upload all required documents within 3 business days",
//     status: "pending_rm",
//     priority: "high",
//     slaExpiry: "2024-12-20T23:59:59Z",
//     createdAt: "2024-12-01T09:30:00Z",
//     updatedAt: "2024-12-15T14:20:00Z",
//     documents: [
//       {
//         category: "Business Registration",
//         docList: [
//           { 
//             _id: "doc1_1", 
//             name: "Certificate of Incorporation", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Certified copy from Registrar"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     _id: "2",
//     dclNo: "DCL-2024-002",
//     customerNumber: "CUST002",
//     customerName: "Beta Manufacturing Inc",
//     loanType: "Equipment Finance",
//     title: "Machinery Upgrade - $350,000",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
//     creatorComments: "Urgent - Customer needs approval before month-end",
//     status: "pending_rm",
//     priority: "medium",
//     slaExpiry: "2024-12-18T23:59:59Z",
//     createdAt: "2024-12-03T14:15:00Z",
//     updatedAt: "2024-12-16T09:45:00Z",
//     documents: [
//       {
//         category: "Technical Documents",
//         docList: [
//           { 
//             _id: "doc2_1", 
//             name: "Equipment Quotations", 
//             status: "pending", 
//             fileUrl: "",
//             description: "From at least 3 suppliers"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     _id: "3",
//     dclNo: "DCL-2024-003",
//     customerNumber: "CUST003",
//     customerName: "Premium Motors Ltd",
//     loanType: "Asset Finance",
//     title: "Fleet Vehicle Purchase - 5 Units",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
//     creatorComments: "Vehicle quotations required from authorized dealers only",
//     status: "pending_rm",
//     priority: "medium",
//     slaExpiry: "2024-12-22T23:59:59Z",
//     createdAt: "2024-12-05T11:15:00Z",
//     updatedAt: "2024-12-16T10:45:00Z",
//     documents: [
//       {
//         category: "Vehicle Documents",
//         docList: [
//           { 
//             _id: "doc3_1", 
//             name: "Proforma Invoice", 
//             status: "pending", 
//             fileUrl: "",
//             description: "From authorized dealer with breakdown"
//           },
//           { 
//             _id: "doc3_2", 
//             name: "Logbook Copies", 
//             status: "pending", 
//             fileUrl: "",
//             description: "For existing fleet vehicles"
//           }
//         ]
//       }
//     ]
//   }
// ];

// // RM's MyQueue component
// const MyQueue = ({ userId = "rm_current" }) => {
//   const [selectedChecklist, setSelectedChecklist] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mockData, setMockData] = useState([]);
  
//   // Filters
//   const [searchText, setSearchText] = useState("");

//   // Load data
//   useEffect(() => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setMockData(MOCK_RM_CHECKLISTS);
//       setLoading(false);
//     }, 300);
//   }, []);

//   // Filter data
//   const filteredData = useMemo(() => {
//     let filtered = mockData;
    
//     // Apply search filter
//     if (searchText) {
//       filtered = filtered.filter(c => 
//         c.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.loanType.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.createdBy?.name?.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
    
//     return filtered;
//   }, [mockData, searchText]);

//   // Clear filters
//   const clearFilters = () => {
//     setSearchText("");
//   };

//   // Refetch function
//   const refetch = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setMockData([...MOCK_RM_CHECKLISTS]);
//       setLoading(false);
//     }, 200);
//   };

//   // Columns - Format: DCL No, Customer No, Customer Name, Loan Type, Creator, Docs, SLA
//   const columns = [
//     { 
//       title: "DCL No", 
//       dataIndex: "dclNo", 
//       width: 140,
//       render: (text) => (
//         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
//           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
//           {text}
//         </div>
//       )
//     },
//     { 
//       title: "Customer No", 
//       dataIndex: "customerNumber", 
//       width: 110,
//       render: (text) => (
//         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
//           {text}
//         </div>
//       )
//     },
//     { 
//       title: "Customer Name", 
//       dataIndex: "customerName", 
//       width: 160,
//       render: (text) => (
//         <div style={{ 
//           fontWeight: 600, 
//           color: PRIMARY_BLUE,
//           display: "flex",
//           alignItems: "center",
//           gap: 6
//         }}>
//           <CustomerServiceOutlined style={{ fontSize: 12 }} />
//           {text}
//         </div>
//       )
//     },
//     { 
//       title: "Loan Type", 
//       dataIndex: "loanType", 
//       width: 120,
//       render: (text) => (
//         <div style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>
//           {text}
//         </div>
//       )
//     },
//     { 
//       title: "Creator", 
//       dataIndex: "createdBy", 
//       width: 120,
//       render: (creator) => (
//         <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//           <UserOutlined style={{ color: PRIMARY_BLUE, fontSize: 12 }} />
//           <span style={{ color: PRIMARY_BLUE, fontWeight: 500, fontSize: 13 }}>{creator?.name || "N/A"}</span>
//         </div>
//       )
//     },
//     { 
//       title: "Docs", 
//       dataIndex: "documents", 
//       width: 70, 
//       align: "center", 
//       render: (docs) => {
//         const totalDocs = docs?.reduce((total, category) => total + (category.docList?.length || 0), 0) || 0;
//         return (
//           <Tag 
//             color={LIGHT_YELLOW} 
//             style={{ 
//               fontSize: 11, 
//               borderRadius: 999, 
//               fontWeight: "bold", 
//               color: PRIMARY_BLUE, 
//               border: `1px solid ${HIGHLIGHT_GOLD}`,
//               minWidth: 28,
//               textAlign: "center"
//             }}
//           >
//             {totalDocs}
//           </Tag>
//         );
//       } 
//     },
//     { 
//       title: "SLA", 
//       dataIndex: "slaExpiry", 
//       width: 90,
//       fixed: "right",
//       render: (date) => {
//         const daysLeft = dayjs(date).diff(dayjs(), 'days');
//         return (
//           <Tag 
//             color={daysLeft <= 2 ? ERROR_RED : daysLeft <= 5 ? WARNING_ORANGE : SUCCESS_GREEN}
//             style={{ fontWeight: "bold", fontSize: 11 }}
//           >
//             {daysLeft > 0 ? `${daysLeft}d` : 'Expired'}
//           </Tag>
//         );
//       }
//     }
//   ];

//   // Custom table styles
//   const customTableStyles = `
//     .rm-myqueue-table .ant-table-wrapper { 
//       border-radius: 12px; 
//       overflow: hidden; 
//       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08); 
//       border: 1px solid #e0e0e0; 
//     }
//     .rm-myqueue-table .ant-table-thead > tr > th { 
//       background-color: #f7f7f7 !important; 
//       color: ${PRIMARY_BLUE} !important; 
//       font-weight: 700; 
//       fontSize: 13px; 
//       padding: 14px 12px !important; 
//       border-bottom: 3px solid ${ACCENT_LIME} !important; 
//       border-right: none !important; 
//     }
//     .rm-myqueue-table .ant-table-tbody > tr > td { 
//       border-bottom: 1px solid #f0f0f0 !important; 
//       border-right: none !important; 
//       padding: 12px 12px !important; 
//       fontSize: 13px; 
//       color: #333; 
//     }
//     .rm-myqueue-table .ant-table-tbody > tr.ant-table-row:hover > td { 
//       background-color: rgba(181, 211, 52, 0.1) !important; 
//       cursor: pointer;
//     }
//     .rm-myqueue-table .ant-pagination .ant-pagination-item-active { 
//       background-color: ${ACCENT_LIME} !important; 
//       border-color: ${ACCENT_LIME} !important; 
//     }
//     .rm-myqueue-table .ant-pagination .ant-pagination-item-active a { 
//       color: ${PRIMARY_BLUE} !important; 
//       font-weight: 600; 
//     }
//   `;

//   return (
//     <div style={{ padding: 24 }}>
//       <style>{customTableStyles}</style>

//       {/* Header */}
//       <Card
//         style={{ 
//           marginBottom: 24,
//           borderRadius: 8,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           borderLeft: `4px solid ${ACCENT_LIME}`
//         }}
//         bodyStyle={{ padding: 16 }}
//       >
//         <Row justify="space-between" align="middle">
//           <Col>
//             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
//               My Queue
//               <Badge 
//                 count={filteredData.length} 
//                 style={{ 
//                   backgroundColor: ACCENT_LIME,
//                   fontSize: 12
//                 }}
//               />
//             </h2>
//             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
//               Upload documents for DCLs assigned to you
//             </p>
//           </Col>
//         </Row>
//       </Card>

//       {/* Filters */}
//       <Card 
//         style={{ 
//           marginBottom: 16,
//           background: "#fafafa",
//           border: `1px solid ${PRIMARY_BLUE}20`,
//           borderRadius: 8
//         }}
//         size="small"
//       >
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={12} md={8}>
//             <Input
//               placeholder="Search by DCL No, Customer, Loan Type, or Creator"
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//               size="middle"
//             />
//           </Col>
          
//           <Col xs={24} sm={12} md={4}>
//             <Button 
//               onClick={clearFilters}
//               style={{ width: '100%' }}
//               size="middle"
//             >
//               Clear
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Table Title */}
//       <Divider style={{ margin: "12px 0" }}>
//         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
//           Pending Upload ({filteredData.length} items)
//         </span>
//       </Divider>

//       {/* Table */}
//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
//           <Spin tip="Loading DCLs..." />
//         </div>
//       ) : filteredData.length === 0 ? (
//         <Empty 
//           description={
//             <div>
//               <p style={{ fontSize: 16, marginBottom: 8 }}>No DCLs pending upload</p>
//               <p style={{ color: "#999" }}>
//                 {searchText 
//                   ? 'Try changing your search term' 
//                   : 'No DCLs assigned to you yet'}
//               </p>
//             </div>
//           } 
//           style={{ padding: 40 }} 
//         />
//       ) : (
//         <div className="rm-myqueue-table">
//           <Table 
//             columns={columns} 
//             dataSource={filteredData} 
//             rowKey="_id"
//             size="middle"
//             pagination={{ 
//               pageSize: 10, 
//               showSizeChanger: true, 
//               pageSizeOptions: ["10", "20", "50"], 
//               position: ["bottomCenter"],
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} DCLs`
//             }}
//             scroll={{ x: 950 }}
//             onRow={(record) => ({
//               onClick: () => {
//                 setSelectedChecklist(record);
//                 setModalOpen(true);
//               },
//             })}
//           />
//         </div>
//       )}

//       {/* Footer Info */}
//       <div style={{ 
//         marginTop: 24, 
//         padding: 16, 
//         background: "#f8f9fa", 
//         borderRadius: 8,
//         fontSize: 12,
//         color: "#666",
//         border: `1px solid ${PRIMARY_BLUE}10`
//       }}>
//         <Row justify="space-between" align="middle">
//           <Col>
//             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
//           </Col>
//           <Col>
//             <Text type="secondary">
//               Showing {filteredData.length} items • Data as of latest system update
//             </Text>
//           </Col>
//         </Row>
//       </div>

//       {/* Action Modal */}
//       {selectedChecklist && (
//         <RMActionModal
//           checklist={selectedChecklist}
//           open={modalOpen}
//           onClose={() => { 
//             setModalOpen(false);
//             setSelectedChecklist(null);
//             refetch();
//           }}
//           actionType="upload"
//         />
//       )}
//     </div>
//   );
// };

// export default MyQueue;











// import React, { useMemo, useState, useEffect } from "react";
// import { 
//   Divider, 
//   Table, 
//   Tag, 
//   Spin, 
//   Empty, 
//   Card, 
//   Row, 
//   Col,
//   Input,
//   Badge,
//   Typography,
//   Button
// } from "antd";
// import { 
//   SearchOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   CustomerServiceOutlined,
//   UploadOutlined
// } from "@ant-design/icons";
// import RMActionModal from "../../components/modals/RMActionModal";
// import dayjs from "dayjs";

// // RM Theme Colors
// const PRIMARY_PURPLE = "#2B1C67";  // RM purple from your sidebar
// const ACCENT_LIME = "#b5d334";
// const HIGHLIGHT_GOLD = "#fcb116";
// const LIGHT_YELLOW = "#fcd716";
// const SECONDARY_BLUE = "#164679";
// const SUCCESS_GREEN = "#52c41a";
// const ERROR_RED = "#ff4d4f";
// const WARNING_ORANGE = "#faad14";

// const { Text } = Typography;

// // MOCK DATA for RM Queue (Documents waiting for RM upload)
// const MOCK_RM_CHECKLISTS = [
//   {
//     _id: "1",
//     dclNo: "DCL-2024-001",
//     customerNumber: "CUST001",
//     customerName: "Alpha Enterprises Ltd",
//     loanType: "Business Loan",
//     title: "Business Expansion Loan - $500,000",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator1", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
//     creatorComments: "Please upload all required documents within 3 business days",
//     status: "pending_rm",
//     priority: "high",
//     slaExpiry: "2024-12-20T23:59:59Z",
//     createdAt: "2024-12-01T09:30:00Z",
//     updatedAt: "2024-12-15T14:20:00Z",
//     documents: [
//       {
//         category: "Business Registration",
//         docList: [
//           { 
//             _id: "doc1_1", 
//             name: "Certificate of Incorporation", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Certified copy from Registrar"
//           },
//           { 
//             _id: "doc1_2", 
//             name: "Business Permit", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Valid for current year"
//           }
//         ]
//       },
//       {
//         category: "Financial Documents",
//         docList: [
//           { 
//             _id: "doc1_3", 
//             name: "Audited Financial Statements", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Last 3 years"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     _id: "2",
//     dclNo: "DCL-2024-002",
//     customerNumber: "CUST002",
//     customerName: "Beta Manufacturing Inc",
//     loanType: "Equipment Finance",
//     title: "Machinery Upgrade - $350,000",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
//     creatorComments: "Urgent - Customer needs approval before month-end",
//     status: "pending_rm",
//     priority: "medium",
//     slaExpiry: "2024-12-18T23:59:59Z",
//     createdAt: "2024-12-03T14:15:00Z",
//     updatedAt: "2024-12-16T09:45:00Z",
//     documents: [
//       {
//         category: "Technical Documents",
//         docList: [
//           { 
//             _id: "doc2_1", 
//             name: "Equipment Quotations", 
//             status: "pending", 
//             fileUrl: "",
//             description: "From at least 3 suppliers"
//           },
//           { 
//             _id: "doc2_2", 
//             name: "Technical Specifications", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Detailed specs from supplier"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     _id: "3",
//     dclNo: "DCL-2024-003",
//     customerNumber: "CUST003",
//     customerName: "Premium Motors Ltd",
//     loanType: "Asset Finance",
//     title: "Fleet Vehicle Purchase - 5 Units",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
//     creatorComments: "Vehicle quotations required from authorized dealers only",
//     status: "pending_rm",
//     priority: "medium",
//     slaExpiry: "2024-12-22T23:59:59Z",
//     createdAt: "2024-12-05T11:15:00Z",
//     updatedAt: "2024-12-16T10:45:00Z",
//     documents: [
//       {
//         category: "Vehicle Documents",
//         docList: [
//           { 
//             _id: "doc3_1", 
//             name: "Proforma Invoice", 
//             status: "pending", 
//             fileUrl: "",
//             description: "From authorized dealer with breakdown"
//           },
//           { 
//             _id: "doc3_2", 
//             name: "Logbook Copies", 
//             status: "pending", 
//             fileUrl: "",
//             description: "For existing fleet vehicles"
//           },
//           { 
//             _id: "doc3_3", 
//             name: "Insurance Certificates", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Valid insurance coverage"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     _id: "4",
//     dclNo: "DCL-2024-004",
//     customerNumber: "CUST004",
//     customerName: "Green Solutions Ltd",
//     loanType: "Green Loan",
//     title: "Solar Installation - $250,000",
//     assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
//     createdBy: { _id: "creator1", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
//     creatorComments: "Environmental impact assessment required",
//     status: "pending_rm",
//     priority: "low",
//     slaExpiry: "2024-12-25T23:59:59Z",
//     createdAt: "2024-12-08T10:00:00Z",
//     updatedAt: "2024-12-16T11:30:00Z",
//     documents: [
//       {
//         category: "Environmental Documents",
//         docList: [
//           { 
//             _id: "doc4_1", 
//             name: "Environmental Impact Assessment", 
//             status: "pending", 
//             fileUrl: "",
//             description: "From certified environmental consultant"
//           },
//           { 
//             _id: "doc4_2", 
//             name: "Energy Efficiency Report", 
//             status: "pending", 
//             fileUrl: "",
//             description: "Expected energy savings"
//           }
//         ]
//       }
//     ]
//   }
// ];

// // RM's MyQueue component
// const MyQueue = ({ userId = "rm_current" }) => {
//   const [selectedChecklist, setSelectedChecklist] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mockData, setMockData] = useState([]);
  
//   // Filters
//   const [searchText, setSearchText] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("all");

//   // Load data
//   useEffect(() => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setMockData(MOCK_RM_CHECKLISTS);
//       setLoading(false);
//     }, 300);
//   }, []);

//   // Filter data
//   const filteredData = useMemo(() => {
//     let filtered = mockData.filter((c) => c.status === "pending_rm");
    
//     // Apply search filter
//     if (searchText) {
//       filtered = filtered.filter(c => 
//         c.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.loanType.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.createdBy?.name?.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
    
//     // Apply priority filter
//     if (priorityFilter !== "all") {
//       filtered = filtered.filter(c => c.priority === priorityFilter);
//     }
    
//     return filtered;
//   }, [mockData, searchText, priorityFilter]);

//   // Clear filters
//   const clearFilters = () => {
//     setSearchText("");
//     setPriorityFilter("all");
//   };

//   // Refetch function
//   const refetch = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setMockData([...MOCK_RM_CHECKLISTS]);
//       setLoading(false);
//     }, 200);
//   };

//   // Priority tag render
//   const renderPriorityTag = (priority) => {
//     const priorityColors = {
//       high: ERROR_RED,
//       medium: WARNING_ORANGE,
//       low: SUCCESS_GREEN
//     };
    
//     const priorityLabels = {
//       high: "High",
//       medium: "Medium",
//       low: "Low"
//     };
    
//     return (
//       <Tag 
//         color={priorityColors[priority] || "default"}
//         style={{ 
//           fontWeight: "bold", 
//           fontSize: 10,
//           padding: "0 6px",
//           borderRadius: 10,
//           border: "none"
//         }}
//       >
//         {priorityLabels[priority] || priority}
//       </Tag>
//     );
//   };

//   // Columns for RM Queue
//   const columns = [
//     { 
//       title: "DCL No", 
//       dataIndex: "dclNo", 
//       width: 140,
//       render: (text) => (
//         <div style={{ fontWeight: "bold", color: PRIMARY_PURPLE, display: "flex", alignItems: "center", gap: 8 }}>
//           <FileTextOutlined style={{ color: SECONDARY_BLUE }} />
//           {text}
//         </div>
//       )
//     },
//     { 
//       title: "Customer", 
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div style={{ fontWeight: 600, color: PRIMARY_PURPLE, fontSize: 14 }}>
//             {record.customerName}
//           </div>
//           <div style={{ fontSize: 11, color: "#666" }}>
//             {record.customerNumber}
//           </div>
//         </div>
//       )
//     },
//     { 
//       title: "Loan Details", 
//       width: 150,
//       render: (_, record) => (
//         <div>
//           <div style={{ fontSize: 13, color: SECONDARY_BLUE, fontWeight: 500 }}>
//             {record.loanType}
//           </div>
//           <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
//             {record.title}
//           </div>
//         </div>
//       )
//     },
//     { 
//       title: "Creator", 
//       dataIndex: "createdBy", 
//       width: 120,
//       render: (creator) => (
//         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//           <UserOutlined style={{ color: SECONDARY_BLUE, fontSize: 12 }} />
//           <span style={{ fontSize: 12, fontWeight: 500 }}>{creator?.name || "N/A"}</span>
//         </div>
//       )
//     },
//     { 
//       title: "Docs Required", 
//       dataIndex: "documents", 
//       width: 100, 
//       align: "center", 
//       render: (docs) => {
//         const totalDocs = docs?.reduce((total, category) => total + (category.docList?.length || 0), 0) || 0;
//         return (
//           <Badge 
//             count={totalDocs} 
//             style={{ 
//               backgroundColor: PRIMARY_PURPLE,
//               fontSize: 11,
//               fontWeight: "bold"
//             }}
//           />
//         );
//       } 
//     },
//     { 
//       title: "Priority", 
//       dataIndex: "priority", 
//       width: 90,
//       render: (priority) => renderPriorityTag(priority)
//     },
//     { 
//       title: "SLA", 
//       dataIndex: "slaExpiry", 
//       width: 100,
//       render: (date) => {
//         const daysLeft = dayjs(date).diff(dayjs(), 'days');
//         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
//         let color = SUCCESS_GREEN;
//         let text = `${daysLeft}d`;
        
//         if (daysLeft <= 2) {
//           color = ERROR_RED;
//           text = `${hoursLeft}h`;
//         } else if (daysLeft <= 5) {
//           color = WARNING_ORANGE;
//         }
        
//         return (
//           <Tag 
//             color={color}
//             style={{ 
//               fontWeight: "bold", 
//               fontSize: 11,
//               minWidth: 50,
//               textAlign: "center"
//             }}
//           >
//             {text}
//           </Tag>
//         );
//       }
//     },
//     {
//       title: "Action",
//       width: 100,
//       fixed: "right",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           icon={<UploadOutlined />}
//           size="small"
//           onClick={(e) => {
//             e.stopPropagation();
//             setSelectedChecklist(record);
//             setModalOpen(true);
//           }}
//           style={{
//             backgroundColor: PRIMARY_PURPLE,
//             borderColor: PRIMARY_PURPLE,
//             fontWeight: "bold",
//             fontSize: 12
//           }}
//         >
//           Upload
//         </Button>
//       )
//     }
//   ];

//   // Custom table styles for RM
//   const customTableStyles = `
//     .rm-myqueue-table .ant-table-wrapper { 
//       border-radius: 12px; 
//       overflow: hidden; 
//       box-shadow: 0 8px 25px rgba(43, 28, 103, 0.1); 
//       border: 1px solid rgba(43, 28, 103, 0.1); 
//     }
//     .rm-myqueue-table .ant-table-thead > tr > th { 
//       background-color: #f8f7ff !important; 
//       color: ${PRIMARY_PURPLE} !important; 
//       font-weight: 700; 
//       fontSize: 13px; 
//       padding: 16px 12px !important; 
//       border-bottom: 3px solid ${PRIMARY_PURPLE} !important; 
//       border-right: none !important; 
//     }
//     .rm-myqueue-table .ant-table-tbody > tr > td { 
//       border-bottom: 1px solid rgba(43, 28, 103, 0.08) !important; 
//       border-right: none !important; 
//       padding: 14px 12px !important; 
//       fontSize: 13px; 
//       color: #333; 
//     }
//     .rm-myqueue-table .ant-table-tbody > tr.ant-table-row:hover > td { 
//       background-color: rgba(43, 28, 103, 0.05) !important; 
//       cursor: pointer;
//     }
//     .rm-myqueue-table .ant-pagination .ant-pagination-item-active { 
//       background-color: ${PRIMARY_PURPLE} !important; 
//       border-color: ${PRIMARY_PURPLE} !important; 
//     }
//     .rm-myqueue-table .ant-pagination .ant-pagination-item-active a { 
//       color: white !important; 
//       font-weight: 600; 
//     }
//   `;

//   // Calculate RM statistics
//   const rmStats = useMemo(() => {
//     const totalPending = filteredData.length;
//     const highPriority = filteredData.filter(d => d.priority === "high").length;
//     const mediumPriority = filteredData.filter(d => d.priority === "medium").length;
//     const lowPriority = filteredData.filter(d => d.priority === "low").length;
    
//     // Calculate total documents needed
//     const totalDocsNeeded = filteredData.reduce((total, checklist) => {
//       return total + (checklist.documents?.reduce((docTotal, category) => 
//         docTotal + (category.docList?.length || 0), 0) || 0);
//     }, 0);
    
//     return {
//       totalPending,
//       highPriority,
//       mediumPriority,
//       lowPriority,
//       totalDocsNeeded
//     };
//   }, [filteredData]);

//   return (
//     <div style={{ padding: 24 }}>
//       <style>{customTableStyles}</style>

//       {/* Header with Stats */}
//       <Card
//         style={{ 
//           marginBottom: 24,
//           borderRadius: 12,
//           boxShadow: "0 4px 20px rgba(43, 28, 103, 0.08)",
//           borderLeft: `5px solid ${PRIMARY_PURPLE}`,
//           background: "linear-gradient(135deg, #f8f7ff 0%, #ffffff 100%)"
//         }}
//         bodyStyle={{ padding: 20 }}
//       >
//         <Row justify="space-between" align="middle">
//           <Col>
//             <h2 style={{ margin: 0, color: PRIMARY_PURPLE, display: "flex", alignItems: "center", gap: 12 }}>
//               <span>My Queue</span>
//               <Badge 
//                 count={rmStats.totalPending} 
//                 style={{ 
//                   backgroundColor: ACCENT_LIME,
//                   fontSize: 14,
//                   fontWeight: "bold",
//                   color: PRIMARY_PURPLE
//                 }}
//               />
//             </h2>
//             <p style={{ margin: "6px 0 0", color: "#666", fontSize: 14 }}>
//               Upload customer documents for pending DCLs
//             </p>
//           </Col>
          
//           <Col>
//             <div style={{ display: "flex", gap: 16 }}>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 24, fontWeight: "bold", color: ERROR_RED }}>
//                   {rmStats.highPriority}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#666" }}>High Priority</div>
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 24, fontWeight: "bold", color: WARNING_ORANGE }}>
//                   {rmStats.mediumPriority}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#666" }}>Medium</div>
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 24, fontWeight: "bold", color: SUCCESS_GREEN }}>
//                   {rmStats.lowPriority}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#666" }}>Low</div>
//               </div>
//             </div>
//           </Col>
//         </Row>
        
//         {/* Quick Stats Bar */}
//         <div style={{ 
//           marginTop: 16, 
//           padding: "12px 16px", 
//           background: "rgba(43, 28, 103, 0.05)", 
//           borderRadius: 8,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center"
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div style={{ 
//               width: 8, 
//               height: 8, 
//               borderRadius: "50%", 
//               backgroundColor: ACCENT_LIME 
//             }} />
//             <span style={{ fontSize: 13, color: PRIMARY_PURPLE, fontWeight: 500 }}>
//               {rmStats.totalDocsNeeded} documents needed across {rmStats.totalPending} DCLs
//             </span>
//           </div>
//           <div style={{ fontSize: 12, color: "#666" }}>
//             Last updated: {dayjs().format('DD/MM/YYYY HH:mm')}
//           </div>
//         </div>
//       </Card>

//       {/* Filters Card */}
//       <Card 
//         style={{ 
//           marginBottom: 20,
//           background: "#ffffff",
//           border: `1px solid rgba(43, 28, 103, 0.1)`,
//           borderRadius: 10,
//           boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
//         }}
//         size="small"
//       >
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={12} md={8}>
//             <Input
//               placeholder="Search DCLs by number, customer, or loan type..."
//               prefix={<SearchOutlined style={{ color: PRIMARY_PURPLE }} />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//               size="middle"
//               style={{ borderRadius: 6 }}
//             />
//           </Col>
          
//           <Col xs={24} sm={12} md={6}>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <span style={{ fontSize: 13, color: PRIMARY_PURPLE, fontWeight: 500 }}>Priority:</span>
//               <div style={{ display: "flex", gap: 4 }}>
//                 {["all", "high", "medium", "low"].map(priority => (
//                   <Button
//                     key={priority}
//                     size="small"
//                     onClick={() => setPriorityFilter(priority)}
//                     style={{
//                       backgroundColor: priorityFilter === priority ? PRIMARY_PURPLE : "transparent",
//                       color: priorityFilter === priority ? "white" : PRIMARY_PURPLE,
//                       borderColor: PRIMARY_PURPLE,
//                       fontSize: 11,
//                       padding: "0 8px",
//                       height: 24
//                     }}
//                   >
//                     {priority === "all" ? "All" : priority.charAt(0).toUpperCase() + priority.slice(1)}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </Col>
          
//           <Col xs={24} sm={12} md={4} style={{ textAlign: "right" }}>
//             <Button 
//               onClick={clearFilters}
//               style={{ 
//                 width: '100%',
//                 backgroundColor: "transparent",
//                 borderColor: PRIMARY_PURPLE,
//                 color: PRIMARY_PURPLE
//               }}
//               size="middle"
//             >
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Table Section */}
//       <div style={{ 
//         backgroundColor: "white", 
//         borderRadius: 12, 
//         padding: 20,
//         boxShadow: "0 4px 12px rgba(43, 28, 103, 0.05)",
//         border: "1px solid rgba(43, 28, 103, 0.08)"
//       }}>
//         {/* Table Title */}
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center",
//           marginBottom: 16,
//           paddingBottom: 12,
//           borderBottom: "2px solid rgba(43, 28, 103, 0.1)"
//         }}>
//           <div>
//             <h3 style={{ margin: 0, color: PRIMARY_PURPLE, fontSize: 16 }}>
//               Pending Document Upload
//             </h3>
//             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 12 }}>
//               Click on any row or use the Upload button to submit documents
//             </p>
//           </div>
          
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <Tag color={PRIMARY_PURPLE} style={{ fontWeight: "bold", fontSize: 11 }}>
//               {filteredData.length} DCL{filteredData.length !== 1 ? 's' : ''}
//             </Tag>
//             <Button 
//               size="small" 
//               icon={<UploadOutlined />}
//               onClick={refetch}
//               style={{ 
//                 backgroundColor: "transparent",
//                 borderColor: ACCENT_LIME,
//                 color: ACCENT_LIME
//               }}
//             >
//               Refresh
//             </Button>
//           </div>
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 60 }}>
//             <Spin tip="Loading your DCLs..." size="large" />
//           </div>
//         ) : filteredData.length === 0 ? (
//           <Empty 
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//             description={
//               <div style={{ textAlign: "center" }}>
//                 <p style={{ fontSize: 16, marginBottom: 8, color: PRIMARY_PURPLE, fontWeight: 500 }}>
//                   No DCLs pending upload
//                 </p>
//                 <p style={{ color: "#999", fontSize: 13 }}>
//                   {searchText || priorityFilter !== "all" 
//                     ? 'Try changing your filters' 
//                     : 'All DCLs have been processed. Check back later for new assignments.'}
//                 </p>
//                 {(searchText || priorityFilter !== "all") && (
//                   <Button 
//                     onClick={clearFilters}
//                     style={{ marginTop: 16, backgroundColor: PRIMARY_PURPLE, borderColor: PRIMARY_PURPLE }}
//                   >
//                     Clear All Filters
//                   </Button>
//                 )}
//               </div>
//             } 
//             style={{ padding: 40 }} 
//           />
//         ) : (
//           <div className="rm-myqueue-table">
//             <Table 
//               columns={columns} 
//               dataSource={filteredData} 
//               rowKey="_id"
//               size="middle"
//               pagination={{ 
//                 pageSize: 10, 
//                 showSizeChanger: true, 
//                 pageSizeOptions: ["10", "20", "50"], 
//                 position: ["bottomRight"],
//                 showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} DCLs`,
//                 style: { marginTop: 20 }
//               }}
//               scroll={{ x: 1100 }}
//               onRow={(record) => ({
//                 onClick: () => {
//                   setSelectedChecklist(record);
//                   setModalOpen(true);
//                 },
//               })}
//             />
//           </div>
//         )}
//       </div>

//       {/* Footer Info */}
//       <div style={{ 
//         marginTop: 20, 
//         padding: 16, 
//         background: "linear-gradient(135deg, rgba(43, 28, 103, 0.03) 0%, rgba(43, 28, 103, 0.01) 100%)", 
//         borderRadius: 10,
//         fontSize: 12,
//         color: PRIMARY_PURPLE,
//         border: `1px solid rgba(43, 28, 103, 0.05)`,
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center"
//       }}>
//         <div>
//           <Text type="secondary">
//             <span style={{ fontWeight: 500 }}>Quick Tip:</span> Click any DCL row or use the Upload button to submit documents
//           </Text>
//         </div>
//         <div>
//           <Text type="secondary">
//             Data as of {dayjs().format('DD/MM/YYYY HH:mm:ss')}
//           </Text>
//         </div>
//       </div>

//       {/* RMAction Modal */}
//       {selectedChecklist && (
//         <RMActionModal
//           checklist={selectedChecklist}
//           open={modalOpen}
//           onClose={() => { 
//             setModalOpen(false);
//             setSelectedChecklist(null);
//             refetch();
//           }}
//           actionType="upload"
//         />
//       )}
//     </div>
//   );
// };

// export default MyQueue;




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
  UploadOutlined
} from "@ant-design/icons";
import RMActionModal from "../../components/modals/RMActionModal";
import dayjs from "dayjs";

// Theme Colors for RM (using purple theme)
const PRIMARY_PURPLE = "#2B1C67";  // RM purple from sidebar
const ACCENT_LIME = "#b5d334";
const HIGHLIGHT_GOLD = "#fcb116";
const LIGHT_YELLOW = "#fcd716";
const SECONDARY_BLUE = "#164679";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";

const { Text } = Typography;

// MOCK DATA for RM Queue (Documents waiting for RM upload)
const MOCK_RM_CHECKLISTS = [
  {
    _id: "1",
    dclNo: "DCL-2024-001",
    customerNumber: "CUST001",
    customerName: "Alpha Enterprises Ltd",
    loanType: "Business Loan",
    title: "Business Expansion Loan",
    assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
    createdBy: { _id: "creator1", name: "Sarah Wangui", email: "sarah.w@ncba.co.ke" },
    creatorGeneralComment: "Please upload all required documents within 3 business days",
    status: "pending_rm",
    priority: "high",
    slaExpiry: "2024-12-20T23:59:59Z",
    submittedToRMAt: "2024-12-16T14:20:00Z",
    createdAt: "2024-12-01T09:30:00Z",
    updatedAt: "2024-12-16T14:20:00Z",
    documents: [
      {
        category: "Business Registration",
        docList: [
          { 
            _id: "doc1_1", 
            name: "Certificate of Incorporation", 
            status: "pending", 
            fileUrl: "",
            description: "Certified copy from Registrar"
          }
        ]
      }
    ]
  },
  {
    _id: "2",
    dclNo: "DCL-2024-002",
    customerNumber: "CUST002",
    customerName: "Beta Manufacturing Inc",
    loanType: "Equipment Finance",
    title: "Machinery Upgrade - $350,000",
    assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
    createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
    creatorGeneralComment: "Urgent - Customer needs approval before month-end",
    status: "pending_rm",
    priority: "medium",
    slaExpiry: "2024-12-18T23:59:59Z",
    submittedToRMAt: "2024-12-16T09:45:00Z",
    createdAt: "2024-12-03T14:15:00Z",
    updatedAt: "2024-12-16T09:45:00Z",
    documents: [
      {
        category: "Technical Documents",
        docList: [
          { 
            _id: "doc2_1", 
            name: "Equipment Quotations", 
            status: "pending", 
            fileUrl: "",
            description: "From at least 3 suppliers"
          },
          { 
            _id: "doc2_2", 
            name: "Technical Specifications", 
            status: "pending", 
            fileUrl: "",
            description: "Complete technical specs"
          }
        ]
      }
    ]
  },
  {
    _id: "3",
    dclNo: "DCL-2024-003",
    customerNumber: "CUST003",
    customerName: "Premium Motors Ltd",
    loanType: "Asset Finance",
    title: "Fleet Vehicle Purchase - 5 Units",
    assignedToRM: { _id: "rm_current", name: "John Kamau", email: "john.kamau@ncba.co.ke" },
    createdBy: { _id: "creator2", name: "David Omondi", email: "david.o@ncba.co.ke" },
    creatorGeneralComment: "All vehicle documents from authorized dealers. Ready for upload.",
    status: "pending_rm",
    priority: "medium",
    slaExpiry: "2024-12-22T23:59:59Z",
    submittedToRMAt: "2024-12-16T10:45:00Z",
    createdAt: "2024-12-05T11:15:00Z",
    updatedAt: "2024-12-16T10:45:00Z",
    documents: [
      {
        category: "Vehicle Documents",
        docList: [
          { 
            _id: "doc3_1", 
            name: "Proforma Invoice", 
            status: "pending", 
            fileUrl: "",
            description: "From authorized dealer with breakdown"
          },
          { 
            _id: "doc3_2", 
            name: "Logbook Copies", 
            status: "pending", 
            fileUrl: "",
            description: "Existing fleet verified"
          },
          { 
            _id: "doc3_3", 
            name: "Insurance Certificates", 
            status: "pending", 
            fileUrl: "",
            description: "Valid insurance for all vehicles"
          }
        ]
      }
    ]
  }
];

// RM's MyQueue component
const MyQueue = ({ userId = "rm_current" }) => {
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mockData, setMockData] = useState([]);
  
  // Filters
  const [searchText, setSearchText] = useState("");

  // Load data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setMockData(MOCK_RM_CHECKLISTS);
      setLoading(false);
    }, 300);
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = mockData.filter((c) => c.status === "pending_rm");
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(c => 
        c.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
        c.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        c.loanType.toLowerCase().includes(searchText.toLowerCase()) ||
        c.createdBy?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  }, [mockData, searchText]);

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
  };

  // Refetch function
  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setMockData([...MOCK_RM_CHECKLISTS]);
      setLoading(false);
    }, 200);
  };

  // Columns - Format: DCL No, Customer No, Customer Name, Loan Type, Creator, Docs, Submitted, SLA
  const columns = [
    { 
      title: "DCL No", 
      dataIndex: "dclNo", 
      width: 140,
      render: (text) => (
        <div style={{ fontWeight: "bold", color: PRIMARY_PURPLE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_BLUE }} />
          {text}
        </div>
      )
    },
    { 
      title: "Customer No", 
      dataIndex: "customerNumber", 
      width: 110,
      render: (text) => (
        <div style={{ color: SECONDARY_BLUE, fontWeight: 500, fontSize: 13 }}>
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
          color: PRIMARY_PURPLE,
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
      title: "Creator", 
      dataIndex: "createdBy", 
      width: 120,
      render: (creator) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <UserOutlined style={{ color: SECONDARY_BLUE, fontSize: 12 }} />
          <span style={{ color: PRIMARY_PURPLE, fontWeight: 500, fontSize: 13 }}>{creator?.name || "N/A"}</span>
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
              color: PRIMARY_PURPLE, 
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
      title: "Submitted", 
      dataIndex: "submittedToRMAt", 
      width: 110,
      render: (date) => (
        <div style={{ fontSize: 12 }}>
          {dayjs(date).format('DD/MM/YYYY')}
        </div>
      )
    },
    { 
      title: "SLA", 
      dataIndex: "slaExpiry", 
      width: 90,
      fixed: "right",
      render: (date) => {
        const daysLeft = dayjs(date).diff(dayjs(), 'days');
        return (
          <Tag 
            color={daysLeft <= 2 ? ERROR_RED : daysLeft <= 5 ? WARNING_ORANGE : SUCCESS_GREEN}
            style={{ fontWeight: "bold", fontSize: 11 }}
          >
            {daysLeft > 0 ? `${daysLeft}d` : 'Expired'}
          </Tag>
        );
      }
    }
  ];

  // Custom table styles
  const customTableStyles = `
    .rm-myqueue-table .ant-table-wrapper { 
      border-radius: 12px; 
      overflow: hidden; 
      box-shadow: 0 10px 30px rgba(43, 28, 103, 0.08); 
      border: 1px solid #e0e0e0; 
    }
    .rm-myqueue-table .ant-table-thead > tr > th { 
      background-color: #f7f7f7 !important; 
      color: ${PRIMARY_PURPLE} !important; 
      font-weight: 700; 
      fontSize: 13px; 
      padding: 14px 12px !important; 
      border-bottom: 3px solid ${ACCENT_LIME} !important; 
      border-right: none !important; 
    }
    .rm-myqueue-table .ant-table-tbody > tr > td { 
      border-bottom: 1px solid #f0f0f0 !important; 
      border-right: none !important; 
      padding: 12px 12px !important; 
      fontSize: 13px; 
      color: #333; 
    }
    .rm-myqueue-table .ant-table-tbody > tr.ant-table-row:hover > td { 
      background-color: rgba(43, 28, 103, 0.1) !important; 
      cursor: pointer;
    }
    .rm-myqueue-table .ant-pagination .ant-pagination-item-active { 
      background-color: ${ACCENT_LIME} !important; 
      border-color: ${ACCENT_LIME} !important; 
    }
    .rm-myqueue-table .ant-pagination .ant-pagination-item-active a { 
      color: ${PRIMARY_PURPLE} !important; 
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
          borderLeft: `4px solid ${ACCENT_LIME}`
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h2 style={{ margin: 0, color: PRIMARY_PURPLE, display: "flex", alignItems: "center", gap: 12 }}>
              My Queue
              <Badge 
                count={filteredData.length} 
                style={{ 
                  backgroundColor: ACCENT_LIME,
                  fontSize: 12
                }}
              />
            </h2>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
              Upload documents for DCLs assigned to you
            </p>
          </Col>
        </Row>
      </Card>

      {/* Filters */}
      <Card 
        style={{ 
          marginBottom: 16,
          background: "#fafafa",
          border: `1px solid ${PRIMARY_PURPLE}20`,
          borderRadius: 8
        }}
        size="small"
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by DCL No, Customer, Loan Type, or Creator"
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
        <span style={{ color: PRIMARY_PURPLE, fontSize: 16, fontWeight: 600 }}>
          Pending Upload ({filteredData.length} items)
        </span>
      </Divider>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Spin tip="Loading DCLs..." />
        </div>
      ) : filteredData.length === 0 ? (
        <Empty 
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No DCLs pending upload</p>
              <p style={{ color: "#999" }}>
                {searchText 
                  ? 'Try changing your search term' 
                  : 'No DCLs assigned to you yet'}
              </p>
            </div>
          } 
          style={{ padding: 40 }} 
        />
      ) : (
        <div className="rm-myqueue-table">
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} DCLs`
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
        border: `1px solid ${PRIMARY_PURPLE}10`
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
        <RMActionModal
          checklist={selectedChecklist}
          open={modalOpen}
          onClose={() => { 
            setModalOpen(false);
            setSelectedChecklist(null);
            refetch();
          }}
          actionType="upload"
        />
      )}
    </div>
  );
};

export default MyQueue;