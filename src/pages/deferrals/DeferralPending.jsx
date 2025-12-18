// // // // // import React, { useMemo, useState, useEffect } from "react";
// // // // // import {
// // // // //   Button,
// // // // //   Divider,
// // // // //   Table,
// // // // //   Tag,
// // // // //   Spin,
// // // // //   Empty,
// // // // //   Card,
// // // // //   Row,
// // // // //   Col,
// // // // //   Input,
// // // // //   Badge,
// // // // //   Typography,
// // // // //   Modal,
// // // // //   message,
// // // // //   Popconfirm
// // // // // } from "antd";
// // // // // import {
// // // // //   SearchOutlined,
// // // // //   FileTextOutlined,
// // // // //   UserOutlined,
// // // // //   CustomerServiceOutlined,
// // // // //   ClockCircleOutlined,
// // // // //   EyeOutlined,
// // // // //   EditOutlined,
// // // // //   DeleteOutlined,
// // // // //   CheckCircleOutlined,
// // // // //   CloseCircleOutlined
// // // // // } from "@ant-design/icons";
// // // // // import dayjs from "dayjs";

// // // // // // Theme Colors (same as other queues)
// // // // // const PRIMARY_BLUE = "#164679";
// // // // // const ACCENT_LIME = "#b5d334";
// // // // // const HIGHLIGHT_GOLD = "#fcb116";
// // // // // const LIGHT_YELLOW = "#fcd716";
// // // // // const SECONDARY_PURPLE = "#7e6496";
// // // // // const SUCCESS_GREEN = "#52c41a";
// // // // // const ERROR_RED = "#ff4d4f";
// // // // // const WARNING_ORANGE = "#faad14";

// // // // // const { Text, Title } = Typography;

// // // // // // MOCK DATA for RM's Pending Deferrals
// // // // // const MOCK_RM_PENDING_DEFERRALS = [
// // // // //   {
// // // // //     _id: "1",
// // // // //     deferralNumber: "DEF-2024-001",
// // // // //     dclNo: "DCL-2024-015",
// // // // //     customerNumber: "CUST001",
// // // // //     customerName: "Javan Dave",
// // // // //     businessName: "JAVAN DAVE AND SONS",
// // // // //     deferralTitle: "Bank Statements",
// // // // //     documentType: "Financial Statements",
// // // // //     deferralType: "New",
// // // // //     status: "deferral_requested", // RM requested, waiting for creator approval
// // // // //     daysSought: 30,
// // // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // // //     originalDueDate: "2025-01-05T23:59:59Z",
// // // // //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// // // // //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// // // // //     createdAt: "2025-01-05T09:30:00Z",
// // // // //     updatedAt: "2025-01-05T09:30:00Z",
// // // // //     slaExpiry: "2025-01-12T23:59:59Z",
// // // // //     canEdit: true, // RM can edit if still pending
// // // // //     canWithdraw: true // RM can withdraw if still pending
// // // // //   },
// // // // //   {
// // // // //     _id: "2",
// // // // //     deferralNumber: "DEF-2024-002",
// // // // //     dclNo: "DCL-2024-028",
// // // // //     customerNumber: "CUST002",
// // // // //     customerName: "Diana Mwangi",
// // // // //     businessName: "DIANA MWANGI AND DAUGHTERS",
// // // // //     deferralTitle: "CR12 Certificate",
// // // // //     documentType: "Registration Documents",
// // // // //     deferralType: "Extension",
// // // // //     status: "deferral_requested",
// // // // //     daysSought: 15,
// // // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // // //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// // // // //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// // // // //     createdAt: "2025-01-11T14:20:00Z",
// // // // //     updatedAt: "2025-01-11T14:20:00Z",
// // // // //     slaExpiry: "2025-01-18T23:59:59Z",
// // // // //     canEdit: true,
// // // // //     canWithdraw: true
// // // // //   },
// // // // //   {
// // // // //     _id: "3",
// // // // //     deferralNumber: "DEF-2024-003",
// // // // //     dclNo: "DCL-2024-042",
// // // // //     customerNumber: "CUST003",
// // // // //     customerName: "Lucy Nyambura",
// // // // //     businessName: "LUCY NYAMBURA AND SONS",
// // // // //     deferralTitle: "Lease Agreement",
// // // // //     documentType: "Legal Documents",
// // // // //     deferralType: "New",
// // // // //     status: "deferral_approved", // Already approved by creator
// // // // //     daysSought: 45,
// // // // //     requestedExpiry: "2025-03-05T23:59:59Z",
// // // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // // //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// // // // //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// // // // //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// // // // //     createdAt: "2025-01-20T11:15:00Z",
// // // // //     updatedAt: "2025-01-21T10:30:00Z",
// // // // //     approvedDate: "2025-01-21T10:30:00Z",
// // // // //     canEdit: false, // Cannot edit after approval
// // // // //     canWithdraw: false, // Cannot withdraw after approval
// // // // //     canUpload: true // Can upload document now
// // // // //   }
// // // // // ];

// // // // // // Deferral Details Modal for RM
// // // // // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// // // // //   const getStatusConfig = (status) => {
// // // // //     switch (status) {
// // // // //       case 'deferral_requested':
// // // // //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// // // // //       case 'deferral_approved':
// // // // //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// // // // //       case 'deferral_rejected':
// // // // //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// // // // //       default:
// // // // //         return { color: 'default', label: status, description: '' };
// // // // //     }
// // // // //   };

// // // // //   const statusConfig = getStatusConfig(deferral?.status);

// // // // //   return (
// // // // //     <Modal
// // // // //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// // // // //       open={open}
// // // // //       onCancel={onClose}
// // // // //       width={700}
// // // // //       footer={[
// // // // //         <Button key="close" onClick={onClose}>
// // // // //           Close
// // // // //         </Button>
// // // // //       ]}
// // // // //     >
// // // // //       {deferral && (
// // // // //         <div>
// // // // //           {/* Header Section */}
// // // // //           <Card
// // // // //             size="small"
// // // // //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// // // // //           >
// // // // //             <Row gutter={[16, 16]}>
// // // // //               <Col span={12}>
// // // // //                 <Text strong>Deferral Number:</Text>
// // // // //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// // // // //                   {deferral.deferralNumber}
// // // // //                 </div>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Text strong>DCL Number:</Text>
// // // // //                 <div>{deferral.dclNo}</div>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Text strong>Customer:</Text>
// // // // //                 <div>{deferral.customerName}</div>
// // // // //                 <Text type="secondary" style={{ fontSize: 12 }}>
// // // // //                   {deferral.businessName}
// // // // //                 </Text>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Text strong>Document:</Text>
// // // // //                 <div>{deferral.deferralTitle}</div>
// // // // //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// // // // //               </Col>
// // // // //             </Row>
// // // // //           </Card>

// // // // //           {/* Status Section */}
// // // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // // //               Status
// // // // //             </Title>
// // // // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// // // // //               <Tag 
// // // // //                 color={statusConfig.color} 
// // // // //                 icon={statusConfig.icon}
// // // // //                 style={{ fontSize: 14, padding: '8px 12px' }}
// // // // //               >
// // // // //                 {statusConfig.label}
// // // // //               </Tag>
// // // // //               <div>
// // // // //                 <div>{statusConfig.description}</div>
// // // // //                 {deferral.currentApprover && (
// // // // //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// // // // //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </Card>

// // // // //           {/* Timeline Section */}
// // // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// // // // //               <ClockCircleOutlined /> Timeline
// // // // //             </Title>
// // // // //             <Row gutter={[16, 16]}>
// // // // //               <Col span={8}>
// // // // //                 <div>
// // // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// // // // //                   <div style={{ fontWeight: 'bold' }}>
// // // // //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </Col>
// // // // //               <Col span={8}>
// // // // //                 <div>
// // // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// // // // //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// // // // //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// // // // //                   </div>
// // // // //                   <Text type="secondary" style={{ fontSize: 11 }}>
// // // // //                     ({deferral.daysSought} days)
// // // // //                   </Text>
// // // // //                 </div>
// // // // //               </Col>
// // // // //               <Col span={8}>
// // // // //                 <div>
// // // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// // // // //                   <div style={{ fontWeight: 'bold' }}>
// // // // //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </Col>
// // // // //             </Row>
// // // // //             {deferral.approvedDate && (
// // // // //               <div style={{ marginTop: 16 }}>
// // // // //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// // // // //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// // // // //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </Card>

// // // // //           {/* Reason Section */}
// // // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // // //               <UserOutlined /> Your Request Reason
// // // // //             </Title>
// // // // //             <div style={{
// // // // //               padding: 12,
// // // // //               background: '#f8f9fa',
// // // // //               borderRadius: 4,
// // // // //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// // // // //             }}>
// // // // //               {deferral.rmReason}
// // // // //             </div>
// // // // //           </Card>

// // // // //           {/* Creator Comments (if any) */}
// // // // //           {deferral.creatorComments && (
// // // // //             <Card size="small" style={{ marginBottom: 16 }}>
// // // // //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // // //                 Creator Comments
// // // // //               </Title>
// // // // //               <div style={{
// // // // //                 padding: 12,
// // // // //                 background: '#e6f7ff',
// // // // //                 borderRadius: 4,
// // // // //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// // // // //               }}>
// // // // //                 {deferral.creatorComments}
// // // // //               </div>
// // // // //             </Card>
// // // // //           )}

// // // // //           {/* Actions for RM */}
// // // // //           <Card size="small">
// // // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // // //               Available Actions
// // // // //             </Title>
// // // // //             <div style={{ display: 'flex', gap: 8 }}>
// // // // //               {deferral.canEdit && (
// // // // //                 <Button type="primary" icon={<EditOutlined />}>
// // // // //                   Edit Request
// // // // //                 </Button>
// // // // //               )}
// // // // //               {deferral.canWithdraw && (
// // // // //                 <Button danger icon={<DeleteOutlined />}>
// // // // //                   Withdraw Request
// // // // //                 </Button>
// // // // //               )}
// // // // //               {deferral.canUpload && (
// // // // //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// // // // //                   Upload Document
// // // // //                 </Button>
// // // // //               )}
// // // // //             </div>
// // // // //           </Card>
// // // // //         </div>
// // // // //       )}
// // // // //     </Modal>
// // // // //   );
// // // // // };

// // // // // // Main DeferralPending Component for RM
// // // // // const DeferralPending = ({ userId = "rm_current" }) => {
// // // // //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// // // // //   const [modalOpen, setModalOpen] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [mockData, setMockData] = useState([]);
  
// // // // //   // Filters
// // // // //   const [searchText, setSearchText] = useState("");

// // // // //   // Load data
// // // // //   useEffect(() => {
// // // // //     setLoading(true);
    
// // // // //     setTimeout(() => {
// // // // //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// // // // //       setLoading(false);
// // // // //     }, 300);
// // // // //   }, []);

// // // // //   // Filter data - RM sees their own deferrals (both requested and approved)
// // // // //   const filteredData = useMemo(() => {
// // // // //     let filtered = mockData.filter((d) => 
// // // // //       d.status === "deferral_requested" || d.status === "deferral_approved"
// // // // //     );
    
// // // // //     // Apply search filter
// // // // //     if (searchText) {
// // // // //       filtered = filtered.filter(d =>
// // // // //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // // //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// // // // //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // // //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// // // // //         d.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
// // // // //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// // // // //       );
// // // // //     }
    
// // // // //     return filtered;
// // // // //   }, [mockData, searchText]);

// // // // //   // Handle withdraw deferral
// // // // //   const handleWithdraw = (deferralId) => {
// // // // //     Modal.confirm({
// // // // //       title: 'Withdraw Deferral Request',
// // // // //       content: 'Are you sure you want to withdraw this deferral request?',
// // // // //       onOk: () => {
// // // // //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// // // // //         message.success('Deferral request withdrawn successfully');
// // // // //       }
// // // // //     });
// // // // //   };

// // // // //   // Handle edit deferral
// // // // //   const handleEdit = (deferral) => {
// // // // //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// // // // //     // Navigate to edit page or open edit modal
// // // // //   };

// // // // //   // Handle upload document
// // // // //   const handleUpload = (deferral) => {
// // // // //     message.info(`Upload document for ${deferral.deferralNumber}`);
// // // // //     // Open upload modal or navigate to upload page
// // // // //   };

// // // // //   // Clear filters
// // // // //   const clearFilters = () => {
// // // // //     setSearchText("");
// // // // //   };

// // // // //   // Columns for RM's view
// // // // //   const columns = [
// // // // //     {
// // // // //       title: "Deferral No",
// // // // //       dataIndex: "deferralNumber",
// // // // //       key: "deferralNumber",
// // // // //       width: 140,
// // // // //       render: (text) => (
// // // // //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// // // // //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// // // // //           {text}
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// // // // //     },
// // // // //     {
// // // // //       title: "DCL No",
// // // // //       dataIndex: "dclNo",
// // // // //       key: "dclNo",
// // // // //       width: 120,
// // // // //       render: (text) => (
// // // // //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// // // // //           {text}
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// // // // //     },
// // // // //     {
// // // // //       title: "Customer Name",
// // // // //       dataIndex: "customerName",
// // // // //       key: "customerName",
// // // // //       width: 180,
// // // // //       render: (text, record) => (
// // // // //         <div style={{
// // // // //           fontWeight: 600,
// // // // //           color: PRIMARY_BLUE,
// // // // //           display: "flex",
// // // // //           alignItems: "center",
// // // // //           gap: 6
// // // // //         }}>
// // // // //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// // // // //           <div>
// // // // //             <div>{text}</div>
// // // // //             <div style={{ fontSize: 11, color: "#666", fontWeight: "normal" }}>
// // // // //               {record.businessName}
// // // // //             </div>
// // // // //             <div style={{ fontSize: 10, color: "#999" }}>
// // // // //               {record.customerNumber}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// // // // //     },
// // // // //     {
// // // // //       title: "Document",
// // // // //       dataIndex: "deferralTitle",
// // // // //       key: "deferralTitle",
// // // // //       width: 180,
// // // // //       render: (text, record) => (
// // // // //         <div>
// // // // //           <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// // // // //             {text}
// // // // //           </div>
// // // // //           <div style={{ fontSize: 11, color: "#999" }}>
// // // // //             {record.documentType}
// // // // //           </div>
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => a.deferralTitle.localeCompare(b.deferralTitle)
// // // // //     },
// // // // //     {
// // // // //       title: "Status",
// // // // //       dataIndex: "status",
// // // // //       key: "status",
// // // // //       width: 120,
// // // // //       render: (status) => {
// // // // //         const statusConfig = {
// // // // //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// // // // //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// // // // //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// // // // //         };
        
// // // // //         const config = statusConfig[status] || { color: 'default', text: status };
// // // // //         return (
// // // // //           <Tag 
// // // // //             color={config.color} 
// // // // //             icon={config.icon}
// // // // //             style={{ 
// // // // //               fontSize: 11,
// // // // //               fontWeight: "bold",
// // // // //               borderRadius: 4,
// // // // //               minWidth: 80,
// // // // //               textAlign: "center"
// // // // //             }}
// // // // //           >
// // // // //             {config.text}
// // // // //           </Tag>
// // // // //         );
// // // // //       },
// // // // //       filters: [
// // // // //         { text: 'Pending', value: 'deferral_requested' },
// // // // //         { text: 'Approved', value: 'deferral_approved' }
// // // // //       ],
// // // // //       onFilter: (value, record) => record.status === value,
// // // // //       sorter: (a, b) => a.status.localeCompare(b.status)
// // // // //     },
// // // // //     {
// // // // //       title: "Days Sought",
// // // // //       dataIndex: "daysSought",
// // // // //       key: "daysSought",
// // // // //       width: 100,
// // // // //       align: "center",
// // // // //       render: (days) => (
// // // // //         <div style={{
// // // // //           fontWeight: "bold",
// // // // //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// // // // //           fontSize: 14,
// // // // //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// // // // //           padding: "4px 8px",
// // // // //           borderRadius: 4,
// // // // //           display: "inline-block"
// // // // //         }}>
// // // // //           {days} days
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => a.daysSought - b.daysSought
// // // // //     },
// // // // //     {
// // // // //       title: "Requested On",
// // // // //       dataIndex: "createdAt",
// // // // //       key: "createdAt",
// // // // //       width: 100,
// // // // //       render: (date) => (
// // // // //         <div style={{ fontSize: 12 }}>
// // // // //           {dayjs(date).format('DD/MM/YYYY')}
// // // // //         </div>
// // // // //       ),
// // // // //       sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt))
// // // // //     },
// // // // //     {
// // // // //       title: "Actions",
// // // // //       key: "actions",
// // // // //       width: 150,
// // // // //       fixed: "right",
// // // // //       render: (_, record) => (
// // // // //         <div style={{ display: "flex", gap: 4 }}>
// // // // //           <Button
// // // // //             type="link"
// // // // //             size="small"
// // // // //             onClick={() => {
// // // // //               setSelectedDeferral(record);
// // // // //               setModalOpen(true);
// // // // //             }}
// // // // //             style={{
// // // // //               color: PRIMARY_BLUE,
// // // // //               fontWeight: 500
// // // // //             }}
// // // // //           >
// // // // //             <EyeOutlined /> View
// // // // //           </Button>
          
// // // // //           {record.canEdit && (
// // // // //             <Button
// // // // //               type="link"
// // // // //               size="small"
// // // // //               onClick={() => handleEdit(record)}
// // // // //               style={{ color: WARNING_ORANGE }}
// // // // //             >
// // // // //               <EditOutlined /> Edit
// // // // //             </Button>
// // // // //           )}
          
// // // // //           {record.canWithdraw && (
// // // // //             <Popconfirm
// // // // //               title="Withdraw Deferral Request"
// // // // //               description="Are you sure you want to withdraw this request?"
// // // // //               onConfirm={() => handleWithdraw(record._id)}
// // // // //               okText="Yes"
// // // // //               cancelText="No"
// // // // //             >
// // // // //               <Button
// // // // //                 type="link"
// // // // //                 size="small"
// // // // //                 danger
// // // // //               >
// // // // //                 <DeleteOutlined /> Withdraw
// // // // //               </Button>
// // // // //             </Popconfirm>
// // // // //           )}
          
// // // // //           {record.canUpload && (
// // // // //             <Button
// // // // //               type="link"
// // // // //               size="small"
// // // // //               onClick={() => handleUpload(record)}
// // // // //               style={{ color: SUCCESS_GREEN }}
// // // // //             >
// // // // //               Upload
// // // // //             </Button>
// // // // //           )}
// // // // //         </div>
// // // // //       )
// // // // //     }
// // // // //   ];

// // // // //   // Custom table styles
// // // // //   const customTableStyles = `
// // // // //     .deferral-pending-table .ant-table-wrapper {
// // // // //       border-radius: 12px;
// // // // //       overflow: hidden;
// // // // //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// // // // //       border: 1px solid #e0e0e0;
// // // // //     }
// // // // //     .deferral-pending-table .ant-table-thead > tr > th {
// // // // //       background-color: #f7f7f7 !important;
// // // // //       color: ${PRIMARY_BLUE} !important;
// // // // //       font-weight: 700;
// // // // //       fontSize: 13px;
// // // // //       padding: 14px 12px !important;
// // // // //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// // // // //       border-right: none !important;
// // // // //     }
// // // // //     .deferral-pending-table .ant-table-tbody > tr > td {
// // // // //       border-bottom: 1px solid #f0f0f0 !important;
// // // // //       border-right: none !important;
// // // // //       padding: 12px 12px !important;
// // // // //       fontSize: 13px;
// // // // //       color: #333;
// // // // //     }
// // // // //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// // // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // // //       cursor: pointer;
// // // // //     }
// // // // //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// // // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // // //     }
// // // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// // // // //       background-color: ${ACCENT_LIME} !important;
// // // // //       border-color: ${ACCENT_LIME} !important;
// // // // //     }
// // // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// // // // //       color: ${PRIMARY_BLUE} !important;
// // // // //       font-weight: 600;
// // // // //     }
// // // // //   `;

// // // // //   return (
// // // // //     <div style={{ padding: 24 }}>
// // // // //       <style>{customTableStyles}</style>

// // // // //       {/* Header */}
// // // // //       <Card
// // // // //         style={{
// // // // //           marginBottom: 24,
// // // // //           borderRadius: 8,
// // // // //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // //           borderLeft: `4px solid ${ACCENT_LIME}`
// // // // //         }}
// // // // //         bodyStyle={{ padding: 16 }}
// // // // //       >
// // // // //         <Row justify="space-between" align="middle">
// // // // //           <Col>
// // // // //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// // // // //               My Deferral Requests
// // // // //               <Badge
// // // // //                 count={filteredData.length}
// // // // //                 style={{
// // // // //                   backgroundColor: ACCENT_LIME,
// // // // //                   fontSize: 12
// // // // //                 }}
// // // // //               />
// // // // //             </h2>
// // // // //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// // // // //               Track and manage your deferral requests
// // // // //             </p>
// // // // //           </Col>
// // // // //           <Col>
// // // // //             <Button
// // // // //               type="primary"
// // // // //               onClick={() => {
// // // // //                 // Navigate to request new deferral
// // // // //                 window.location.href = '/rm/deferrals/request';
// // // // //               }}
// // // // //               style={{
// // // // //                 backgroundColor: PRIMARY_BLUE,
// // // // //                 borderColor: PRIMARY_BLUE
// // // // //               }}
// // // // //             >
// // // // //               + New Deferral Request
// // // // //             </Button>
// // // // //           </Col>
// // // // //         </Row>
// // // // //       </Card>

// // // // //       {/* Filters */}
// // // // //       <Card
// // // // //         style={{
// // // // //           marginBottom: 16,
// // // // //           background: "#fafafa",
// // // // //           border: `1px solid ${PRIMARY_BLUE}20`,
// // // // //           borderRadius: 8
// // // // //         }}
// // // // //         size="small"
// // // // //       >
// // // // //         <Row gutter={[16, 16]} align="middle">
// // // // //           <Col xs={24} sm={12} md={8}>
// // // // //             <Input
// // // // //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// // // // //               prefix={<SearchOutlined />}
// // // // //               value={searchText}
// // // // //               onChange={(e) => setSearchText(e.target.value)}
// // // // //               allowClear
// // // // //               size="middle"
// // // // //             />
// // // // //           </Col>
          
