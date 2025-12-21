// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   Table,
// //   Tag,
// //   Card,
// //   Row,
// //   Col,
// //   Input,
// //   Button,
// //   Space,
// //   Select,
// //   DatePicker,
// //   Avatar,
// //   Spin,
// //   Empty,
// //   Typography,
// //   Modal,
// //   message,
// // } from "antd";
// // import {
// //   SearchOutlined,
// //   FilterOutlined,
// //   UserOutlined,
// //   FileTextOutlined,
// //   ClockCircleOutlined,
// //   CheckCircleOutlined,
// //   CloseCircleOutlined,
// //   EyeOutlined,
// //   CheckOutlined,
// //   CloseOutlined,
// //   MoreOutlined,
// //   ExclamationCircleOutlined,
// //   DownloadOutlined,
// // } from "@ant-design/icons";
// // import dayjs from "dayjs";
// // import { useNavigate } from "react-router-dom";

// // const { RangePicker } = DatePicker;
// // const { Option } = Select;
// // const { Text, Title } = Typography;
// // const { confirm } = Modal;

// // // Theme colors
// // const PRIMARY_BLUE = "#164679";
// // const ACCENT_LIME = "#b5d334";
// // const SUCCESS_GREEN = "#52c41a";
// // const ERROR_RED = "#ff4d4f";
// // const WARNING_ORANGE = "#faad14";
// // const PROCESSING_BLUE = "#1890ff";

// // const MyQueue = () => {
// //   const navigate = useNavigate();
// //   const [searchText, setSearchText] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [priorityFilter, setPriorityFilter] = useState("all");
// //   const [dateRange, setDateRange] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

// //   // Mock data - This is where deferrals from Relationship Managers will appear
// //   const [deferrals, setDeferrals] = useState([
// //     {
// //       id: "DF-001",
// //       deferralNumber: "DEF-2024-001",
// //       customerName: "JOHN DOE ENTERPRISES",
// //       dclNumber: "DCL-2024-001",
// //       deferralTitle: "Annual Report Submission Deferral",
// //       document: "Annual Financial Statements",
// //       loanType: "Term Loan",
// //       deferralType: "New",
// //       daysSought: 30,
// //       requestedBy: "Sarah Johnson (RM)",
// //       requestedDate: "2024-01-15",
// //       dueDate: "2024-02-14",
// //       status: "pending_approval", // From Relationship Manager
// //       priority: "high",
// //       currentStage: 1,
// //       totalStages: 3,
// //       approvers: [
// //         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-16" },
// //         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
// //         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
// //       ],
// //       customerNumber: "CUST001",
// //       rmName: "Sarah Johnson",
// //       rmEmail: "sarah.j@ncba.co.ke",
// //       rmPhone: "+254712345678",
// //       riskLevel: "Low",
// //       creditScore: "A",
// //       category: "Allowable",
// //       slaExpiry: "2024-01-18",
// //     },
// //     {
// //       id: "DF-002",
// //       deferralNumber: "DEF-2024-002",
// //       customerName: "SMART TECH SOLUTIONS",
// //       dclNumber: "DCL-2024-002",
// //       deferralTitle: "Financial Statement Extension",
// //       document: "Financial Statements",
// //       loanType: "Working Capital",
// //       deferralType: "Extension",
// //       daysSought: 45,
// //       requestedBy: "Michael Brown (RM)",
// //       requestedDate: "2024-01-10",
// //       dueDate: "2024-02-25",
// //       status: "pending_approval", // From Relationship Manager
// //       priority: "medium",
// //       currentStage: 2,
// //       totalStages: 2,
// //       approvers: [
// //         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-11" },
// //         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
// //       ],
// //       customerNumber: "CUST002",
// //       rmName: "Michael Brown",
// //       rmEmail: "michael.b@ncba.co.ke",
// //       rmPhone: "+254723456789",
// //       riskLevel: "Medium",
// //       creditScore: "B",
// //       category: "Non-Allowable",
// //       slaExpiry: "2024-01-12",
// //     },
// //     {
// //       id: "DF-003",
// //       deferralNumber: "DEF-2024-003",
// //       customerName: "GLOBAL LOGISTICS LTD",
// //       dclNumber: "DCL-2024-003",
// //       deferralTitle: "Audit Report Deferral",
// //       document: "Audit Report",
// //       loanType: "Asset Finance",
// //       deferralType: "New",
// //       daysSought: 15,
// //       requestedBy: "Emma Wilson (RM)",
// //       requestedDate: "2024-01-05",
// //       dueDate: "2024-01-20",
// //       status: "in_review", // Currently being reviewed
// //       priority: "low",
// //       currentStage: 3,
// //       totalStages: 3,
// //       approvers: [
// //         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-06" },
// //         { name: "Maria Garcia", role: "Head of Credit", approved: true, date: "2024-01-08" },
// //         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null, isCurrent: true },
// //       ],
// //       customerNumber: "CUST003",
// //       rmName: "Emma Wilson",
// //       rmEmail: "emma.w@ncba.co.ke",
// //       rmPhone: "+254734567890",
// //       riskLevel: "Low",
// //       creditScore: "A+",
// //       category: "Allowable",
// //       slaExpiry: "2024-01-09",
// //     },
// //     {
// //       id: "DF-004",
// //       deferralNumber: "DEF-2024-004",
// //       customerName: "TECHNOLOGY PARTNERS LTD",
// //       dclNumber: "DCL-2024-004",
// //       deferralTitle: "Quarterly Report Deferral",
// //       document: "Quarterly Report",
// //       loanType: "Term Loan",
// //       deferralType: "New",
// //       daysSought: 20,
// //       requestedBy: "Robert Kim (RM)",
// //       requestedDate: "2024-01-12",
// //       dueDate: "2024-02-01",
// //       status: "pending_approval", // From Relationship Manager
// //       priority: "medium",
// //       currentStage: 1,
// //       totalStages: 2,
// //       approvers: [
// //         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
// //       ],
// //       customerNumber: "CUST004",
// //       rmName: "Robert Kim",
// //       rmEmail: "robert.k@ncba.co.ke",
// //       rmPhone: "+254745678901",
// //       riskLevel: "Medium",
// //       creditScore: "B+",
// //       category: "Allowable",
// //       slaExpiry: "2024-01-15",
// //     },
// //     {
// //       id: "DF-005",
// //       deferralNumber: "DEF-2024-005",
// //       customerName: "GLOBAL MANUFACTURING INC",
// //       dclNumber: "DCL-2024-005",
// //       deferralTitle: "Audit Completion Extension",
// //       document: "Audit Completion Certificate",
// //       loanType: "Corporate Overdraft",
// //       deferralType: "Extension",
// //       daysSought: 60,
// //       requestedBy: "Lisa Wong (RM)",
// //       requestedDate: "2024-01-08",
// //       dueDate: "2024-03-08",
// //       status: "in_review", // Currently being reviewed
// //       priority: "high",
// //       currentStage: 2,
// //       totalStages: 3,
// //       approvers: [
// //         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-09" },
// //         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
// //         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
// //       ],
// //       customerNumber: "CUST005",
// //       rmName: "Lisa Wong",
// //       rmEmail: "lisa.w@ncba.co.ke",
// //       rmPhone: "+254756789012",
// //       riskLevel: "High",
// //       creditScore: "C",
// //       category: "Non-Allowable",
// //       slaExpiry: "2024-01-11",
// //     },
// //   ]);

// //   // Fetch data on component mount
// //   useEffect(() => {
// //     fetchDeferrals();
// //   }, []);

// //   const fetchDeferrals = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Simulate API call to fetch deferrals from Relationship Managers
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //       setIsLoading(false);
// //     } catch (error) {
// //       message.error("Failed to load deferral requests");
// //       setIsLoading(false);
// //     }
// //   };

// //   // Filtered deferrals - All in one table
// //   const filteredDeferrals = useMemo(() => {
// //     let filtered = [...deferrals];
    
// //     // Search filtering
// //     if (searchText) {
// //       const q = searchText.toLowerCase();
// //       filtered = filtered.filter(d =>
// //         d.customerName.toLowerCase().includes(q) ||
// //         d.dclNumber.toLowerCase().includes(q) ||
// //         d.deferralNumber.toLowerCase().includes(q) ||
// //         d.requestedBy.toLowerCase().includes(q) ||
// //         d.deferralTitle.toLowerCase().includes(q) ||
// //         d.customerNumber.toLowerCase().includes(q) ||
// //         d.document.toLowerCase().includes(q)
// //       );
// //     }
    
// //     // Status filter
// //     if (statusFilter !== "all") {
// //       filtered = filtered.filter(d => d.status === statusFilter);
// //     }
    
// //     // Priority filter
// //     if (priorityFilter !== "all") {
// //       filtered = filtered.filter(d => d.priority === priorityFilter);
// //     }
    
// //     // Date range filtering
// //     if (dateRange && dateRange.length === 2) {
// //       const [start, end] = dateRange;
// //       filtered = filtered.filter(d => {
// //         const requestDate = dayjs(d.requestedDate);
// //         return requestDate.isAfter(start) && requestDate.isBefore(end);
// //       });
// //     }
    
// //     return filtered;
// //   }, [deferrals, searchText, statusFilter, priorityFilter, dateRange]);

// //   // Handle Approve
// //   const handleApprove = (record) => {
// //     confirm({
// //       title: 'Approve Deferral Request',
// //       icon: <ExclamationCircleOutlined />,
// //       content: (
// //         <div>
// //           <p>Are you sure you want to approve this deferral request?</p>
// //           <p><strong>{record.deferralNumber}</strong> - {record.customerName}</p>
// //           <p>Days Sought: <strong>{record.daysSought}</strong> days</p>
// //           {record.category === "Non-Allowable" && (
// //             <p style={{ color: ERROR_RED, fontWeight: 'bold' }}>
// //               ⚠️ This is a Non-Allowable document
// //             </p>
// //           )}
// //         </div>
// //       ),
// //       okText: 'Yes, Approve',
// //       okType: 'primary',
// //       okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
// //       cancelText: 'Cancel',
// //       onOk() {
// //         // Simulate API call
// //         setIsLoading(true);
// //         setTimeout(() => {
// //           // Move to actioned and update status
// //           setDeferrals(prev => prev.filter(d => d.id !== record.id));
// //           setIsLoading(false);
// //           message.success(`Deferral ${record.deferralNumber} approved successfully!`);
// //         }, 500);
// //       },
// //     });
// //   };