// // // // //           <Col xs={24} sm={12} md={4}>
// // // // //             <Button
// // // // //               onClick={clearFilters}
// // // // //               style={{ width: '100%' }}
// // // // //               size="middle"
// // // // //             >
// // // // //               Clear Filters
// // // // //             </Button>
// // // // //           </Col>
// // // // //         </Row>
// // // // //       </Card>

// // // // //       {/* Table Title */}
// // // // //       <Divider style={{ margin: "12px 0" }}>
// // // // //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// // // // //           My Deferral Requests ({filteredData.length} items)
// // // // //         </span>
// // // // //       </Divider>

// // // // //       {/* Table */}
// // // // //       {loading ? (
// // // // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// // // // //           <Spin tip="Loading deferral requests..." />
// // // // //         </div>
// // // // //       ) : filteredData.length === 0 ? (
// // // // //         <Empty
// // // // //           description={
// // // // //             <div>
// // // // //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// // // // //               <p style={{ color: "#999" }}>
// // // // //                 {searchText
// // // // //                   ? 'Try changing your search term'
// // // // //                   : 'You haven\'t requested any deferrals yet'}
// // // // //               </p>
// // // // //               <Button
// // // // //                 type="primary"
// // // // //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// // // // //                 style={{ marginTop: 16 }}
// // // // //               >
// // // // //                 Request Your First Deferral
// // // // //               </Button>
// // // // //             </div>
// // // // //           }
// // // // //           style={{ padding: 40 }}
// // // // //         />
// // // // //       ) : (
// // // // //         <div className="deferral-pending-table">
// // // // //           <Table
// // // // //             columns={columns}
// // // // //             dataSource={filteredData}
// // // // //             rowKey="_id"
// // // // //             size="middle"
// // // // //             pagination={{
// // // // //               pageSize: 10,
// // // // //               showSizeChanger: true,
// // // // //               pageSizeOptions: ["10", "20", "50"],
// // // // //               position: ["bottomCenter"],
// // // // //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// // // // //             }}
// // // // //             scroll={{ x: 1300 }}
// // // // //             onRow={(record) => ({
// // // // //               onClick: () => {
// // // // //                 setSelectedDeferral(record);
// // // // //                 setModalOpen(true);
// // // // //               },
// // // // //             })}
// // // // //           />
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Footer Info */}
// // // // //       <div style={{
// // // // //         marginTop: 24,
// // // // //         padding: 16,
// // // // //         background: "#f8f9fa",
// // // // //         borderRadius: 8,
// // // // //         fontSize: 12,
// // // // //         color: "#666",
// // // // //         border: `1px solid ${PRIMARY_BLUE}10`
// // // // //       }}>
// // // // //         <Row justify="space-between" align="middle">
// // // // //           <Col>
// // // // //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// // // // //           </Col>
// // // // //           <Col>
// // // // //             <Text type="secondary">
// // // // //               Showing {filteredData.length} items • Data as of latest system update
// // // // //             </Text>
// // // // //           </Col>
// // // // //         </Row>
// // // // //       </div>

// // // // //       {/* Deferral Details Modal */}
// // // // //       {selectedDeferral && (
// // // // //         <DeferralDetailsModal
// // // // //           deferral={selectedDeferral}
// // // // //           open={modalOpen}
// // // // //           onClose={() => {
// // // // //             setModalOpen(false);
// // // // //             setSelectedDeferral(null);
// // // // //           }}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DeferralPending;






// // // // import React, { useMemo, useState, useEffect } from "react";
// // // // import {
// // // //   Button,
// // // //   Divider,
// // // //   Table,
// // // //   Tag,
// // // //   Spin,
// // // //   Empty,
// // // //   Card,
// // // //   Row,
// // // //   Col,
// // // //   Input,
// // // //   Badge,
// // // //   Typography,
// // // //   Modal,
// // // //   message,
// // // //   Popconfirm
// // // // } from "antd";
// // // // import {
// // // //   SearchOutlined,
// // // //   FileTextOutlined,
// // // //   UserOutlined,
// // // //   CustomerServiceOutlined,
// // // //   ClockCircleOutlined,
// // // //   EyeOutlined,
// // // //   EditOutlined,
// // // //   DeleteOutlined,
// // // //   CheckCircleOutlined,
// // // //   CloseCircleOutlined
// // // // } from "@ant-design/icons";
// // // // import dayjs from "dayjs";

// // // // // Theme Colors (same as other queues)
// // // // const PRIMARY_BLUE = "#164679";
// // // // const ACCENT_LIME = "#b5d334";
// // // // const HIGHLIGHT_GOLD = "#fcb116";
// // // // const LIGHT_YELLOW = "#fcd716";
// // // // const SECONDARY_PURPLE = "#7e6496";
// // // // const SUCCESS_GREEN = "#52c41a";
// // // // const ERROR_RED = "#ff4d4f";
// // // // const WARNING_ORANGE = "#faad14";

// // // // const { Text, Title } = Typography;

// // // // // MOCK DATA for RM's Pending Deferrals
// // // // const MOCK_RM_PENDING_DEFERRALS = [
// // // //   {
// // // //     _id: "1",
// // // //     deferralNumber: "DEF-2024-001",
// // // //     dclNo: "DCL-2024-015",
// // // //     customerNumber: "CUST001",
// // // //     customerName: "Javan Dave",
// // // //     businessName: "JAVAN DAVE AND SONS",
// // // //     deferralTitle: "Bank Statements",
// // // //     documentType: "Financial Statements",
// // // //     deferralType: "New",
// // // //     status: "deferral_requested", // RM requested, waiting for creator approval
// // // //     daysSought: 30,
// // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-05T23:59:59Z",
// // // //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// // // //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// // // //     createdAt: "2025-01-05T09:30:00Z",
// // // //     updatedAt: "2025-01-05T09:30:00Z",
// // // //     slaExpiry: "2025-01-12T23:59:59Z",
// // // //     canEdit: true, // RM can edit if still pending
// // // //     canWithdraw: true // RM can withdraw if still pending
// // // //   },
// // // //   {
// // // //     _id: "2",
// // // //     deferralNumber: "DEF-2024-002",
// // // //     dclNo: "DCL-2024-028",
// // // //     customerNumber: "CUST002",
// // // //     customerName: "Diana Mwangi",
// // // //     businessName: "DIANA MWANGI AND DAUGHTERS",
// // // //     deferralTitle: "CR12 Certificate",
// // // //     documentType: "Registration Documents",
// // // //     deferralType: "Extension",
// // // //     status: "deferral_requested",
// // // //     daysSought: 15,
// // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// // // //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// // // //     createdAt: "2025-01-11T14:20:00Z",
// // // //     updatedAt: "2025-01-11T14:20:00Z",
// // // //     slaExpiry: "2025-01-18T23:59:59Z",
// // // //     canEdit: true,
// // // //     canWithdraw: true
// // // //   },
// // // //   {
// // // //     _id: "3",
// // // //     deferralNumber: "DEF-2024-003",
// // // //     dclNo: "DCL-2024-042",
// // // //     customerNumber: "CUST003",
// // // //     customerName: "Lucy Nyambura",
// // // //     businessName: "LUCY NYAMBURA AND SONS",
// // // //     deferralTitle: "Lease Agreement",
// // // //     documentType: "Legal Documents",
// // // //     deferralType: "New",
// // // //     status: "deferral_approved", // Already approved by creator
// // // //     daysSought: 45,
// // // //     requestedExpiry: "2025-03-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// // // //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// // // //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// // // //     createdAt: "2025-01-20T11:15:00Z",
// // // //     updatedAt: "2025-01-21T10:30:00Z",
// // // //     approvedDate: "2025-01-21T10:30:00Z",
// // // //     canEdit: false, // Cannot edit after approval
// // // //     canWithdraw: false, // Cannot withdraw after approval
// // // //     canUpload: true // Can upload document now
// // // //   }
// // // // ];

// // // // // Deferral Details Modal for RM
// // // // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// // // //   const getStatusConfig = (status) => {
// // // //     switch (status) {
// // // //       case 'deferral_requested':
// // // //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// // // //       case 'deferral_approved':
// // // //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// // // //       case 'deferral_rejected':
// // // //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// // // //       default:
// // // //         return { color: 'default', label: status, description: '' };
// // // //     }
// // // //   };

// // // //   const statusConfig = getStatusConfig(deferral?.status);

// // // //   return (
// // // //     <Modal
// // // //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// // // //       open={open}
// // // //       onCancel={onClose}
// // // //       width={700}
// // // //       footer={[
// // // //         <Button key="close" onClick={onClose}>
// // // //           Close
// // // //         </Button>
// // // //       ]}
// // // //     >
// // // //       {deferral && (
// // // //         <div>
// // // //           {/* Header Section */}
// // // //           <Card
// // // //             size="small"
// // // //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// // // //           >
// // // //             <Row gutter={[16, 16]}>
// // // //               <Col span={12}>
// // // //                 <Text strong>Deferral Number:</Text>
// // // //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// // // //                   {deferral.deferralNumber}
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>DCL Number:</Text>
// // // //                 <div>{deferral.dclNo}</div>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>Customer:</Text>
// // // //                 <div>{deferral.customerName}</div>
// // // //                 <Text type="secondary" style={{ fontSize: 12 }}>
// // // //                   {deferral.businessName}
// // // //                 </Text>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>Document:</Text>
// // // //                 <div>{deferral.deferralTitle}</div>
// // // //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// // // //               </Col>
// // // //             </Row>
// // // //           </Card>

// // // //           {/* Status Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               Status
// // // //             </Title>
// // // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// // // //               <Tag 
// // // //                 color={statusConfig.color} 
// // // //                 icon={statusConfig.icon}
// // // //                 style={{ fontSize: 14, padding: '8px 12px' }}
// // // //               >
// // // //                 {statusConfig.label}
// // // //               </Tag>
// // // //               <div>
// // // //                 <div>{statusConfig.description}</div>
// // // //                 {deferral.currentApprover && (
// // // //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// // // //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </Card>

// // // //           {/* Timeline Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// // // //               <ClockCircleOutlined /> Timeline
// // // //             </Title>
// // // //             <Row gutter={[16, 16]}>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// // // //                   <div style={{ fontWeight: 'bold' }}>
// // // //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// // // //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// // // //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                   <Text type="secondary" style={{ fontSize: 11 }}>
// // // //                     ({deferral.daysSought} days)
// // // //                   </Text>
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// // // //                   <div style={{ fontWeight: 'bold' }}>
// // // //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                 </div>
// // // //               </Col>
// // // //             </Row>
// // // //             {deferral.approvedDate && (
// // // //               <div style={{ marginTop: 16 }}>
// // // //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// // // //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// // // //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </Card>

// // // //           {/* Reason Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               <UserOutlined /> Your Request Reason
// // // //             </Title>
// // // //             <div style={{
// // // //               padding: 12,
// // // //               background: '#f8f9fa',
// // // //               borderRadius: 4,
// // // //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// // // //             }}>
// // // //               {deferral.rmReason}
// // // //             </div>
// // // //           </Card>

// // // //           {/* Creator Comments (if any) */}
// // // //           {deferral.creatorComments && (
// // // //             <Card size="small" style={{ marginBottom: 16 }}>
// // // //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //                 Creator Comments
// // // //               </Title>
// // // //               <div style={{
// // // //                 padding: 12,
// // // //                 background: '#e6f7ff',
// // // //                 borderRadius: 4,
// // // //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// // // //               }}>
// // // //                 {deferral.creatorComments}
// // // //               </div>
// // // //             </Card>
// // // //           )}

// // // //           {/* Actions for RM */}
// // // //           <Card size="small">
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               Available Actions
// // // //             </Title>
// // // //             <div style={{ display: 'flex', gap: 8 }}>
// // // //               {deferral.canEdit && (
// // // //                 <Button type="primary" icon={<EditOutlined />}>
// // // //                   Edit Request
// // // //                 </Button>
// // // //               )}
// // // //               {deferral.canWithdraw && (
// // // //                 <Button danger icon={<DeleteOutlined />}>
// // // //                   Withdraw Request
// // // //                 </Button>
// // // //               )}
// // // //               {deferral.canUpload && (
// // // //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// // // //                   Upload Document
// // // //                 </Button>
// // // //               )}
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       )}
// // // //     </Modal>
// // // //   );
// // // // };

// // // // // Main DeferralPending Component for RM
// // // // const DeferralPending = ({ userId = "rm_current" }) => {
// // // //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [mockData, setMockData] = useState([]);
  
// // // //   // Filters
// // // //   const [searchText, setSearchText] = useState("");

// // // //   // Load data
// // // //   useEffect(() => {
// // // //     setLoading(true);
    
// // // //     setTimeout(() => {
// // // //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// // // //       setLoading(false);
// // // //     }, 300);
// // // //   }, []);

// // // //   // Filter data - RM sees their own deferrals (both requested and approved)
// // // //   const filteredData = useMemo(() => {
// // // //     let filtered = mockData.filter((d) => 
// // // //       d.status === "deferral_requested" || d.status === "deferral_approved"
// // // //     );
    
// // // //     // Apply search filter
// // // //     if (searchText) {
// // // //       filtered = filtered.filter(d =>
// // // //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// // // //       );
// // // //     }
    
// // // //     return filtered;
// // // //   }, [mockData, searchText]);

// // // //   // Handle withdraw deferral
// // // //   const handleWithdraw = (deferralId) => {
// // // //     Modal.confirm({
// // // //       title: 'Withdraw Deferral Request',
// // // //       content: 'Are you sure you want to withdraw this deferral request?',
// // // //       onOk: () => {
// // // //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// // // //         message.success('Deferral request withdrawn successfully');
// // // //       }
// // // //     });
// // // //   };

// // // //   // Handle edit deferral
// // // //   const handleEdit = (deferral) => {
// // // //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// // // //     // Navigate to edit page or open edit modal
// // // //   };

// // // //   // Handle upload document
// // // //   const handleUpload = (deferral) => {
// // // //     message.info(`Upload document for ${deferral.deferralNumber}`);
// // // //     // Open upload modal or navigate to upload page
// // // //   };

// // // //   // Clear filters
// // // //   const clearFilters = () => {
// // // //     setSearchText("");
// // // //   };

// // // //   // Updated Columns as per your request: Deferral No, DCL No, Customer Name, Document, Type, Status, Days Sought, SLA
// // // //   const columns = [
// // // //     {
// // // //       title: "Deferral No",
// // // //       dataIndex: "deferralNumber",
// // // //       key: "deferralNumber",
// // // //       width: 140,
// // // //       render: (text) => (
// // // //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// // // //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// // // //           {text}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// // // //     },
// // // //     {
// // // //       title: "DCL No",
// // // //       dataIndex: "dclNo",
// // // //       key: "dclNo",
// // // //       width: 120,
// // // //       render: (text) => (
// // // //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// // // //           {text}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// // // //     },
// // // //     {
// // // //       title: "Customer Name",
// // // //       dataIndex: "customerName",
// // // //       key: "customerName",
// // // //       width: 160,
// // // //       render: (text, record) => (
// // // //         <div style={{
// // // //           fontWeight: 600,
// // // //           color: PRIMARY_BLUE,
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           gap: 6
// // // //         }}>
// // // //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// // // //           <div>
// // // //             <div>{text}</div>
// // // //             <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
// // // //               {record.customerNumber}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// // // //     },
// // // //     {
// // // //       title: "Document",
// // // //       dataIndex: "documentType",
// // // //       key: "documentType",
// // // //       width: 150,
// // // //       render: (text) => (
// // // //         <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// // // //           {text}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.documentType.localeCompare(b.documentType)
// // // //     },
// // // //     {
// // // //       title: "Type",
// // // //       dataIndex: "deferralType",
// // // //       key: "deferralType",
// // // //       width: 100,
// // // //       render: (type) => (
// // // //         <Tag
// // // //           color={type === "New" ? "blue" : "orange"}
// // // //           style={{
// // // //             fontSize: 11,
// // // //             fontWeight: "bold",
// // // //             borderRadius: 4,
// // // //             minWidth: 70,
// // // //             textAlign: "center"
// // // //           }}
// // // //         >
// // // //           {type}
// // // //         </Tag>
// // // //       ),
// // // //       filters: [
// // // //         { text: 'New', value: 'New' },
// // // //         { text: 'Extension', value: 'Extension' }
// // // //       ],
// // // //       onFilter: (value, record) => record.deferralType === value,
// // // //       sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
// // // //     },
// // // //     {
// // // //       title: "Status",
// // // //       dataIndex: "status",
// // // //       key: "status",
// // // //       width: 120,
// // // //       render: (status) => {
// // // //         const statusConfig = {
// // // //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// // // //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// // // //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// // // //         };
        
// // // //         const config = statusConfig[status] || { color: 'default', text: status };
// // // //         return (
// // // //           <Tag 
// // // //             color={config.color} 
// // // //             icon={config.icon}
// // // //             style={{ 
// // // //               fontSize: 11,
// // // //               fontWeight: "bold",
// // // //               borderRadius: 4,
// // // //               minWidth: 80,
// // // //               textAlign: "center"
// // // //             }}
// // // //           >
// // // //             {config.text}
// // // //           </Tag>
// // // //         );
// // // //       },
// // // //       filters: [
// // // //         { text: 'Pending', value: 'deferral_requested' },
// // // //         { text: 'Approved', value: 'deferral_approved' }
// // // //       ],
// // // //       onFilter: (value, record) => record.status === value,
// // // //       sorter: (a, b) => a.status.localeCompare(b.status)
// // // //     },
// // // //     {
// // // //       title: "Days Sought",
// // // //       dataIndex: "daysSought",
// // // //       key: "daysSought",
// // // //       width: 100,
// // // //       align: "center",
// // // //       render: (days) => (
// // // //         <div style={{
// // // //           fontWeight: "bold",
// // // //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// // // //           fontSize: 14,
// // // //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// // // //           padding: "4px 8px",
// // // //           borderRadius: 4,
// // // //           display: "inline-block"
// // // //         }}>
// // // //           {days} days
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.daysSought - b.daysSought
// // // //     },
// // // //     {
// // // //       title: "SLA",
// // // //       dataIndex: "slaExpiry",
// // // //       key: "slaExpiry",
// // // //       width: 100,
// // // //       fixed: "right",
// // // //       render: (date) => {
// // // //         const daysLeft = dayjs(date).diff(dayjs(), 'days');
// // // //         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
// // // //         let color = SUCCESS_GREEN;
// // // //         let text = `${daysLeft}d`;
        
// // // //         if (daysLeft <= 0 && hoursLeft <= 0) {
// // // //           color = ERROR_RED;
// // // //           text = 'Expired';
// // // //         } else if (daysLeft <= 0) {
// // // //           color = ERROR_RED;
// // // //           text = `${hoursLeft}h`;
// // // //         } else if (daysLeft <= 1) {
// // // //           color = ERROR_RED;
// // // //           text = `${daysLeft}d`;
// // // //         } else if (daysLeft <= 3) {
// // // //           color = WARNING_ORANGE;
// // // //           text = `${daysLeft}d`;
// // // //         }
        
// // // //         return (
// // // //           <Tag
// // // //             color={color}
// // // //             style={{ 
// // // //               fontWeight: "bold", 
// // // //               fontSize: 11,
// // // //               minWidth: 50,
// // // //               textAlign: "center"
// // // //             }}
// // // //           >
// // // //             {text}
// // // //           </Tag>
// // // //         );
// // // //       },
// // // //       sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
// // // //     },
// // // //     {
// // // //       title: "Actions",
// // // //       key: "actions",
// // // //       width: 80,
// // // //       fixed: "right",
// // // //       render: (_, record) => (
// // // //         <Button
// // // //           type="link"
// // // //           size="small"
// // // //           onClick={() => {
// // // //             setSelectedDeferral(record);
// // // //             setModalOpen(true);
// // // //           }}
// // // //           style={{
// // // //             color: PRIMARY_BLUE,
// // // //             fontWeight: 500
// // // //           }}
// // // //         >
// // // //           <EyeOutlined /> View
// // // //         </Button>
// // // //       )
// // // //     }
// // // //   ];

// // // //   // Custom table styles
// // // //   const customTableStyles = `
// // // //     .deferral-pending-table .ant-table-wrapper {
// // // //       border-radius: 12px;
// // // //       overflow: hidden;
// // // //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// // // //       border: 1px solid #e0e0e0;
// // // //     }
// // // //     .deferral-pending-table .ant-table-thead > tr > th {
// // // //       background-color: #f7f7f7 !important;
// // // //       color: ${PRIMARY_BLUE} !important;
// // // //       font-weight: 700;
// // // //       fontSize: 13px;
// // // //       padding: 14px 12px !important;
// // // //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// // // //       border-right: none !important;
// // // //     }
// // // //     .deferral-pending-table .ant-table-tbody > tr > td {
// // // //       border-bottom: 1px solid #f0f0f0 !important;
// // // //       border-right: none !important;
// // // //       padding: 12px 12px !important;
// // // //       fontSize: 13px;
// // // //       color: #333;
// // // //     }
// // // //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // //       cursor: pointer;
// // // //     }
// // // //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // //     }
// // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// // // //       background-color: ${ACCENT_LIME} !important;
// // // //       border-color: ${ACCENT_LIME} !important;
// // // //     }
// // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// // // //       color: ${PRIMARY_BLUE} !important;
// // // //       font-weight: 600;
// // // //     }
// // // //   `;

// // // //   return (
// // // //     <div style={{ padding: 24 }}>
// // // //       <style>{customTableStyles}</style>

// // // //       {/* Header */}
// // // //       <Card
// // // //         style={{
// // // //           marginBottom: 24,
// // // //           borderRadius: 8,
// // // //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //           borderLeft: `4px solid ${ACCENT_LIME}`
// // // //         }}
// // // //         bodyStyle={{ padding: 16 }}
// // // //       >
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// // // //               My Deferral Requests
// // // //               <Badge
// // // //                 count={filteredData.length}
// // // //                 style={{
// // // //                   backgroundColor: ACCENT_LIME,
// // // //                   fontSize: 12
// // // //                 }}
// // // //               />
// // // //             </h2>
// // // //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// // // //               Track and manage your deferral requests
// // // //             </p>
// // // //           </Col>
// // // //           <Col>
// // // //             <Button
// // // //               type="primary"
// // // //               onClick={() => {
// // // //                 // Navigate to request new deferral
// // // //                 window.location.href = '/rm/deferrals/request';
// // // //               }}
// // // //               style={{
// // // //                 backgroundColor: PRIMARY_BLUE,
// // // //                 borderColor: PRIMARY_BLUE
// // // //               }}
// // // //             >
// // // //               + New Deferral Request
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Card>