// //   // Handle Reject
// //   const handleReject = (record) => {
// //     confirm({
// //       title: 'Reject Deferral Request',
// //       icon: <ExclamationCircleOutlined />,
// //       content: (
// //         <div>
// //           <p>Are you sure you want to reject this deferral request?</p>
// //           <p><strong>{record.deferralNumber}</strong> - {record.customerName}</p>
// //           <p>Requested by: <strong>{record.rmName}</strong></p>
// //           <p>Please provide a reason for rejection:</p>
// //           <Input.TextArea rows={3} placeholder="Enter rejection reason..." style={{ marginTop: 8 }} />
// //         </div>
// //       ),
// //       okText: 'Yes, Reject',
// //       okType: 'danger',
// //       okButtonProps: { style: { background: ERROR_RED, borderColor: ERROR_RED } },
// //       cancelText: 'Cancel',
// //       onOk() {
// //         // Simulate API call
// //         setIsLoading(true);
// //         setTimeout(() => {
// //           // Move to actioned and update status
// //           setDeferrals(prev => prev.filter(d => d.id !== record.id));
// //           setIsLoading(false);
// //           message.success(`Deferral ${record.deferralNumber} rejected successfully!`);
// //         }, 500);
// //       },
// //     });
// //   };

// //   // Handle Forward
// //   const handleForward = (record) => {
// //     confirm({
// //       title: 'Forward Deferral Request',
// //       icon: <ExclamationCircleOutlined />,
// //       content: (
// //         <div>
// //           <p>Forward this deferral request to:</p>
// //           <Select style={{ width: '100%', marginTop: 8 }} placeholder="Select approver">
// //             <Option value="chief_risk">Chief Risk Officer</Option>
// //             <Option value="compliance">Compliance Department</Option>
// //             <Option value="legal">Legal Department</Option>
// //             <Option value="ceo">CEO Office</Option>
// //           </Select>
// //         </div>
// //       ),
// //       okText: 'Forward',
// //       okType: 'default',
// //       cancelText: 'Cancel',
// //       onOk() {
// //         message.success(`Deferral ${record.deferralNumber} forwarded successfully!`);
// //       },
// //     });
// //   };

// //   // Bulk approve
// //   const handleBulkApprove = () => {
// //     if (selectedRows.length === 0) {
// //       message.warning('Please select deferrals to approve');
// //       return;
// //     }
    
// //     confirm({
// //       title: `Approve ${selectedRows.length} Deferral(s)`,
// //       icon: <ExclamationCircleOutlined />,
// //       content: `Are you sure you want to approve ${selectedRows.length} selected deferral(s)?`,
// //       okText: 'Yes, Approve All',
// //       okType: 'primary',
// //       okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
// //       cancelText: 'Cancel',
// //       onOk() {
// //         setIsLoading(true);
// //         setTimeout(() => {
// //           const idsToRemove = selectedRows.map(row => row.id);
// //           setDeferrals(prev => prev.filter(d => !idsToRemove.includes(d.id)));
// //           setSelectedRows([]);
// //           setSelectedRowKeys([]);
// //           setIsLoading(false);
// //           message.success(`Approved ${selectedRows.length} deferral(s) successfully!`);
// //         }, 500);
// //       },
// //     });
// //   };

// //   // Standardized Columns for the table
// //   const columns = [
// //     {
// //       title: "Deferral No",
// //       dataIndex: "deferralNumber",
// //       width: 120,
// //       fixed: "left",
// //       render: (deferralNumber) => (
// //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE }}>
// //           <FileTextOutlined style={{ marginRight: 6 }} />
// //           {deferralNumber}
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "DCL No",
// //       dataIndex: "dclNumber",
// //       width: 100,
// //     },
// //     {
// //       title: "Customer Name",
// //       dataIndex: "customerName",
// //       width: 180,
// //       render: (name) => (
// //         <Text strong style={{ color: PRIMARY_BLUE, fontSize: 13 }}>
// //           {name}
// //         </Text>
// //       ),
// //     },
// //     {
// //       title: "Loan Type",
// //       dataIndex: "loanType",
// //       width: 120,
// //       render: (loanType) => (
// //         <div style={{ fontSize: 12, fontWeight: 500 }}>
// //           {loanType}
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Document",
// //       dataIndex: "document",
// //       width: 150,
// //       render: (document) => (
// //         <Text ellipsis style={{ fontSize: 12 }}>
// //           {document}
// //         </Text>
// //       ),
// //     },
// //     {
// //       title: "Type",
// //       dataIndex: "deferralType",
// //       width: 100,
// //       render: (deferralType) => (
// //         <div style={{
// //           fontSize: 11,
// //           fontWeight: "bold",
// //           color: PRIMARY_BLUE
// //         }}>
// //           {deferralType}
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       width: 120,
// //       render: (status) => {
// //         const statusConfig = {
// //           pending_approval: { color: WARNING_ORANGE, text: "Pending", icon: <ClockCircleOutlined /> },
// //           in_review: { color: PROCESSING_BLUE, text: "In Review", icon: <ClockCircleOutlined /> },
// //           approved: { color: SUCCESS_GREEN, text: "Approved", icon: <CheckCircleOutlined /> },
// //           rejected: { color: ERROR_RED, text: "Rejected", icon: <CloseCircleOutlined /> },
// //         };
// //         const config = statusConfig[status] || { color: "default", text: status };
// //         return (
// //           <Tag
// //             color={config.color}
// //             icon={config.icon}
// //             style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}
// //           >
// //             {config.text}
// //           </Tag>
// //         );
// //       },
// //     },
// //     {
// //       title: "Days Sought",
// //       dataIndex: "daysSought",
// //       width: 100,
// //       align: "center",
// //       render: (daysSought) => (
// //         <Tag color={daysSought > 30 ? ERROR_RED : daysSought > 15 ? WARNING_ORANGE : SUCCESS_GREEN}>
// //           {daysSought}d
// //         </Tag>
// //       ),
// //     },
// //     {
// //       title: "SLA",
// //       dataIndex: "slaExpiry",
// //       width: 100,
// //       render: (date, record) => {
// //         if (record.status !== "pending_approval" && record.status !== "in_review") {
// //           return <Tag color="default">N/A</Tag>;
// //         }
        
// //         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
// //         let color = SUCCESS_GREEN;
// //         let text = `${Math.ceil(hoursLeft/24)}d`;
        
// //         if (hoursLeft <= 0) {
// //           color = ERROR_RED;
// //           text = 'Expired';
// //         } else if (hoursLeft <= 24) {
// //           color = ERROR_RED;
// //           text = `${hoursLeft}h`;
// //         } else if (hoursLeft <= 72) {
// //           color = WARNING_ORANGE;
// //         }
        
// //         return (
// //           <Tag color={color} style={{ fontWeight: "bold", fontSize: 11 }}>
// //             {text}
// //           </Tag>
// //         );
// //       },
// //     },
// //     {
// //       title: "Actions",
// //       width: 200,
// //       fixed: "right",
// //       render: (record) => (
// //         <Space size="small">
// //           <Button
// //             type="primary"
// //             size="small"
// //             icon={<EyeOutlined />}
// //             onClick={() => {
// //               // Open detailed view modal
// //               message.info(`Opening detailed view for ${record.deferralNumber}`);
// //             }}
// //             style={{
// //               background: PRIMARY_BLUE,
// //               borderColor: PRIMARY_BLUE,
// //             }}
// //           >
// //             Review
// //           </Button>
// //           <Button
// //             type="primary"
// //             size="small"
// //             icon={<CheckOutlined />}
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               handleApprove(record);
// //             }}
// //             style={{
// //               background: SUCCESS_GREEN,
// //               borderColor: SUCCESS_GREEN,
// //             }}
// //           />
// //           <Button
// //             type="primary"
// //             size="small"
// //             danger
// //             icon={<CloseOutlined />}
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               handleReject(record);
// //             }}
// //           />
// //           <Button
// //             type="default"
// //             size="small"
// //             icon={<MoreOutlined />}
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               handleForward(record);
// //             }}
// //           />
// //         </Space>
// //       ),
// //     },
// //   ];

// //   // Row selection configuration
// //   const rowSelection = {
// //     selectedRowKeys,
// //     onChange: (selectedKeys, selectedRows) => {
// //       setSelectedRowKeys(selectedKeys);
// //       setSelectedRows(selectedRows);
// //     },
// //   };

// //   // Custom table styles
// //   const tableStyles = `
// //     .myqueue-table .ant-table-wrapper {
// //       border-radius: 12px;
// //       overflow: hidden;
// //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// //       border: 1px solid #e0e0e0;
// //     }
// //     .myqueue-table .ant-table-thead > tr > th {
// //       background-color: #f7f7f7 !important;
// //       color: ${PRIMARY_BLUE} !important;
// //       font-weight: 700;
// //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// //     }
// //     .myqueue-table .ant-table-tbody > tr:hover > td {
// //       background-color: rgba(181, 211, 52, 0.1) !important;
// //       cursor: pointer;
// //     }
// //   `;

// //   return (
// //     <div style={{ padding: 24 }}>
// //       <style>{tableStyles}</style>

// //       {/* Header */}
// //       <Card
// //         style={{
// //           marginBottom: 24,
// //           borderLeft: `4px solid ${ACCENT_LIME}`,
// //         }}
// //       >
// //         <h2 style={{ margin: 0, color: PRIMARY_BLUE }}>My Queue</h2>
// //         <p style={{ marginTop: 4, color: "#666" }}>
// //           All deferral requests from Relationship Managers • {filteredDeferrals.length} items
// //         </p>
// //       </Card>

// //       {/* Bulk Actions Bar (only shown when items are selected) */}
// //       {selectedRows.length > 0 && (
// //         <Card
// //           size="small"
// //           style={{
// //             marginBottom: 16,
// //             background: "rgba(22, 70, 121, 0.05)",
// //             border: `1px solid ${PRIMARY_BLUE}`,
// //           }}
// //         >
// //           <Row align="middle" justify="space-between">
// //             <Col>
// //               <Text strong style={{ color: PRIMARY_BLUE }}>
// //                 {selectedRows.length} deferral(s) selected
// //               </Text>
// //             </Col>
// //             <Col>
// //               <Space>
// //                 <Button
// //                   type="primary"
// //                   icon={<CheckOutlined />}
// //                   onClick={handleBulkApprove}
// //                   style={{
// //                     background: SUCCESS_GREEN,
// //                     borderColor: SUCCESS_GREEN,
// //                   }}
// //                 >
// //                   Approve Selected
// //                 </Button>
// //                 <Button
// //                   type="default"
// //                   onClick={() => {
// //                     setSelectedRows([]);
// //                     setSelectedRowKeys([]);
// //                   }}
// //                 >
// //                   Clear Selection
// //                 </Button>
// //               </Space>
// //             </Col>
// //           </Row>
// //         </Card>
// //       )}

// //       {/* Search Filter Only */}
// //       <Card size="small" style={{ marginBottom: 16 }}>
// //         <Row gutter={16}>
// //           <Col md={12}>
// //             <Input
// //               prefix={<SearchOutlined />}
// //               placeholder="Search by Customer, DCL, or ID"
// //               value={searchText}
// //               onChange={(e) => setSearchText(e.target.value)}
// //               allowClear
// //               size="large"
// //             />
// //           </Col>
// //         </Row>
// //       </Card>

// //       {/* Main Table */}
// //       <Card>
// //         <div className="myqueue-table">
// //           <Table
// //             columns={columns}
// //             dataSource={filteredDeferrals}
// //             rowKey="id"
// //             rowSelection={rowSelection}
// //             pagination={{
// //               pageSize: 10,
// //               showSizeChanger: true,
// //               showQuickJumper: true,
// //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
// //             }}
// //             loading={isLoading}
// //             scroll={{ x: 1500 }}
// //             size="middle"
// //             locale={{
// //               emptyText: (
// //                 <Empty
// //                   description={
// //                     filteredDeferrals.length === 0 && deferrals.length > 0
// //                       ? "No deferrals match your filters"
// //                       : "No deferral requests in your queue"
// //                   }
// //                 />
// //               ),
// //             }}
// //             onRow={(record) => ({
// //               onClick: () => {
// //                 // Open detailed view
// //                 message.info(`Opening detailed view for ${record.deferralNumber}`);
// //               },
// //             })}
// //           />
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default MyQueue;









// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Table,
//   Tag,
//   Card,
//   Row,
//   Col,
//   Input,
//   Button,
//   Space,
//   Select,
//   DatePicker,
//   Avatar,
//   Spin,
//   Empty,
//   Typography,
//   Modal,
//   message,
//   Badge,
//   Divider,
//   Descriptions,
//   Upload,
//   Form,
//   Input as AntdInput,
//   Progress,
//   List,
//   Popconfirm
// } from "antd";
// import {
//   SearchOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   UploadOutlined,
//   DownloadOutlined,
//   InfoCircleOutlined,
//   CalendarOutlined,
//   FilePdfOutlined,
//   FileWordOutlined,
//   FileExcelOutlined,
//   FileImageOutlined,
//   EyeOutlined,
//   CheckOutlined,
//   CloseOutlined,
//   MoreOutlined,
//   ExclamationCircleOutlined,
//   FilterOutlined,
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

// const { RangePicker } = DatePicker;
// const { Option } = Select;
// const { Text, Title } = Typography;
// const { confirm } = Modal;
// const { TextArea } = AntdInput;

// // Theme colors
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const SUCCESS_GREEN = "#52c41a";
// const ERROR_RED = "#ff4d4f";
// const WARNING_ORANGE = "#faad14";
// const PROCESSING_BLUE = "#1890ff";

// const getFileIcon = (type) => {
//   switch (type) {
//     case 'pdf': return <FilePdfOutlined style={{ color: ERROR_RED }} />;
//     case 'word': return <FileWordOutlined style={{ color: PRIMARY_BLUE }} />;
//     case 'excel': return <FileExcelOutlined style={{ color: SUCCESS_GREEN }} />;
//     case 'image': return <FileImageOutlined style={{ color: "#7e6496" }} />;
//     default: return <FileTextOutlined />;
//   }
// };

// const getRoleTag = (role) => {
//   let color = "blue";
//   const roleLower = (role || "").toLowerCase();
//   switch (roleLower) {
//     case "rm":
//       color = "purple";
//       break;
//     case "deferral management":
//       color = "green";
//       break;
//     case "creator":
//       color = "green";
//       break;
//     case "co_checker":
//       color = "volcano";
//       break;
//     case "system":
//       color = "default";
//       break;
//     default:
//       color = "blue";
//   }
//   return (
//     <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
//       {roleLower.replace(/_/g, " ")}
//     </Tag>
//   );
// };

// // Helper function to remove role from username in brackets
// const formatUsername = (username) => {
//   if (!username) return "System";
//   return username.replace(/\s*\([^)]*\)\s*$/, '').trim();
// };

// const CommentTrail = ({ history, isLoading }) => {
//   if (isLoading) return <Spin className="block m-5" />;
//   if (!history || history.length === 0)
//     return <i className="pl-4">No historical comments yet.</i>;

//   return (
//     <div className="max-h-52 overflow-y-auto">
//       <List
//         dataSource={history}
//         itemLayout="horizontal"
//         renderItem={(item) => (
//           <List.Item>
//             <List.Item.Meta
//               avatar={<Avatar icon={<UserOutlined />} />}
//               title={
//                 <div className="flex justify-between">
//                   <div>
//                     <b>{formatUsername(item.user) || "System"}</b>
//                     {getRoleTag(item.userRole || "system")}
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {dayjs(item.date).format('DD MMM YYYY HH:mm')}
//                   </span>
//                 </div>
//               }
//               description={
//                 <div className="break-words">
//                   {item.comment || item.notes || "No comment provided."}
//                 </div>
//               }
//             />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// // Add Comment Modal Component
// const AddCommentModal = ({ open, onClose, onAddComment, deferralId }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = () => {
//     form.validateFields().then(values => {
//       setLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         message.success('Comment added successfully');
//         form.resetFields();
//         setLoading(false);
//         onAddComment(deferralId, values.comment);
//         onClose();
//       }, 500);
//     });
//   };

//   return (
//     <Modal
//       title="Add Comment to Deferral"
//       open={open}
//       onCancel={onClose}
//       footer={[
//         <Button key="cancel" onClick={onClose}>
//           Cancel
//         </Button>,
//         <Button 
//           key="submit" 
//           type="primary" 
//           onClick={handleSubmit}
//           loading={loading}
//           style={{ backgroundColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE }}
//         >
//           Add Comment
//         </Button>
//       ]}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           name="comment"
//           label="Your Comment"
//           rules={[{ required: true, message: 'Please enter your comment' }]}
//         >
//           <TextArea 
//             rows={4} 
//             placeholder="Enter your comment here. This will be visible in the comment trail and history."
//             maxLength={500}
//             showCount
//           />
//         </Form.Item>
//         <div style={{ color: '#666', fontSize: 12 }}>
//           <InfoCircleOutlined /> Comments added here will appear in the comment trail with your name and timestamp.
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// // Custom CSS for modal styling
// const customStyles = `
//   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
//   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
//   .ant-modal-close-x { color: white !important; }

//   .deferral-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
//   .deferral-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: #7e6496 !important; padding-bottom: 4px; }
//   .deferral-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

//   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
//   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

//   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

//   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
//   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// `;

// // Deferral Details Modal for MyQueue - Shows status as pending
// const DeferralDetailsModal = ({ deferral, open, onClose, onAction }) => {
//   const [addCommentVisible, setAddCommentVisible] = useState(false);
//   const [loadingComments, setLoadingComments] = useState(false);
  
//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'pending_approval':
//       case 'deferral_requested':
//         return { 
//           color: 'orange', 
//           icon: <ClockCircleOutlined />, 
//           label: 'Pending Review', 
//           description: 'Awaiting your approval',
//           badgeColor: WARNING_ORANGE
//         };
//       case 'in_review':
//         return { 
//           color: 'blue', 
//           icon: <ClockCircleOutlined />, 
//           label: 'In Review', 
//           description: 'Currently being reviewed',
//           badgeColor: PROCESSING_BLUE
//         };
//       case 'approved':
//       case 'deferral_approved':
//         return { 
//           color: 'green', 
//           icon: <CheckCircleOutlined />, 
//           label: 'Approved', 
//           description: 'Deferral approved',
//           badgeColor: SUCCESS_GREEN
//         };
//       case 'rejected':
//       case 'deferral_rejected':
//         return { 
//           color: 'red', 
//           icon: <CloseCircleOutlined />, 
//           label: 'Rejected', 
//           description: 'Deferral request was rejected',
//           badgeColor: ERROR_RED
//         };
//       default:
//         return { 
//           color: 'default', 
//           label: status, 
//           description: '',
//           badgeColor: '#d9d9d9'
//         };
//     }
//   };

//   const statusConfig = getStatusConfig(deferral?.status);

//   const handleAddComment = (deferralId, comment) => {
//     const newComment = {
//       action: 'Comment Added',
//       user: 'You (Approver)',
//       date: new Date().toISOString(),
//       notes: 'Comment added by approver',
//       comment: comment,
//       userRole: 'Approver'
//     };
    
//     // Add to history
//     if (onAction) {
//       onAction('addComment', deferralId, newComment);
//     }
//   };

//   const handleApprove = () => {
//     confirm({
//       title: 'Approve Deferral Request',
//       icon: <ExclamationCircleOutlined />,
//       content: (
//         <div>
//           <p>Are you sure you want to approve this deferral request?</p>
//           <p><strong>{deferral?.deferralNumber}</strong> - {deferral?.customerName}</p>
//           <p>Days Sought: <strong>{deferral?.daysSought}</strong> days</p>
//           {deferral?.category === "Non-Allowable" && (
//             <p style={{ color: ERROR_RED, fontWeight: 'bold' }}>
//               ⚠️ This is a Non-Allowable document
//             </p>
//           )}
//           <p>Add approval comment (optional):</p>
//           <Input.TextArea rows={3} placeholder="Enter approval comment..." style={{ marginTop: 8 }} id="approvalComment" />
//         </div>
//       ),
//       okText: 'Yes, Approve',
//       okType: 'primary',
//       okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
//       cancelText: 'Cancel',
//       onOk() {
//         const commentInput = document.getElementById('approvalComment');
//         const comment = commentInput?.value || 'Deferral request approved.';
        
//         if (onAction) {
//           onAction('approve', deferral.id, { comment });
//         }
//         onClose();
//       },
//     });
//   };