// // // //       {/* Filters */}
// // // //       <Card
// // // //         style={{
// // // //           marginBottom: 16,
// // // //           background: "#fafafa",
// // // //           border: `1px solid ${PRIMARY_BLUE}20`,
// // // //           borderRadius: 8
// // // //         }}
// // // //         size="small"
// // // //       >
// // // //         <Row gutter={[16, 16]} align="middle">
// // // //           <Col xs={24} sm={12} md={8}>
// // // //             <Input
// // // //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// // // //               prefix={<SearchOutlined />}
// // // //               value={searchText}
// // // //               onChange={(e) => setSearchText(e.target.value)}
// // // //               allowClear
// // // //               size="middle"
// // // //             />
// // // //           </Col>
          
// // // //           <Col xs={24} sm={12} md={4}>
// // // //             <Button
// // // //               onClick={clearFilters}
// // // //               style={{ width: '100%' }}
// // // //               size="middle"
// // // //             >
// // // //               Clear Filters
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Card>

// // // //       {/* Table Title */}
// // // //       <Divider style={{ margin: "12px 0" }}>
// // // //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// // // //           My Deferral Requests ({filteredData.length} items)
// // // //         </span>
// // // //       </Divider>

// // // //       {/* Table */}
// // // //       {loading ? (
// // // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// // // //           <Spin tip="Loading deferral requests..." />
// // // //         </div>
// // // //       ) : filteredData.length === 0 ? (
// // // //         <Empty
// // // //           description={
// // // //             <div>
// // // //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// // // //               <p style={{ color: "#999" }}>
// // // //                 {searchText
// // // //                   ? 'Try changing your search term'
// // // //                   : 'You haven\'t requested any deferrals yet'}
// // // //               </p>
// // // //               <Button
// // // //                 type="primary"
// // // //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// // // //                 style={{ marginTop: 16 }}
// // // //               >
// // // //                 Request Your First Deferral
// // // //               </Button>
// // // //             </div>
// // // //           }
// // // //           style={{ padding: 40 }}
// // // //         />
// // // //       ) : (
// // // //         <div className="deferral-pending-table">
// // // //           <Table
// // // //             columns={columns}
// // // //             dataSource={filteredData}
// // // //             rowKey="_id"
// // // //             size="middle"
// // // //             pagination={{
// // // //               pageSize: 10,
// // // //               showSizeChanger: true,
// // // //               pageSizeOptions: ["10", "20", "50"],
// // // //               position: ["bottomCenter"],
// // // //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// // // //             }}
// // // //             scroll={{ x: 1100 }}
// // // //             onRow={(record) => ({
// // // //               onClick: () => {
// // // //                 setSelectedDeferral(record);
// // // //                 setModalOpen(true);
// // // //               },
// // // //             })}
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* Footer Info */}
// // // //       <div style={{
// // // //         marginTop: 24,
// // // //         padding: 16,
// // // //         background: "#f8f9fa",
// // // //         borderRadius: 8,
// // // //         fontSize: 12,
// // // //         color: "#666",
// // // //         border: `1px solid ${PRIMARY_BLUE}10`
// // // //       }}>
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// // // //           </Col>
// // // //           <Col>
// // // //             <Text type="secondary">
// // // //               Showing {filteredData.length} items • Data as of latest system update
// // // //             </Text>
// // // //           </Col>
// // // //         </Row>
// // // //       </div>

// // // //       {/* Deferral Details Modal */}
// // // //       {selectedDeferral && (
// // // //         <DeferralDetailsModal
// // // //           deferral={selectedDeferral}
// // // //           open={modalOpen}
// // // //           onClose={() => {
// // // //             setModalOpen(false);
// // // //             setSelectedDeferral(null);
// // // //           }}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DeferralPending;





// // // import React, { useMemo, useState, useEffect } from "react";
// // // import {
// // //   Button,
// // //   Divider,
// // //   Table,
// // //   Tag,
// // //   Spin,
// // //   Empty,
// // //   Card,
// // //   Row,
// // //   Col,
// // //   Input,
// // //   Badge,
// // //   Typography,
// // //   Modal,
// // //   message,
// // //   Popconfirm
// // // } from "antd";
// // // import {
// // //   SearchOutlined,
// // //   FileTextOutlined,
// // //   UserOutlined,
// // //   CustomerServiceOutlined,
// // //   ClockCircleOutlined,
// // //   EyeOutlined,
// // //   EditOutlined,
// // //   DeleteOutlined,
// // //   CheckCircleOutlined,
// // //   CloseCircleOutlined
// // // } from "@ant-design/icons";
// // // import dayjs from "dayjs";

// // // // Theme Colors (same as other queues)
// // // const PRIMARY_BLUE = "#164679";
// // // const ACCENT_LIME = "#b5d334";
// // // const HIGHLIGHT_GOLD = "#fcb116";
// // // const LIGHT_YELLOW = "#fcd716";
// // // const SECONDARY_PURPLE = "#7e6496";
// // // const SUCCESS_GREEN = "#52c41a";
// // // const ERROR_RED = "#ff4d4f";
// // // const WARNING_ORANGE = "#faad14";

// // // const { Text, Title } = Typography;

// // // // MOCK DATA for RM's Pending Deferrals
// // // const MOCK_RM_PENDING_DEFERRALS = [
// // //   {
// // //     _id: "1",
// // //     deferralNumber: "DEF-2024-001",
// // //     dclNo: "DCL-2024-015",
// // //     customerNumber: "CUST001",
// // //     customerName: "Javan Dave",
// // //     businessName: "JAVAN DAVE AND SONS",
// // //     deferralTitle: "Bank Statements",
// // //     documentType: "Financial Statements",
// // //     deferralType: "New",
// // //     status: "deferral_requested", // RM requested, waiting for creator approval
// // //     daysSought: 30,
// // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // //     originalDueDate: "2025-01-05T23:59:59Z",
// // //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// // //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// // //     createdAt: "2025-01-05T09:30:00Z",
// // //     updatedAt: "2025-01-05T09:30:00Z",
// // //     slaExpiry: "2025-01-12T23:59:59Z",
// // //     canEdit: true, // RM can edit if still pending
// // //     canWithdraw: true // RM can withdraw if still pending
// // //   },
// // //   {
// // //     _id: "2",
// // //     deferralNumber: "DEF-2024-002",
// // //     dclNo: "DCL-2024-028",
// // //     customerNumber: "CUST002",
// // //     customerName: "Diana Mwangi",
// // //     businessName: "DIANA MWANGI AND DAUGHTERS",
// // //     deferralTitle: "CR12 Certificate",
// // //     documentType: "Registration Documents",
// // //     deferralType: "Extension",
// // //     status: "deferral_requested",
// // //     daysSought: 15,
// // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // //     originalDueDate: "2025-01-20T23:59:59Z",
// // //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// // //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// // //     createdAt: "2025-01-11T14:20:00Z",
// // //     updatedAt: "2025-01-11T14:20:00Z",
// // //     slaExpiry: "2025-01-18T23:59:59Z",
// // //     canEdit: true,
// // //     canWithdraw: true
// // //   },
// // //   {
// // //     _id: "3",
// // //     deferralNumber: "DEF-2024-003",
// // //     dclNo: "DCL-2024-042",
// // //     customerNumber: "CUST003",
// // //     customerName: "Lucy Nyambura",
// // //     businessName: "LUCY NYAMBURA AND SONS",
// // //     deferralTitle: "Lease Agreement",
// // //     documentType: "Legal Documents",
// // //     deferralType: "New",
// // //     status: "deferral_approved", // Already approved by creator
// // //     daysSought: 45,
// // //     requestedExpiry: "2025-03-05T23:59:59Z",
// // //     originalDueDate: "2025-01-20T23:59:59Z",
// // //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// // //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// // //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// // //     createdAt: "2025-01-20T11:15:00Z",
// // //     updatedAt: "2025-01-21T10:30:00Z",
// // //     approvedDate: "2025-01-21T10:30:00Z",
// // //     canEdit: false, // Cannot edit after approval
// // //     canWithdraw: false, // Cannot withdraw after approval
// // //     canUpload: true // Can upload document now
// // //   }
// // // ];

// // // // Deferral Details Modal for RM
// // // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// // //   const getStatusConfig = (status) => {
// // //     switch (status) {
// // //       case 'deferral_requested':
// // //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// // //       case 'deferral_approved':
// // //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// // //       case 'deferral_rejected':
// // //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// // //       default:
// // //         return { color: 'default', label: status, description: '' };
// // //     }
// // //   };

// // //   const statusConfig = getStatusConfig(deferral?.status);

// // //   return (
// // //     <Modal
// // //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// // //       open={open}
// // //       onCancel={onClose}
// // //       width={700}
// // //       footer={[
// // //         <Button key="close" onClick={onClose}>
// // //           Close
// // //         </Button>
// // //       ]}
// // //     >
// // //       {deferral && (
// // //         <div>
// // //           {/* Header Section */}
// // //           <Card
// // //             size="small"
// // //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// // //           >
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={12}>
// // //                 <Text strong>Deferral Number:</Text>
// // //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// // //                   {deferral.deferralNumber}
// // //                 </div>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>DCL Number:</Text>
// // //                 <div>{deferral.dclNo}</div>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>Customer:</Text>
// // //                 <div>{deferral.customerName}</div>
// // //                 <Text type="secondary" style={{ fontSize: 12 }}>
// // //                   {deferral.businessName}
// // //                 </Text>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>Document:</Text>
// // //                 <div>{deferral.deferralTitle}</div>
// // //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// // //               </Col>
// // //             </Row>
// // //           </Card>

// // //           {/* Status Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               Status
// // //             </Title>
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// // //               <Tag 
// // //                 color={statusConfig.color} 
// // //                 icon={statusConfig.icon}
// // //                 style={{ fontSize: 14, padding: '8px 12px' }}
// // //               >
// // //                 {statusConfig.label}
// // //               </Tag>
// // //               <div>
// // //                 <div>{statusConfig.description}</div>
// // //                 {deferral.currentApprover && (
// // //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// // //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </Card>

// // //           {/* Timeline Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// // //               <ClockCircleOutlined /> Timeline
// // //             </Title>
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// // //                   <div style={{ fontWeight: 'bold' }}>
// // //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// // //                   </div>
// // //                 </div>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// // //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// // //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// // //                   </div>
// // //                   <Text type="secondary" style={{ fontSize: 11 }}>
// // //                     ({deferral.daysSought} days)
// // //                   </Text>
// // //                 </div>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// // //                   <div style={{ fontWeight: 'bold' }}>
// // //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// // //                   </div>
// // //                 </div>
// // //               </Col>
// // //             </Row>
// // //             {deferral.approvedDate && (
// // //               <div style={{ marginTop: 16 }}>
// // //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// // //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// // //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </Card>

// // //           {/* Reason Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               <UserOutlined /> Your Request Reason
// // //             </Title>
// // //             <div style={{
// // //               padding: 12,
// // //               background: '#f8f9fa',
// // //               borderRadius: 4,
// // //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// // //             }}>
// // //               {deferral.rmReason}
// // //             </div>
// // //           </Card>

// // //           {/* Creator Comments (if any) */}
// // //           {deferral.creatorComments && (
// // //             <Card size="small" style={{ marginBottom: 16 }}>
// // //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //                 Creator Comments
// // //               </Title>
// // //               <div style={{
// // //                 padding: 12,
// // //                 background: '#e6f7ff',
// // //                 borderRadius: 4,
// // //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// // //               }}>
// // //                 {deferral.creatorComments}
// // //               </div>
// // //             </Card>
// // //           )}

// // //           {/* Actions for RM */}
// // //           <Card size="small">
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               Available Actions
// // //             </Title>
// // //             <div style={{ display: 'flex', gap: 8 }}>
// // //               {deferral.canEdit && (
// // //                 <Button type="primary" icon={<EditOutlined />}>
// // //                   Edit Request
// // //                 </Button>
// // //               )}
// // //               {deferral.canWithdraw && (
// // //                 <Button danger icon={<DeleteOutlined />}>
// // //                   Withdraw Request
// // //                 </Button>
// // //               )}
// // //               {deferral.canUpload && (
// // //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// // //                   Upload Document
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       )}
// // //     </Modal>
// // //   );
// // // };

// // // // Main DeferralPending Component for RM
// // // const DeferralPending = ({ userId = "rm_current" }) => {
// // //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [mockData, setMockData] = useState([]);
  
// // //   // Filters
// // //   const [searchText, setSearchText] = useState("");

// // //   // Load data
// // //   useEffect(() => {
// // //     setLoading(true);
    
// // //     setTimeout(() => {
// // //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// // //       setLoading(false);
// // //     }, 300);
// // //   }, []);

// // //   // Filter data - RM sees their own deferrals (both requested and approved)
// // //   const filteredData = useMemo(() => {
// // //     let filtered = mockData.filter((d) => 
// // //       d.status === "deferral_requested" || d.status === "deferral_approved"
// // //     );
    
// // //     // Apply search filter
// // //     if (searchText) {
// // //       filtered = filtered.filter(d =>
// // //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// // //       );
// // //     }
    
// // //     return filtered;
// // //   }, [mockData, searchText]);

// // //   // Handle withdraw deferral
// // //   const handleWithdraw = (deferralId) => {
// // //     Modal.confirm({
// // //       title: 'Withdraw Deferral Request',
// // //       content: 'Are you sure you want to withdraw this deferral request?',
// // //       onOk: () => {
// // //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// // //         message.success('Deferral request withdrawn successfully');
// // //       }
// // //     });
// // //   };

// // //   // Handle edit deferral
// // //   const handleEdit = (deferral) => {
// // //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// // //     // Navigate to edit page or open edit modal
// // //   };

// // //   // Handle upload document
// // //   const handleUpload = (deferral) => {
// // //     message.info(`Upload document for ${deferral.deferralNumber}`);
// // //     // Open upload modal or navigate to upload page
// // //   };

// // //   // Clear filters
// // //   const clearFilters = () => {
// // //     setSearchText("");
// // //   };

// // //   // Updated Columns as per your request
// // //   const columns = [
// // //     {
// // //       title: "Deferral No",
// // //       dataIndex: "deferralNumber",
// // //       key: "deferralNumber",
// // //       width: 140,
// // //       render: (text) => (
// // //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// // //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// // //     },
// // //     {
// // //       title: "DCL No",
// // //       dataIndex: "dclNo",
// // //       key: "dclNo",
// // //       width: 120,
// // //       render: (text) => (
// // //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// // //     },
// // //     {
// // //       title: "Customer Name",
// // //       dataIndex: "customerName",
// // //       key: "customerName",
// // //       width: 160,
// // //       render: (text) => (
// // //         <div style={{
// // //           fontWeight: 600,
// // //           color: PRIMARY_BLUE,
// // //           display: "flex",
// // //           alignItems: "center",
// // //           gap: 6
// // //         }}>
// // //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// // //           <div>
// // //             <div>{text}</div>
// // //           </div>
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// // //     },
// // //     {
// // //       title: "Document",
// // //       dataIndex: "documentType",
// // //       key: "documentType",
// // //       width: 150,
// // //       render: (text) => (
// // //         <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.documentType.localeCompare(b.documentType)
// // //     },
// // //     {
// // //       title: "Type",
// // //       dataIndex: "deferralType",
// // //       key: "deferralType",
// // //       width: 100,
// // //       render: (type) => (
// // //         <Tag
// // //           color={type === "New" ? "blue" : "orange"}
// // //           style={{
// // //             fontSize: 11,
// // //             fontWeight: "bold",
// // //             borderRadius: 4,
// // //             minWidth: 70,
// // //             textAlign: "center"
// // //           }}
// // //         >
// // //           {type}
// // //         </Tag>
// // //       ),
// // //       filters: [
// // //         { text: 'New', value: 'New' },
// // //         { text: 'Extension', value: 'Extension' }
// // //       ],
// // //       onFilter: (value, record) => record.deferralType === value,
// // //       sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "status",
// // //       key: "status",
// // //       width: 120,
// // //       render: (status) => {
// // //         const statusConfig = {
// // //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// // //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// // //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// // //         };
        
// // //         const config = statusConfig[status] || { color: 'default', text: status };
// // //         return (
// // //           <Tag 
// // //             color={config.color} 
// // //             icon={config.icon}
// // //             style={{ 
// // //               fontSize: 11,
// // //               fontWeight: "bold",
// // //               borderRadius: 4,
// // //               minWidth: 80,
// // //               textAlign: "center"
// // //             }}
// // //           >
// // //             {config.text}
// // //           </Tag>
// // //         );
// // //       },
// // //       filters: [
// // //         { text: 'Pending', value: 'deferral_requested' },
// // //         { text: 'Approved', value: 'deferral_approved' }
// // //       ],
// // //       onFilter: (value, record) => record.status === value,
// // //       sorter: (a, b) => a.status.localeCompare(b.status)
// // //     },
// // //     {
// // //       title: "Days Sought",
// // //       dataIndex: "daysSought",
// // //       key: "daysSought",
// // //       width: 100,
// // //       align: "center",
// // //       render: (days) => (
// // //         <div style={{
// // //           fontWeight: "bold",
// // //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// // //           fontSize: 14,
// // //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// // //           padding: "4px 8px",
// // //           borderRadius: 4,
// // //           display: "inline-block"
// // //         }}>
// // //           {days} days
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.daysSought - b.daysSought
// // //     },
// // //     {
// // //       title: "SLA",
// // //       dataIndex: "slaExpiry",
// // //       key: "slaExpiry",
// // //       width: 100,
// // //       fixed: "right",
// // //       render: (date) => {
// // //         const daysLeft = dayjs(date).diff(dayjs(), 'days');
// // //         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
// // //         let color = SUCCESS_GREEN;
// // //         let text = `${daysLeft}d`;
        
// // //         if (daysLeft <= 0 && hoursLeft <= 0) {
// // //           color = ERROR_RED;
// // //           text = 'Expired';
// // //         } else if (daysLeft <= 0) {
// // //           color = ERROR_RED;
// // //           text = `${hoursLeft}h`;
// // //         } else if (daysLeft <= 1) {
// // //           color = ERROR_RED;
// // //           text = `${daysLeft}d`;
// // //         } else if (daysLeft <= 3) {
// // //           color = WARNING_ORANGE;
// // //           text = `${daysLeft}d`;
// // //         }
        
// // //         return (
// // //           <Tag
// // //             color={color}
// // //             style={{ 
// // //               fontWeight: "bold", 
// // //               fontSize: 11,
// // //               minWidth: 50,
// // //               textAlign: "center"
// // //             }}
// // //           >
// // //             {text}
// // //           </Tag>
// // //         );
// // //       },
// // //       sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
// // //     }
// // //   ];

// // //   // Custom table styles
// // //   const customTableStyles = `
// // //     .deferral-pending-table .ant-table-wrapper {
// // //       border-radius: 12px;
// // //       overflow: hidden;
// // //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// // //       border: 1px solid #e0e0e0;
// // //     }
// // //     .deferral-pending-table .ant-table-thead > tr > th {
// // //       background-color: #f7f7f7 !important;
// // //       color: ${PRIMARY_BLUE} !important;
// // //       font-weight: 700;
// // //       fontSize: 13px;
// // //       padding: 14px 12px !important;
// // //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// // //       border-right: none !important;
// // //     }
// // //     .deferral-pending-table .ant-table-tbody > tr > td {
// // //       border-bottom: 1px solid #f0f0f0 !important;
// // //       border-right: none !important;
// // //       padding: 12px 12px !important;
// // //       fontSize: 13px;
// // //       color: #333;
// // //     }
// // //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // //       cursor: pointer;
// // //     }
// // //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // //     }
// // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// // //       background-color: ${ACCENT_LIME} !important;
// // //       borderColor: ${ACCENT_LIME} !important;
// // //     }
// // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// // //       color: ${PRIMARY_BLUE} !important;
// // //       font-weight: 600;
// // //     }
// // //   `;

// // //   return (
// // //     <div style={{ padding: 24 }}>
// // //       <style>{customTableStyles}</style>

// // //       {/* Header */}
// // //       <Card
// // //         style={{
// // //           marginBottom: 24,
// // //           borderRadius: 8,
// // //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //           borderLeft: `4px solid ${ACCENT_LIME}`
// // //         }}
// // //         bodyStyle={{ padding: 16 }}
// // //       >
// // //         <Row justify="space-between" align="middle">
// // //           <Col>
// // //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// // //               My Deferral Requests
// // //               <Badge
// // //                 count={filteredData.length}
// // //                 style={{
// // //                   backgroundColor: ACCENT_LIME,
// // //                   fontSize: 12
// // //                 }}
// // //               />
// // //             </h2>
// // //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// // //               Track and manage your deferral requests
// // //             </p>
// // //           </Col>
// // //           <Col>
// // //             <Button
// // //               type="primary"
// // //               onClick={() => {
// // //                 // Navigate to request new deferral
// // //                 window.location.href = '/rm/deferrals/request';
// // //               }}
// // //               style={{
// // //                 backgroundColor: PRIMARY_BLUE,
// // //                 borderColor: PRIMARY_BLUE
// // //               }}
// // //             >
// // //               + New Deferral Request
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Card>

// // //       {/* Filters */}
// // //       <Card
// // //         style={{
// // //           marginBottom: 16,
// // //           background: "#fafafa",
// // //           border: `1px solid ${PRIMARY_BLUE}20`,
// // //           borderRadius: 8
// // //         }}
// // //         size="small"
// // //       >
// // //         <Row gutter={[16, 16]} align="middle">
// // //           <Col xs={24} sm={12} md={8}>
// // //             <Input
// // //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// // //               prefix={<SearchOutlined />}
// // //               value={searchText}
// // //               onChange={(e) => setSearchText(e.target.value)}
// // //               allowClear
// // //               size="middle"
// // //             />
// // //           </Col>
          
// // //           <Col xs={24} sm={12} md={4}>
// // //             <Button
// // //               onClick={clearFilters}
// // //               style={{ width: '100%' }}
// // //               size="middle"
// // //             >
// // //               Clear Filters
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Card>

// // //       {/* Table Title */}
// // //       <Divider style={{ margin: "12px 0" }}>
// // //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// // //           My Deferral Requests ({filteredData.length} items)
// // //         </span>
// // //       </Divider>

// // //       {/* Table */}
// // //       {loading ? (
// // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// // //           <Spin tip="Loading deferral requests..." />
// // //         </div>
// // //       ) : filteredData.length === 0 ? (
// // //         <Empty
// // //           description={
// // //             <div>
// // //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// // //               <p style={{ color: "#999" }}>
// // //                 {searchText
// // //                   ? 'Try changing your search term'
// // //                   : 'You haven\'t requested any deferrals yet'}
// // //               </p>
// // //               <Button
// // //                 type="primary"
// // //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// // //                 style={{ marginTop: 16 }}
// // //               >
// // //                 Request Your First Deferral
// // //               </Button>
// // //             </div>
// // //           }
// // //           style={{ padding: 40 }}
// // //         />
// // //       ) : (
// // //         <div className="deferral-pending-table">
// // //           <Table
// // //             columns={columns}
// // //             dataSource={filteredData}
// // //             rowKey="_id"
// // //             size="middle"
// // //             pagination={{
// // //               pageSize: 10,
// // //               showSizeChanger: true,
// // //               pageSizeOptions: ["10", "20", "50"],
// // //               position: ["bottomCenter"],
// // //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// // //             }}
// // //             scroll={{ x: 1000 }}
// // //             onRow={(record) => ({
// // //               onClick: () => {
// // //                 setSelectedDeferral(record);
// // //                 setModalOpen(true);
// // //               },
// // //             })}
// // //           />
// // //         </div>
// // //       )}

// // //       {/* Footer Info */}
// // //       <div style={{
// // //         marginTop: 24,
// // //         padding: 16,
// // //         background: "#f8f9fa",
// // //         borderRadius: 8,
// // //         fontSize: 12,
// // //         color: "#666",
// // //         border: `1px solid ${PRIMARY_BLUE}10`
// // //       }}>
// // //         <Row justify="space-between" align="middle">
// // //           <Col>
// // //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// // //           </Col>
// // //           <Col>
// // //             <Text type="secondary">
// // //               Showing {filteredData.length} items • Data as of latest system update
// // //             </Text>
// // //           </Col>
// // //         </Row>
// // //       </div>

// // //       {/* Deferral Details Modal */}
// // //       {selectedDeferral && (
// // //         <DeferralDetailsModal
// // //           deferral={selectedDeferral}
// // //           open={modalOpen}
// // //           onClose={() => {
// // //             setModalOpen(false);
// // //             setSelectedDeferral(null);
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DeferralPending;





// // // // import React, { useMemo, useState, useEffect } from "react";
// // // // import {
// // // //   Button,
// // // //   Divider,
// // // //   Table,
// // // //   Tag,
// // // //   Spin,
// // // //   Empty,
// // // //   Card,
// // // //   Row,
// // // //   Col,
// // // //   Input,
// // // //   Badge,
// // // //   Typography,
// // // //   Modal,
// // // //   message,
// // // //   Popconfirm
// // // // } from "antd";
// // // // import {
// // // //   SearchOutlined,
// // // //   FileTextOutlined,
// // // //   UserOutlined,
// // // //   CustomerServiceOutlined,
// // // //   ClockCircleOutlined,
// // // //   EyeOutlined,
// // // //   EditOutlined,
// // // //   DeleteOutlined,
// // // //   CheckCircleOutlined,
// // // //   CloseCircleOutlined
// // // // } from "@ant-design/icons";
// // // // import dayjs from "dayjs";

// // // // // Theme Colors (same as other queues)
// // // // const PRIMARY_BLUE = "#164679";
// // // // const ACCENT_LIME = "#b5d334";
// // // // const HIGHLIGHT_GOLD = "#fcb116";
// // // // const LIGHT_YELLOW = "#fcd716";
// // // // const SECONDARY_PURPLE = "#7e6496";
// // // // const SUCCESS_GREEN = "#52c41a";
// // // // const ERROR_RED = "#ff4d4f";
// // // // const WARNING_ORANGE = "#faad14";

// // // // const { Text, Title } = Typography;

// // // // // MOCK DATA for RM's Pending Deferrals
// // // // const MOCK_RM_PENDING_DEFERRALS = [
// // // //   {
// // // //     _id: "1",
// // // //     deferralNumber: "DEF-2024-001",
// // // //     dclNo: "DCL-2024-015",
// // // //     customerNumber: "CUST001",
// // // //     customerName: "Javan Dave",
// // // //     businessName: "JAVAN DAVE AND SONS",
// // // //     deferralTitle: "Bank Statements",
// // // //     documentType: "Financial Statements",
// // // //     deferralType: "New",
// // // //     status: "deferral_requested", // RM requested, waiting for creator approval
// // // //     daysSought: 30,
// // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-05T23:59:59Z",
// // // //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// // // //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// // // //     createdAt: "2025-01-05T09:30:00Z",
// // // //     updatedAt: "2025-01-05T09:30:00Z",
// // // //     slaExpiry: "2025-01-12T23:59:59Z",
// // // //     canEdit: true, // RM can edit if still pending
// // // //     canWithdraw: true // RM can withdraw if still pending
// // // //   },
// // // //   {
// // // //     _id: "2",
// // // //     deferralNumber: "DEF-2024-002",
// // // //     dclNo: "DCL-2024-028",
// // // //     customerNumber: "CUST002",
// // // //     customerName: "Diana Mwangi",
// // // //     businessName: "DIANA MWANGI AND DAUGHTERS",
// // // //     deferralTitle: "CR12 Certificate",
// // // //     documentType: "Registration Documents",
// // // //     deferralType: "Extension",
// // // //     status: "deferral_requested",
// // // //     daysSought: 15,
// // // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// // // //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// // // //     createdAt: "2025-01-11T14:20:00Z",
// // // //     updatedAt: "2025-01-11T14:20:00Z",
// // // //     slaExpiry: "2025-01-18T23:59:59Z",
// // // //     canEdit: true,
// // // //     canWithdraw: true
// // // //   },
// // // //   {
// // // //     _id: "3",
// // // //     deferralNumber: "DEF-2024-003",
// // // //     dclNo: "DCL-2024-042",
// // // //     customerNumber: "CUST003",
// // // //     customerName: "Lucy Nyambura",
// // // //     businessName: "LUCY NYAMBURA AND SONS",
// // // //     deferralTitle: "Lease Agreement",
// // // //     documentType: "Legal Documents",
// // // //     deferralType: "New",
// // // //     status: "deferral_approved", // Already approved by creator
// // // //     daysSought: 45,
// // // //     requestedExpiry: "2025-03-05T23:59:59Z",
// // // //     originalDueDate: "2025-01-20T23:59:59Z",
// // // //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// // // //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// // // //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// // // //     createdAt: "2025-01-20T11:15:00Z",
// // // //     updatedAt: "2025-01-21T10:30:00Z",
// // // //     approvedDate: "2025-01-21T10:30:00Z",
// // // //     canEdit: false, // Cannot edit after approval
// // // //     canWithdraw: false, // Cannot withdraw after approval
// // // //     canUpload: true // Can upload document now
// // // //   }
// // // // ];

// // // // // Deferral Details Modal for RM
// // // // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// // // //   const getStatusConfig = (status) => {
// // // //     switch (status) {
// // // //       case 'deferral_requested':
// // // //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// // // //       case 'deferral_approved':
// // // //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// // // //       case 'deferral_rejected':
// // // //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// // // //       default:
// // // //         return { color: 'default', label: status, description: '' };
// // // //     }
// // // //   };

// // // //   const statusConfig = getStatusConfig(deferral?.status);

// // // //   return (
// // // //     <Modal
// // // //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// // // //       open={open}
// // // //       onCancel={onClose}
// // // //       width={700}
// // // //       footer={[
// // // //         <Button key="close" onClick={onClose}>
// // // //           Close
// // // //         </Button>
// // // //       ]}
// // // //     >
// // // //       {deferral && (
// // // //         <div>
// // // //           {/* Header Section */}
// // // //           <Card
// // // //             size="small"
// // // //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// // // //           >
// // // //             <Row gutter={[16, 16]}>
// // // //               <Col span={12}>
// // // //                 <Text strong>Deferral Number:</Text>
// // // //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// // // //                   {deferral.deferralNumber}
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>DCL Number:</Text>
// // // //                 <div>{deferral.dclNo}</div>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>Customer:</Text>
// // // //                 <div>{deferral.customerName}</div>
// // // //                 <Text type="secondary" style={{ fontSize: 12 }}>
// // // //                   {deferral.businessName}
// // // //                 </Text>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Text strong>Document:</Text>
// // // //                 <div>{deferral.deferralTitle}</div>
// // // //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// // // //               </Col>
// // // //             </Row>
// // // //           </Card>

// // // //           {/* Status Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               Status
// // // //             </Title>
// // // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// // // //               <Tag 
// // // //                 color={statusConfig.color} 
// // // //                 icon={statusConfig.icon}
// // // //                 style={{ fontSize: 14, padding: '8px 12px' }}
// // // //               >
// // // //                 {statusConfig.label}
// // // //               </Tag>
// // // //               <div>
// // // //                 <div>{statusConfig.description}</div>
// // // //                 {deferral.currentApprover && (
// // // //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// // // //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </Card>

// // // //           {/* Timeline Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// // // //               <ClockCircleOutlined /> Timeline
// // // //             </Title>
// // // //             <Row gutter={[16, 16]}>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// // // //                   <div style={{ fontWeight: 'bold' }}>
// // // //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// // // //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// // // //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                   <Text type="secondary" style={{ fontSize: 11 }}>
// // // //                     ({deferral.daysSought} days)
// // // //                   </Text>
// // // //                 </div>
// // // //               </Col>
// // // //               <Col span={8}>
// // // //                 <div>
// // // //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// // // //                   <div style={{ fontWeight: 'bold' }}>
// // // //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// // // //                   </div>
// // // //                 </div>
// // // //               </Col>
// // // //             </Row>
// // // //             {deferral.approvedDate && (
// // // //               <div style={{ marginTop: 16 }}>
// // // //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// // // //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// // // //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </Card>

// // // //           {/* Reason Section */}
// // // //           <Card size="small" style={{ marginBottom: 16 }}>
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               <UserOutlined /> Your Request Reason
// // // //             </Title>
// // // //             <div style={{
// // // //               padding: 12,
// // // //               background: '#f8f9fa',
// // // //               borderRadius: 4,
// // // //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// // // //             }}>
// // // //               {deferral.rmReason}
// // // //             </div>
// // // //           </Card>

// // // //           {/* Creator Comments (if any) */}
// // // //           {deferral.creatorComments && (
// // // //             <Card size="small" style={{ marginBottom: 16 }}>
// // // //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //                 Creator Comments
// // // //               </Title>
// // // //               <div style={{
// // // //                 padding: 12,
// // // //                 background: '#e6f7ff',
// // // //                 borderRadius: 4,
// // // //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// // // //               }}>
// // // //                 {deferral.creatorComments}
// // // //               </div>
// // // //             </Card>
// // // //           )}

// // // //           {/* Actions for RM */}
// // // //           <Card size="small">
// // // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // // //               Available Actions
// // // //             </Title>
// // // //             <div style={{ display: 'flex', gap: 8 }}>
// // // //               {deferral.canEdit && (
// // // //                 <Button type="primary" icon={<EditOutlined />}>
// // // //                   Edit Request
// // // //                 </Button>
// // // //               )}
// // // //               {deferral.canWithdraw && (
// // // //                 <Button danger icon={<DeleteOutlined />}>
// // // //                   Withdraw Request
// // // //                 </Button>
// // // //               )}
// // // //               {deferral.canUpload && (
// // // //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// // // //                   Upload Document
// // // //                 </Button>
// // // //               )}
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       )}
// // // //     </Modal>
// // // //   );
// // // // };

// // // // // Main DeferralPending Component for RM
// // // // const DeferralPending = ({ userId = "rm_current" }) => {
// // // //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [mockData, setMockData] = useState([]);
  
// // // //   // Filters
// // // //   const [searchText, setSearchText] = useState("");

// // // //   // Load data
// // // //   useEffect(() => {
// // // //     setLoading(true);
    
// // // //     setTimeout(() => {
// // // //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// // // //       setLoading(false);
// // // //     }, 300);
// // // //   }, []);

// // // //   // Filter data - RM sees their own deferrals (both requested and approved)
// // // //   const filteredData = useMemo(() => {
// // // //     let filtered = mockData.filter((d) => 
// // // //       d.status === "deferral_requested" || d.status === "deferral_approved"
// // // //     );
    
// // // //     // Apply search filter
// // // //     if (searchText) {
// // // //       filtered = filtered.filter(d =>
// // // //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
// // // //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// // // //       );
// // // //     }
    
// // // //     return filtered;
// // // //   }, [mockData, searchText]);

// // // //   // Handle withdraw deferral
// // // //   const handleWithdraw = (deferralId) => {
// // // //     Modal.confirm({
// // // //       title: 'Withdraw Deferral Request',
// // // //       content: 'Are you sure you want to withdraw this deferral request?',
// // // //       onOk: () => {
// // // //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// // // //         message.success('Deferral request withdrawn successfully');
// // // //       }
// // // //     });
// // // //   };

// // // //   // Handle edit deferral
// // // //   const handleEdit = (deferral) => {
// // // //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// // // //     // Navigate to edit page or open edit modal
// // // //   };

// // // //   // Handle upload document
// // // //   const handleUpload = (deferral) => {
// // // //     message.info(`Upload document for ${deferral.deferralNumber}`);
// // // //     // Open upload modal or navigate to upload page
// // // //   };

// // // //   // Clear filters
// // // //   const clearFilters = () => {
// // // //     setSearchText("");
// // // //   };

// // // //   // Columns for RM's view
// // // //   const columns = [
// // // //     {
// // // //       title: "Deferral No",
// // // //       dataIndex: "deferralNumber",
// // // //       key: "deferralNumber",
// // // //       width: 140,
// // // //       render: (text) => (
// // // //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// // // //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// // // //           {text}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// // // //     },
// // // //     {
// // // //       title: "DCL No",
// // // //       dataIndex: "dclNo",
// // // //       key: "dclNo",
// // // //       width: 120,
// // // //       render: (text) => (
// // // //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// // // //           {text}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// // // //     },
// // // //     {
// // // //       title: "Customer Name",
// // // //       dataIndex: "customerName",
// // // //       key: "customerName",
// // // //       width: 180,
// // // //       render: (text, record) => (
// // // //         <div style={{
// // // //           fontWeight: 600,
// // // //           color: PRIMARY_BLUE,
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           gap: 6
// // // //         }}>
// // // //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// // // //           <div>
// // // //             <div>{text}</div>
// // // //             <div style={{ fontSize: 11, color: "#666", fontWeight: "normal" }}>
// // // //               {record.businessName}
// // // //             </div>
// // // //             <div style={{ fontSize: 10, color: "#999" }}>
// // // //               {record.customerNumber}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// // // //     },
// // // //     {
// // // //       title: "Document",
// // // //       dataIndex: "deferralTitle",
// // // //       key: "deferralTitle",
// // // //       width: 180,
// // // //       render: (text, record) => (
// // // //         <div>
// // // //           <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// // // //             {text}
// // // //           </div>
// // // //           <div style={{ fontSize: 11, color: "#999" }}>
// // // //             {record.documentType}
// // // //           </div>
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.deferralTitle.localeCompare(b.deferralTitle)
// // // //     },
// // // //     {
// // // //       title: "Status",
// // // //       dataIndex: "status",
// // // //       key: "status",
// // // //       width: 120,
// // // //       render: (status) => {
// // // //         const statusConfig = {
// // // //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// // // //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// // // //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// // // //         };
        
// // // //         const config = statusConfig[status] || { color: 'default', text: status };
// // // //         return (
// // // //           <Tag 
// // // //             color={config.color} 
// // // //             icon={config.icon}
// // // //             style={{ 
// // // //               fontSize: 11,
// // // //               fontWeight: "bold",
// // // //               borderRadius: 4,
// // // //               minWidth: 80,
// // // //               textAlign: "center"
// // // //             }}
// // // //           >
// // // //             {config.text}
// // // //           </Tag>
// // // //         );
// // // //       },
// // // //       filters: [
// // // //         { text: 'Pending', value: 'deferral_requested' },
// // // //         { text: 'Approved', value: 'deferral_approved' }
// // // //       ],
// // // //       onFilter: (value, record) => record.status === value,
// // // //       sorter: (a, b) => a.status.localeCompare(b.status)
// // // //     },
// // // //     {
// // // //       title: "Days Sought",
// // // //       dataIndex: "daysSought",
// // // //       key: "daysSought",
// // // //       width: 100,
// // // //       align: "center",
// // // //       render: (days) => (
// // // //         <div style={{
// // // //           fontWeight: "bold",
// // // //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// // // //           fontSize: 14,
// // // //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// // // //           padding: "4px 8px",
// // // //           borderRadius: 4,
// // // //           display: "inline-block"
// // // //         }}>
// // // //           {days} days
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => a.daysSought - b.daysSought
// // // //     },
// // // //     {
// // // //       title: "Requested On",
// // // //       dataIndex: "createdAt",
// // // //       key: "createdAt",
// // // //       width: 100,
// // // //       render: (date) => (
// // // //         <div style={{ fontSize: 12 }}>
// // // //           {dayjs(date).format('DD/MM/YYYY')}
// // // //         </div>
// // // //       ),
// // // //       sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt))
// // // //     },
// // // //     {
// // // //       title: "Actions",
// // // //       key: "actions",
// // // //       width: 150,
// // // //       fixed: "right",
// // // //       render: (_, record) => (
// // // //         <div style={{ display: "flex", gap: 4 }}>
// // // //           <Button
// // // //             type="link"
// // // //             size="small"
// // // //             onClick={() => {
// // // //               setSelectedDeferral(record);
// // // //               setModalOpen(true);
// // // //             }}
// // // //             style={{
// // // //               color: PRIMARY_BLUE,
// // // //               fontWeight: 500
// // // //             }}
// // // //           >
// // // //             <EyeOutlined /> View
// // // //           </Button>
          
// // // //           {record.canEdit && (
// // // //             <Button
// // // //               type="link"
// // // //               size="small"
// // // //               onClick={() => handleEdit(record)}
// // // //               style={{ color: WARNING_ORANGE }}
// // // //             >
// // // //               <EditOutlined /> Edit
// // // //             </Button>
// // // //           )}
          
// // // //           {record.canWithdraw && (
// // // //             <Popconfirm
// // // //               title="Withdraw Deferral Request"
// // // //               description="Are you sure you want to withdraw this request?"
// // // //               onConfirm={() => handleWithdraw(record._id)}
// // // //               okText="Yes"
// // // //               cancelText="No"
// // // //             >
// // // //               <Button
// // // //                 type="link"
// // // //                 size="small"
// // // //                 danger
// // // //               >
// // // //                 <DeleteOutlined /> Withdraw
// // // //               </Button>
// // // //             </Popconfirm>
// // // //           )}
          
// // // //           {record.canUpload && (
// // // //             <Button
// // // //               type="link"
// // // //               size="small"
// // // //               onClick={() => handleUpload(record)}
// // // //               style={{ color: SUCCESS_GREEN }}
// // // //             >
// // // //               Upload
// // // //             </Button>
// // // //           )}
// // // //         </div>
// // // //       )
// // // //     }
// // // //   ];

// // // //   // Custom table styles
// // // //   const customTableStyles = `
// // // //     .deferral-pending-table .ant-table-wrapper {
// // // //       border-radius: 12px;
// // // //       overflow: hidden;
// // // //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// // // //       border: 1px solid #e0e0e0;
// // // //     }
// // // //     .deferral-pending-table .ant-table-thead > tr > th {
// // // //       background-color: #f7f7f7 !important;
// // // //       color: ${PRIMARY_BLUE} !important;
// // // //       font-weight: 700;
// // // //       fontSize: 13px;
// // // //       padding: 14px 12px !important;
// // // //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// // // //       border-right: none !important;
// // // //     }
// // // //     .deferral-pending-table .ant-table-tbody > tr > td {
// // // //       border-bottom: 1px solid #f0f0f0 !important;
// // // //       border-right: none !important;
// // // //       padding: 12px 12px !important;
// // // //       fontSize: 13px;
// // // //       color: #333;
// // // //     }
// // // //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // //       cursor: pointer;
// // // //     }
// // // //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// // // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // // //     }
// // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// // // //       background-color: ${ACCENT_LIME} !important;
// // // //       border-color: ${ACCENT_LIME} !important;
// // // //     }
// // // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// // // //       color: ${PRIMARY_BLUE} !important;
// // // //       font-weight: 600;
// // // //     }
// // // //   `;

// // // //   return (
// // // //     <div style={{ padding: 24 }}>
// // // //       <style>{customTableStyles}</style>

// // // //       {/* Header */}
// // // //       <Card
// // // //         style={{
// // // //           marginBottom: 24,
// // // //           borderRadius: 8,
// // // //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //           borderLeft: `4px solid ${ACCENT_LIME}`
// // // //         }}
// // // //         bodyStyle={{ padding: 16 }}
// // // //       >
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// // // //               My Deferral Requests
// // // //               <Badge
// // // //                 count={filteredData.length}
// // // //                 style={{
// // // //                   backgroundColor: ACCENT_LIME,
// // // //                   fontSize: 12
// // // //                 }}
// // // //               />
// // // //             </h2>
// // // //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// // // //               Track and manage your deferral requests
// // // //             </p>
// // // //           </Col>
// // // //           <Col>
// // // //             <Button
// // // //               type="primary"
// // // //               onClick={() => {
// // // //                 // Navigate to request new deferral
// // // //                 window.location.href = '/rm/deferrals/request';
// // // //               }}
// // // //               style={{
// // // //                 backgroundColor: PRIMARY_BLUE,
// // // //                 borderColor: PRIMARY_BLUE
// // // //               }}
// // // //             >
// // // //               + New Deferral Request
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Card>