//   const handleReject = () => {
//     confirm({
//       title: 'Reject Deferral Request',
//       icon: <ExclamationCircleOutlined />,
//       content: (
//         <div>
//           <p>Are you sure you want to reject this deferral request?</p>
//           <p><strong>{deferral?.deferralNumber}</strong> - {deferral?.customerName}</p>
//           <p>Please provide a reason for rejection:</p>
//           <Input.TextArea rows={3} placeholder="Enter rejection reason..." style={{ marginTop: 8 }} id="rejectionComment" />
//         </div>
//       ),
//       okText: 'Yes, Reject',
//       okType: 'danger',
//       okButtonProps: { style: { background: ERROR_RED, borderColor: ERROR_RED } },
//       cancelText: 'Cancel',
//       onOk() {
//         const commentInput = document.getElementById('rejectionComment');
//         const comment = commentInput?.value;
        
//         if (!comment || comment.trim() === '') {
//           message.error('Please provide a rejection reason');
//           return;
//         }
        
//         if (onAction) {
//           onAction('reject', deferral.id, { comment });
//         }
//         onClose();
//       },
//     });
//   };

//   if (!deferral) return null;

//   // Create history from approvers data
//   const history = [
//     { 
//       action: "Requested", 
//       user: deferral.requestedBy || deferral.rmName,
//       date: deferral.requestedDate, 
//       notes: "Deferral request submitted",
//       comment: deferral.rmReason || "No reason provided",
//       userRole: "RM"
//     },
//     ...(deferral.approvers || []).filter(a => a.approved === true).map(a => ({
//       action: "Approved",
//       user: `${a.name} (${a.role})`,
//       date: a.date,
//       notes: `Approved by ${a.role}`,
//       comment: `Approved by ${a.role}`,
//       userRole: a.role
//     }))
//   ];

//   // Create attachments array from your data structure
//   const attachments = deferral.attachments || [
//     { 
//       id: "att1", 
//       name: `${deferral.document}.pdf`, 
//       size: "1.5 MB", 
//       type: "pdf", 
//       uploadDate: deferral.requestedDate 
//     }
//   ];

//   return (
//     <>
//       <style>{customStyles}</style>
//       <Modal
//         title={`Review Deferral Request: ${deferral.deferralNumber}`}
//         open={open}
//         onCancel={onClose}
//         width={950}
//         bodyStyle={{ padding: "0 24px 24px" }}
//         footer={[
//           <Button key="cancel" onClick={onClose}>
//             Close
//           </Button>,
//           <Button
//             key="editComment"
//             icon={<EditOutlined />}
//             onClick={() => setAddCommentVisible(true)}
//           >
//             Add Comment
//           </Button>,
//           (deferral.status === "pending_approval" || deferral.status === "in_review") && (
//             <Button
//               key="reject"
//               danger
//               icon={<CloseOutlined />}
//               onClick={handleReject}
//             >
//               Reject
//             </Button>
//           ),
//           (deferral.status === "pending_approval" || deferral.status === "in_review") && (
//             <Button
//               key="approve"
//               type="primary"
//               style={{ backgroundColor: SUCCESS_GREEN, borderColor: SUCCESS_GREEN }}
//               icon={<CheckOutlined />}
//               onClick={handleApprove}
//             >
//               Approve
//             </Button>
//           )
//         ]}
//       >
//         {deferral && (
//           <>
//             {/* Deferral Details Card */}
//             <Card
//               className="deferral-info-card"
//               size="small"
//               title={
//                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
//                   Deferral Details
//                 </span>
//               }
//               style={{
//                 marginBottom: 18,
//                 marginTop: 24,
//                 borderRadius: 10,
//                 border: `1px solid #e0e0e0`,
//               }}
//             >
//               <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
//                 <Descriptions.Item label="Deferral Number">
//                   <Text strong style={{ color: PRIMARY_BLUE }}>
//                     {deferral.deferralNumber}
//                   </Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="DCL No">
//                   {deferral.dclNumber}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Status">
//                   <div style={{ fontWeight: 500 }}>
//                     {statusConfig.label}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Customer">
//                   <div style={{ fontWeight: 500 }}>
//                     {deferral.customerName}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Loan Type">
//                   <div style={{ fontWeight: 500 }}>
//                     {deferral.loanType}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Document">
//                   <div style={{ fontWeight: 500 }}>
//                     {deferral.document}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Deferral Type">
//                   <div style={{ fontWeight: 500 }}>
//                     {deferral.deferralType}
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Days Sought">
//                   <div style={{
//                     fontWeight: "bold",
//                     color: deferral.daysSought > 45 ? ERROR_RED : deferral.daysSought > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
//                     fontSize: 14
//                   }}>
//                     {deferral.daysSought} days
//                   </div>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Current Approver">
//                   {deferral.approvers?.find(a => a.isCurrent)?.name || "You"}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="SLA Expiry">
//                   <div style={{ color: dayjs(deferral.slaExpiry).isBefore(dayjs()) ? ERROR_RED : PRIMARY_BLUE }}>
//                     {dayjs(deferral.slaExpiry).format('DD MMM YYYY HH:mm')}
//                   </div>
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             {/* Attachments Section */}
//             <Card
//               size="small"
//               title={
//                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
//                   Attachments ({attachments.length} files)
//                 </span>
//               }
//               style={{ marginBottom: 18 }}
//             >
//               {attachments.length > 0 ? (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                   {attachments.map(att => (
//                     <div key={att.id} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       padding: '12px 16px',
//                       backgroundColor: '#f8f9fa',
//                       borderRadius: 6,
//                       border: '1px solid #e8e8e8'
//                     }}>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                         {getFileIcon(att.type)}
//                         <div>
//                           <div style={{ fontWeight: 500, fontSize: 14 }}>{att.name}</div>
//                           <div style={{ fontSize: 12, color: '#666' }}>
//                             {att.size} • {dayjs(att.uploadDate).format('DD MMM YYYY HH:mm')}
//                           </div>
//                         </div>
//                       </div>
//                       <Space>
//                         <Button 
//                           type="text" 
//                           icon={<EyeOutlined />}
//                           onClick={() => window.open(att.url || '#', '_blank')}
//                         >
//                           View
//                         </Button>
//                         <Button 
//                           type="text" 
//                           icon={<DownloadOutlined />}
//                         >
//                           Download
//                         </Button>
//                       </Space>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div style={{ textAlign: 'center', padding: 16, color: '#999' }}>
//                   No attachments uploaded
//                 </div>
//               )}
//             </Card>

//             {/* Comment Trail & History */}
//             <div style={{ marginTop: 24 }}>
//               <h4>Comment Trail & History</h4>
//               <CommentTrail 
//                 history={history} 
//                 isLoading={loadingComments}
//               />
//             </div>

//             {/* Add Comment Modal */}
//             <AddCommentModal
//               open={addCommentVisible}
//               onClose={() => setAddCommentVisible(false)}
//               onAddComment={handleAddComment}
//               deferralId={deferral.id}
//             />
//           </>
//         )}
//       </Modal>
//     </>
//   );
// };

// const MyQueue = () => {
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
//   // State for modal
//   const [selectedDeferral, setSelectedDeferral] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Mock data - This is where deferrals from Relationship Managers will appear
//   const [deferrals, setDeferrals] = useState([
//     {
//       id: "DF-001",
//       deferralNumber: "DEF-2024-001",
//       customerName: "JOHN DOE ENTERPRISES",
//       dclNumber: "DCL-2024-001",
//       deferralTitle: "Annual Report Submission Deferral",
//       document: "Annual Financial Statements",
//       loanType: "Term Loan",
//       deferralType: "New",
//       daysSought: 30,
//       requestedBy: "Sarah Johnson (RM)",
//       requestedDate: "2024-01-15",
//       dueDate: "2024-02-14",
//       status: "pending_approval", // From Relationship Manager
//       priority: "high",
//       currentStage: 1,
//       totalStages: 3,
//       approvers: [
//         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-16" },
//         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
//         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
//       ],
//       customerNumber: "CUST001",
//       rmName: "Sarah Johnson",
//       rmEmail: "sarah.j@ncba.co.ke",
//       rmPhone: "+254712345678",
//       riskLevel: "Low",
//       creditScore: "A",
//       category: "Allowable",
//       slaExpiry: "2024-01-18",
//     },
//     {
//       id: "DF-002",
//       deferralNumber: "DEF-2024-002",
//       customerName: "SMART TECH SOLUTIONS",
//       dclNumber: "DCL-2024-002",
//       deferralTitle: "Financial Statement Extension",
//       document: "Financial Statements",
//       loanType: "Working Capital",
//       deferralType: "Extension",
//       daysSought: 45,
//       requestedBy: "Michael Brown (RM)",
//       requestedDate: "2024-01-10",
//       dueDate: "2024-02-25",
//       status: "pending_approval", // From Relationship Manager
//       priority: "medium",
//       currentStage: 2,
//       totalStages: 2,
//       approvers: [
//         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-11" },
//         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
//       ],
//       customerNumber: "CUST002",
//       rmName: "Michael Brown",
//       rmEmail: "michael.b@ncba.co.ke",
//       rmPhone: "+254723456789",
//       riskLevel: "Medium",
//       creditScore: "B",
//       category: "Non-Allowable",
//       slaExpiry: "2024-01-12",
//     },
//     {
//       id: "DF-003",
//       deferralNumber: "DEF-2024-003",
//       customerName: "GLOBAL LOGISTICS LTD",
//       dclNumber: "DCL-2024-003",
//       deferralTitle: "Audit Report Deferral",
//       document: "Audit Report",
//       loanType: "Asset Finance",
//       deferralType: "New",
//       daysSought: 15,
//       requestedBy: "Emma Wilson (RM)",
//       requestedDate: "2024-01-05",
//       dueDate: "2024-01-20",
//       status: "in_review", // Currently being reviewed
//       priority: "low",
//       currentStage: 3,
//       totalStages: 3,
//       approvers: [
//         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-06" },
//         { name: "Maria Garcia", role: "Head of Credit", approved: true, date: "2024-01-08" },
//         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null, isCurrent: true },
//       ],
//       customerNumber: "CUST003",
//       rmName: "Emma Wilson",
//       rmEmail: "emma.w@ncba.co.ke",
//       rmPhone: "+254734567890",
//       riskLevel: "Low",
//       creditScore: "A+",
//       category: "Allowable",
//       slaExpiry: "2024-01-09",
//     },
//     {
//       id: "DF-004",
//       deferralNumber: "DEF-2024-004",
//       customerName: "TECHNOLOGY PARTNERS LTD",
//       dclNumber: "DCL-2024-004",
//       deferralTitle: "Quarterly Report Deferral",
//       document: "Quarterly Report",
//       loanType: "Term Loan",
//       deferralType: "New",
//       daysSought: 20,
//       requestedBy: "Robert Kim (RM)",
//       requestedDate: "2024-01-12",
//       dueDate: "2024-02-01",
//       status: "pending_approval", // From Relationship Manager
//       priority: "medium",
//       currentStage: 1,
//       totalStages: 2,
//       approvers: [
//         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
//       ],
//       customerNumber: "CUST004",
//       rmName: "Robert Kim",
//       rmEmail: "robert.k@ncba.co.ke",
//       rmPhone: "+254745678901",
//       riskLevel: "Medium",
//       creditScore: "B+",
//       category: "Allowable",
//       slaExpiry: "2024-01-15",
//     },
//     {
//       id: "DF-005",
//       deferralNumber: "DEF-2024-005",
//       customerName: "GLOBAL MANUFACTURING INC",
//       dclNumber: "DCL-2024-005",
//       deferralTitle: "Audit Completion Extension",
//       document: "Audit Completion Certificate",
//       loanType: "Corporate Overdraft",
//       deferralType: "Extension",
//       daysSought: 60,
//       requestedBy: "Lisa Wong (RM)",
//       requestedDate: "2024-01-08",
//       dueDate: "2024-03-08",
//       status: "in_review", // Currently being reviewed
//       priority: "high",
//       currentStage: 2,
//       totalStages: 3,
//       approvers: [
//         { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-09" },
//         { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
//         { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
//       ],
//       customerNumber: "CUST005",
//       rmName: "Lisa Wong",
//       rmEmail: "lisa.w@ncba.co.ke",
//       rmPhone: "+254756789012",
//       riskLevel: "High",
//       creditScore: "C",
//       category: "Non-Allowable",
//       slaExpiry: "2024-01-11",
//     },
//   ]);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchDeferrals();
//   }, []);