// // // //       {/* Filters */}
// // // //       <Card
// // // //         style={{
// // // //           marginBottom: 16,
// // // //           background: "#fafafa",
// // // //           border: `1px solid ${PRIMARY_BLUE}20`,
// // // //           borderRadius: 8
// // // //         }}
// // // //         size="small"
// // // //       >
// // // //         <Row gutter={[16, 16]} align="middle">
// // // //           <Col xs={24} sm={12} md={8}>
// // // //             <Input
// // // //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// // // //               prefix={<SearchOutlined />}
// // // //               value={searchText}
// // // //               onChange={(e) => setSearchText(e.target.value)}
// // // //               allowClear
// // // //               size="middle"
// // // //             />
// // // //           </Col>
          
// // // //           <Col xs={24} sm={12} md={4}>
// // // //             <Button
// // // //               onClick={clearFilters}
// // // //               style={{ width: '100%' }}
// // // //               size="middle"
// // // //             >
// // // //               Clear Filters
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Card>

// // // //       {/* Table Title */}
// // // //       <Divider style={{ margin: "12px 0" }}>
// // // //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// // // //           My Deferral Requests ({filteredData.length} items)
// // // //         </span>
// // // //       </Divider>

// // // //       {/* Table */}
// // // //       {loading ? (
// // // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// // // //           <Spin tip="Loading deferral requests..." />
// // // //         </div>
// // // //       ) : filteredData.length === 0 ? (
// // // //         <Empty
// // // //           description={
// // // //             <div>
// // // //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// // // //               <p style={{ color: "#999" }}>
// // // //                 {searchText
// // // //                   ? 'Try changing your search term'
// // // //                   : 'You haven\'t requested any deferrals yet'}
// // // //               </p>
// // // //               <Button
// // // //                 type="primary"
// // // //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// // // //                 style={{ marginTop: 16 }}
// // // //               >
// // // //                 Request Your First Deferral
// // // //               </Button>
// // // //             </div>
// // // //           }
// // // //           style={{ padding: 40 }}
// // // //         />
// // // //       ) : (
// // // //         <div className="deferral-pending-table">
// // // //           <Table
// // // //             columns={columns}
// // // //             dataSource={filteredData}
// // // //             rowKey="_id"
// // // //             size="middle"
// // // //             pagination={{
// // // //               pageSize: 10,
// // // //               showSizeChanger: true,
// // // //               pageSizeOptions: ["10", "20", "50"],
// // // //               position: ["bottomCenter"],
// // // //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// // // //             }}
// // // //             scroll={{ x: 1300 }}
// // // //             onRow={(record) => ({
// // // //               onClick: () => {
// // // //                 setSelectedDeferral(record);
// // // //                 setModalOpen(true);
// // // //               },
// // // //             })}
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* Footer Info */}
// // // //       <div style={{
// // // //         marginTop: 24,
// // // //         padding: 16,
// // // //         background: "#f8f9fa",
// // // //         borderRadius: 8,
// // // //         fontSize: 12,
// // // //         color: "#666",
// // // //         border: `1px solid ${PRIMARY_BLUE}10`
// // // //       }}>
// // // //         <Row justify="space-between" align="middle">
// // // //           <Col>
// // // //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// // // //           </Col>
// // // //           <Col>
// // // //             <Text type="secondary">
// // // //               Showing {filteredData.length} items • Data as of latest system update
// // // //             </Text>
// // // //           </Col>
// // // //         </Row>
// // // //       </div>

// // // //       {/* Deferral Details Modal */}
// // // //       {selectedDeferral && (
// // // //         <DeferralDetailsModal
// // // //           deferral={selectedDeferral}
// // // //           open={modalOpen}
// // // //           onClose={() => {
// // // //             setModalOpen(false);
// // // //             setSelectedDeferral(null);
// // // //           }}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DeferralPending;






// // // import React, { useMemo, useState, useEffect } from "react";
// // // import {
// // //   Button,
// // //   Divider,
// // //   Table,
// // //   Tag,
// // //   Spin,
// // //   Empty,
// // //   Card,
// // //   Row,
// // //   Col,
// // //   Input,
// // //   Badge,
// // //   Typography,
// // //   Modal,
// // //   message,
// // //   Popconfirm
// // // } from "antd";
// // // import {
// // //   SearchOutlined,
// // //   FileTextOutlined,
// // //   UserOutlined,
// // //   CustomerServiceOutlined,
// // //   ClockCircleOutlined,
// // //   EyeOutlined,
// // //   EditOutlined,
// // //   DeleteOutlined,
// // //   CheckCircleOutlined,
// // //   CloseCircleOutlined
// // // } from "@ant-design/icons";
// // // import dayjs from "dayjs";

// // // // Theme Colors (same as other queues)
// // // const PRIMARY_BLUE = "#164679";
// // // const ACCENT_LIME = "#b5d334";
// // // const HIGHLIGHT_GOLD = "#fcb116";
// // // const LIGHT_YELLOW = "#fcd716";
// // // const SECONDARY_PURPLE = "#7e6496";
// // // const SUCCESS_GREEN = "#52c41a";
// // // const ERROR_RED = "#ff4d4f";
// // // const WARNING_ORANGE = "#faad14";

// // // const { Text, Title } = Typography;

// // // // MOCK DATA for RM's Pending Deferrals
// // // const MOCK_RM_PENDING_DEFERRALS = [
// // //   {
// // //     _id: "1",
// // //     deferralNumber: "DEF-2024-001",
// // //     dclNo: "DCL-2024-015",
// // //     customerNumber: "CUST001",
// // //     customerName: "Javan Dave",
// // //     businessName: "JAVAN DAVE AND SONS",
// // //     deferralTitle: "Bank Statements",
// // //     documentType: "Financial Statements",
// // //     deferralType: "New",
// // //     status: "deferral_requested", // RM requested, waiting for creator approval
// // //     daysSought: 30,
// // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // //     originalDueDate: "2025-01-05T23:59:59Z",
// // //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// // //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// // //     createdAt: "2025-01-05T09:30:00Z",
// // //     updatedAt: "2025-01-05T09:30:00Z",
// // //     slaExpiry: "2025-01-12T23:59:59Z",
// // //     canEdit: true, // RM can edit if still pending
// // //     canWithdraw: true // RM can withdraw if still pending
// // //   },
// // //   {
// // //     _id: "2",
// // //     deferralNumber: "DEF-2024-002",
// // //     dclNo: "DCL-2024-028",
// // //     customerNumber: "CUST002",
// // //     customerName: "Diana Mwangi",
// // //     businessName: "DIANA MWANGI AND DAUGHTERS",
// // //     deferralTitle: "CR12 Certificate",
// // //     documentType: "Registration Documents",
// // //     deferralType: "Extension",
// // //     status: "deferral_requested",
// // //     daysSought: 15,
// // //     requestedExpiry: "2025-02-05T23:59:59Z",
// // //     originalDueDate: "2025-01-20T23:59:59Z",
// // //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// // //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// // //     createdAt: "2025-01-11T14:20:00Z",
// // //     updatedAt: "2025-01-11T14:20:00Z",
// // //     slaExpiry: "2025-01-18T23:59:59Z",
// // //     canEdit: true,
// // //     canWithdraw: true
// // //   },
// // //   {
// // //     _id: "3",
// // //     deferralNumber: "DEF-2024-003",
// // //     dclNo: "DCL-2024-042",
// // //     customerNumber: "CUST003",
// // //     customerName: "Lucy Nyambura",
// // //     businessName: "LUCY NYAMBURA AND SONS",
// // //     deferralTitle: "Lease Agreement",
// // //     documentType: "Legal Documents",
// // //     deferralType: "New",
// // //     status: "deferral_approved", // Already approved by creator
// // //     daysSought: 45,
// // //     requestedExpiry: "2025-03-05T23:59:59Z",
// // //     originalDueDate: "2025-01-20T23:59:59Z",
// // //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// // //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// // //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// // //     createdAt: "2025-01-20T11:15:00Z",
// // //     updatedAt: "2025-01-21T10:30:00Z",
// // //     approvedDate: "2025-01-21T10:30:00Z",
// // //     canEdit: false, // Cannot edit after approval
// // //     canWithdraw: false, // Cannot withdraw after approval
// // //     canUpload: true // Can upload document now
// // //   }
// // // ];

// // // // Deferral Details Modal for RM
// // // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// // //   const getStatusConfig = (status) => {
// // //     switch (status) {
// // //       case 'deferral_requested':
// // //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// // //       case 'deferral_approved':
// // //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// // //       case 'deferral_rejected':
// // //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// // //       default:
// // //         return { color: 'default', label: status, description: '' };
// // //     }
// // //   };

// // //   const statusConfig = getStatusConfig(deferral?.status);

// // //   return (
// // //     <Modal
// // //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// // //       open={open}
// // //       onCancel={onClose}
// // //       width={700}
// // //       footer={[
// // //         <Button key="close" onClick={onClose}>
// // //           Close
// // //         </Button>
// // //       ]}
// // //     >
// // //       {deferral && (
// // //         <div>
// // //           {/* Header Section */}
// // //           <Card
// // //             size="small"
// // //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// // //           >
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={12}>
// // //                 <Text strong>Deferral Number:</Text>
// // //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// // //                   {deferral.deferralNumber}
// // //                 </div>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>DCL Number:</Text>
// // //                 <div>{deferral.dclNo}</div>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>Customer:</Text>
// // //                 <div>{deferral.customerName}</div>
// // //                 <Text type="secondary" style={{ fontSize: 12 }}>
// // //                   {deferral.businessName}
// // //                 </Text>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Text strong>Document:</Text>
// // //                 <div>{deferral.deferralTitle}</div>
// // //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// // //               </Col>
// // //             </Row>
// // //           </Card>

// // //           {/* Status Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               Status
// // //             </Title>
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// // //               <Tag 
// // //                 color={statusConfig.color} 
// // //                 icon={statusConfig.icon}
// // //                 style={{ fontSize: 14, padding: '8px 12px' }}
// // //               >
// // //                 {statusConfig.label}
// // //               </Tag>
// // //               <div>
// // //                 <div>{statusConfig.description}</div>
// // //                 {deferral.currentApprover && (
// // //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// // //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </Card>

// // //           {/* Timeline Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// // //               <ClockCircleOutlined /> Timeline
// // //             </Title>
// // //             <Row gutter={[16, 16]}>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// // //                   <div style={{ fontWeight: 'bold' }}>
// // //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// // //                   </div>
// // //                 </div>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// // //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// // //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// // //                   </div>
// // //                   <Text type="secondary" style={{ fontSize: 11 }}>
// // //                     ({deferral.daysSought} days)
// // //                   </Text>
// // //                 </div>
// // //               </Col>
// // //               <Col span={8}>
// // //                 <div>
// // //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// // //                   <div style={{ fontWeight: 'bold' }}>
// // //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// // //                   </div>
// // //                 </div>
// // //               </Col>
// // //             </Row>
// // //             {deferral.approvedDate && (
// // //               <div style={{ marginTop: 16 }}>
// // //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// // //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// // //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </Card>

// // //           {/* Reason Section */}
// // //           <Card size="small" style={{ marginBottom: 16 }}>
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               <UserOutlined /> Your Request Reason
// // //             </Title>
// // //             <div style={{
// // //               padding: 12,
// // //               background: '#f8f9fa',
// // //               borderRadius: 4,
// // //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// // //             }}>
// // //               {deferral.rmReason}
// // //             </div>
// // //           </Card>

// // //           {/* Creator Comments (if any) */}
// // //           {deferral.creatorComments && (
// // //             <Card size="small" style={{ marginBottom: 16 }}>
// // //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //                 Creator Comments
// // //               </Title>
// // //               <div style={{
// // //                 padding: 12,
// // //                 background: '#e6f7ff',
// // //                 borderRadius: 4,
// // //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// // //               }}>
// // //                 {deferral.creatorComments}
// // //               </div>
// // //             </Card>
// // //           )}

// // //           {/* Actions for RM */}
// // //           <Card size="small">
// // //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// // //               Available Actions
// // //             </Title>
// // //             <div style={{ display: 'flex', gap: 8 }}>
// // //               {deferral.canEdit && (
// // //                 <Button type="primary" icon={<EditOutlined />}>
// // //                   Edit Request
// // //                 </Button>
// // //               )}
// // //               {deferral.canWithdraw && (
// // //                 <Button danger icon={<DeleteOutlined />}>
// // //                   Withdraw Request
// // //                 </Button>
// // //               )}
// // //               {deferral.canUpload && (
// // //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// // //                   Upload Document
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       )}
// // //     </Modal>
// // //   );
// // // };

// // // // Main DeferralPending Component for RM
// // // const DeferralPending = ({ userId = "rm_current" }) => {
// // //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [mockData, setMockData] = useState([]);
  
// // //   // Filters
// // //   const [searchText, setSearchText] = useState("");

// // //   // Load data
// // //   useEffect(() => {
// // //     setLoading(true);
    
// // //     setTimeout(() => {
// // //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// // //       setLoading(false);
// // //     }, 300);
// // //   }, []);

// // //   // Filter data - RM sees their own deferrals (both requested and approved)
// // //   const filteredData = useMemo(() => {
// // //     let filtered = mockData.filter((d) => 
// // //       d.status === "deferral_requested" || d.status === "deferral_approved"
// // //     );
    
// // //     // Apply search filter
// // //     if (searchText) {
// // //       filtered = filtered.filter(d =>
// // //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// // //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// // //       );
// // //     }
    
// // //     return filtered;
// // //   }, [mockData, searchText]);

// // //   // Handle withdraw deferral
// // //   const handleWithdraw = (deferralId) => {
// // //     Modal.confirm({
// // //       title: 'Withdraw Deferral Request',
// // //       content: 'Are you sure you want to withdraw this deferral request?',
// // //       onOk: () => {
// // //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// // //         message.success('Deferral request withdrawn successfully');
// // //       }
// // //     });
// // //   };

// // //   // Handle edit deferral
// // //   const handleEdit = (deferral) => {
// // //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// // //     // Navigate to edit page or open edit modal
// // //   };

// // //   // Handle upload document
// // //   const handleUpload = (deferral) => {
// // //     message.info(`Upload document for ${deferral.deferralNumber}`);
// // //     // Open upload modal or navigate to upload page
// // //   };

// // //   // Clear filters
// // //   const clearFilters = () => {
// // //     setSearchText("");
// // //   };

// // //   // Updated Columns as per your request: Deferral No, DCL No, Customer Name, Document, Type, Status, Days Sought, SLA
// // //   const columns = [
// // //     {
// // //       title: "Deferral No",
// // //       dataIndex: "deferralNumber",
// // //       key: "deferralNumber",
// // //       width: 140,
// // //       render: (text) => (
// // //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// // //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// // //     },
// // //     {
// // //       title: "DCL No",
// // //       dataIndex: "dclNo",
// // //       key: "dclNo",
// // //       width: 120,
// // //       render: (text) => (
// // //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// // //     },
// // //     {
// // //       title: "Customer Name",
// // //       dataIndex: "customerName",
// // //       key: "customerName",
// // //       width: 160,
// // //       render: (text, record) => (
// // //         <div style={{
// // //           fontWeight: 600,
// // //           color: PRIMARY_BLUE,
// // //           display: "flex",
// // //           alignItems: "center",
// // //           gap: 6
// // //         }}>
// // //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// // //           <div>
// // //             <div>{text}</div>
// // //             <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
// // //               {record.customerNumber}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// // //     },
// // //     {
// // //       title: "Document",
// // //       dataIndex: "documentType",
// // //       key: "documentType",
// // //       width: 150,
// // //       render: (text) => (
// // //         <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// // //           {text}
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.documentType.localeCompare(b.documentType)
// // //     },
// // //     {
// // //       title: "Type",
// // //       dataIndex: "deferralType",
// // //       key: "deferralType",
// // //       width: 100,
// // //       render: (type) => (
// // //         <Tag
// // //           color={type === "New" ? "blue" : "orange"}
// // //           style={{
// // //             fontSize: 11,
// // //             fontWeight: "bold",
// // //             borderRadius: 4,
// // //             minWidth: 70,
// // //             textAlign: "center"
// // //           }}
// // //         >
// // //           {type}
// // //         </Tag>
// // //       ),
// // //       filters: [
// // //         { text: 'New', value: 'New' },
// // //         { text: 'Extension', value: 'Extension' }
// // //       ],
// // //       onFilter: (value, record) => record.deferralType === value,
// // //       sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
// // //     },
// // //     {
// // //       title: "Status",
// // //       dataIndex: "status",
// // //       key: "status",
// // //       width: 120,
// // //       render: (status) => {
// // //         const statusConfig = {
// // //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// // //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// // //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// // //         };
        
// // //         const config = statusConfig[status] || { color: 'default', text: status };
// // //         return (
// // //           <Tag 
// // //             color={config.color} 
// // //             icon={config.icon}
// // //             style={{ 
// // //               fontSize: 11,
// // //               fontWeight: "bold",
// // //               borderRadius: 4,
// // //               minWidth: 80,
// // //               textAlign: "center"
// // //             }}
// // //           >
// // //             {config.text}
// // //           </Tag>
// // //         );
// // //       },
// // //       filters: [
// // //         { text: 'Pending', value: 'deferral_requested' },
// // //         { text: 'Approved', value: 'deferral_approved' }
// // //       ],
// // //       onFilter: (value, record) => record.status === value,
// // //       sorter: (a, b) => a.status.localeCompare(b.status)
// // //     },
// // //     {
// // //       title: "Days Sought",
// // //       dataIndex: "daysSought",
// // //       key: "daysSought",
// // //       width: 100,
// // //       align: "center",
// // //       render: (days) => (
// // //         <div style={{
// // //           fontWeight: "bold",
// // //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// // //           fontSize: 14,
// // //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// // //           padding: "4px 8px",
// // //           borderRadius: 4,
// // //           display: "inline-block"
// // //         }}>
// // //           {days} days
// // //         </div>
// // //       ),
// // //       sorter: (a, b) => a.daysSought - b.daysSought
// // //     },
// // //     {
// // //       title: "SLA",
// // //       dataIndex: "slaExpiry",
// // //       key: "slaExpiry",
// // //       width: 100,
// // //       fixed: "right",
// // //       render: (date) => {
// // //         const daysLeft = dayjs(date).diff(dayjs(), 'days');
// // //         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
// // //         let color = SUCCESS_GREEN;
// // //         let text = `${daysLeft}d`;
        
// // //         if (daysLeft <= 0 && hoursLeft <= 0) {
// // //           color = ERROR_RED;
// // //           text = 'Expired';
// // //         } else if (daysLeft <= 0) {
// // //           color = ERROR_RED;
// // //           text = `${hoursLeft}h`;
// // //         } else if (daysLeft <= 1) {
// // //           color = ERROR_RED;
// // //           text = `${daysLeft}d`;
// // //         } else if (daysLeft <= 3) {
// // //           color = WARNING_ORANGE;
// // //           text = `${daysLeft}d`;
// // //         }
        
// // //         return (
// // //           <Tag
// // //             color={color}
// // //             style={{ 
// // //               fontWeight: "bold", 
// // //               fontSize: 11,
// // //               minWidth: 50,
// // //               textAlign: "center"
// // //             }}
// // //           >
// // //             {text}
// // //           </Tag>
// // //         );
// // //       },
// // //       sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
// // //     },
// // //     {
// // //       title: "Actions",
// // //       key: "actions",
// // //       width: 80,
// // //       fixed: "right",
// // //       render: (_, record) => (
// // //         <Button
// // //           type="link"
// // //           size="small"
// // //           onClick={() => {
// // //             setSelectedDeferral(record);
// // //             setModalOpen(true);
// // //           }}
// // //           style={{
// // //             color: PRIMARY_BLUE,
// // //             fontWeight: 500
// // //           }}
// // //         >
// // //           <EyeOutlined /> View
// // //         </Button>
// // //       )
// // //     }
// // //   ];

// // //   // Custom table styles
// // //   const customTableStyles = `
// // //     .deferral-pending-table .ant-table-wrapper {
// // //       border-radius: 12px;
// // //       overflow: hidden;
// // //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// // //       border: 1px solid #e0e0e0;
// // //     }
// // //     .deferral-pending-table .ant-table-thead > tr > th {
// // //       background-color: #f7f7f7 !important;
// // //       color: ${PRIMARY_BLUE} !important;
// // //       font-weight: 700;
// // //       fontSize: 13px;
// // //       padding: 14px 12px !important;
// // //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// // //       border-right: none !important;
// // //     }
// // //     .deferral-pending-table .ant-table-tbody > tr > td {
// // //       border-bottom: 1px solid #f0f0f0 !important;
// // //       border-right: none !important;
// // //       padding: 12px 12px !important;
// // //       fontSize: 13px;
// // //       color: #333;
// // //     }
// // //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // //       cursor: pointer;
// // //     }
// // //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// // //       background-color: rgba(181, 211, 52, 0.1) !important;
// // //     }
// // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// // //       background-color: ${ACCENT_LIME} !important;
// // //       border-color: ${ACCENT_LIME} !important;
// // //     }
// // //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// // //       color: ${PRIMARY_BLUE} !important;
// // //       font-weight: 600;
// // //     }
// // //   `;

// // //   return (
// // //     <div style={{ padding: 24 }}>
// // //       <style>{customTableStyles}</style>

// // //       {/* Header */}
// // //       <Card
// // //         style={{
// // //           marginBottom: 24,
// // //           borderRadius: 8,
// // //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //           borderLeft: `4px solid ${ACCENT_LIME}`
// // //         }}
// // //         bodyStyle={{ padding: 16 }}
// // //       >
// // //         <Row justify="space-between" align="middle">
// // //           <Col>
// // //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// // //               My Deferral Requests
// // //               <Badge
// // //                 count={filteredData.length}
// // //                 style={{
// // //                   backgroundColor: ACCENT_LIME,
// // //                   fontSize: 12
// // //                 }}
// // //               />
// // //             </h2>
// // //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// // //               Track and manage your deferral requests
// // //             </p>
// // //           </Col>
// // //           <Col>
// // //             <Button
// // //               type="primary"
// // //               onClick={() => {
// // //                 // Navigate to request new deferral
// // //                 window.location.href = '/rm/deferrals/request';
// // //               }}
// // //               style={{
// // //                 backgroundColor: PRIMARY_BLUE,
// // //                 borderColor: PRIMARY_BLUE
// // //               }}
// // //             >
// // //               + New Deferral Request
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Card>