//   const fetchDeferrals = async () => {
//     setIsLoading(true);
//     try {
//       // Simulate API call to fetch deferrals from Relationship Managers
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setIsLoading(false);
//     } catch (error) {
//       message.error("Failed to load deferral requests");
//       setIsLoading(false);
//     }
//   };

//   // Filtered deferrals - All in one table
//   const filteredDeferrals = useMemo(() => {
//     let filtered = [...deferrals];
    
//     // Search filtering
//     if (searchText) {
//       const q = searchText.toLowerCase();
//       filtered = filtered.filter(d =>
//         d.customerName.toLowerCase().includes(q) ||
//         d.dclNumber.toLowerCase().includes(q) ||
//         d.deferralNumber.toLowerCase().includes(q) ||
//         d.requestedBy.toLowerCase().includes(q) ||
//         d.deferralTitle.toLowerCase().includes(q) ||
//         d.customerNumber.toLowerCase().includes(q) ||
//         d.document.toLowerCase().includes(q)
//       );
//     }
    
//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(d => d.status === statusFilter);
//     }
    
//     // Priority filter
//     if (priorityFilter !== "all") {
//       filtered = filtered.filter(d => d.priority === priorityFilter);
//     }
    
//     // Date range filtering
//     if (dateRange && dateRange.length === 2) {
//       const [start, end] = dateRange;
//       filtered = filtered.filter(d => {
//         const requestDate = dayjs(d.requestedDate);
//         return requestDate.isAfter(start) && requestDate.isBefore(end);
//       });
//     }
    
//     return filtered;
//   }, [deferrals, searchText, statusFilter, priorityFilter, dateRange]);

//   // Handle actions from modal
//   const handleModalAction = (action, deferralId, data) => {
//     switch (action) {
//       case 'addComment':
//         // Add new comment to history
//         setDeferrals(prev => prev.map(d => 
//           d.id === deferralId ? { 
//             ...d, 
//             // Create approver comment entry
//             approvers: [...d.approvers, {
//               name: "You",
//               role: "Approver",
//               approved: null,
//               date: new Date().toISOString(),
//               comment: data?.comment
//             }]
//           } : d
//         ));
//         break;
//       case 'approve':
//         // Handle approve action
//         setDeferrals(prev => prev.map(d => 
//           d.id === deferralId ? { 
//             ...d, 
//             status: 'approved',
//             approvers: d.appovers.map(a => 
//               a.isCurrent ? { ...a, approved: true, date: new Date().toISOString() } : a
//             )
//           } : d
//         ));
//         message.success('Deferral approved successfully');
//         break;
//       case 'reject':
//         // Handle reject action
//         setDeferrals(prev => prev.map(d => 
//           d.id === deferralId ? { 
//             ...d, 
//             status: 'rejected',
//             approvers: d.approvers.map(a => 
//               a.isCurrent ? { ...a, approved: false, date: new Date().toISOString() } : a
//             )
//           } : d
//         ));
//         message.success('Deferral rejected');
//         break;
//       default:
//         break;
//     }
//   };

//   // Bulk approve
//   const handleBulkApprove = () => {
//     if (selectedRows.length === 0) {
//       message.warning('Please select deferrals to approve');
//       return;
//     }
    
//     confirm({
//       title: `Approve ${selectedRows.length} Deferral(s)`,
//       icon: <ExclamationCircleOutlined />,
//       content: `Are you sure you want to approve ${selectedRows.length} selected deferral(s)?`,
//       okText: 'Yes, Approve All',
//       okType: 'primary',
//       okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
//       cancelText: 'Cancel',
//       onOk() {
//         setIsLoading(true);
//         setTimeout(() => {
//           const idsToRemove = selectedRows.map(row => row.id);
//           setDeferrals(prev => prev.filter(d => !idsToRemove.includes(d.id)));
//           setSelectedRows([]);
//           setSelectedRowKeys([]);
//           setIsLoading(false);
//           message.success(`Approved ${selectedRows.length} deferral(s) successfully!`);
//         }, 500);
//       },
//     });
//   };

//   // Standardized Columns for the table - USING YOUR EXACT COLUMNS
//   const columns = [
//     {
//       title: "Deferral No",
//       dataIndex: "deferralNumber",
//       width: 120,
//       fixed: "left",
//       render: (deferralNumber) => (
//         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE }}>
//           <FileTextOutlined style={{ marginRight: 6 }} />
//           {deferralNumber}
//         </div>
//       ),
//     },
//     {
//       title: "DCL No",
//       dataIndex: "dclNumber",
//       width: 100,
//     },
//     {
//       title: "Customer Name",
//       dataIndex: "customerName",
//       width: 180,
//       render: (name) => (
//         <Text strong style={{ color: PRIMARY_BLUE, fontSize: 13 }}>
//           {name}
//         </Text>
//       ),
//     },
//     {
//       title: "Loan Type",
//       dataIndex: "loanType",
//       width: 120,
//       render: (loanType) => (
//         <div style={{ fontSize: 12, fontWeight: 500 }}>
//           {loanType}
//         </div>
//       ),
//     },
//     {
//       title: "Document",
//       dataIndex: "document",
//       width: 150,
//       render: (document) => (
//         <Text ellipsis style={{ fontSize: 12 }}>
//           {document}
//         </Text>
//       ),
//     },
//     {
//       title: "Type",
//       dataIndex: "deferralType",
//       width: 100,
//       render: (deferralType) => (
//         <div style={{
//           fontSize: 11,
//           fontWeight: "bold",
//           color: PRIMARY_BLUE
//         }}>
//           {deferralType}
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       width: 120,
//       render: (status) => {
//         const statusConfig = {
//           pending_approval: { color: WARNING_ORANGE, text: "Pending", icon: <ClockCircleOutlined /> },
//           in_review: { color: PROCESSING_BLUE, text: "In Review", icon: <ClockCircleOutlined /> },
//           approved: { color: SUCCESS_GREEN, text: "Approved", icon: <CheckCircleOutlined /> },
//           rejected: { color: ERROR_RED, text: "Rejected", icon: <CloseCircleOutlined /> },
//         };
//         const config = statusConfig[status] || { color: "default", text: status };
//         return (
//           <Tag
//             color={config.color}
//             icon={config.icon}
//             style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}
//           >
//             {config.text}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "Days Sought",
//       dataIndex: "daysSought",
//       width: 100,
//       align: "center",
//       render: (daysSought) => (
//         <Tag color={daysSought > 30 ? ERROR_RED : daysSought > 15 ? WARNING_ORANGE : SUCCESS_GREEN}>
//           {daysSought}d
//         </Tag>
//       ),
//     },
//     {
//       title: "SLA",
//       dataIndex: "slaExpiry",
//       width: 100,
//       render: (date, record) => {
//         if (record.status !== "pending_approval" && record.status !== "in_review") {
//           return <Tag color="default">N/A</Tag>;
//         }
        
//         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
//         let color = SUCCESS_GREEN;
//         let text = `${Math.ceil(hoursLeft/24)}d`;
        
//         if (hoursLeft <= 0) {
//           color = ERROR_RED;
//           text = 'Expired';
//         } else if (hoursLeft <= 24) {
//           color = ERROR_RED;
//           text = `${hoursLeft}h`;
//         } else if (hoursLeft <= 72) {
//           color = WARNING_ORANGE;
//         }
        
//         return (
//           <Tag color={color} style={{ fontWeight: "bold", fontSize: 11 }}>
//             {text}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "Actions",
//       width: 120,
//       fixed: "right",
//       render: (record) => (
//         <Space size="small">
//           <Button
//             type="primary"
//             size="small"
//             icon={<EyeOutlined />}
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedDeferral(record);
//               setModalOpen(true);
//             }}
//             style={{
//               background: PRIMARY_BLUE,
//               borderColor: PRIMARY_BLUE,
//             }}
//           >
//             Review
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   // Row selection configuration
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedKeys, selectedRows) => {
//       setSelectedRowKeys(selectedKeys);
//       setSelectedRows(selectedRows);
//     },
//   };

//   // Custom table styles
//   const tableStyles = `
//     .myqueue-table .ant-table-wrapper {
//       border-radius: 12px;
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
//       border: 1px solid #e0e0e0;
//     }
//     .myqueue-table .ant-table-thead > tr > th {
//       background-color: #f7f7f7 !important;
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 700;
//       border-bottom: 3px solid ${ACCENT_LIME} !important;
//     }
//     .myqueue-table .ant-table-tbody > tr:hover > td {
//       background-color: rgba(181, 211, 52, 0.1) !important;
//       cursor: pointer;
//     }
//   `;

//   return (
//     <div style={{ padding: 24 }}>
//       <style>{tableStyles}</style>

//       {/* Header */}
//       <Card
//         style={{
//           marginBottom: 24,
//           borderLeft: `4px solid ${ACCENT_LIME}`,
//         }}
//       >
//         <h2 style={{ margin: 0, color: PRIMARY_BLUE }}>My Queue</h2>
//         <p style={{ marginTop: 4, color: "#666" }}>
//           All deferral requests from Relationship Managers • {filteredDeferrals.length} items
//         </p>
//       </Card>

//       {/* Bulk Actions Bar (only shown when items are selected) */}
//       {selectedRows.length > 0 && (
//         <Card
//           size="small"
//           style={{
//             marginBottom: 16,
//             background: "rgba(22, 70, 121, 0.05)",
//             border: `1px solid ${PRIMARY_BLUE}`,
//           }}
//         >
//           <Row align="middle" justify="space-between">
//             <Col>
//               <Text strong style={{ color: PRIMARY_BLUE }}>
//                 {selectedRows.length} deferral(s) selected
//               </Text>
//             </Col>
//             <Col>
//               <Space>
//                 <Button
//                   type="primary"
//                   icon={<CheckOutlined />}
//                   onClick={handleBulkApprove}
//                   style={{
//                     background: SUCCESS_GREEN,
//                     borderColor: SUCCESS_GREEN,
//                   }}
//                 >
//                   Approve Selected
//                 </Button>
//                 <Button
//                   type="default"
//                   onClick={() => {
//                     setSelectedRows([]);
//                     setSelectedRowKeys([]);
//                   }}
//                 >
//                   Clear Selection
//                 </Button>
//               </Space>
//             </Col>
//           </Row>
//         </Card>
//       )}

//       {/* Search Filter Only */}
//       <Card size="small" style={{ marginBottom: 16 }}>
//         <Row gutter={16}>
//           <Col md={12}>
//             <Input
//               prefix={<SearchOutlined />}
//               placeholder="Search by Customer, DCL, or ID"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               allowClear
//               size="large"
//             />
//           </Col>
//         </Row>
//       </Card>

//       {/* Main Table */}
//       <Card>
//         <div className="myqueue-table">
//           <Table
//             columns={columns}
//             dataSource={filteredDeferrals}
//             rowKey="id"
//             rowSelection={rowSelection}
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
//             }}
//             loading={isLoading}
//             scroll={{ x: 1500 }}
//             size="middle"
//             locale={{
//               emptyText: (
//                 <Empty
//                   description={
//                     filteredDeferrals.length === 0 && deferrals.length > 0
//                       ? "No deferrals match your filters"
//                       : "No deferral requests in your queue"
//                   }
//                 />
//               ),
//             }}
//             onRow={(record) => ({
//               onClick: () => {
//                 setSelectedDeferral(record);
//                 setModalOpen(true);
//               },
//             })}
//           />
//         </div>
//       </Card>

//       {/* Deferral Details Modal */}
//       {selectedDeferral && (
//         <DeferralDetailsModal
//           deferral={selectedDeferral}
//           open={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//             setSelectedDeferral(null);
//           }}
//           onAction={handleModalAction}
//         />
//       )}
//     </div>
//   );
// };

// export default MyQueue;








import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Tag,
  Card,
  Row,
  Col,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  Avatar,
  Spin,
  Empty,
  Typography,
  Modal,
  message,
  Badge,
  Divider,
  Descriptions,
  Upload,
  Form,
  Input as AntdInput,
  Progress,
  List,
  Popconfirm
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text, Title } = Typography;
const { confirm } = Modal;
const { TextArea } = AntdInput;

// Theme colors
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";
const PROCESSING_BLUE = "#1890ff";

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf': return <FilePdfOutlined style={{ color: ERROR_RED }} />;
    case 'word': return <FileWordOutlined style={{ color: PRIMARY_BLUE }} />;
    case 'excel': return <FileExcelOutlined style={{ color: SUCCESS_GREEN }} />;
    case 'image': return <FileImageOutlined style={{ color: "#7e6496" }} />;
    default: return <FileTextOutlined />;
  }
};

const getRoleTag = (role) => {
  let color = "blue";
  const roleLower = (role || "").toLowerCase();
  switch (roleLower) {
    case "rm":
      color = "purple";
      break;
    case "deferral management":
      color = "green";
      break;
    case "creator":
      color = "green";
      break;
    case "co_checker":
      color = "volcano";
      break;
    case "system":
      color = "default";
      break;
    default:
      color = "blue";
  }
  return (
    <Tag color={color} style={{ marginLeft: 8, textTransform: "uppercase" }}>
      {roleLower.replace(/_/g, " ")}
    </Tag>
  );
};

// Helper function to remove role from username in brackets
const formatUsername = (username) => {
  if (!username) return "System";
  return username.replace(/\s*\([^)]*\)\s*$/, '').trim();
};