// // //       {/* Filters */}
// // //       <Card
// // //         style={{
// // //           marginBottom: 16,
// // //           background: "#fafafa",
// // //           border: `1px solid ${PRIMARY_BLUE}20`,
// // //           borderRadius: 8
// // //         }}
// // //         size="small"
// // //       >
// // //         <Row gutter={[16, 16]} align="middle">
// // //           <Col xs={24} sm={12} md={8}>
// // //             <Input
// // //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// // //               prefix={<SearchOutlined />}
// // //               value={searchText}
// // //               onChange={(e) => setSearchText(e.target.value)}
// // //               allowClear
// // //               size="middle"
// // //             />
// // //           </Col>
          
// // //           <Col xs={24} sm={12} md={4}>
// // //             <Button
// // //               onClick={clearFilters}
// // //               style={{ width: '100%' }}
// // //               size="middle"
// // //             >
// // //               Clear Filters
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Card>

// // //       {/* Table Title */}
// // //       <Divider style={{ margin: "12px 0" }}>
// // //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// // //           My Deferral Requests ({filteredData.length} items)
// // //         </span>
// // //       </Divider>

// // //       {/* Table */}
// // //       {loading ? (
// // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// // //           <Spin tip="Loading deferral requests..." />
// // //         </div>
// // //       ) : filteredData.length === 0 ? (
// // //         <Empty
// // //           description={
// // //             <div>
// // //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// // //               <p style={{ color: "#999" }}>
// // //                 {searchText
// // //                   ? 'Try changing your search term'
// // //                   : 'You haven\'t requested any deferrals yet'}
// // //               </p>
// // //               <Button
// // //                 type="primary"
// // //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// // //                 style={{ marginTop: 16 }}
// // //               >
// // //                 Request Your First Deferral
// // //               </Button>
// // //             </div>
// // //           }
// // //           style={{ padding: 40 }}
// // //         />
// // //       ) : (
// // //         <div className="deferral-pending-table">
// // //           <Table
// // //             columns={columns}
// // //             dataSource={filteredData}
// // //             rowKey="_id"
// // //             size="middle"
// // //             pagination={{
// // //               pageSize: 10,
// // //               showSizeChanger: true,
// // //               pageSizeOptions: ["10", "20", "50"],
// // //               position: ["bottomCenter"],
// // //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// // //             }}
// // //             scroll={{ x: 1100 }}
// // //             onRow={(record) => ({
// // //               onClick: () => {
// // //                 setSelectedDeferral(record);
// // //                 setModalOpen(true);
// // //               },
// // //             })}
// // //           />
// // //         </div>
// // //       )}

// // //       {/* Footer Info */}
// // //       <div style={{
// // //         marginTop: 24,
// // //         padding: 16,
// // //         background: "#f8f9fa",
// // //         borderRadius: 8,
// // //         fontSize: 12,
// // //         color: "#666",
// // //         border: `1px solid ${PRIMARY_BLUE}10`
// // //       }}>
// // //         <Row justify="space-between" align="middle">
// // //           <Col>
// // //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// // //           </Col>
// // //           <Col>
// // //             <Text type="secondary">
// // //               Showing {filteredData.length} items • Data as of latest system update
// // //             </Text>
// // //           </Col>
// // //         </Row>
// // //       </div>

// // //       {/* Deferral Details Modal */}
// // //       {selectedDeferral && (
// // //         <DeferralDetailsModal
// // //           deferral={selectedDeferral}
// // //           open={modalOpen}
// // //           onClose={() => {
// // //             setModalOpen(false);
// // //             setSelectedDeferral(null);
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DeferralPending;





// // import React, { useMemo, useState, useEffect } from "react";
// // import {
// //   Button,
// //   Divider,
// //   Table,
// //   Tag,
// //   Spin,
// //   Empty,
// //   Card,
// //   Row,
// //   Col,
// //   Input,
// //   Badge,
// //   Typography,
// //   Modal,
// //   message,
// //   Popconfirm
// // } from "antd";
// // import {
// //   SearchOutlined,
// //   FileTextOutlined,
// //   UserOutlined,
// //   CustomerServiceOutlined,
// //   ClockCircleOutlined,
// //   EyeOutlined,
// //   EditOutlined,
// //   DeleteOutlined,
// //   CheckCircleOutlined,
// //   CloseCircleOutlined
// // } from "@ant-design/icons";
// // import dayjs from "dayjs";

// // // Theme Colors (same as other queues)
// // const PRIMARY_BLUE = "#164679";
// // const ACCENT_LIME = "#b5d334";
// // const HIGHLIGHT_GOLD = "#fcb116";
// // const LIGHT_YELLOW = "#fcd716";
// // const SECONDARY_PURPLE = "#7e6496";
// // const SUCCESS_GREEN = "#52c41a";
// // const ERROR_RED = "#ff4d4f";
// // const WARNING_ORANGE = "#faad14";

// // const { Text, Title } = Typography;

// // // MOCK DATA for RM's Pending Deferrals
// // const MOCK_RM_PENDING_DEFERRALS = [
// //   {
// //     _id: "1",
// //     deferralNumber: "DEF-2024-001",
// //     dclNo: "DCL-2024-015",
// //     customerNumber: "CUST001",
// //     customerName: "Javan Dave",
// //     businessName: "JAVAN DAVE AND SONS",
// //     deferralTitle: "Bank Statements",
// //     documentType: "Financial Statements",
// //     deferralType: "New",
// //     status: "deferral_requested", // RM requested, waiting for creator approval
// //     daysSought: 30,
// //     requestedExpiry: "2025-02-05T23:59:59Z",
// //     originalDueDate: "2025-01-05T23:59:59Z",
// //     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
// //     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
// //     createdAt: "2025-01-05T09:30:00Z",
// //     updatedAt: "2025-01-05T09:30:00Z",
// //     slaExpiry: "2025-01-12T23:59:59Z",
// //     canEdit: true, // RM can edit if still pending
// //     canWithdraw: true // RM can withdraw if still pending
// //   },
// //   {
// //     _id: "2",
// //     deferralNumber: "DEF-2024-002",
// //     dclNo: "DCL-2024-028",
// //     customerNumber: "CUST002",
// //     customerName: "Diana Mwangi",
// //     businessName: "DIANA MWANGI AND DAUGHTERS",
// //     deferralTitle: "CR12 Certificate",
// //     documentType: "Registration Documents",
// //     deferralType: "Extension",
// //     status: "deferral_requested",
// //     daysSought: 15,
// //     requestedExpiry: "2025-02-05T23:59:59Z",
// //     originalDueDate: "2025-01-20T23:59:59Z",
// //     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
// //     rmReason: "CRB office experiencing delays in processing due to system upgrades",
// //     createdAt: "2025-01-11T14:20:00Z",
// //     updatedAt: "2025-01-11T14:20:00Z",
// //     slaExpiry: "2025-01-18T23:59:59Z",
// //     canEdit: true,
// //     canWithdraw: true
// //   },
// //   {
// //     _id: "3",
// //     deferralNumber: "DEF-2024-003",
// //     dclNo: "DCL-2024-042",
// //     customerNumber: "CUST003",
// //     customerName: "Lucy Nyambura",
// //     businessName: "LUCY NYAMBURA AND SONS",
// //     deferralTitle: "Lease Agreement",
// //     documentType: "Legal Documents",
// //     deferralType: "New",
// //     status: "deferral_approved", // Already approved by creator
// //     daysSought: 45,
// //     requestedExpiry: "2025-03-05T23:59:59Z",
// //     originalDueDate: "2025-01-20T23:59:59Z",
// //     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
// //     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
// //     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
// //     createdAt: "2025-01-20T11:15:00Z",
// //     updatedAt: "2025-01-21T10:30:00Z",
// //     approvedDate: "2025-01-21T10:30:00Z",
// //     canEdit: false, // Cannot edit after approval
// //     canWithdraw: false, // Cannot withdraw after approval
// //     canUpload: true // Can upload document now
// //   }
// // ];

// // // Deferral Details Modal for RM
// // const DeferralDetailsModal = ({ deferral, open, onClose }) => {
// //   const getStatusConfig = (status) => {
// //     switch (status) {
// //       case 'deferral_requested':
// //         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
// //       case 'deferral_approved':
// //         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
// //       case 'deferral_rejected':
// //         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
// //       default:
// //         return { color: 'default', label: status, description: '' };
// //     }
// //   };

// //   const statusConfig = getStatusConfig(deferral?.status);

// //   return (
// //     <Modal
// //       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
// //       open={open}
// //       onCancel={onClose}
// //       width={700}
// //       footer={[
// //         <Button key="close" onClick={onClose}>
// //           Close
// //         </Button>
// //       ]}
// //     >
// //       {deferral && (
// //         <div>
// //           {/* Header Section */}
// //           <Card
// //             size="small"
// //             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
// //           >
// //             <Row gutter={[16, 16]}>
// //               <Col span={12}>
// //                 <Text strong>Deferral Number:</Text>
// //                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
// //                   {deferral.deferralNumber}
// //                 </div>
// //               </Col>
// //               <Col span={12}>
// //                 <Text strong>DCL Number:</Text>
// //                 <div>{deferral.dclNo}</div>
// //               </Col>
// //               <Col span={12}>
// //                 <Text strong>Customer:</Text>
// //                 <div>{deferral.customerName}</div>
// //                 <Text type="secondary" style={{ fontSize: 12 }}>
// //                   {deferral.businessName}
// //                 </Text>
// //               </Col>
// //               <Col span={12}>
// //                 <Text strong>Document:</Text>
// //                 <div>{deferral.deferralTitle}</div>
// //                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
// //               </Col>
// //             </Row>
// //           </Card>

// //           {/* Status Section */}
// //           <Card size="small" style={{ marginBottom: 16 }}>
// //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// //               Status
// //             </Title>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// //               <Tag 
// //                 color={statusConfig.color} 
// //                 icon={statusConfig.icon}
// //                 style={{ fontSize: 14, padding: '8px 12px' }}
// //               >
// //                 {statusConfig.label}
// //               </Tag>
// //               <div>
// //                 <div>{statusConfig.description}</div>
// //                 {deferral.currentApprover && (
// //                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
// //                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </Card>

// //           {/* Timeline Section */}
// //           <Card size="small" style={{ marginBottom: 16 }}>
// //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
// //               <ClockCircleOutlined /> Timeline
// //             </Title>
// //             <Row gutter={[16, 16]}>
// //               <Col span={8}>
// //                 <div>
// //                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
// //                   <div style={{ fontWeight: 'bold' }}>
// //                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
// //                   </div>
// //                 </div>
// //               </Col>
// //               <Col span={8}>
// //                 <div>
// //                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
// //                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
// //                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
// //                   </div>
// //                   <Text type="secondary" style={{ fontSize: 11 }}>
// //                     ({deferral.daysSought} days)
// //                   </Text>
// //                 </div>
// //               </Col>
// //               <Col span={8}>
// //                 <div>
// //                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
// //                   <div style={{ fontWeight: 'bold' }}>
// //                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
// //                   </div>
// //                 </div>
// //               </Col>
// //             </Row>
// //             {deferral.approvedDate && (
// //               <div style={{ marginTop: 16 }}>
// //                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
// //                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
// //                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
// //                 </div>
// //               </div>
// //             )}
// //           </Card>

// //           {/* Reason Section */}
// //           <Card size="small" style={{ marginBottom: 16 }}>
// //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// //               <UserOutlined /> Your Request Reason
// //             </Title>
// //             <div style={{
// //               padding: 12,
// //               background: '#f8f9fa',
// //               borderRadius: 4,
// //               borderLeft: `3px solid ${SECONDARY_PURPLE}`
// //             }}>
// //               {deferral.rmReason}
// //             </div>
// //           </Card>

// //           {/* Creator Comments (if any) */}
// //           {deferral.creatorComments && (
// //             <Card size="small" style={{ marginBottom: 16 }}>
// //               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// //                 Creator Comments
// //               </Title>
// //               <div style={{
// //                 padding: 12,
// //                 background: '#e6f7ff',
// //                 borderRadius: 4,
// //                 borderLeft: `3px solid ${PRIMARY_BLUE}`
// //               }}>
// //                 {deferral.creatorComments}
// //               </div>
// //             </Card>
// //           )}

// //           {/* Actions for RM */}
// //           <Card size="small">
// //             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
// //               Available Actions
// //             </Title>
// //             <div style={{ display: 'flex', gap: 8 }}>
// //               {deferral.canEdit && (
// //                 <Button type="primary" icon={<EditOutlined />}>
// //                   Edit Request
// //                 </Button>
// //               )}
// //               {deferral.canWithdraw && (
// //                 <Button danger icon={<DeleteOutlined />}>
// //                   Withdraw Request
// //                 </Button>
// //               )}
// //               {deferral.canUpload && (
// //                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
// //                   Upload Document
// //                 </Button>
// //               )}
// //             </div>
// //           </Card>
// //         </div>
// //       )}
// //     </Modal>
// //   );
// // };

// // // Main DeferralPending Component for RM
// // const DeferralPending = ({ userId = "rm_current" }) => {
// //   const [selectedDeferral, setSelectedDeferral] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [mockData, setMockData] = useState([]);
  
// //   // Filters
// //   const [searchText, setSearchText] = useState("");

// //   // Load data
// //   useEffect(() => {
// //     setLoading(true);
    
// //     setTimeout(() => {
// //       setMockData(MOCK_RM_PENDING_DEFERRALS);
// //       setLoading(false);
// //     }, 300);
// //   }, []);

// //   // Filter data - RM sees their own deferrals (both requested and approved)
// //   const filteredData = useMemo(() => {
// //     let filtered = mockData.filter((d) => 
// //       d.status === "deferral_requested" || d.status === "deferral_approved"
// //     );
    
// //     // Apply search filter
// //     if (searchText) {
// //       filtered = filtered.filter(d =>
// //         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// //         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
// //         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
// //         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
// //         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
// //       );
// //     }
    
// //     return filtered;
// //   }, [mockData, searchText]);

// //   // Handle withdraw deferral
// //   const handleWithdraw = (deferralId) => {
// //     Modal.confirm({
// //       title: 'Withdraw Deferral Request',
// //       content: 'Are you sure you want to withdraw this deferral request?',
// //       onOk: () => {
// //         setMockData(prev => prev.filter(d => d._id !== deferralId));
// //         message.success('Deferral request withdrawn successfully');
// //       }
// //     });
// //   };

// //   // Handle edit deferral
// //   const handleEdit = (deferral) => {
// //     message.info(`Edit deferral ${deferral.deferralNumber}`);
// //     // Navigate to edit page or open edit modal
// //   };

// //   // Handle upload document
// //   const handleUpload = (deferral) => {
// //     message.info(`Upload document for ${deferral.deferralNumber}`);
// //     // Open upload modal or navigate to upload page
// //   };

// //   // Clear filters
// //   const clearFilters = () => {
// //     setSearchText("");
// //   };

// //   // Updated Columns as per your request
// //   const columns = [
// //     {
// //       title: "Deferral No",
// //       dataIndex: "deferralNumber",
// //       key: "deferralNumber",
// //       width: 140,
// //       render: (text) => (
// //         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
// //           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
// //           {text}
// //         </div>
// //       ),
// //       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
// //     },
// //     {
// //       title: "DCL No",
// //       dataIndex: "dclNo",
// //       key: "dclNo",
// //       width: 120,
// //       render: (text) => (
// //         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
// //           {text}
// //         </div>
// //       ),
// //       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
// //     },
// //     {
// //       title: "Customer Name",
// //       dataIndex: "customerName",
// //       key: "customerName",
// //       width: 160,
// //       render: (text) => (
// //         <div style={{
// //           fontWeight: 600,
// //           color: PRIMARY_BLUE,
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 6
// //         }}>
// //           <CustomerServiceOutlined style={{ fontSize: 12 }} />
// //           <div>
// //             <div>{text}</div>
// //           </div>
// //         </div>
// //       ),
// //       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
// //     },
// //     {
// //       title: "Document",
// //       dataIndex: "documentType",
// //       key: "documentType",
// //       width: 150,
// //       render: (text) => (
// //         <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
// //           {text}
// //         </div>
// //       ),
// //       sorter: (a, b) => a.documentType.localeCompare(b.documentType)
// //     },
// //     {
// //       title: "Type",
// //       dataIndex: "deferralType",
// //       key: "deferralType",
// //       width: 100,
// //       render: (type) => (
// //         <Tag
// //           color={type === "New" ? "blue" : "orange"}
// //           style={{
// //             fontSize: 11,
// //             fontWeight: "bold",
// //             borderRadius: 4,
// //             minWidth: 70,
// //             textAlign: "center"
// //           }}
// //         >
// //           {type}
// //         </Tag>
// //       ),
// //       filters: [
// //         { text: 'New', value: 'New' },
// //         { text: 'Extension', value: 'Extension' }
// //       ],
// //       onFilter: (value, record) => record.deferralType === value,
// //       sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //       width: 120,
// //       render: (status) => {
// //         const statusConfig = {
// //           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
// //           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
// //           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
// //         };
        
// //         const config = statusConfig[status] || { color: 'default', text: status };
// //         return (
// //           <Tag 
// //             color={config.color} 
// //             icon={config.icon}
// //             style={{ 
// //               fontSize: 11,
// //               fontWeight: "bold",
// //               borderRadius: 4,
// //               minWidth: 80,
// //               textAlign: "center"
// //             }}
// //           >
// //             {config.text}
// //           </Tag>
// //         );
// //       },
// //       filters: [
// //         { text: 'Pending', value: 'deferral_requested' },
// //         { text: 'Approved', value: 'deferral_approved' }
// //       ],
// //       onFilter: (value, record) => record.status === value,
// //       sorter: (a, b) => a.status.localeCompare(b.status)
// //     },
// //     {
// //       title: "Days Sought",
// //       dataIndex: "daysSought",
// //       key: "daysSought",
// //       width: 100,
// //       align: "center",
// //       render: (days) => (
// //         <div style={{
// //           fontWeight: "bold",
// //           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
// //           fontSize: 14,
// //           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
// //           padding: "4px 8px",
// //           borderRadius: 4,
// //           display: "inline-block"
// //         }}>
// //           {days} days
// //         </div>
// //       ),
// //       sorter: (a, b) => a.daysSought - b.daysSought
// //     },
// //     {
// //       title: "SLA",
// //       dataIndex: "slaExpiry",
// //       key: "slaExpiry",
// //       width: 100,
// //       fixed: "right",
// //       render: (date) => {
// //         const daysLeft = dayjs(date).diff(dayjs(), 'days');
// //         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
// //         let color = SUCCESS_GREEN;
// //         let text = `${daysLeft}d`;
        
// //         if (daysLeft <= 0 && hoursLeft <= 0) {
// //           color = ERROR_RED;
// //           text = 'Expired';
// //         } else if (daysLeft <= 0) {
// //           color = ERROR_RED;
// //           text = `${hoursLeft}h`;
// //         } else if (daysLeft <= 1) {
// //           color = ERROR_RED;
// //           text = `${daysLeft}d`;
// //         } else if (daysLeft <= 3) {
// //           color = WARNING_ORANGE;
// //           text = `${daysLeft}d`;
// //         }
        
// //         return (
// //           <Tag
// //             color={color}
// //             style={{ 
// //               fontWeight: "bold", 
// //               fontSize: 11,
// //               minWidth: 50,
// //               textAlign: "center"
// //             }}
// //           >
// //             {text}
// //           </Tag>
// //         );
// //       },
// //       sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
// //     }
// //   ];

// //   // Custom table styles
// //   const customTableStyles = `
// //     .deferral-pending-table .ant-table-wrapper {
// //       border-radius: 12px;
// //       overflow: hidden;
// //       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
// //       border: 1px solid #e0e0e0;
// //     }
// //     .deferral-pending-table .ant-table-thead > tr > th {
// //       background-color: #f7f7f7 !important;
// //       color: ${PRIMARY_BLUE} !important;
// //       font-weight: 700;
// //       fontSize: 13px;
// //       padding: 14px 12px !important;
// //       border-bottom: 3px solid ${ACCENT_LIME} !important;
// //       border-right: none !important;
// //     }
// //     .deferral-pending-table .ant-table-tbody > tr > td {
// //       border-bottom: 1px solid #f0f0f0 !important;
// //       border-right: none !important;
// //       padding: 12px 12px !important;
// //       fontSize: 13px;
// //       color: #333;
// //     }
// //     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
// //       background-color: rgba(181, 211, 52, 0.1) !important;
// //       cursor: pointer;
// //     }
// //     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
// //       background-color: rgba(181, 211, 52, 0.1) !important;
// //     }
// //     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
// //       background-color: ${ACCENT_LIME} !important;
// //       borderColor: ${ACCENT_LIME} !important;
// //     }
// //     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
// //       color: ${PRIMARY_BLUE} !important;
// //       font-weight: 600;
// //     }
// //   `;

// //   return (
// //     <div style={{ padding: 24 }}>
// //       <style>{customTableStyles}</style>

// //       {/* Header */}
// //       <Card
// //         style={{
// //           marginBottom: 24,
// //           borderRadius: 8,
// //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //           borderLeft: `4px solid ${ACCENT_LIME}`
// //         }}
// //         bodyStyle={{ padding: 16 }}
// //       >
// //         <Row justify="space-between" align="middle">
// //           <Col>
// //             <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
// //               My Deferral Requests
// //               <Badge
// //                 count={filteredData.length}
// //                 style={{
// //                   backgroundColor: ACCENT_LIME,
// //                   fontSize: 12
// //                 }}
// //               />
// //             </h2>
// //             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
// //               Track and manage your deferral requests
// //             </p>
// //           </Col>
// //           <Col>
// //             <Button
// //               type="primary"
// //               onClick={() => {
// //                 // Navigate to request new deferral
// //                 window.location.href = '/rm/deferrals/request';
// //               }}
// //               style={{
// //                 backgroundColor: PRIMARY_BLUE,
// //                 borderColor: PRIMARY_BLUE
// //               }}
// //             >
// //               + New Deferral Request
// //             </Button>
// //           </Col>
// //         </Row>
// //       </Card>