const CommentTrail = ({ history, isLoading }) => {
  if (isLoading) return <Spin className="block m-5" />;
  if (!history || history.length === 0)
    return <i className="pl-4">No historical comments yet.</i>;

  return (
    <div className="max-h-52 overflow-y-auto">
      <List
        dataSource={history}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div className="flex justify-between">
                  <div>
                    <b>{formatUsername(item.user) || "System"}</b>
                    {getRoleTag(item.userRole || "system")}
                  </div>
                  <span className="text-xs text-gray-500">
                    {dayjs(item.date).format('DD MMM YYYY HH:mm')}
                  </span>
                </div>
              }
              description={
                <div className="break-words">
                  {item.comment || item.notes || "No comment provided."}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

// Add Comment Modal Component
const AddCommentModal = ({ open, onClose, onAddComment, deferralId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        message.success('Comment added successfully');
        form.resetFields();
        setLoading(false);
        onAddComment(deferralId, values.comment);
        onClose();
      }, 500);
    });
  };

  return (
    <Modal
      title="Add Comment to Deferral"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
          style={{ backgroundColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE }}
        >
          Add Comment
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comment"
          label="Your Comment"
          rules={[{ required: true, message: 'Please enter your comment' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Enter your comment here. This will be visible in the comment trail and history."
            maxLength={500}
            showCount
          />
        </Form.Item>
        <div style={{ color: '#666', fontSize: 12 }}>
          <InfoCircleOutlined /> Comments added here will appear in the comment trail with your name and timestamp.
        </div>
      </Form>
    </Modal>
  );
};

// Custom CSS for modal styling
const customStyles = `
  .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
  .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
  .ant-modal-close-x { color: white !important; }

  .deferral-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
  .deferral-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: #7e6496 !important; padding-bottom: 4px; }
  .deferral-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

  .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
  .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

  .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

  .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
  .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
`;

// Deferral Details Modal for MyQueue - Shows status as pending
const DeferralDetailsModal = ({ deferral, open, onClose, onAction }) => {
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending_approval':
      case 'deferral_requested':
        return { 
          color: 'orange', 
          icon: <ClockCircleOutlined />, 
          label: 'Pending Review', 
          description: 'Awaiting your approval',
          badgeColor: WARNING_ORANGE
        };
      case 'in_review':
        return { 
          color: 'blue', 
          icon: <ClockCircleOutlined />, 
          label: 'In Review', 
          description: 'Currently being reviewed',
          badgeColor: PROCESSING_BLUE
        };
      case 'approved':
      case 'deferral_approved':
        return { 
          color: 'green', 
          icon: <CheckCircleOutlined />, 
          label: 'Approved', 
          description: 'Deferral approved',
          badgeColor: SUCCESS_GREEN
        };
      case 'rejected':
      case 'deferral_rejected':
        return { 
          color: 'red', 
          icon: <CloseCircleOutlined />, 
          label: 'Rejected', 
          description: 'Deferral request was rejected',
          badgeColor: ERROR_RED
        };
      default:
        return { 
          color: 'default', 
          label: status, 
          description: '',
          badgeColor: '#d9d9d9'
        };
    }
  };

  const statusConfig = getStatusConfig(deferral?.status);

  const handleAddComment = (deferralId, comment) => {
    const newComment = {
      action: 'Comment Added',
      user: 'You (Approver)',
      date: new Date().toISOString(),
      notes: 'Comment added by approver',
      comment: comment,
      userRole: 'Approver'
    };
    
    // Add to history
    if (onAction) {
      onAction('addComment', deferralId, newComment);
    }
  };

  const handleApprove = () => {
    confirm({
      title: 'Approve Deferral Request',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Are you sure you want to approve this deferral request?</p>
          <p><strong>{deferral?.deferralNumber}</strong> - {deferral?.customerName}</p>
          <p>Days Sought: <strong>{deferral?.daysSought}</strong> days</p>
          {deferral?.category === "Non-Allowable" && (
            <p style={{ color: ERROR_RED, fontWeight: 'bold' }}>
              ⚠️ This is a Non-Allowable document
            </p>
          )}
          <p>Add approval comment (optional):</p>
          <Input.TextArea rows={3} placeholder="Enter approval comment..." style={{ marginTop: 8 }} id="approvalComment" />
        </div>
      ),
      okText: 'Yes, Approve',
      okType: 'primary',
      okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
      cancelText: 'Cancel',
      onOk() {
        const commentInput = document.getElementById('approvalComment');
        const comment = commentInput?.value || 'Deferral request approved.';
        
        if (onAction) {
          onAction('approve', deferral.id, { comment });
        }
        onClose();
      },
    });
  };

  const handleReject = () => {
    confirm({
      title: 'Reject Deferral Request',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Are you sure you want to reject this deferral request?</p>
          <p><strong>{deferral?.deferralNumber}</strong> - {deferral?.customerName}</p>
          <p>Please provide a reason for rejection:</p>
          <Input.TextArea rows={3} placeholder="Enter rejection reason..." style={{ marginTop: 8 }} id="rejectionComment" />
        </div>
      ),
      okText: 'Yes, Reject',
      okType: 'danger',
      okButtonProps: { style: { background: ERROR_RED, borderColor: ERROR_RED } },
      cancelText: 'Cancel',
      onOk() {
        const commentInput = document.getElementById('rejectionComment');
        const comment = commentInput?.value;
        
        if (!comment || comment.trim() === '') {
          message.error('Please provide a rejection reason');
          return;
        }
        
        if (onAction) {
          onAction('reject', deferral.id, { comment });
        }
        onClose();
      },
    });
  };

  if (!deferral) return null;

  // Create history from approvers data
  const history = [
    { 
      action: "Requested", 
      user: deferral.requestedBy || deferral.rmName,
      date: deferral.requestedDate, 
      notes: "Deferral request submitted",
      comment: deferral.rmReason || "No reason provided",
      userRole: "RM"
    },
    ...(deferral.approvers || []).filter(a => a.approved === true).map(a => ({
      action: "Approved",
      user: `${a.name} (${a.role})`,
      date: a.date,
      notes: `Approved by ${a.role}`,
      comment: `Approved by ${a.role}`,
      userRole: a.role
    }))
  ];

  // Create attachments array from your data structure
  const attachments = deferral.attachments || [
    { 
      id: "att1", 
      name: `${deferral.document}.pdf`, 
      size: "1.5 MB", 
      type: "pdf", 
      uploadDate: deferral.requestedDate 
    }
  ];

  return (
    <>
      <style>{customStyles}</style>
      <Modal
        title={`Review Deferral Request: ${deferral.deferralNumber}`}
        open={open}
        onCancel={onClose}
        width={950}
        bodyStyle={{ padding: "0 24px 24px" }}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Close
          </Button>,
          <Button
            key="editComment"
            icon={<EditOutlined />}
            onClick={() => setAddCommentVisible(true)}
          >
            Add Comment
          </Button>,
          (deferral.status === "pending_approval" || deferral.status === "in_review") && (
            <Button
              key="reject"
              danger
              icon={<CloseOutlined />}
              onClick={handleReject}
            >
              Reject
            </Button>
          ),
          (deferral.status === "pending_approval" || deferral.status === "in_review") && (
            <Button
              key="approve"
              type="primary"
              style={{ backgroundColor: SUCCESS_GREEN, borderColor: SUCCESS_GREEN }}
              icon={<CheckOutlined />}
              onClick={handleApprove}
            >
              Approve
            </Button>
          )
        ]}
      >
        {deferral && (
          <>
            {/* Deferral Details Card */}
            <Card
              className="deferral-info-card"
              size="small"
              title={
                <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
                  Deferral Details
                </span>
              }
              style={{
                marginBottom: 18,
                marginTop: 24,
                borderRadius: 10,
                border: `1px solid #e0e0e0`,
              }}
            >
              <Descriptions size="middle" column={{ xs: 1, sm: 2, lg: 3 }}>
                <Descriptions.Item label="Deferral Number">
                  <Text strong style={{ color: PRIMARY_BLUE }}>
                    {deferral.deferralNumber}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="DCL No">
                  {deferral.dclNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <div style={{ fontWeight: 500 }}>
                    {statusConfig.label}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Customer">
                  <div style={{ fontWeight: 500 }}>
                    {deferral.customerName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Type">
                  <div style={{ fontWeight: 500 }}>
                    {deferral.loanType}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Document">
                  <div style={{ fontWeight: 500 }}>
                    {deferral.document}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Deferral Type">
                  <div style={{ fontWeight: 500 }}>
                    {deferral.deferralType}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Days Sought">
                  <div style={{
                    fontWeight: "bold",
                    color: deferral.daysSought > 45 ? ERROR_RED : deferral.daysSought > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
                    fontSize: 14
                  }}>
                    {deferral.daysSought} days
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Current Approver">
                  {deferral.approvers?.find(a => a.isCurrent)?.name || "You"}
                </Descriptions.Item>
                <Descriptions.Item label="SLA Expiry">
                  <div style={{ color: dayjs(deferral.slaExpiry).isBefore(dayjs()) ? ERROR_RED : PRIMARY_BLUE }}>
                    {dayjs(deferral.slaExpiry).format('DD MMM YYYY HH:mm')}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Attachments Section */}
            <Card
              size="small"
              title={
                <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
                  Attachments ({attachments.length} files)
                </span>
              }
              style={{ marginBottom: 18 }}
            >
              {attachments.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {attachments.map(att => (
                    <div key={att.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: 6,
                      border: '1px solid #e8e8e8'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {getFileIcon(att.type)}
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>{att.name}</div>
                          <div style={{ fontSize: 12, color: '#666' }}>
                            {att.size} • {dayjs(att.uploadDate).format('DD MMM YYYY HH:mm')}
                          </div>
                        </div>
                      </div>
                      <Space>
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />}
                          onClick={() => window.open(att.url || '#', '_blank')}
                        >
                          View
                        </Button>
                        <Button 
                          type="text" 
                          icon={<DownloadOutlined />}
                        >
                          Download
                        </Button>
                      </Space>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 16, color: '#999' }}>
                  No attachments uploaded
                </div>
              )}
            </Card>

            {/* Comment Trail & History */}
            <div style={{ marginTop: 24 }}>
              <h4>Comment Trail & History</h4>
              <CommentTrail 
                history={history} 
                isLoading={loadingComments}
              />
            </div>

            {/* Add Comment Modal */}
            <AddCommentModal
              open={addCommentVisible}
              onClose={() => setAddCommentVisible(false)}
              onAddComment={handleAddComment}
              deferralId={deferral.id}
            />
          </>
        )}
      </Modal>
    </>
  );
};