// //       {/* Filters */}
// //       <Card
// //         style={{
// //           marginBottom: 16,
// //           background: "#fafafa",
// //           border: `1px solid ${PRIMARY_BLUE}20`,
// //           borderRadius: 8
// //         }}
// //         size="small"
// //       >
// //         <Row gutter={[16, 16]} align="middle">
// //           <Col xs={24} sm={12} md={8}>
// //             <Input
// //               placeholder="Search by Deferral No, DCL No, Customer, or Document"
// //               prefix={<SearchOutlined />}
// //               value={searchText}
// //               onChange={(e) => setSearchText(e.target.value)}
// //               allowClear
// //               size="middle"
// //             />
// //           </Col>
          
// //           <Col xs={24} sm={12} md={4}>
// //             <Button
// //               onClick={clearFilters}
// //               style={{ width: '100%' }}
// //               size="middle"
// //             >
// //               Clear Filters
// //             </Button>
// //           </Col>
// //         </Row>
// //       </Card>

// //       {/* Table Title */}
// //       <Divider style={{ margin: "12px 0" }}>
// //         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
// //           My Deferral Requests ({filteredData.length} items)
// //         </span>
// //       </Divider>

// //       {/* Table */}
// //       {loading ? (
// //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
// //           <Spin tip="Loading deferral requests..." />
// //         </div>
// //       ) : filteredData.length === 0 ? (
// //         <Empty
// //           description={
// //             <div>
// //               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
// //               <p style={{ color: "#999" }}>
// //                 {searchText
// //                   ? 'Try changing your search term'
// //                   : 'You haven\'t requested any deferrals yet'}
// //               </p>
// //               <Button
// //                 type="primary"
// //                 onClick={() => window.location.href = '/rm/deferrals/request'}
// //                 style={{ marginTop: 16 }}
// //               >
// //                 Request Your First Deferral
// //               </Button>
// //             </div>
// //           }
// //           style={{ padding: 40 }}
// //         />
// //       ) : (
// //         <div className="deferral-pending-table">
// //           <Table
// //             columns={columns}
// //             dataSource={filteredData}
// //             rowKey="_id"
// //             size="middle"
// //             pagination={{
// //               pageSize: 10,
// //               showSizeChanger: true,
// //               pageSizeOptions: ["10", "20", "50"],
// //               position: ["bottomCenter"],
// //               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
// //             }}
// //             scroll={{ x: 1000 }}
// //             onRow={(record) => ({
// //               onClick: () => {
// //                 setSelectedDeferral(record);
// //                 setModalOpen(true);
// //               },
// //             })}
// //           />
// //         </div>
// //       )}

// //       {/* Footer Info */}
// //       <div style={{
// //         marginTop: 24,
// //         padding: 16,
// //         background: "#f8f9fa",
// //         borderRadius: 8,
// //         fontSize: 12,
// //         color: "#666",
// //         border: `1px solid ${PRIMARY_BLUE}10`
// //       }}>
// //         <Row justify="space-between" align="middle">
// //           <Col>
// //             Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
// //           </Col>
// //           <Col>
// //             <Text type="secondary">
// //               Showing {filteredData.length} items • Data as of latest system update
// //             </Text>
// //           </Col>
// //         </Row>
// //       </div>

// //       {/* Deferral Details Modal */}
// //       {selectedDeferral && (
// //         <DeferralDetailsModal
// //           deferral={selectedDeferral}
// //           open={modalOpen}
// //           onClose={() => {
// //             setModalOpen(false);
// //             setSelectedDeferral(null);
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default DeferralPending;




// import React, { useMemo, useState, useEffect } from "react";
// import {
//   Button,
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
//   Modal,
//   message,
//   Popconfirm
// } from "antd";
// import {
//   SearchOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   CustomerServiceOutlined,
//   ClockCircleOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined
// } from "@ant-design/icons";
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

// const { Text, Title } = Typography;

// // MOCK DATA for RM's Pending Deferrals
// const MOCK_RM_PENDING_DEFERRALS = [
//   {
//     _id: "1",
//     deferralNumber: "DEF-2024-001",
//     dclNo: "DCL-2024-015",
//     customerNumber: "CUST001",
//     customerName: "Javan Dave",
//     businessName: "JAVAN DAVE AND SONS",
//     deferralTitle: "Bank Statements",
//     documentType: "Financial Statements",
//     deferralType: "New",
//     status: "deferral_requested", // RM requested, waiting for creator approval
//     daysSought: 30,
//     requestedExpiry: "2025-02-05T23:59:59Z",
//     originalDueDate: "2025-01-05T23:59:59Z",
//     currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
//     rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024",
//     createdAt: "2025-01-05T09:30:00Z",
//     updatedAt: "2025-01-05T09:30:00Z",
//     slaExpiry: "2025-01-12T23:59:59Z",
//     canEdit: true, // RM can edit if still pending
//     canWithdraw: true // RM can withdraw if still pending
//   },
//   {
//     _id: "2",
//     deferralNumber: "DEF-2024-002",
//     dclNo: "DCL-2024-028",
//     customerNumber: "CUST002",
//     customerName: "Diana Mwangi",
//     businessName: "DIANA MWANGI AND DAUGHTERS",
//     deferralTitle: "CR12 Certificate",
//     documentType: "Registration Documents",
//     deferralType: "Extension",
//     status: "deferral_requested",
//     daysSought: 15,
//     requestedExpiry: "2025-02-05T23:59:59Z",
//     originalDueDate: "2025-01-20T23:59:59Z",
//     currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
//     rmReason: "CRB office experiencing delays in processing due to system upgrades",
//     createdAt: "2025-01-11T14:20:00Z",
//     updatedAt: "2025-01-11T14:20:00Z",
//     slaExpiry: "2025-01-18T23:59:59Z",
//     canEdit: true,
//     canWithdraw: true
//   },
//   {
//     _id: "3",
//     deferralNumber: "DEF-2024-003",
//     dclNo: "DCL-2024-042",
//     customerNumber: "CUST003",
//     customerName: "Lucy Nyambura",
//     businessName: "LUCY NYAMBURA AND SONS",
//     deferralTitle: "Lease Agreement",
//     documentType: "Legal Documents",
//     deferralType: "New",
//     status: "deferral_approved", // Already approved by creator
//     daysSought: 45,
//     requestedExpiry: "2025-03-05T23:59:59Z",
//     originalDueDate: "2025-01-20T23:59:59Z",
//     currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
//     rmReason: "Landlord traveling overseas, agreement pending signature upon return",
//     creatorComments: "Approved. Please ensure document is submitted before expiry date.",
//     createdAt: "2025-01-20T11:15:00Z",
//     updatedAt: "2025-01-21T10:30:00Z",
//     approvedDate: "2025-01-21T10:30:00Z",
//     canEdit: false, // Cannot edit after approval
//     canWithdraw: false, // Cannot withdraw after approval
//     canUpload: true // Can upload document now
//   }
// ];

// // Deferral Details Modal for RM
// const DeferralDetailsModal = ({ deferral, open, onClose }) => {
//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'deferral_requested':
//         return { color: 'orange', icon: <ClockCircleOutlined />, label: 'Pending Review', description: 'Awaiting Creator approval' };
//       case 'deferral_approved':
//         return { color: 'green', icon: <CheckCircleOutlined />, label: 'Approved', description: 'Deferral approved by Creator' };
//       case 'deferral_rejected':
//         return { color: 'red', icon: <CloseCircleOutlined />, label: 'Rejected', description: 'Deferral request was rejected' };
//       default:
//         return { color: 'default', label: status, description: '' };
//     }
//   };

//   const statusConfig = getStatusConfig(deferral?.status);

//   return (
//     <Modal
//       title={<span style={{ color: PRIMARY_BLUE }}>Deferral Request Details</span>}
//       open={open}
//       onCancel={onClose}
//       width={700}
//       footer={[
//         <Button key="close" onClick={onClose}>
//           Close
//         </Button>
//       ]}
//     >
//       {deferral && (
//         <div>
//           {/* Header Section */}
//           <Card
//             size="small"
//             style={{ marginBottom: 16, borderLeft: `4px solid ${ACCENT_LIME}` }}
//           >
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <Text strong>Deferral Number:</Text>
//                 <div style={{ color: PRIMARY_BLUE, fontWeight: 'bold' }}>
//                   {deferral.deferralNumber}
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <Text strong>DCL Number:</Text>
//                 <div>{deferral.dclNo}</div>
//               </Col>
//               <Col span={12}>
//                 <Text strong>Customer:</Text>
//                 <div>{deferral.customerName}</div>
//                 <Text type="secondary" style={{ fontSize: 12 }}>
//                   {deferral.businessName}
//                 </Text>
//               </Col>
//               <Col span={12}>
//                 <Text strong>Document:</Text>
//                 <div>{deferral.deferralTitle}</div>
//                 <Tag color="blue" style={{ marginTop: 4 }}>{deferral.documentType}</Tag>
//               </Col>
//             </Row>
//           </Card>

//           {/* Status Section */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//               Status
//             </Title>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//               <Tag 
//                 color={statusConfig.color} 
//                 icon={statusConfig.icon}
//                 style={{ fontSize: 14, padding: '8px 12px' }}
//               >
//                 {statusConfig.label}
//               </Tag>
//               <div>
//                 <div>{statusConfig.description}</div>
//                 {deferral.currentApprover && (
//                   <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
//                     Current Approver: <strong>{deferral.currentApprover.name}</strong>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Timeline Section */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 16 }}>
//               <ClockCircleOutlined /> Timeline
//             </Title>
//             <Row gutter={[16, 16]}>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>Original Due Date</Text>
//                   <div style={{ fontWeight: 'bold' }}>
//                     {dayjs(deferral.originalDueDate).format('DD/MM/YYYY')}
//                   </div>
//                 </div>
//               </Col>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>Requested Extension</Text>
//                   <div style={{ fontWeight: 'bold', color: WARNING_ORANGE }}>
//                     {dayjs(deferral.requestedExpiry).format('DD/MM/YYYY')}
//                   </div>
//                   <Text type="secondary" style={{ fontSize: 11 }}>
//                     ({deferral.daysSought} days)
//                   </Text>
//                 </div>
//               </Col>
//               <Col span={8}>
//                 <div>
//                   <Text type="secondary" style={{ fontSize: 12 }}>Request Date</Text>
//                   <div style={{ fontWeight: 'bold' }}>
//                     {dayjs(deferral.createdAt).format('DD/MM/YYYY')}
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             {deferral.approvedDate && (
//               <div style={{ marginTop: 16 }}>
//                 <Text type="secondary" style={{ fontSize: 12 }}>Approved Date</Text>
//                 <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>
//                   {dayjs(deferral.approvedDate).format('DD/MM/YYYY HH:mm')}
//                 </div>
//               </div>
//             )}
//           </Card>

//           {/* Reason Section */}
//           <Card size="small" style={{ marginBottom: 16 }}>
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//               <UserOutlined /> Your Request Reason
//             </Title>
//             <div style={{
//               padding: 12,
//               background: '#f8f9fa',
//               borderRadius: 4,
//               borderLeft: `3px solid ${SECONDARY_PURPLE}`
//             }}>
//               {deferral.rmReason}
//             </div>
//           </Card>

//           {/* Creator Comments (if any) */}
//           {deferral.creatorComments && (
//             <Card size="small" style={{ marginBottom: 16 }}>
//               <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//                 Creator Comments
//               </Title>
//               <div style={{
//                 padding: 12,
//                 background: '#e6f7ff',
//                 borderRadius: 4,
//                 borderLeft: `3px solid ${PRIMARY_BLUE}`
//               }}>
//                 {deferral.creatorComments}
//               </div>
//             </Card>
//           )}

//           {/* Actions for RM */}
//           <Card size="small">
//             <Title level={5} style={{ color: PRIMARY_BLUE, marginBottom: 8 }}>
//               Available Actions
//             </Title>
//             <div style={{ display: 'flex', gap: 8 }}>
//               {deferral.canEdit && (
//                 <Button type="primary" icon={<EditOutlined />}>
//                   Edit Request
//                 </Button>
//               )}
//               {deferral.canWithdraw && (
//                 <Button danger icon={<DeleteOutlined />}>
//                   Withdraw Request
//                 </Button>
//               )}
//               {deferral.canUpload && (
//                 <Button type="primary" style={{ backgroundColor: SUCCESS_GREEN }}>
//                   Upload Document
//                 </Button>
//               )}
//             </div>
//           </Card>
//         </div>
//       )}
//     </Modal>
//   );
// };

// // Main DeferralPending Component for RM
// const DeferralPending = ({ userId = "rm_current" }) => {
//   const [selectedDeferral, setSelectedDeferral] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mockData, setMockData] = useState([]);
  
//   // Filters
//   const [searchText, setSearchText] = useState("");

//   // Load data
//   useEffect(() => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setMockData(MOCK_RM_PENDING_DEFERRALS);
//       setLoading(false);
//     }, 300);
//   }, []);

//   // Filter data - RM sees their own deferrals (both requested and approved)
//   const filteredData = useMemo(() => {
//     let filtered = mockData.filter((d) => 
//       d.status === "deferral_requested" || d.status === "deferral_approved"
//     );
    
//     // Apply search filter
//     if (searchText) {
//       filtered = filtered.filter(d =>
//         d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
//         d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
    
//     return filtered;
//   }, [mockData, searchText]);

//   // Handle withdraw deferral
//   const handleWithdraw = (deferralId) => {
//     Modal.confirm({
//       title: 'Withdraw Deferral Request',
//       content: 'Are you sure you want to withdraw this deferral request?',
//       onOk: () => {
//         setMockData(prev => prev.filter(d => d._id !== deferralId));
//         message.success('Deferral request withdrawn successfully');
//       }
//     });
//   };

//   // Handle edit deferral
//   const handleEdit = (deferral) => {
//     message.info(`Edit deferral ${deferral.deferralNumber}`);
//     // Navigate to edit page or open edit modal
//   };

//   // Handle upload document
//   const handleUpload = (deferral) => {
//     message.info(`Upload document for ${deferral.deferralNumber}`);
//     // Open upload modal or navigate to upload page
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchText("");
//   };

//   // Updated Columns to show deferralTitle (specific document names) instead of documentType
//   const columns = [
//     {
//       title: "Deferral No",
//       dataIndex: "deferralNumber",
//       key: "deferralNumber",
//       width: 140,
//       render: (text) => (
//         <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
//           <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
//           {text}
//         </div>
//       ),
//       sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
//     },
//     {
//       title: "DCL No",
//       dataIndex: "dclNo",
//       key: "dclNo",
//       width: 120,
//       render: (text) => (
//         <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
//           {text}
//         </div>
//       ),
//       sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
//     },
//     {
//       title: "Customer Name",
//       dataIndex: "customerName",
//       key: "customerName",
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
//           <div>
//             <div>{text}</div>
//           </div>
//         </div>
//       ),
//       sorter: (a, b) => a.customerName.localeCompare(b.customerName)
//     },
//     {
//       title: "Document",
//       dataIndex: "deferralTitle",
//       key: "document",
//       width: 150,
//       render: (text) => (
//         <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
//           {text}
//         </div>
//       ),
//       sorter: (a, b) => a.deferralTitle.localeCompare(b.deferralTitle),
//       filters: [
//         { text: 'Bank Statements', value: 'Bank Statements' },
//         { text: 'CR12 Certificate', value: 'CR12 Certificate' },
//         { text: 'Lease Agreement', value: 'Lease Agreement' }
//       ],
//       onFilter: (value, record) => record.deferralTitle === value,
//     },
//     {
//       title: "Type",
//       dataIndex: "deferralType",
//       key: "deferralType",
//       width: 100,
//       render: (type) => (
//         <Tag
//           color={type === "New" ? "blue" : "orange"}
//           style={{
//             fontSize: 11,
//             fontWeight: "bold",
//             borderRadius: 4,
//             minWidth: 70,
//             textAlign: "center"
//           }}
//         >
//           {type}
//         </Tag>
//       ),
//       filters: [
//         { text: 'New', value: 'New' },
//         { text: 'Extension', value: 'Extension' }
//       ],
//       onFilter: (value, record) => record.deferralType === value,
//       sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 120,
//       render: (status) => {
//         const statusConfig = {
//           'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
//           'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
//           'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
//         };
        
//         const config = statusConfig[status] || { color: 'default', text: status };
//         return (
//           <Tag 
//             color={config.color} 
//             icon={config.icon}
//             style={{ 
//               fontSize: 11,
//               fontWeight: "bold",
//               borderRadius: 4,
//               minWidth: 80,
//               textAlign: "center"
//             }}
//           >
//             {config.text}
//           </Tag>
//         );
//       },
//       filters: [
//         { text: 'Pending', value: 'deferral_requested' },
//         { text: 'Approved', value: 'deferral_approved' }
//       ],
//       onFilter: (value, record) => record.status === value,
//       sorter: (a, b) => a.status.localeCompare(b.status)
//     },
//     {
//       title: "Days Sought",
//       dataIndex: "daysSought",
//       key: "daysSought",
//       width: 100,
//       align: "center",
//       render: (days) => (
//         <div style={{
//           fontWeight: "bold",
//           color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
//           fontSize: 14,
//           backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
//           padding: "4px 8px",
//           borderRadius: 4,
//           display: "inline-block"
//         }}>
//           {days} days
//         </div>
//       ),
//       sorter: (a, b) => a.daysSought - b.daysSought
//     },
//     {
//       title: "SLA",
//       dataIndex: "slaExpiry",
//       key: "slaExpiry",
//       width: 100,
//       fixed: "right",
//       render: (date) => {
//         const daysLeft = dayjs(date).diff(dayjs(), 'days');
//         const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
//         let color = SUCCESS_GREEN;
//         let text = `${daysLeft}d`;
        
//         if (daysLeft <= 0 && hoursLeft <= 0) {
//           color = ERROR_RED;
//           text = 'Expired';
//         } else if (daysLeft <= 0) {
//           color = ERROR_RED;
//           text = `${hoursLeft}h`;
//         } else if (daysLeft <= 1) {
//           color = ERROR_RED;
//           text = `${daysLeft}d`;
//         } else if (daysLeft <= 3) {
//           color = WARNING_ORANGE;
//           text = `${daysLeft}d`;
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
//       },
//       sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
//     }
//   ];

//   // Custom table styles
//   const customTableStyles = `
//     .deferral-pending-table .ant-table-wrapper {
//       border-radius: 12px;
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
//       border: 1px solid #e0e0e0;
//     }
//     .deferral-pending-table .ant-table-thead > tr > th {
//       background-color: #f7f7f7 !important;
//       color: ${PRIMARY_BLUE} !important;
//       font-weight: 700;
//       fontSize: 13px;
//       padding: 14px 12px !important;
//       border-bottom: 3px solid ${ACCENT_LIME} !important;
//       border-right: none !important;
//     }
//     .deferral-pending-table .ant-table-tbody > tr > td {
//       border-bottom: 1px solid #f0f0f0 !important;
//       border-right: none !important;
//       padding: 12px 12px !important;
//       fontSize: 13px;
//       color: #333;
//     }
//     .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
//       background-color: rgba(181, 211, 52, 0.1) !important;
//       cursor: pointer;
//     }
//     .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
//       background-color: rgba(181, 211, 52, 0.1) !important;
//     }
//     .deferral-pending-table .ant-pagination .ant-pagination-item-active {
//       background-color: ${ACCENT_LIME} !important;
//       borderColor: ${ACCENT_LIME} !important;
//     }
//     .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
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
//               My Deferral Requests
//               <Badge
//                 count={filteredData.length}
//                 style={{
//                   backgroundColor: ACCENT_LIME,
//                   fontSize: 12
//                 }}
//               />
//             </h2>
//             <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
//               Track and manage your deferral requests
//             </p>
//           </Col>
//           <Col>
//             <Button
//               type="primary"
//               onClick={() => {
//                 // Navigate to request new deferral
//                 window.location.href = '/rm/deferrals/request';
//               }}
//               style={{
//                 backgroundColor: PRIMARY_BLUE,
//                 borderColor: PRIMARY_BLUE
//               }}
//             >
//               + New Deferral Request
//             </Button>
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
//               placeholder="Search by Deferral No, DCL No, Customer, or Document"
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
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Table Title */}
//       <Divider style={{ margin: "12px 0" }}>
//         <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
//           My Deferral Requests ({filteredData.length} items)
//         </span>
//       </Divider>

//       {/* Table */}
//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
//           <Spin tip="Loading deferral requests..." />
//         </div>
//       ) : filteredData.length === 0 ? (
//         <Empty
//           description={
//             <div>
//               <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
//               <p style={{ color: "#999" }}>
//                 {searchText
//                   ? 'Try changing your search term'
//                   : 'You haven\'t requested any deferrals yet'}
//               </p>
//               <Button
//                 type="primary"
//                 onClick={() => window.location.href = '/rm/deferrals/request'}
//                 style={{ marginTop: 16 }}
//               >
//                 Request Your First Deferral
//               </Button>
//             </div>
//           }
//           style={{ padding: 40 }}
//         />
//       ) : (
//         <div className="deferral-pending-table">
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
//               showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
//             }}
//             scroll={{ x: 1000 }}
//             onRow={(record) => ({
//               onClick: () => {
//                 setSelectedDeferral(record);
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

//       {/* Deferral Details Modal */}
//       {selectedDeferral && (
//         <DeferralDetailsModal
//           deferral={selectedDeferral}
//           open={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//             setSelectedDeferral(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default DeferralPending;








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
  Typography,
  Modal,
  message,
  Timeline,
  Descriptions,
  Space,
  Upload,
  Form,
  Input as AntdInput
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  EyeOutlined,
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
  FileImageOutlined
} from "@ant-design/icons";
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

const { Text, Title } = Typography;
const { TextArea } = AntdInput;