const MyQueue = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  // State for modal
  const [selectedDeferral, setSelectedDeferral] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data - This is where deferrals from Relationship Managers will appear
  const [deferrals, setDeferrals] = useState([
    {
      id: "DF-001",
      deferralNumber: "DEF-2024-001",
      customerName: "JOHN DOE ENTERPRISES",
      dclNumber: "DCL-2024-001",
      deferralTitle: "Annual Report Submission Deferral",
      document: "Annual Financial Statements",
      loanType: "Term Loan",
      deferralType: "New",
      daysSought: 30,
      requestedBy: "Sarah Johnson (RM)",
      requestedDate: "2024-01-15",
      dueDate: "2024-02-14",
      status: "pending_approval", // From Relationship Manager
      priority: "high",
      currentStage: 1,
      totalStages: 3,
      approvers: [
        { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-16" },
        { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
        { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
      ],
      customerNumber: "CUST001",
      rmName: "Sarah Johnson",
      rmEmail: "sarah.j@ncba.co.ke",
      rmPhone: "+254712345678",
      riskLevel: "Low",
      creditScore: "A",
      category: "Allowable",
      slaExpiry: "2024-01-18",
    },
    {
      id: "DF-002",
      deferralNumber: "DEF-2024-002",
      customerName: "SMART TECH SOLUTIONS",
      dclNumber: "DCL-2024-002",
      deferralTitle: "Financial Statement Extension",
      document: "Financial Statements",
      loanType: "Working Capital",
      deferralType: "Extension",
      daysSought: 45,
      requestedBy: "Michael Brown (RM)",
      requestedDate: "2024-01-10",
      dueDate: "2024-02-25",
      status: "pending_approval", // From Relationship Manager
      priority: "medium",
      currentStage: 2,
      totalStages: 2,
      approvers: [
        { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-11" },
        { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
      ],
      customerNumber: "CUST002",
      rmName: "Michael Brown",
      rmEmail: "michael.b@ncba.co.ke",
      rmPhone: "+254723456789",
      riskLevel: "Medium",
      creditScore: "B",
      category: "Non-Allowable",
      slaExpiry: "2024-01-12",
    },
    {
      id: "DF-003",
      deferralNumber: "DEF-2024-003",
      customerName: "GLOBAL LOGISTICS LTD",
      dclNumber: "DCL-2024-003",
      deferralTitle: "Audit Report Deferral",
      document: "Audit Report",
      loanType: "Asset Finance",
      deferralType: "New",
      daysSought: 15,
      requestedBy: "Emma Wilson (RM)",
      requestedDate: "2024-01-05",
      dueDate: "2024-01-20",
      status: "in_review", // Currently being reviewed
      priority: "low",
      currentStage: 3,
      totalStages: 3,
      approvers: [
        { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-06" },
        { name: "Maria Garcia", role: "Head of Credit", approved: true, date: "2024-01-08" },
        { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null, isCurrent: true },
      ],
      customerNumber: "CUST003",
      rmName: "Emma Wilson",
      rmEmail: "emma.w@ncba.co.ke",
      rmPhone: "+254734567890",
      riskLevel: "Low",
      creditScore: "A+",
      category: "Allowable",
      slaExpiry: "2024-01-09",
    },
    {
      id: "DF-004",
      deferralNumber: "DEF-2024-004",
      customerName: "TECHNOLOGY PARTNERS LTD",
      dclNumber: "DCL-2024-004",
      deferralTitle: "Quarterly Report Deferral",
      document: "Quarterly Report",
      loanType: "Term Loan",
      deferralType: "New",
      daysSought: 20,
      requestedBy: "Robert Kim (RM)",
      requestedDate: "2024-01-12",
      dueDate: "2024-02-01",
      status: "pending_approval", // From Relationship Manager
      priority: "medium",
      currentStage: 1,
      totalStages: 2,
      approvers: [
        { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
      ],
      customerNumber: "CUST004",
      rmName: "Robert Kim",
      rmEmail: "robert.k@ncba.co.ke",
      rmPhone: "+254745678901",
      riskLevel: "Medium",
      creditScore: "B+",
      category: "Allowable",
      slaExpiry: "2024-01-15",
    },
    {
      id: "DF-005",
      deferralNumber: "DEF-2024-005",
      customerName: "GLOBAL MANUFACTURING INC",
      dclNumber: "DCL-2024-005",
      deferralTitle: "Audit Completion Extension",
      document: "Audit Completion Certificate",
      loanType: "Corporate Overdraft",
      deferralType: "Extension",
      daysSought: 60,
      requestedBy: "Lisa Wong (RM)",
      requestedDate: "2024-01-08",
      dueDate: "2024-03-08",
      status: "in_review", // Currently being reviewed
      priority: "high",
      currentStage: 2,
      totalStages: 3,
      approvers: [
        { name: "James Wilson", role: "Credit Manager", approved: true, date: "2024-01-09" },
        { name: "Maria Garcia", role: "Head of Credit", approved: null, date: null, isCurrent: true },
        { name: "David Chen", role: "Chief Risk Officer", approved: null, date: null },
      ],
      customerNumber: "CUST005",
      rmName: "Lisa Wong",
      rmEmail: "lisa.w@ncba.co.ke",
      rmPhone: "+254756789012",
      riskLevel: "High",
      creditScore: "C",
      category: "Non-Allowable",
      slaExpiry: "2024-01-11",
    },
  ]);

  // Fetch data on component mount
  useEffect(() => {
    fetchDeferrals();
  }, []);

  const fetchDeferrals = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to fetch deferrals from Relationship Managers
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      message.error("Failed to load deferral requests");
      setIsLoading(false);
    }
  };

  // Filtered deferrals - All in one table
  const filteredDeferrals = useMemo(() => {
    let filtered = [...deferrals];
    
    // Search filtering
    if (searchText) {
      const q = searchText.toLowerCase();
      filtered = filtered.filter(d =>
        d.customerName.toLowerCase().includes(q) ||
        d.dclNumber.toLowerCase().includes(q) ||
        d.deferralNumber.toLowerCase().includes(q) ||
        d.requestedBy.toLowerCase().includes(q) ||
        d.deferralTitle.toLowerCase().includes(q) ||
        d.customerNumber.toLowerCase().includes(q) ||
        d.document.toLowerCase().includes(q)
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(d => d.status === statusFilter);
    }
    
    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(d => d.priority === priorityFilter);
    }
    
    // Date range filtering
    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter(d => {
        const requestDate = dayjs(d.requestedDate);
        return requestDate.isAfter(start) && requestDate.isBefore(end);
      });
    }
    
    return filtered;
  }, [deferrals, searchText, statusFilter, priorityFilter, dateRange]);

  // Handle actions from modal
  const handleModalAction = (action, deferralId, data) => {
    switch (action) {
      case 'addComment':
        // Add new comment to history
        setDeferrals(prev => prev.map(d => 
          d.id === deferralId ? { 
            ...d, 
            // Create approver comment entry
            approvers: [...d.approvers, {
              name: "You",
              role: "Approver",
              approved: null,
              date: new Date().toISOString(),
              comment: data?.comment
            }]
          } : d
        ));
        break;
      case 'approve':
        // Handle approve action
        setDeferrals(prev => prev.map(d => 
          d.id === deferralId ? { 
            ...d, 
            status: 'approved',
            approvers: d.appovers.map(a => 
              a.isCurrent ? { ...a, approved: true, date: new Date().toISOString() } : a
            )
          } : d
        ));
        message.success('Deferral approved successfully');
        break;
      case 'reject':
        // Handle reject action
        setDeferrals(prev => prev.map(d => 
          d.id === deferralId ? { 
            ...d, 
            status: 'rejected',
            approvers: d.approvers.map(a => 
              a.isCurrent ? { ...a, approved: false, date: new Date().toISOString() } : a
            )
          } : d
        ));
        message.success('Deferral rejected');
        break;
      default:
        break;
    }
  };

  // Bulk approve
  const handleBulkApprove = () => {
    if (selectedRows.length === 0) {
      message.warning('Please select deferrals to approve');
      return;
    }
    
    confirm({
      title: `Approve ${selectedRows.length} Deferral(s)`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to approve ${selectedRows.length} selected deferral(s)?`,
      okText: 'Yes, Approve All',
      okType: 'primary',
      okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
      cancelText: 'Cancel',
      onOk() {
        setIsLoading(true);
        setTimeout(() => {
          const idsToRemove = selectedRows.map(row => row.id);
          setDeferrals(prev => prev.filter(d => !idsToRemove.includes(d.id)));
          setSelectedRows([]);
          setSelectedRowKeys([]);
          setIsLoading(false);
          message.success(`Approved ${selectedRows.length} deferral(s) successfully!`);
        }, 500);
      },
    });
  };

  // Standardized Columns for the table - REMOVED TAGS FROM STATUS AND DAYS SOUGHT, REMOVED ACTIONS COLUMN
  const columns = [
    {
      title: "Deferral No",
      dataIndex: "deferralNumber",
      width: 120,
      fixed: "left",
      render: (deferralNumber) => (
        <div style={{ fontWeight: "bold", color: PRIMARY_BLUE }}>
          <FileTextOutlined style={{ marginRight: 6 }} />
          {deferralNumber}
        </div>
      ),
    },
    {
      title: "DCL No",
      dataIndex: "dclNumber",
      width: 100,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 180,
      render: (name) => (
        <Text strong style={{ color: PRIMARY_BLUE, fontSize: 13 }}>
          {name}
        </Text>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      width: 120,
      render: (loanType) => (
        <div style={{ fontSize: 12, fontWeight: 500 }}>
          {loanType}
        </div>
      ),
    },
    {
      title: "Document",
      dataIndex: "document",
      width: 150,
      render: (document) => (
        <Text ellipsis style={{ fontSize: 12 }}>
          {document}
        </Text>
      ),
    },
    {
      title: "Type",
      dataIndex: "deferralType",
      width: 100,
      render: (deferralType) => (
        <div style={{
          fontSize: 11,
          fontWeight: "bold",
          color: PRIMARY_BLUE
        }}>
          {deferralType}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => {
        const statusConfig = {
          pending_approval: { color: WARNING_ORANGE, text: "Pending", icon: <ClockCircleOutlined /> },
          in_review: { color: PROCESSING_BLUE, text: "In Review", icon: <ClockCircleOutlined /> },
          approved: { color: SUCCESS_GREEN, text: "Approved", icon: <CheckCircleOutlined /> },
          rejected: { color: ERROR_RED, text: "Rejected", icon: <CloseCircleOutlined /> },
        };
        const config = statusConfig[status] || { color: "default", text: status };
        return (
          <div style={{
            fontSize: 12,
            fontWeight: "bold",
            color: config.color === "orange" ? WARNING_ORANGE : 
                   config.color === "blue" ? PROCESSING_BLUE : 
                   config.color === "green" ? SUCCESS_GREEN : 
                   config.color === "red" ? ERROR_RED : "#666",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            {config.icon}
            {config.text}
          </div>
        );
      },
    },
    {
      title: "Days Sought",
      dataIndex: "daysSought",
      width: 100,
      align: "center",
      render: (daysSought) => (
        <div style={{
          fontWeight: "bold",
          color: daysSought > 45 ? ERROR_RED : 
                 daysSought > 30 ? WARNING_ORANGE : 
                 daysSought > 15 ? PROCESSING_BLUE : 
                 SUCCESS_GREEN,
          fontSize: 13,
          padding: "2px 8px",
          borderRadius: 4,
          display: "inline-block"
        }}>
          {daysSought} days
        </div>
      ),
    },
    {
      title: "SLA",
      dataIndex: "slaExpiry",
      width: 100,
      render: (date, record) => {
        if (record.status !== "pending_approval" && record.status !== "in_review") {
          return <div style={{ fontSize: 11, color: "#999" }}>N/A</div>;
        }
        
        const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        let color = SUCCESS_GREEN;
        let text = `${Math.ceil(hoursLeft/24)}d`;
        
        if (hoursLeft <= 0) {
          color = ERROR_RED;
          text = 'Expired';
        } else if (hoursLeft <= 24) {
          color = ERROR_RED;
          text = `${hoursLeft}h`;
        } else if (hoursLeft <= 72) {
          color = WARNING_ORANGE;
        }
        
        return (
          <div style={{
            color: color,
            fontWeight: "bold",
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 4,
            backgroundColor: `${color}10`,
            display: "inline-block"
          }}>
            {text}
          </div>
        );
      },
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
    },
  };

  // Custom table styles
  const tableStyles = `
    .myqueue-table .ant-table-wrapper {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
      border: 1px solid #e0e0e0;
    }
    .myqueue-table .ant-table-thead > tr > th {
      background-color: #f7f7f7 !important;
      color: ${PRIMARY_BLUE} !important;
      font-weight: 700;
      border-bottom: 3px solid ${ACCENT_LIME} !important;
    }
    .myqueue-table .ant-table-tbody > tr:hover > td {
      background-color: rgba(181, 211, 52, 0.1) !important;
      cursor: pointer;
    }
  `;

  return (
    <div style={{ padding: 24 }}>
      <style>{tableStyles}</style>

      {/* Header */}
      <Card
        style={{
          marginBottom: 24,
          borderLeft: `4px solid ${ACCENT_LIME}`,
        }}
      >
        <h2 style={{ margin: 0, color: PRIMARY_BLUE }}>My Queue</h2>
        <p style={{ marginTop: 4, color: "#666" }}>
          All deferral requests from Relationship Managers • {filteredDeferrals.length} items
        </p>
      </Card>

      {/* Bulk Actions Bar (only shown when items are selected) */}
      {selectedRows.length > 0 && (
        <Card
          size="small"
          style={{
            marginBottom: 16,
            background: "rgba(22, 70, 121, 0.05)",
            border: `1px solid ${PRIMARY_BLUE}`,
          }}
        >
          <Row align="middle" justify="space-between">
            <Col>
              <Text strong style={{ color: PRIMARY_BLUE }}>
                {selectedRows.length} deferral(s) selected
              </Text>
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleBulkApprove}
                  style={{
                    background: SUCCESS_GREEN,
                    borderColor: SUCCESS_GREEN,
                  }}
                >
                  Approve Selected
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    setSelectedRows([]);
                    setSelectedRowKeys([]);
                  }}
                >
                  Clear Selection
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      {/* Search Filter Only */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col md={12}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by Customer, DCL, or ID"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
            />
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card>
        <div className="myqueue-table">
          <Table
            columns={columns}
            dataSource={filteredDeferrals}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            loading={isLoading}
            scroll={{ x: 1200 }}
            size="middle"
            locale={{
              emptyText: (
                <Empty
                  description={
                    filteredDeferrals.length === 0 && deferrals.length > 0
                      ? "No deferrals match your filters"
                      : "No deferral requests in your queue"
                  }
                />
              ),
            }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedDeferral(record);
                setModalOpen(true);
              },
            })}
          />
        </div>
      </Card>

      {/* Deferral Details Modal */}
      {selectedDeferral && (
        <DeferralDetailsModal
          deferral={selectedDeferral}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedDeferral(null);
          }}
          onAction={handleModalAction}
        />
      )}
    </div>
  );
};

export default MyQueue;