// MOCK DATA for RM's Pending Deferrals
const MOCK_RM_PENDING_DEFERRALS = [
  {
    _id: "1",
    deferralNumber: "DEF-2024-001",
    dclNo: "DCL-2024-015",
    customerNumber: "CUST001",
    customerName: "Javan Dave",
    businessName: "JAVAN DAVE AND SONS",
    deferralTitle: "Bank Statements",
    documentType: "Financial Statements",
    deferralType: "New",
    status: "deferral_requested", // RM requested, waiting for creator approval
    daysSought: 30,
    requestedExpiry: "2025-02-05T23:59:59Z",
    originalDueDate: "2025-01-05T23:59:59Z",
    currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
    rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024. The statements are expected to be available by end of month after the quarterly audit completion.",
    createdAt: "2025-01-05T09:30:00Z",
    updatedAt: "2025-01-05T09:30:00Z",
    slaExpiry: "2025-01-12T23:59:59Z",
    canEdit: true, // RM can edit if still pending
    canWithdraw: true, // RM can withdraw if still pending
    attachments: [
      { id: "att1", name: "customer_email.pdf", size: "2.4 MB", type: "pdf", uploadDate: "2025-01-05T09:45:00Z" }
    ],
    history: [
      { action: "Requested", user: "Javan Dave (RM)", date: "2025-01-05T09:30:00Z", notes: "Deferral request submitted" },
      { action: "Assigned", user: "System", date: "2025-01-05T09:35:00Z", notes: "Assigned to Diana Jebet" }
    ]
  },
  {
    _id: "2",
    deferralNumber: "DEF-2024-002",
    dclNo: "DCL-2024-028",
    customerNumber: "CUST002",
    customerName: "Diana Mwangi",
    businessName: "DIANA MWANGI AND DAUGHTERS",
    deferralTitle: "CR12 Certificate",
    documentType: "Registration Documents",
    deferralType: "Extension",
    status: "deferral_requested",
    daysSought: 15,
    requestedExpiry: "2025-02-05T23:59:59Z",
    originalDueDate: "2025-01-20T23:59:59Z",
    currentApprover: { _id: "creator4", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
    rmReason: "CRB office experiencing delays in processing due to system upgrades. The office has indicated a 2-week delay in certificate issuance.",
    createdAt: "2025-01-11T14:20:00Z",
    updatedAt: "2025-01-11T14:20:00Z",
    slaExpiry: "2025-01-18T23:59:59Z",
    canEdit: true,
    canWithdraw: true,
    attachments: [
      { id: "att1", name: "crb_acknowledgement.pdf", size: "1.8 MB", type: "pdf", uploadDate: "2025-01-11T14:25:00Z" },
      { id: "att2", name: "application_form.jpg", size: "850 KB", type: "image", uploadDate: "2025-01-11T14:30:00Z" }
    ],
    history: [
      { action: "Requested", user: "Diana Mwangi (RM)", date: "2025-01-11T14:20:00Z", notes: "Deferral request submitted" },
      { action: "Assigned", user: "System", date: "2025-01-11T14:22:00Z", notes: "Assigned to Raphael Eric" }
    ]
  },
  {
    _id: "3",
    deferralNumber: "DEF-2024-003",
    dclNo: "DCL-2024-042",
    customerNumber: "CUST003",
    customerName: "Lucy Nyambura",
    businessName: "LUCY NYAMBURA AND SONS",
    deferralTitle: "Lease Agreement",
    documentType: "Legal Documents",
    deferralType: "New",
    status: "deferral_approved", // Already approved by creator
    daysSought: 45,
    requestedExpiry: "2025-03-05T23:59:59Z",
    originalDueDate: "2025-01-20T23:59:59Z",
    currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
    rmReason: "Landlord traveling overseas, agreement pending signature upon return. The landlord will be back on February 15th.",
    creatorComments: "Approved. Please ensure document is submitted before expiry date. Note that further extensions may not be granted.",
    createdAt: "2025-01-20T11:15:00Z",
    updatedAt: "2025-01-21T10:30:00Z",
    approvedDate: "2025-01-21T10:30:00Z",
    canEdit: false, // Cannot edit after approval
    canWithdraw: false, // Cannot withdraw after approval
    canUpload: true, // Can upload document now
    attachments: [
      { id: "att1", name: "landlord_email.pdf", size: "1.2 MB", type: "pdf", uploadDate: "2025-01-20T11:30:00Z" },
      { id: "att2", name: "travel_itinerary.docx", size: "550 KB", type: "word", uploadDate: "2025-01-20T11:45:00Z" }
    ],
    history: [
      { action: "Requested", user: "Lucy Nyambura (RM)", date: "2025-01-20T11:15:00Z", notes: "Deferral request submitted" },
      { action: "Assigned", user: "System", date: "2025-01-20T11:18:00Z", notes: "Assigned to Titus Munene" },
      { action: "Approved", user: "Titus Munene (Creator)", date: "2025-01-21T10:30:00Z", notes: "Deferral approved with comments" }
    ]
  }
];

// Enhanced Deferral Details Modal for RM
const DeferralDetailsModal = ({ deferral, open, onClose, onAction }) => {
  const [editMode, setEditMode] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [form] = Form.useForm();
  
  const getStatusConfig = (status) => {
    switch (status) {
      case 'deferral_requested':
        return { 
          color: 'orange', 
          icon: <ClockCircleOutlined />, 
          label: 'Pending Review', 
          description: 'Awaiting Creator approval',
          badgeColor: WARNING_ORANGE
        };
      case 'deferral_approved':
        return { 
          color: 'green', 
          icon: <CheckCircleOutlined />, 
          label: 'Approved', 
          description: 'Deferral approved by Creator',
          badgeColor: SUCCESS_GREEN
        };
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

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FilePdfOutlined style={{ color: ERROR_RED }} />;
      case 'word': return <FileWordOutlined style={{ color: PRIMARY_BLUE }} />;
      case 'excel': return <FileExcelOutlined style={{ color: SUCCESS_GREEN }} />;
      case 'image': return <FileImageOutlined style={{ color: SECONDARY_PURPLE }} />;
      default: return <FileTextOutlined />;
    }
  };

  const statusConfig = getStatusConfig(deferral?.status);

  const handleSaveEdit = () => {
    form.validateFields().then(values => {
      message.success('Deferral request updated successfully');
      setEditMode(false);
      if (onAction) onAction('edit', deferral._id, values);
    });
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
      setUploadVisible(false);
      if (onAction) onAction('upload', deferral._id, info.file);
    }
  };

  const handleWithdraw = () => {
    Modal.confirm({
      title: 'Withdraw Deferral Request',
      content: 'Are you sure you want to withdraw this deferral request? This action cannot be undone.',
      okText: 'Yes, Withdraw',
      okType: 'danger',
      onOk: () => {
        message.success('Deferral request withdrawn successfully');
        if (onAction) onAction('withdraw', deferral._id);
        onClose();
      }
    });
  };

  if (!deferral) return null;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <FileTextOutlined style={{ color: PRIMARY_BLUE, fontSize: 20 }} />
          <span style={{ color: PRIMARY_BLUE, fontSize: 18, fontWeight: 600 }}>
            Deferral Request: {deferral.deferralNumber}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto', padding: '0 1px' }}>
        {/* Header Status Card */}
        <Card
          style={{
            margin: 0,
            borderRadius: 0,
            borderLeft: `6px solid ${statusConfig.badgeColor}`,
            backgroundColor: `${statusConfig.badgeColor}10`
          }}
          bodyStyle={{ padding: 16 }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Tag 
                  color={statusConfig.color} 
                  icon={statusConfig.icon}
                  style={{ 
                    fontSize: 14, 
                    padding: '6px 12px',
                    fontWeight: 600
                  }}
                >
                  {statusConfig.label}
                </Tag>
                <div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    {statusConfig.description}
                  </div>
                  {deferral.currentApprover && (
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      Current Approver: <strong>{deferral.currentApprover.name}</strong>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#666' }}>DCL No</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: PRIMARY_BLUE }}>
                  {deferral.dclNo}
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Main Content */}
        <div style={{ padding: 24 }}>
          {/* Document Details Section */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: PRIMARY_BLUE }} />
                <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Document Details</span>
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <Descriptions column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label="Deferral Number">
                <Text strong style={{ color: PRIMARY_BLUE }}>{deferral.deferralNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Document">
                <div>
                  <div style={{ fontWeight: 500 }}>{deferral.deferralTitle}</div>
                  <Tag color="blue" style={{ marginTop: 4, fontSize: 11 }}>{deferral.documentType}</Tag>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Customer">
                <div>
                  <div style={{ fontWeight: 500 }}>{deferral.customerName}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{deferral.businessName}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>ID: {deferral.customerNumber}</div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Deferral Type">
                <Tag 
                  color={deferral.deferralType === "New" ? "blue" : "orange"}
                  style={{ fontWeight: 600 }}
                >
                  {deferral.deferralType}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Timeline Section */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined style={{ color: PRIMARY_BLUE }} />
                <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Timeline</span>
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Original Due Date</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: PRIMARY_BLUE }}>
                    {dayjs(deferral.originalDueDate).format('DD MMM YYYY')}
                  </div>
                  <div style={{ fontSize: 11, color: '#999' }}>
                    {dayjs(deferral.originalDueDate).fromNow()}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff7e6', borderColor: WARNING_ORANGE }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Requested Extension</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: WARNING_ORANGE }}>
                    {dayjs(deferral.requestedExpiry).format('DD MMM YYYY')}
                  </div>
                  <div style={{ fontSize: 11, color: WARNING_ORANGE }}>
                    {deferral.daysSought} days extension
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f6ffed', borderColor: SUCCESS_GREEN }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Request Date</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: SUCCESS_GREEN }}>
                    {dayjs(deferral.createdAt).format('DD MMM YYYY')}
                  </div>
                  <div style={{ fontSize: 11, color: '#999' }}>
                    {dayjs(deferral.createdAt).format('HH:mm')}
                  </div>
                </Card>
              </Col>
            </Row>

            {deferral.approvedDate && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CheckCircleOutlined style={{ color: SUCCESS_GREEN }} />
                  <Text strong style={{ color: SUCCESS_GREEN }}>Approved Date</Text>
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: '#f6ffed', borderRadius: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>
                    {dayjs(deferral.approvedDate).format('DD MMM YYYY HH:mm')}
                  </div>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    Approved by {deferral.currentApprover?.name}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Reason Section */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserOutlined style={{ color: PRIMARY_BLUE }} />
                <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Request Reason</span>
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            {editMode ? (
              <Form form={form} initialValues={{ rmReason: deferral.rmReason }}>
                <Form.Item name="rmReason" rules={[{ required: true, message: 'Please enter a reason' }]}>
                  <TextArea rows={4} placeholder="Enter detailed reason for deferral request..." />
                </Form.Item>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button type="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </div>
              </Form>
            ) : (
              <div style={{
                padding: 16,
                background: '#f8f9fa',
                borderRadius: 6,
                borderLeft: `4px solid ${SECONDARY_PURPLE}`,
                fontSize: 14,
                lineHeight: 1.6
              }}>
                {deferral.rmReason}
              </div>
            )}
          </Card>

          {/* Creator Comments (if any) */}
          {deferral.creatorComments && (
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <InfoCircleOutlined style={{ color: PRIMARY_BLUE }} />
                  <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Creator Comments</span>
                </div>
              }
              size="small"
              style={{ marginBottom: 16, borderColor: PRIMARY_BLUE }}
            >
              <div style={{
                padding: 16,
                background: '#e6f7ff',
                borderRadius: 6,
                borderLeft: `4px solid ${PRIMARY_BLUE}`,
                fontSize: 14,
                lineHeight: 1.6
              }}>
                {deferral.creatorComments}
              </div>
            </Card>
          )}

          {/* Attachments Section */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileTextOutlined style={{ color: PRIMARY_BLUE }} />
                <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Attachments</span>
                <span style={{ fontSize: 12, color: '#666', fontWeight: 'normal' }}>
                  ({deferral.attachments?.length || 0} files)
                </span>
              </div>
            }
            size="small"
            style={{ marginBottom: 16 }}
          >
            {deferral.attachments && deferral.attachments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {deferral.attachments.map(att => (
                  <div key={att.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 4,
                    border: '1px solid #e8e8e8'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {getFileIcon(att.type)}
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{att.name}</div>
                        <div style={{ fontSize: 11, color: '#666' }}>
                          {att.size} • {dayjs(att.uploadDate).format('DD MMM YYYY')}
                        </div>
                      </div>
                    </div>
                    <Button 
                      type="text" 
                      icon={<DownloadOutlined />}
                      size="small"
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 16, color: '#999' }}>
                No attachments uploaded
              </div>
            )}
          </Card>

          {/* Actions Section */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <EditOutlined style={{ color: PRIMARY_BLUE }} />
                <span style={{ color: PRIMARY_BLUE, fontSize: 16 }}>Actions</span>
              </div>
            }
            size="small"
          >
            <Space wrap>
              {deferral.canEdit && !editMode && (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                >
                  Edit Request
                </Button>
              )}
              {deferral.canWithdraw && (
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={handleWithdraw}
                >
                  Withdraw Request
                </Button>
              )}
              {deferral.canUpload && (
                <>
                  <Button 
                    type="primary" 
                    style={{ backgroundColor: SUCCESS_GREEN, borderColor: SUCCESS_GREEN }}
                    icon={<UploadOutlined />}
                    onClick={() => setUploadVisible(true)}
                  >
                    Upload Document
                  </Button>
                  <Modal
                    title="Upload Document"
                    open={uploadVisible}
                    onCancel={() => setUploadVisible(false)}
                    footer={null}
                  >
                    <div style={{ padding: 16 }}>
                      <Upload.Dragger
                        name="file"
                        multiple={true}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={handleUpload}
                      >
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">
                          Upload the completed document for {deferral.deferralTitle}
                        </p>
                      </Upload.Dragger>
                      <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </div>
                    </div>
                  </Modal>
                </>
              )}
              <Button onClick={onClose}>
                Close
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

// Main DeferralPending Component for RM
const DeferralPending = ({ userId = "rm_current" }) => {
  const [selectedDeferral, setSelectedDeferral] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mockData, setMockData] = useState([]);
  
  // Filters
  const [searchText, setSearchText] = useState("");

  // Load data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setMockData(MOCK_RM_PENDING_DEFERRALS);
      setLoading(false);
    }, 300);
  }, []);

  // Filter data - RM sees their own deferrals (both requested and approved)
  const filteredData = useMemo(() => {
    let filtered = mockData.filter((d) => 
      d.status === "deferral_requested" || d.status === "deferral_approved"
    );
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(d =>
        d.deferralNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        d.dclNo.toLowerCase().includes(searchText.toLowerCase()) ||
        d.customerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        d.deferralTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  }, [mockData, searchText]);

  // Handle actions from modal
  const handleModalAction = (action, deferralId, data) => {
    switch (action) {
      case 'edit':
        setMockData(prev => prev.map(d => 
          d._id === deferralId ? { ...d, ...data } : d
        ));
        break;
      case 'withdraw':
        setMockData(prev => prev.filter(d => d._id !== deferralId));
        break;
      case 'upload':
        // Handle upload action
        break;
      default:
        break;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
  };

  // Updated Columns to show deferralTitle (specific document names) instead of documentType
  const columns = [
    {
      title: "Deferral No",
      dataIndex: "deferralNumber",
      key: "deferralNumber",
      width: 140,
      render: (text) => (
        <div style={{ fontWeight: "bold", color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
          {text}
        </div>
      ),
      sorter: (a, b) => a.deferralNumber.localeCompare(b.deferralNumber)
    },
    {
      title: "DCL No",
      dataIndex: "dclNo",
      key: "dclNo",
      width: 120,
      render: (text) => (
        <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
          {text}
        </div>
      ),
      sorter: (a, b) => a.dclNo.localeCompare(b.dclNo)
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 160,
      render: (text, record) => (
        <div style={{
          fontWeight: 600,
          color: PRIMARY_BLUE,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <CustomerServiceOutlined style={{ fontSize: 12 }} />
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 11, color: "#666" }}>{record.customerNumber}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.customerName.localeCompare(b.customerName)
    },
    {
      title: "Document",
      dataIndex: "deferralTitle",
      key: "document",
      width: 150,
      render: (text) => (
        <div style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
          {text}
        </div>
      ),
      sorter: (a, b) => a.deferralTitle.localeCompare(b.deferralTitle),
      filters: [
        { text: 'Bank Statements', value: 'Bank Statements' },
        { text: 'CR12 Certificate', value: 'CR12 Certificate' },
        { text: 'Lease Agreement', value: 'Lease Agreement' }
      ],
      onFilter: (value, record) => record.deferralTitle === value,
    },
    {
      title: "Type",
      dataIndex: "deferralType",
      key: "deferralType",
      width: 100,
      render: (type) => (
        <Tag
          color={type === "New" ? "blue" : "orange"}
          style={{
            fontSize: 11,
            fontWeight: "bold",
            borderRadius: 4,
            minWidth: 70,
            textAlign: "center"
          }}
        >
          {type}
        </Tag>
      ),
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Extension', value: 'Extension' }
      ],
      onFilter: (value, record) => record.deferralType === value,
      sorter: (a, b) => a.deferralType.localeCompare(b.deferralType)
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const statusConfig = {
          'deferral_requested': { color: 'orange', text: 'Pending', icon: <ClockCircleOutlined /> },
          'deferral_approved': { color: 'green', text: 'Approved', icon: <CheckCircleOutlined /> },
          'deferral_rejected': { color: 'red', text: 'Rejected', icon: <CloseCircleOutlined /> }
        };
        
        const config = statusConfig[status] || { color: 'default', text: status };
        return (
          <Tag 
            color={config.color} 
            icon={config.icon}
            style={{ 
              fontSize: 11,
              fontWeight: "bold",
              borderRadius: 4,
              minWidth: 80,
              textAlign: "center"
            }}
          >
            {config.text}
          </Tag>
        );
      },
      filters: [
        { text: 'Pending', value: 'deferral_requested' },
        { text: 'Approved', value: 'deferral_approved' }
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: "Days Sought",
      dataIndex: "daysSought",
      key: "daysSought",
      width: 100,
      align: "center",
      render: (days) => (
        <div style={{
          fontWeight: "bold",
          color: days > 45 ? ERROR_RED : days > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
          fontSize: 14,
          backgroundColor: days > 45 ? "#fff2f0" : days > 30 ? "#fff7e6" : "#f0f7ff",
          padding: "4px 8px",
          borderRadius: 4,
          display: "inline-block"
        }}>
          {days} days
        </div>
      ),
      sorter: (a, b) => a.daysSought - b.daysSought
    },
    {
      title: "SLA",
      dataIndex: "slaExpiry",
      key: "slaExpiry",
      width: 100,
      fixed: "right",
      render: (date) => {
        const daysLeft = dayjs(date).diff(dayjs(), 'days');
        const hoursLeft = dayjs(date).diff(dayjs(), 'hours');
        
        let color = SUCCESS_GREEN;
        let text = `${daysLeft}d`;
        
        if (daysLeft <= 0 && hoursLeft <= 0) {
          color = ERROR_RED;
          text = 'Expired';
        } else if (daysLeft <= 0) {
          color = ERROR_RED;
          text = `${hoursLeft}h`;
        } else if (daysLeft <= 1) {
          color = ERROR_RED;
          text = `${daysLeft}d`;
        } else if (daysLeft <= 3) {
          color = WARNING_ORANGE;
          text = `${daysLeft}d`;
        }
        
        return (
          <Tag
            color={color}
            style={{ 
              fontWeight: "bold", 
              fontSize: 11,
              minWidth: 50,
              textAlign: "center"
            }}
          >
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => dayjs(a.slaExpiry).diff(dayjs(b.slaExpiry))
    }
  ];

  // Custom table styles
  const customTableStyles = `
    .deferral-pending-table .ant-table-wrapper {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08);
      border: 1px solid #e0e0e0;
    }
    .deferral-pending-table .ant-table-thead > tr > th {
      background-color: #f7f7f7 !important;
      color: ${PRIMARY_BLUE} !important;
      font-weight: 700;
      fontSize: 13px;
      padding: 14px 12px !important;
      border-bottom: 3px solid ${ACCENT_LIME} !important;
      border-right: none !important;
    }
    .deferral-pending-table .ant-table-tbody > tr > td {
      border-bottom: 1px solid #f0f0f0 !important;
      border-right: none !important;
      padding: 12px 12px !important;
      fontSize: 13px;
      color: #333;
    }
    .deferral-pending-table .ant-table-tbody > tr.ant-table-row:hover > td {
      background-color: rgba(181, 211, 52, 0.1) !important;
      cursor: pointer;
    }
    .deferral-pending-table .ant-table-row:hover .ant-table-cell:last-child {
      background-color: rgba(181, 211, 52, 0.1) !important;
    }
    .deferral-pending-table .ant-pagination .ant-pagination-item-active {
      background-color: ${ACCENT_LIME} !important;
      borderColor: ${ACCENT_LIME} !important;
    }
    .deferral-pending-table .ant-pagination .ant-pagination-item-active a {
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
          borderLeft: `4px solid ${ACCENT_LIME}`
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h2 style={{ margin: 0, color: PRIMARY_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
              My Deferral Requests
              <Badge
                count={filteredData.length}
                style={{
                  backgroundColor: ACCENT_LIME,
                  fontSize: 12
                }}
              />
            </h2>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
              Track and manage your deferral requests
            </p>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                // Navigate to request new deferral
                window.location.href = '/rm/deferrals/request';
              }}
              style={{
                backgroundColor: PRIMARY_BLUE,
                borderColor: PRIMARY_BLUE
              }}
            >
              + New Deferral Request
            </Button>
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
              placeholder="Search by Deferral No, DCL No, Customer, or Document"
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
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table Title */}
      <Divider style={{ margin: "12px 0" }}>
        <span style={{ color: PRIMARY_BLUE, fontSize: 16, fontWeight: 600 }}>
          My Deferral Requests ({filteredData.length} items)
        </span>
      </Divider>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Spin tip="Loading deferral requests..." />
        </div>
      ) : filteredData.length === 0 ? (
        <Empty
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No deferral requests found</p>
              <p style={{ color: "#999" }}>
                {searchText
                  ? 'Try changing your search term'
                  : 'You haven\'t requested any deferrals yet'}
              </p>
              <Button
                type="primary"
                onClick={() => window.location.href = '/rm/deferrals/request'}
                style={{ marginTop: 16 }}
              >
                Request Your First Deferral
              </Button>
            </div>
          }
          style={{ padding: 40 }}
        />
      ) : (
        <div className="deferral-pending-table">
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} deferrals`
            }}
            scroll={{ x: 1000 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedDeferral(record);
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

      {/* Enhanced Deferral Details Modal */}
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

export default DeferralPending;