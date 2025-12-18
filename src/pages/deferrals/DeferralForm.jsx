// import React, { useState, useMemo } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   Input,
//   Select,
//   DatePicker,
//   Table,
//   Tag,
//   Upload,
//   Divider,
//   Typography,
//   Spin,
//   Modal,
//   Steps,
//   Badge,
//   Alert,
//   Space,
//   message,
//   Form,
//   InputNumber
// } from "antd";
// import {
//   SearchOutlined,
//   UserOutlined,
//   FileTextOutlined,
//   UploadOutlined,
//   PlusOutlined,
//   DeleteOutlined,
//   CalendarOutlined,
//   BankOutlined,
//   FolderOutlined,
//   FileOutlined,
//   EditOutlined,
//   CheckCircleOutlined,
//   CloseOutlined
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

// // Theme colors from MyQueue
// const PRIMARY_PURPLE = "#2B1C67";
// const ACCENT_LIME = "#b5d334";
// const HIGHLIGHT_GOLD = "#fcb116";
// const LIGHT_YELLOW = "#fcd716";
// const SECONDARY_BLUE = "#164679";
// const SUCCESS_GREEN = "#52c41a";
// const ERROR_RED = "#ff4d4f";
// const WARNING_ORANGE = "#faad14";
// const INFO_BLUE = "#1890ff";

// const { Text, Title } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// // Custom CustomerSearchModal with new styling
// function CustomerSearchModal({ isOpen, onClose, onSubmit, isFetching }) {
//   const [customerNumber, setCustomerNumber] = useState("");
//   const [loanType, setLoanType] = useState("");

//   if (!isOpen) return null;

//   return (
//     <Modal
//       title={
//         <div style={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
//           <SearchOutlined style={{ marginRight: 8 }} />
//           Fetch Customer
//         </div>
//       }
//       open={isOpen}
//       onCancel={onClose}
//       footer={null}
//       width={400}
//       centered
//     >
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit(customerNumber, loanType);
//         }}
//       >
//         <div style={{ marginBottom: 16 }}>
//           <Text strong>Customer Number</Text>
//           <Input
//             type="text"
//             size="large"
//             value={customerNumber}
//             onChange={(e) => setCustomerNumber(e.target.value.replace(/\D/g, ""))}
//             required
//             prefix={<UserOutlined />}
//           />
//         </div>

//         <div style={{ marginBottom: 24 }}>
//           <Text strong>Loan Type</Text>
//           <Select
//             size="large"
//             style={{ width: "100%" }}
//             value={loanType}
//             onChange={setLoanType}
//             placeholder="Select loan type"
//             required
//           >
//             <Option value="asset finance">Asset Finance</Option>
//             <Option value="business loan">Business Loan</Option>
//             <Option value="consumer">Consumer</Option>
//             <Option value="mortgage">Mortgage</Option>
//             <Option value="construction">Construction Loan</Option>
//           </Select>
//         </div>

//         <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={isFetching}
//             style={{ 
//               backgroundColor: PRIMARY_PURPLE,
//               borderColor: PRIMARY_PURPLE
//             }}
//           >
//             {isFetching ? "Fetching..." : "Fetch Customer"}
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// // Document Picker Component with exact details from provided code
// function DocumentPicker({ selectedDocuments, setSelectedDocuments }) {
//   const [search, setSearch] = useState("");

//   const allDocuments = [
//     // Primary Documents
//     { name: "Offer Letter (new facilities)", type: "Primary", category: "Non-Allowable" },
//     { name: "Letter of Variation of facilities", type: "Primary", category: "Non-Allowable" },
//     { name: "Board Resolutions by borrowers and guarantors", type: "Primary", category: "Non-Allowable" },
//     { name: "Loan Agreements (Master Asset Finance agreement, Hire Purchase Agreement, Securities Agreement, Agency Agreement etc.)", type: "Primary", category: "Non-Allowable" },
//     { name: "Inter-lenders Agreements", type: "Primary", category: "Non-Allowable" },
//     { name: "Debentures plus supporting documentation", type: "Primary", category: "Non-Allowable" },
//     { name: "Letters of Exclusion from debentures or receivables", type: "Primary", category: "Non-Allowable" },
//     { name: "Legal Charges plus supporting documentation", type: "Primary", category: "Non-Allowable" },
//     { name: "Further charges (up stamping) on existing legal charges & debentures*", type: "Primary", category: "Allowable" },
//     { name: "Letter of Lien (any type)/letter of set off/memorandum of general pledge", type: "Primary", category: "Non-Allowable" },
//     { name: "Cash Cover", type: "Primary", category: "Allowable" },
//     { name: "Joint Registrations of assets", type: "Primary", category: "Non-Allowable" },
//     { name: "Execution of Documents by Motor Vehicle Dealers", type: "Primary", category: "Non-Allowable" },
//     { name: "Final Invoices for settlement", type: "Primary", category: "Non-Allowable" },
//     { name: "Shares and bonds", type: "Primary", category: "Non-Allowable" },
//     { name: "Insurance for assets financed", type: "Primary", category: "Non-Allowable" },
//     { name: "Evidence of payment of full deposit amounts (borrowers contribution) before drawdown", type: "Primary", category: "Non-Allowable" },
//     { name: "Tracking certificates", type: "Primary", category: "Non-Allowable" },
//     { name: "Memorandum and Articles of Association, or amendments of the same where the facility has already been approved for a new to Bank client", type: "Primary", category: "Non-Allowable" },
//     { name: "Affidavit of Title", type: "Primary", category: "Non-Allowable" },
//     { name: "Sale agreement", type: "Primary", category: "Non-Allowable" },
//     { name: "Offer Letter (Straight annual reviews) - to pursued as limit extensions and not deferrals", type: "Primary", category: "Non-Allowable" },
//     { name: "Any New Guarantees (director, company, property owners' guarantee etc.) and Indemnities", type: "Primary", category: "Non-Allowable" },
//     { name: "Deeds of Assignment of Incomes and Receivables", type: "Primary", category: "Non-Allowable" },
//     { name: "Deeds of Indemnity", type: "Primary", category: "Non-Allowable" },
//     { name: "Deeds of Subordination", type: "Primary", category: "Allowable" },
//     { name: "Statements of Assets and Liabilities including certificate of compliance to the LOF", type: "Primary", category: "Allowable" },
//     { name: "Valuations / Re-valuations for purpose of up-stamping of securities", type: "Primary", category: "Non-Allowable" },
//     { name: "Re-valuation (normal revaluation after 4 years)", type: "Primary", category: "Allowable" },
//     { name: "Company searches", type: "Primary", category: "Non-Allowable" },
//     { name: "Collection of Bank Charges", type: "Primary", category: "Allowable" },
//     { name: "Import entry and corresponding duty payment receipts for vehicles financed", type: "Primary", category: "Non-Allowable" },
//     { name: "Receipt of original logbooks in the name of the seller", type: "Primary", category: "Allowable" },
//     { name: "Current Vehicle Inspection Reports", type: "Primary", category: "Allowable" },
//     { name: "Machine/Equipment Warranties", type: "Primary", category: "Allowable" },
//     { name: "Change of payee(s) or details of payee(s)", type: "Primary", category: "Non-Allowable" },
//     { name: "For All Construction Related Credit Facilities Prior to Disbursement: architects certificates, Quantity Surveyor's Report, Bills of Quantities, certificate of occupation/completion Approved drawings, Contractor's All Risk Insurance Cover, Professional Certificates, Letters of Undertaking, National Environment Management Authority (NEMA), Energy and Petroleum Regulatory Authority (EPRA) and Road Authorities (KENHA, KURA,KERRA). National Construction Authority Approval, Contractor's profile, National Construction Authority certificate and Professional Certificates", type: "Primary", category: "Allowable" },
//     { name: "Where applicable, Compliance with provisions of the bank's and the United Nations Environmental and Social Management System (ESMS) and IFC Performance Standards", type: "Primary", category: "Allowable" },
//     { name: "Original share certificates (for shares & Bonds held as collateral)Share certificates for sectional units and blank transfer forms.", type: "Primary", category: "Allowable" },
//     { name: "Land searches", type: "Primary", category: "Allowable" },
//     { name: "Amendments on logbooks (subject to the customer having executed required documentation)", type: "Primary", category: "Allowable" },
//     { name: "Commercial Benefit Agreements", type: "Primary", category: "Allowable" },

//     // Secondary Documents
//     { name: "Annual Returns", type: "Secondary", category: "Non-Allowable" },
//     { name: "Tax Compliance Certificates", type: "Secondary", category: "Allowable" },
//     { name: "Land Rents & Rates receipts", type: "Secondary", category: "Allowable" },
//     { name: "Customer Identification Documents e.g. ID, Passport, KRA PINS", type: "Secondary", category: "Allowable" },
//     { name: "Receipt of Final/Original Invoices from off takers, motor vehicle dealers/sellers etc.", type: "Secondary", category: "Allowable" },
//     { name: "Employer salary remittance letters and their originals", type: "Secondary", category: "Allowable" },
//     { name: "Employer check off letters and their originals", type: "Secondary", category: "Allowable" },
//     { name: "Authority to sell letters from the bank's approved dealers.", type: "Secondary", category: "Allowable" },
//     { name: "Provision of sellers bank details", type: "Secondary", category: "Allowable" },
//     { name: "Landlords Letter", type: "Secondary", category: "Allowable" },
//     { name: "Direct Debit or Standing Order forms/instructions", type: "Secondary", category: "Allowable" },
//     { name: "Delivery Notes for equipment/machinery/goods", type: "Secondary", category: "Allowable" },
//     { name: "Share of Wallet letter", type: "Secondary", category: "Allowable" },
//     { name: "Current CR12", type: "Secondary", category: "Non-Allowable" },
//     { name: "Opening of Mpesa Till number/linking to account/Till Transfer linked to account in another bank", type: "Secondary", category: "Non-Allowable" },
//     { name: "Occupational safety and health audit reports", type: "Secondary", category: "Non-Allowable" },
//   ];

//   const handleSelect = (doc) => {
//     if (!selectedDocuments.some(selected => selected.name === doc.name)) {
//       setSelectedDocuments([...selectedDocuments, doc]);
//     }
//     setSearch("");
//   };

//   const removeDocument = (index) => {
//     const temp = [...selectedDocuments];
//     temp.splice(index, 1);
//     setSelectedDocuments(temp);
//   };

//   const updateDocumentName = (index, value) => {
//     const temp = [...selectedDocuments];
//     temp[index].name = value;
//     setSelectedDocuments(temp);
//   };

//   const filteredDocs = allDocuments.filter((doc) =>
//     doc.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const getCategoryColor = (category) => {
//     return category === "Allowable" ? "green" : "red";
//   };

//   const getTypeColor = (type) => {
//     return type === "Primary" ? "blue" : "orange";
//   };

//   return (
//     <Card
//       title={
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <FolderOutlined style={{ color: PRIMARY_PURPLE }} />
//           <span style={{ color: PRIMARY_PURPLE, fontSize: 16 }}>Document Name</span>
//         </div>
//       }
//       size="small"
//       style={{ marginBottom: 16, border: `1px solid ${PRIMARY_PURPLE}20` }}
//     >
//       <div style={{ marginBottom: 16 }}>
//         <Text strong style={{ display: 'block', marginBottom: 8 }}>Search Document</Text>
//         <Input
//           placeholder="Type to search document..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           size="large"
//           suffix={<SearchOutlined />}
//         />
//       </div>

//       {/* Search Results */}
//       {search && filteredDocs.length > 0 && (
//         <Card 
//           size="small" 
//           style={{ 
//             marginBottom: 16, 
//             maxHeight: 300, 
//             overflowY: 'auto',
//             border: `1px solid ${PRIMARY_PURPLE}30`
//           }}
//         >
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//             {filteredDocs.map((doc, i) => (
//               <div
//                 key={i}
//                 onClick={() => handleSelect(doc)}
//                 style={{
//                   padding: '8px 12px',
//                   cursor: 'pointer',
//                   borderBottom: '1px solid #f0f0f0',
//                   borderRadius: 4,
//                   backgroundColor: '#fafafa',
//                   transition: 'all 0.2s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
//               >
//                 <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
//                   {doc.name}
//                 </div>
//                 <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
//                   <Tag color={getTypeColor(doc.type)} size="small">{doc.type}</Tag>
//                   <Tag color={getCategoryColor(doc.category)} size="small">{doc.category}</Tag>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {search && filteredDocs.length === 0 && (
//         <div style={{ 
//           textAlign: 'center', 
//           padding: 16, 
//           color: '#999',
//           backgroundColor: '#fafafa',
//           borderRadius: 4,
//           marginBottom: 16
//         }}>
//           No documents found
//         </div>
//       )}

//       {/* Selected Documents */}
//       {selectedDocuments.length > 0 && (
//         <Card
//           title={
//             <div style={{ fontSize: 14, fontWeight: 500 }}>
//               Selected Documents ({selectedDocuments.length})
//             </div>
//           }
//           size="small"
//           style={{ border: `1px solid ${SUCCESS_GREEN}30`, backgroundColor: `${SUCCESS_GREEN}08` }}
//         >
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//             {selectedDocuments.map((doc, i) => (
//               <div
//                 key={i}
//                 style={{
//                   padding: '12px',
//                   border: '1px solid #e8e8e8',
//                   borderRadius: 4,
//                   backgroundColor: 'white',
//                 }}
//               >
//                 <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
//                   <div style={{ flex: 1 }}>
//                     <Input
//                       value={doc.name}
//                       onChange={(e) => updateDocumentName(i, e.target.value)}
//                       style={{ marginBottom: 8 }}
//                       placeholder="Document name"
//                     />
//                     <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
//                       <Tag 
//                         color={getTypeColor(doc.type)} 
//                         style={{ margin: 0, fontSize: 11 }}
//                       >
//                         {doc.type}
//                       </Tag>
//                       <Tag 
//                         color={getCategoryColor(doc.category)} 
//                         style={{ margin: 0, fontSize: 11 }}
//                       >
//                         {doc.category}
//                       </Tag>
//                     </div>
//                   </div>
//                   <Button
//                     type="text"
//                     danger
//                     size="small"
//                     icon={<DeleteOutlined />}
//                     onClick={() => removeDocument(i)}
//                     style={{ minWidth: 'auto' }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {selectedDocuments.length === 0 && !search && (
//         <div style={{ 
//           textAlign: 'center', 
//           padding: 24, 
//           color: '#999',
//           backgroundColor: '#fafafa',
//           borderRadius: 4
//         }}>
//           <FileOutlined style={{ fontSize: 32, marginBottom: 8 }} />
//           <div>No documents selected</div>
//           <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
//             Search and select documents above
//           </Text>
//         </div>
//       )}
//     </Card>
//   );
// }

// // Facility Table Component with exact columns: Type, Sanction Limit, Balance, Headroom, Action
// function FacilityTable({ facilities, setFacilities }) {
//   const [editingRow, setEditingRow] = useState(null);

//   // Calculate subtotals
//   const subtotals = useMemo(() => {
//     return facilities.reduce(
//       (acc, f) => {
//         acc.sanctioned += f.sanctioned || 0;
//         acc.balance += f.balance || 0;
//         acc.headroom += (f.sanctioned || 0) - (f.balance || 0);
//         return acc;
//       },
//       { sanctioned: 0, balance: 0, headroom: 0 }
//     );
//   }, [facilities]);

//   const columns = [
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       width: 150,
//       render: (text, record, index) => {
//         if (editingRow === index) {
//           return (
//             <Select
//               value={text}
//               onChange={(value) => handleEditChange(index, 'type', value)}
//               style={{ width: '100%' }}
//               placeholder="Select facility type"
//             >
//               <Option value="Term Loan">Term Loan</Option>
//               <Option value="Overdraft">Overdraft</Option>
//               <Option value="Letter of Credit">Letter of Credit</Option>
//               <Option value="Guarantee">Guarantee</Option>
//               <Option value="Asset Finance">Asset Finance</Option>
//               <Option value="Mortgage">Mortgage</Option>
//               <Option value="Revolving Credit">Revolving Credit</Option>
//               <Option value="Bridge Loan">Bridge Loan</Option>
//             </Select>
//           );
//         }
//         return text || '-';
//       },
//     },
//     {
//       title: 'Sanction Limit (KES \'000)',
//       dataIndex: 'sanctioned',
//       key: 'sanctioned',
//       width: 150,
//       render: (text, record, index) => {
//         if (editingRow === index) {
//           return (
//             <InputNumber
//               value={text}
//               onChange={(value) => {
//                 handleEditChange(index, 'sanctioned', value);
//                 // Auto-calculate headroom
//                 const newBalance = facilities[index].balance || 0;
//                 const newHeadroom = value - newBalance;
//                 handleEditChange(index, 'headroom', newHeadroom);
//               }}
//               style={{ width: '100%' }}
//               min={0}
//               formatter={value => `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               parser={value => value.replace(/KES\s?|(,*)/g, '')}
//               placeholder="Enter amount"
//             />
//           );
//         }
//         return text ? `KES ${parseFloat(text).toLocaleString()}` : '-';
//       },
//     },
//     {
//       title: 'Balance (KES \'000)',
//       dataIndex: 'balance',
//       key: 'balance',
//       width: 150,
//       render: (text, record, index) => {
//         if (editingRow === index) {
//           return (
//             <InputNumber
//               value={text}
//               onChange={(value) => {
//                 handleEditChange(index, 'balance', value);
//                 // Auto-calculate headroom
//                 const newSanctioned = facilities[index].sanctioned || 0;
//                 const newHeadroom = newSanctioned - value;
//                 handleEditChange(index, 'headroom', newHeadroom);
//               }}
//               style={{ width: '100%' }}
//               min={0}
//               max={facilities[index]?.sanctioned || undefined}
//               formatter={value => `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               parser={value => value.replace(/KES\s?|(,*)/g, '')}
//               placeholder="Enter amount"
//             />
//           );
//         }
//         return text ? `KES ${parseFloat(text).toLocaleString()}` : '-';
//       },
//     },
//     {
//       title: 'Headroom (KES \'000)',
//       dataIndex: 'headroom',
//       key: 'headroom',
//       width: 150,
//       render: (text, record, index) => {
//         const headroomValue = (record.sanctioned || 0) - (record.balance || 0);
        
//         // Determine color based on headroom value
//         let headroomColor = '#52c41a'; // Green by default
//         if (headroomValue < 0) headroomColor = ERROR_RED;
//         else if (headroomValue === 0) headroomColor = WARNING_ORANGE;
        
//         return (
//           <div style={{ 
//             fontWeight: 'bold',
//             color: headroomColor,
//             padding: '4px 8px',
//             backgroundColor: `${headroomColor}15`,
//             borderRadius: 4,
//             textAlign: 'right'
//           }}>
//             KES {headroomValue.toLocaleString()}
//           </div>
//         );
//       },
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       width: 120,
//       render: (_, record, index) => {
//         const isEditing = editingRow === index;
//         return (
//           <Space>
//             {isEditing ? (
//               <>
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => handleSave(index)}
//                   icon={<CheckCircleOutlined style={{ color: SUCCESS_GREEN }} />}
//                 />
//                 <Button
//                   type="link"
//                   size="small"
//                   danger
//                   onClick={() => setEditingRow(null)}
//                   icon={<CloseOutlined />}
//                 />
//               </>
//             ) : (
//               <>
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => handleEdit(index)}
//                   icon={<EditOutlined />}
//                 />
//                 <Button
//                   type="link"
//                   size="small"
//                   danger
//                   onClick={() => handleDelete(index)}
//                   icon={<DeleteOutlined />}
//                 />
//               </>
//             )}
//           </Space>
//         );
//       },
//     },
//   ];

//   const handleAdd = () => {
//     const newData = {
//       key: facilities.length,
//       type: '',
//       sanctioned: 0,
//       balance: 0,
//       headroom: 0,
//     };
//     setFacilities([...facilities, newData]);
//     setEditingRow(facilities.length);
//   };

//   const handleDelete = (index) => {
//     const newData = facilities.filter((_, i) => i !== index);
//     setFacilities(newData);
//   };

//   const handleEdit = (index) => {
//     setEditingRow(index);
//   };

//   const handleSave = (index) => {
//     // Calculate headroom before saving
//     const newData = [...facilities];
//     newData[index].headroom = (newData[index].sanctioned || 0) - (newData[index].balance || 0);
//     setFacilities(newData);
//     setEditingRow(null);
//   };

//   const handleEditChange = (index, field, value) => {
//     const newData = [...facilities];
//     newData[index][field] = value;
//     setFacilities(newData);
//   };

//   // Add subtotal row to data
//   const tableData = [
//     ...facilities.map((facility, index) => ({
//       ...facility,
//       key: index,
//     })),
//     {
//       key: 'subtotal',
//       type: 'Sub-Total',
//       sanctioned: subtotals.sanctioned,
//       balance: subtotals.balance,
//       headroom: subtotals.headroom,
//       isSubtotal: true,
//     }
//   ];

//   return (
//     <Card
//       title={
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <BankOutlined style={{ color: PRIMARY_PURPLE }} />
//           <span style={{ color: PRIMARY_PURPLE, fontSize: 16 }}>FACILITY TABLE — KES '000</span>
//         </div>
//       }
//       style={{ marginBottom: 24, border: `1px solid ${PRIMARY_PURPLE}20` }}
//       extra={
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={handleAdd}
//           size="small"
//           style={{ backgroundColor: PRIMARY_PURPLE, borderColor: PRIMARY_PURPLE }}
//         >
//           Add Row
//         </Button>
//       }
//     >
//       <Table
//         columns={columns}
//         dataSource={tableData}
//         pagination={false}
//         size="small"
//         bordered
//         scroll={{ x: 800 }}
//         rowClassName={(record) => record.isSubtotal ? 'subtotal-row' : ''}
//         components={{
//           body: {
//             row: (props) => {
//               const { className, ...restProps } = props;
//               const isSubtotal = tableData[props['data-row-key']]?.isSubtotal;
              
//               return (
//                 <tr 
//                   {...restProps} 
//                   className={`${className} ${isSubtotal ? 'ant-table-row-subtotal' : ''}`}
//                   style={isSubtotal ? {
//                     backgroundColor: '#f0f7ff',
//                     fontWeight: 'bold',
//                     borderTop: `2px solid ${PRIMARY_PURPLE}`
//                   } : {}}
//                 />
//               );
//             }
//           }
//         }}
//       />
      
//       {facilities.length === 0 && (
//         <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
//           <BankOutlined style={{ fontSize: 32, marginBottom: 8 }} />
//           <div>No facilities added</div>
//           <Text type="secondary" style={{ fontSize: 12 }}>
//             Click "Add Row" to add facility details
//           </Text>
//         </div>
//       )}
      
//       <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
//         <Text type="secondary">
//           Note: Headroom is automatically calculated as Sanction Limit - Balance
//         </Text>
//       </div>
//     </Card>
//   );
// }

// export default function DeferralForm({ userId, onSuccess }) {
//   const navigate = useNavigate();
  
//   // ----------------------
//   // STATES
//   // ----------------------
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCustomerFetched, setIsCustomerFetched] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [customerName, setCustomerName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [customerNumber, setCustomerNumber] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountType, setAccountType] = useState("");

//   const [approvers, setApprovers] = useState([""]);
//   const [selectedDocuments, setSelectedDocuments] = useState([]);
//   const [facilities, setFacilities] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);

//   const [deferralTitle, setDeferralTitle] = useState("");
//   const [deferralType, setDeferralType] = useState("");
//   const [daysSought, setDaysSought] = useState("");
//   const [nextDueDate, setNextDueDate] = useState("");
//   const [originalDueDate, setOriginalDueDate] = useState("");
//   const [previousDeferredDays, setPreviousDeferredDays] = useState([10]);
//   const [daysSoughtRows, setDaysSoughtRows] = useState([10]);
//   const [cumulativeDeferredDays, setCumulativeDeferredDays] = useState([20]);
//   const [dclNumber, setDclNumber] = useState("");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [deferralDescription, setDeferralDescription] = useState("");

//   // ----------------------
//   // HANDLERS
//   // ----------------------
//   const fetchCustomer = async (custNumber, loanType) => {
//     try {
//       setIsFetching(true);
//       // mock data
//       const data = await new Promise((resolve) =>
//         setTimeout(
//           () =>
//             resolve({
//               customerName: "ERIC MEWA",
//               businessName: "MEWA AND SONS LIMITED",
//               customerNumber: "123456",
//               accountNumber: "1234567890",
//               accountType: "Business Current",
//             }),
//           1000
//         )
//       );

//       setCustomerName(data.customerName);
//       setBusinessName(data.businessName);
//       setCustomerNumber(data.customerNumber);
//       setAccountNumber(data.accountNumber);
//       setAccountType(data.accountType);
//       setDeferralTitle(`${data.customerName} — ${data.businessName}`);

//       setIsCustomerFetched(true);
//       setIsModalOpen(false);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const addApprover = () => setApprovers([...approvers, ""]);
//   const updateApprover = (index, value) => {
//     const arr = [...approvers];
//     arr[index] = value;
//     setApprovers(arr);
//   };
//   const removeApprover = (index) =>
//     setApprovers(approvers.filter((_, i) => i !== index));

//   const handleSubmitDeferral = async () => {
//     setIsSubmitting(true);
//     try {
//       // Validation
//       if (!deferralTitle) {
//         message.error("Please enter a deferral title");
//         setIsSubmitting(false);
//         return;
//       }
      
//       if (!dclNumber) {
//         message.error("Please enter DCL number");
//         setIsSubmitting(false);
//         return;
//       }
      
//       // Your submission logic
//       const newDeferral = {
//         deferralNumber: `DF-${Date.now()}`,
//         customerName,
//         businessName,
//         customerNumber,
//         accountNumber,
//         accountType,
//         deferralTitle,
//         deferralType,
//         daysSought,
//         nextDueDate,
//         originalDueDate,
//         previousDeferredDays,
//         daysSoughtRows,
//         cumulativeDeferredDays,
//         facilities,
//         selectedDocuments,
//         approverFlow: approvers,
//         currentApprover: approvers[0] || "Not Assigned",
//         status: "deferral_requested",
//         dclNumber,
//         createdAt: new Date().toISOString(),
//         rmReason: deferralDescription,
//       };

//       console.log("Submitting deferral:", newDeferral);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Show success message
//       message.success({
//         content: (
//           <div>
//             <strong>Deferral submitted successfully!</strong>
//             <div style={{ fontSize: '12px', marginTop: '4px' }}>
//               Deferral Number: {newDeferral.deferralNumber}
//             </div>
//           </div>
//         ),
//         duration: 3,
//       });
      
//       // Navigate back to deferrals page after a short delay
//       setTimeout(() => {
//         navigate('/rm/deferrals/pending');
//       }, 1500);
      
//     } catch (error) {
//       Modal.error({
//         title: "Error",
//         content: "Failed to submit deferral. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderCustomerInfoCard = () => (
//     <Card
//       style={{
//         marginBottom: 24,
//         borderRadius: 8,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         borderLeft: `4px solid ${ACCENT_LIME}`,
//         background: "#fafafa",
//       }}
//     >
//       <Title level={4} style={{ color: PRIMARY_PURPLE, marginBottom: 16 }}>
//         <UserOutlined style={{ marginRight: 8 }} />
//         Customer Information
//       </Title>
      
//       <Row gutter={[16, 16]}>
//         <Col span={12}>
//           <Card size="small" style={{ background: "white" }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>Customer Name</Text>
//             <Title level={5} style={{ margin: "4px 0 0", color: PRIMARY_PURPLE }}>
//               {customerName}
//             </Title>
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card size="small" style={{ background: "white" }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>Business Name</Text>
//             <Title level={5} style={{ margin: "4px 0 0", color: PRIMARY_PURPLE }}>
//               {businessName}
//             </Title>
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card size="small" style={{ background: "white" }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>Customer Number</Text>
//             <Text strong style={{ display: "block", marginTop: 4, color: SECONDARY_BLUE }}>
//               {customerNumber}
//             </Text>
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card size="small" style={{ background: "white" }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>Account Number</Text>
//             <Text strong style={{ display: "block", marginTop: 4, color: SECONDARY_BLUE }}>
//               {accountNumber}
//             </Text>
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card size="small" style={{ background: "white" }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>Account Type</Text>
//             <Tag color="blue" style={{ marginTop: 4 }}>
//               {accountType}
//             </Tag>
//           </Card>
//         </Col>
//       </Row>
//     </Card>
//   );

//   const renderDeferralDetailsCard = () => (
//     <Card
//       style={{
//         marginBottom: 24,
//         borderRadius: 8,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//       title={
//         <Title level={4} style={{ color: PRIMARY_PURPLE, margin: 0 }}>
//           <FileTextOutlined style={{ marginRight: 8 }} />
//           Deferral Details
//         </Title>
//       }
//     >
//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <Text strong>Deferral Title</Text>
//           <Input
//             value={deferralTitle}
//             onChange={(e) => setDeferralTitle(e.target.value)}
//             placeholder="Enter deferral title"
//             size="large"
//             required
//           />
//         </Col>
        
//         <Col span={12}>
//           <Text strong>Loan Amount</Text>
//           <Select
//             value={loanAmount}
//             onChange={setLoanAmount}
//             style={{ width: "100%" }}
//             size="large"
//             placeholder="Select loan amount"
//           >
//             <Option value="below75">Below 75 million</Option>
//             <Option value="above75">Above 75 million</Option>
//           </Select>
//         </Col>
        
//         <Col span={12}>
//           <Text strong>Deferral Type</Text>
//           <Select
//             value={deferralType}
//             onChange={setDeferralType}
//             style={{ width: "100%" }}
//             size="large"
//             placeholder="Select type"
//           >
//             <Option value="New">New</Option>
//             <Option value="Extension">Extension</Option>
//           </Select>
//         </Col>
        
//         {deferralType === "New" && (
//           <>
//             <Col span={12}>
//               <Text strong>No. of Days Sought</Text>
//               <Select
//                 value={daysSought}
//                 onChange={setDaysSought}
//                 style={{ width: "100%" }}
//                 size="large"
//                 placeholder="Select days"
//               >
//                 <Option value="10">10 days</Option>
//                 <Option value="20">20 days</Option>
//                 <Option value="30">30 days</Option>
//                 <Option value="45">45 days</Option>
//               </Select>
//             </Col>
            
//             <Col span={12}>
//               <Text strong>Next Document Due Date</Text>
//               <DatePicker
//                 value={nextDueDate ? dayjs(nextDueDate) : null}
//                 onChange={(date) => setNextDueDate(date ? date.format("YYYY-MM-DD") : "")}
//                 style={{ width: "100%" }}
//                 size="large"
//                 format="DD/MM/YYYY"
//               />
//             </Col>
//           </>
//         )}
        
//         {deferralType === "Extension" && (
//           <Col span={12}>
//             <Text strong>Original Due Date</Text>
//             <DatePicker
//               value={originalDueDate ? dayjs(originalDueDate) : null}
//               onChange={(date) => setOriginalDueDate(date ? date.format("YYYY-MM-DD") : "")}
//               style={{ width: "100%" }}
//               size="large"
//               format="DD/MM/YYYY"
//             />
//           </Col>
//         )}
        
//         {deferralType === "Extension" && (
//           <Col span={24}>
//             <Divider />
//             <Title level={5} style={{ color: PRIMARY_PURPLE, marginBottom: 16 }}>
//               <CalendarOutlined style={{ marginRight: 8 }} />
//               Extension Details
//             </Title>
            
//             <Table
//               dataSource={previousDeferredDays.map((prev, idx) => ({
//                 key: idx,
//                 previousDeferredDays: prev,
//                 daysSought: daysSoughtRows[idx],
//                 cumulativeDays: cumulativeDeferredDays[idx],
//               }))}
//               columns={[
//                 {
//                   title: "Previous Deferred Days",
//                   dataIndex: "previousDeferredDays",
//                   render: (value, record, idx) => (
//                     <Select
//                       value={value}
//                       onChange={(val) => {
//                         const newPrev = [...previousDeferredDays];
//                         newPrev[idx] = Number(val);
//                         setPreviousDeferredDays(newPrev);
                        
//                         const newCum = [...cumulativeDeferredDays];
//                         newCum[idx] = newPrev[idx] + daysSoughtRows[idx];
//                         setCumulativeDeferredDays(newCum);
//                       }}
//                       style={{ width: "100%" }}
//                     >
//                       <Option value="10">10 days</Option>
//                       <Option value="20">20 days</Option>
//                       <Option value="30">30 days</Option>
//                       <Option value="45">45 days</Option>
//                     </Select>
//                   ),
//                 },
//                 {
//                   title: "Days Sought",
//                   dataIndex: "daysSought",
//                   render: (value, record, idx) => (
//                     <Select
//                       value={value}
//                       onChange={(val) => {
//                         const newDays = [...daysSoughtRows];
//                         newDays[idx] = Number(val);
//                         setDaysSoughtRows(newDays);
                        
//                         const newCum = [...cumulativeDeferredDays];
//                         newCum[idx] = previousDeferredDays[idx] + newDays[idx];
//                         setCumulativeDeferredDays(newCum);
//                       }}
//                       style={{ width: "100%" }}
//                     >
//                       <Option value="10">10 days</Option>
//                       <Option value="20">20 days</Option>
//                       <Option value="30">30 days</Option>
//                       <Option value="45">45 days</Option>
//                     </Select>
//                   ),
//                 },
//                 {
//                   title: "Cumulative Days",
//                   dataIndex: "cumulativeDays",
//                   render: (value) => (
//                     <Input
//                       value={value}
//                       readOnly
//                       style={{ background: "#fafafa", fontWeight: "bold" }}
//                     />
//                   ),
//                 },
//               ]}
//               pagination={false}
//               size="small"
//             />
//           </Col>
//         )}
        
//         {/* Document Picker Component - Renamed to "Document Name" */}
//         <Col span={24}>
//           <DocumentPicker 
//             selectedDocuments={selectedDocuments}
//             setSelectedDocuments={setSelectedDocuments}
//           />
//         </Col>
        
//         <Col span={24}>
//           <Text strong>Deferral Description (Reason)</Text>
//           <TextArea
//             value={deferralDescription}
//             onChange={(e) => setDeferralDescription(e.target.value)}
//             rows={4}
//             placeholder="Enter reason for deferral..."
//             required
//           />
//         </Col>
        
//         {/* Facility Table Component - Added after description */}
//         <Col span={24}>
//           <FacilityTable 
//             facilities={facilities}
//             setFacilities={setFacilities}
//           />
//         </Col>
        
//         <Col span={24}>
//           <Text strong>DCL Number</Text>
//           <Input
//             value={dclNumber}
//             onChange={(e) => setDclNumber(e.target.value)}
//             placeholder="Enter DCL number"
//             size="large"
//             prefix={<FileTextOutlined />}
//             required
//           />
//         </Col>
        
//         <Col span={24}>
//           <Card size="small" title="Mandatory: DCL Upload" style={{ marginBottom: 16 }}>
//             <Upload disabled={!dclNumber}>
//               <Button icon={<UploadOutlined />} disabled={!dclNumber}>
//                 Upload DCL Document
//               </Button>
//             </Upload>
//             {!dclNumber && (
//               <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
//                 Please enter DCL number first
//               </Text>
//             )}
//           </Card>
//         </Col>
        
//         <Col span={24}>
//           <Card size="small" title="Additional Documents">
//             <Upload>
//               <Button icon={<UploadOutlined />}>
//                 Upload Additional Documents
//               </Button>
//             </Upload>
//           </Card>
//         </Col>
//       </Row>
//     </Card>
//   );

//   const renderApproverSidebar = () => (
//     <Card
//       style={{
//         height: "calc(100vh - 48px)",
//         position: "sticky",
//         top: 24,
//         borderRadius: 8,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Title level={4} style={{ color: PRIMARY_PURPLE, marginBottom: 24 }}>
//         <UserOutlined style={{ marginRight: 8 }} />
//         Approver Flow
//       </Title>
      
//       <Steps
//         direction="vertical"
//         current={-1}
//         items={approvers.map((approver, index) => ({
//           title: approver || `Approver ${index + 1}`,
//           description: index === 0 ? "First Approver" : `Step ${index + 1}`,
//         }))}
//       />
      
//       <Divider />
      
//       <Space direction="vertical" style={{ width: "100%" }}>
//         {approvers.map((approver, index) => (
//           <Input
//             key={index}
//             value={approver}
//             onChange={(e) => updateApprover(index, e.target.value)}
//             placeholder={`Enter approver ${index + 1} email`}
//             addonAfter={
//               approvers.length > 1 && (
//                 <Button
//                   type="text"
//                   danger
//                   icon={<DeleteOutlined />}
//                   onClick={() => removeApprover(index)}
//                   size="small"
//                 />
//               )
//             }
//             style={{ marginBottom: 8 }}
//           />
//         ))}
        
//         <Button
//           icon={<PlusOutlined />}
//           onClick={addApprover}
//           style={{ width: "100%" }}
//         >
//           Add Approver
//         </Button>
//       </Space>
      
//       <Divider />
      
//       <Button
//         type="primary"
//         size="large"
//         loading={isSubmitting}
//         onClick={handleSubmitDeferral}
//         style={{
//           width: "100%",
//           backgroundColor: PRIMARY_PURPLE,
//           borderColor: PRIMARY_PURPLE,
//           fontWeight: "bold",
//         }}
//       >
//         {isSubmitting ? "Submitting..." : "Submit Deferral"}
//       </Button>
      
//       <div style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
//         <Text type="secondary">
//           Deferral will be created with status:{" "}
//           <Tag color="orange" style={{ marginLeft: 4 }}>Pending</Tag>
//         </Text>
//       </div>
      
//       {/* Add Cancel Button */}
//       <Button
//         type="default"
//         size="large"
//         onClick={() => navigate('/rm/deferrals/pending')}
//         style={{
//           width: "100%",
//           marginTop: 16,
//           fontWeight: "bold",
//         }}
//       >
//         Cancel & Return to Deferrals
//       </Button>
//     </Card>
//   );

//   if (!isCustomerFetched) {
//     return (
//       <div style={{ padding: 24 }}>
//         <Card
//           style={{
//             maxWidth: 600,
//             margin: "100px auto",
//             textAlign: "center",
//             borderRadius: 12,
//             boxShadow: "0 4px 20px rgba(43, 28, 103, 0.1)",
//             borderTop: `4px solid ${ACCENT_LIME}`,
//           }}
//         >
//           <BankOutlined style={{ fontSize: 64, color: PRIMARY_PURPLE, marginBottom: 24 }} />
          
//           <Title level={3} style={{ color: PRIMARY_PURPLE, marginBottom: 8 }}>
//             Start New Deferral Request
//           </Title>
          
//           <Text type="secondary" style={{ display: "block", marginBottom: 32, fontSize: 16 }}>
//             Please search for a customer to begin the deferral request process
//           </Text>
          
//           <Button
//             type="primary"
//             size="large"
//             icon={<SearchOutlined />}
//             onClick={() => setIsModalOpen(true)}
//             loading={isFetching}
//             style={{
//               backgroundColor: PRIMARY_PURPLE,
//               borderColor: PRIMARY_PURPLE,
//               height: 48,
//               fontSize: 16,
//               padding: "0 32px",
//             }}
//           >
//             {isFetching ? "Searching..." : "Search Customer"}
//           </Button>
          
//           <div style={{ marginTop: 24 }}>
//             <Button
//               type="default"
//               onClick={() => navigate('/rm/deferrals/pending')}
//               style={{ marginTop: 16 }}
//             >
//               ← Back to My Deferrals
//             </Button>
//           </div>
          
//           <div style={{ marginTop: 24 }}>
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               You need customer details to proceed with deferral creation
//             </Text>
//           </div>
//         </Card>
        
//         <CustomerSearchModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={fetchCustomer}
//           isFetching={isFetching}
//         />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <Row gutter={[24, 0]}>
//         <Col span={18}>
//           {renderCustomerInfoCard()}
//           {renderDeferralDetailsCard()}
//         </Col>
        
//         <Col span={6}>
//           {renderApproverSidebar()}
//         </Col>
//       </Row>
      
//       <CustomerSearchModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={fetchCustomer}
//         isFetching={isFetching}
//       />
//     </div>
//   );
// }








import React, { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  DatePicker,
  Table,
  Tag,
  Upload,
  Divider,
  Typography,
  Spin,
  Modal,
  Steps,
  Badge,
  Alert,
  Space,
  message,
  Form,
  InputNumber
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  FileTextOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
  BankOutlined,
  FolderOutlined,
  FileOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// Theme colors from MyQueue
const PRIMARY_PURPLE = "#2B1C67";
const ACCENT_LIME = "#b5d334";
const HIGHLIGHT_GOLD = "#fcb116";
const LIGHT_YELLOW = "#fcd716";
const SECONDARY_BLUE = "#164679";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";
const INFO_BLUE = "#1890ff";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Custom CustomerSearchModal with new styling
function CustomerSearchModal({ isOpen, onClose, onSubmit, isFetching }) {
  const [customerNumber, setCustomerNumber] = useState("");
  const [loanType, setLoanType] = useState("");

  if (!isOpen) return null;

  return (
    <Modal
      title={
        <div style={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
          <SearchOutlined style={{ marginRight: 8 }} />
          Fetch Customer
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(customerNumber, loanType);
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text strong>Customer Number</Text>
          <Input
            type="text"
            size="large"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value.replace(/\D/g, ""))}
            required
            prefix={<UserOutlined />}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Text strong>Loan Type</Text>
          <Select
            size="large"
            style={{ width: "100%" }}
            value={loanType}
            onChange={setLoanType}
            placeholder="Select loan type"
            required
          >
            <Option value="asset finance">Asset Finance</Option>
            <Option value="business loan">Business Loan</Option>
            <Option value="consumer">Consumer</Option>
            <Option value="mortgage">Mortgage</Option>
            <Option value="construction">Construction Loan</Option>
          </Select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isFetching}
            style={{ 
              backgroundColor: PRIMARY_PURPLE,
              borderColor: PRIMARY_PURPLE
            }}
          >
            {isFetching ? "Fetching..." : "Fetch Customer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// Document Picker Component with exact details from provided code
function DocumentPicker({ selectedDocuments, setSelectedDocuments }) {
  const [search, setSearch] = useState("");

  const allDocuments = [
    // Primary Documents
    { name: "Offer Letter (new facilities)", type: "Primary", category: "Non-Allowable" },
    { name: "Letter of Variation of facilities", type: "Primary", category: "Non-Allowable" },
    { name: "Board Resolutions by borrowers and guarantors", type: "Primary", category: "Non-Allowable" },
    { name: "Loan Agreements (Master Asset Finance agreement, Hire Purchase Agreement, Securities Agreement, Agency Agreement etc.)", type: "Primary", category: "Non-Allowable" },
    { name: "Inter-lenders Agreements", type: "Primary", category: "Non-Allowable" },
    { name: "Debentures plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Letters of Exclusion from debentures or receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Legal Charges plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Further charges (up stamping) on existing legal charges & debentures*", type: "Primary", category: "Allowable" },
    { name: "Letter of Lien (any type)/letter of set off/memorandum of general pledge", type: "Primary", category: "Non-Allowable" },
    { name: "Cash Cover", type: "Primary", category: "Allowable" },
    { name: "Joint Registrations of assets", type: "Primary", category: "Non-Allowable" },
    { name: "Execution of Documents by Motor Vehicle Dealers", type: "Primary", category: "Non-Allowable" },
    { name: "Final Invoices for settlement", type: "Primary", category: "Non-Allowable" },
    { name: "Shares and bonds", type: "Primary", category: "Non-Allowable" },
    { name: "Insurance for assets financed", type: "Primary", category: "Non-Allowable" },
    { name: "Evidence of payment of full deposit amounts (borrowers contribution) before drawdown", type: "Primary", category: "Non-Allowable" },
    { name: "Tracking certificates", type: "Primary", category: "Non-Allowable" },
    { name: "Memorandum and Articles of Association, or amendments of the same where the facility has already been approved for a new to Bank client", type: "Primary", category: "Non-Allowable" },
    { name: "Affidavit of Title", type: "Primary", category: "Non-Allowable" },
    { name: "Sale agreement", type: "Primary", category: "Non-Allowable" },
    { name: "Offer Letter (Straight annual reviews) - to pursued as limit extensions and not deferrals", type: "Primary", category: "Non-Allowable" },
    { name: "Any New Guarantees (director, company, property owners' guarantee etc.) and Indemnities", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Assignment of Incomes and Receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Indemnity", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Subordination", type: "Primary", category: "Allowable" },
    { name: "Statements of Assets and Liabilities including certificate of compliance to the LOF", type: "Primary", category: "Allowable" },
    { name: "Valuations / Re-valuations for purpose of up-stamping of securities", type: "Primary", category: "Non-Allowable" },
    { name: "Re-valuation (normal revaluation after 4 years)", type: "Primary", category: "Allowable" },
    { name: "Company searches", type: "Primary", category: "Non-Allowable" },
    { name: "Collection of Bank Charges", type: "Primary", category: "Allowable" },
    { name: "Import entry and corresponding duty payment receipts for vehicles financed", type: "Primary", category: "Non-Allowable" },
    { name: "Receipt of original logbooks in the name of the seller", type: "Primary", category: "Allowable" },
    { name: "Current Vehicle Inspection Reports", type: "Primary", category: "Allowable" },
    { name: "Machine/Equipment Warranties", type: "Primary", category: "Allowable" },
    { name: "Change of payee(s) or details of payee(s)", type: "Primary", category: "Non-Allowable" },
    { name: "For All Construction Related Credit Facilities Prior to Disbursement: architects certificates, Quantity Surveyor's Report, Bills of Quantities, certificate of occupation/completion Approved drawings, Contractor's All Risk Insurance Cover, Professional Certificates, Letters of Undertaking, National Environment Management Authority (NEMA), Energy and Petroleum Regulatory Authority (EPRA) and Road Authorities (KENHA, KURA,KERRA). National Construction Authority Approval, Contractor's profile, National Construction Authority certificate and Professional Certificates", type: "Primary", category: "Allowable" },
    { name: "Where applicable, Compliance with provisions of the bank's and the United Nations Environmental and Social Management System (ESMS) and IFC Performance Standards", type: "Primary", category: "Allowable" },
    { name: "Original share certificates (for shares & Bonds held as collateral)Share certificates for sectional units and blank transfer forms.", type: "Primary", category: "Allowable" },
    { name: "Land searches", type: "Primary", category: "Allowable" },
    { name: "Amendments on logbooks (subject to the customer having executed required documentation)", type: "Primary", category: "Allowable" },
    { name: "Commercial Benefit Agreements", type: "Primary", category: "Allowable" },

    // Secondary Documents
    { name: "Annual Returns", type: "Secondary", category: "Non-Allowable" },
    { name: "Tax Compliance Certificates", type: "Secondary", category: "Allowable" },
    { name: "Land Rents & Rates receipts", type: "Secondary", category: "Allowable" },
    { name: "Customer Identification Documents e.g. ID, Passport, KRA PINS", type: "Secondary", category: "Allowable" },
    { name: "Receipt of Final/Original Invoices from off takers, motor vehicle dealers/sellers etc.", type: "Secondary", category: "Allowable" },
    { name: "Employer salary remittance letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Employer check off letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Authority to sell letters from the bank's approved dealers.", type: "Secondary", category: "Allowable" },
    { name: "Provision of sellers bank details", type: "Secondary", category: "Allowable" },
    { name: "Landlords Letter", type: "Secondary", category: "Allowable" },
    { name: "Direct Debit or Standing Order forms/instructions", type: "Secondary", category: "Allowable" },
    { name: "Delivery Notes for equipment/machinery/goods", type: "Secondary", category: "Allowable" },
    { name: "Share of Wallet letter", type: "Secondary", category: "Allowable" },
    { name: "Current CR12", type: "Secondary", category: "Non-Allowable" },
    { name: "Opening of Mpesa Till number/linking to account/Till Transfer linked to account in another bank", type: "Secondary", category: "Non-Allowable" },
    { name: "Occupational safety and health audit reports", type: "Secondary", category: "Non-Allowable" },
  ];

  const handleSelect = (doc) => {
    if (!selectedDocuments.some(selected => selected.name === doc.name)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
    setSearch("");
  };

  const removeDocument = (index) => {
    const temp = [...selectedDocuments];
    temp.splice(index, 1);
    setSelectedDocuments(temp);
  };

  const updateDocumentName = (index, value) => {
    const temp = [...selectedDocuments];
    temp[index].name = value;
    setSelectedDocuments(temp);
  };

  const filteredDocs = allDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category) => {
    return category === "Allowable" ? "green" : "red";
  };

  const getTypeColor = (type) => {
    return type === "Primary" ? "blue" : "orange";
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FolderOutlined style={{ color: PRIMARY_PURPLE }} />
          <span style={{ color: PRIMARY_PURPLE, fontSize: 16 }}>Document Name</span>
        </div>
      }
      size="small"
      style={{ marginBottom: 16, border: `1px solid ${PRIMARY_PURPLE}20` }}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>Search Document</Text>
        <Input
          placeholder="Type to search document..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          suffix={<SearchOutlined />}
        />
      </div>

      {/* Search Results */}
      {search && filteredDocs.length > 0 && (
        <Card 
          size="small" 
          style={{ 
            marginBottom: 16, 
            maxHeight: 300, 
            overflowY: 'auto',
            border: `1px solid ${PRIMARY_PURPLE}30`
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filteredDocs.map((doc, i) => (
              <div
                key={i}
                onClick={() => handleSelect(doc)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                  borderRadius: 4,
                  backgroundColor: '#fafafa',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
              >
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                  {doc.name}
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <Tag color={getTypeColor(doc.type)} size="small">{doc.type}</Tag>
                  <Tag color={getCategoryColor(doc.category)} size="small">{doc.category}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {search && filteredDocs.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: 16, 
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: 4,
          marginBottom: 16
        }}>
          No documents found
        </div>
      )}

      {/* Selected Documents */}
      {selectedDocuments.length > 0 && (
        <Card
          title={
            <div style={{ fontSize: 14, fontWeight: 500 }}>
              Selected Documents ({selectedDocuments.length})
            </div>
          }
          size="small"
          style={{ border: `1px solid ${SUCCESS_GREEN}30`, backgroundColor: `${SUCCESS_GREEN}08` }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedDocuments.map((doc, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  border: '1px solid #e8e8e8',
                  borderRadius: 4,
                  backgroundColor: 'white',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      value={doc.name}
                      onChange={(e) => updateDocumentName(i, e.target.value)}
                      style={{ marginBottom: 8 }}
                      placeholder="Document name"
                    />
                    <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                      <Tag 
                        color={getTypeColor(doc.type)} 
                        style={{ margin: 0, fontSize: 11 }}
                      >
                        {doc.type}
                      </Tag>
                      <Tag 
                        color={getCategoryColor(doc.category)} 
                        style={{ margin: 0, fontSize: 11 }}
                      >
                        {doc.category}
                      </Tag>
                    </div>
                  </div>
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeDocument(i)}
                    style={{ minWidth: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedDocuments.length === 0 && !search && (
        <div style={{ 
          textAlign: 'center', 
          padding: 24, 
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: 4
        }}>
          <FileOutlined style={{ fontSize: 32, marginBottom: 8 }} />
          <div>No documents selected</div>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
            Search and select documents above
          </Text>
        </div>
      )}
    </Card>
  );
}

// Facility Table Component with exact columns: Type, Sanction Limit, Balance, Headroom, Action
function FacilityTable({ facilities, setFacilities }) {
  const [editingRow, setEditingRow] = useState(null);

  // Calculate subtotals
  const subtotals = useMemo(() => {
    return facilities.reduce(
      (acc, f) => {
        acc.sanctioned += f.sanctioned || 0;
        acc.balance += f.balance || 0;
        acc.headroom += (f.sanctioned || 0) - (f.balance || 0);
        return acc;
      },
      { sanctioned: 0, balance: 0, headroom: 0 }
    );
  }, [facilities]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (text, record, index) => {
        if (editingRow === index) {
          return (
            <Select
              value={text}
              onChange={(value) => handleEditChange(index, 'type', value)}
              style={{ width: '100%' }}
              placeholder="Select facility type"
            >
              <Option value="Term Loan">Term Loan</Option>
              <Option value="Overdraft">Overdraft</Option>
              <Option value="Letter of Credit">Letter of Credit</Option>
              <Option value="Guarantee">Guarantee</Option>
              <Option value="Asset Finance">Asset Finance</Option>
              <Option value="Mortgage">Mortgage</Option>
              <Option value="Revolving Credit">Revolving Credit</Option>
              <Option value="Bridge Loan">Bridge Loan</Option>
            </Select>
          );
        }
        return text || '-';
      },
    },
    {
      title: 'Sanction Limit (KES \'000)',
      dataIndex: 'sanctioned',
      key: 'sanctioned',
      width: 150,
      render: (text, record, index) => {
        if (editingRow === index) {
          return (
            <InputNumber
              value={text}
              onChange={(value) => {
                handleEditChange(index, 'sanctioned', value);
                // Auto-calculate headroom
                const newBalance = facilities[index].balance || 0;
                const newHeadroom = value - newBalance;
                handleEditChange(index, 'headroom', newHeadroom);
              }}
              style={{ width: '100%' }}
              min={0}
              formatter={value => `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/KES\s?|(,*)/g, '')}
              placeholder="Enter amount"
            />
          );
        }
        return text ? `KES ${parseFloat(text).toLocaleString()}` : '-';
      },
    },
    {
      title: 'Balance (KES \'000)',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      render: (text, record, index) => {
        if (editingRow === index) {
          return (
            <InputNumber
              value={text}
              onChange={(value) => {
                handleEditChange(index, 'balance', value);
                // Auto-calculate headroom
                const newSanctioned = facilities[index].sanctioned || 0;
                const newHeadroom = newSanctioned - value;
                handleEditChange(index, 'headroom', newHeadroom);
              }}
              style={{ width: '100%' }}
              min={0}
              max={facilities[index]?.sanctioned || undefined}
              formatter={value => `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/KES\s?|(,*)/g, '')}
              placeholder="Enter amount"
            />
          );
        }
        return text ? `KES ${parseFloat(text).toLocaleString()}` : '-';
      },
    },
    {
      title: 'Headroom (KES \'000)',
      dataIndex: 'headroom',
      key: 'headroom',
      width: 150,
      render: (text, record, index) => {
        const headroomValue = (record.sanctioned || 0) - (record.balance || 0);
        
        // Determine color based on headroom value
        let headroomColor = '#52c41a'; // Green by default
        if (headroomValue < 0) headroomColor = ERROR_RED;
        else if (headroomValue === 0) headroomColor = WARNING_ORANGE;
        
        return (
          <div style={{ 
            fontWeight: 'bold',
            color: headroomColor,
            padding: '4px 8px',
            backgroundColor: `${headroomColor}15`,
            borderRadius: 4,
            textAlign: 'right'
          }}>
            KES {headroomValue.toLocaleString()}
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record, index) => {
        const isEditing = editingRow === index;
        return (
          <Space>
            {isEditing ? (
              <>
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleSave(index)}
                  icon={<CheckCircleOutlined style={{ color: SUCCESS_GREEN }} />}
                />
                <Button
                  type="link"
                  size="small"
                  danger
                  onClick={() => setEditingRow(null)}
                  icon={<CloseOutlined />}
                />
              </>
            ) : (
              <>
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleEdit(index)}
                  icon={<EditOutlined />}
                />
                <Button
                  type="link"
                  size="small"
                  danger
                  onClick={() => handleDelete(index)}
                  icon={<DeleteOutlined />}
                />
              </>
            )}
          </Space>
        );
      },
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: facilities.length,
      type: '',
      sanctioned: 0,
      balance: 0,
      headroom: 0,
    };
    setFacilities([...facilities, newData]);
    setEditingRow(facilities.length);
  };

  const handleDelete = (index) => {
    const newData = facilities.filter((_, i) => i !== index);
    setFacilities(newData);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = (index) => {
    // Calculate headroom before saving
    const newData = [...facilities];
    newData[index].headroom = (newData[index].sanctioned || 0) - (newData[index].balance || 0);
    setFacilities(newData);
    setEditingRow(null);
  };

  const handleEditChange = (index, field, value) => {
    const newData = [...facilities];
    newData[index][field] = value;
    setFacilities(newData);
  };

  // Add subtotal row to data
  const tableData = [
    ...facilities.map((facility, index) => ({
      ...facility,
      key: index,
    })),
    {
      key: 'subtotal',
      type: 'Sub-Total',
      sanctioned: subtotals.sanctioned,
      balance: subtotals.balance,
      headroom: subtotals.headroom,
      isSubtotal: true,
    }
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BankOutlined style={{ color: PRIMARY_PURPLE }} />
          <span style={{ color: PRIMARY_PURPLE, fontSize: 16 }}>FACILITY TABLE — KES '000</span>
        </div>
      }
      style={{ marginBottom: 24, border: `1px solid ${PRIMARY_PURPLE}20` }}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="small"
          style={{ backgroundColor: PRIMARY_PURPLE, borderColor: PRIMARY_PURPLE }}
        >
          Add Row
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        size="small"
        bordered
        scroll={{ x: 800 }}
        rowClassName={(record) => record.isSubtotal ? 'subtotal-row' : ''}
        components={{
          body: {
            row: (props) => {
              const { className, ...restProps } = props;
              const isSubtotal = tableData[props['data-row-key']]?.isSubtotal;
              
              return (
                <tr 
                  {...restProps} 
                  className={`${className} ${isSubtotal ? 'ant-table-row-subtotal' : ''}`}
                  style={isSubtotal ? {
                    backgroundColor: '#f0f7ff',
                    fontWeight: 'bold',
                    borderTop: `2px solid ${PRIMARY_PURPLE}`
                  } : {}}
                />
              );
            }
          }
        }}
      />
      
      {facilities.length === 0 && (
        <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
          <BankOutlined style={{ fontSize: 32, marginBottom: 8 }} />
          <div>No facilities added</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Click "Add Row" to add facility details
          </Text>
        </div>
      )}
      
      <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
        <Text type="secondary">
          Note: Headroom is automatically calculated as Sanction Limit - Balance
        </Text>
      </div>
    </Card>
  );
}

export default function DeferralForm({ userId, onSuccess }) {
  const navigate = useNavigate();
  
  // ----------------------
  // STATES
  // ----------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");

  const [approvers, setApprovers] = useState([""]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [deferralTitle, setDeferralTitle] = useState("");
  const [deferralType, setDeferralType] = useState("");
  const [daysSought, setDaysSought] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [originalDueDate, setOriginalDueDate] = useState("");
  const [previousDeferredDays, setPreviousDeferredDays] = useState([10]);
  const [daysSoughtRows, setDaysSoughtRows] = useState([10]);
  const [cumulativeDeferredDays, setCumulativeDeferredDays] = useState([20]);
  const [dclNumber, setDclNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [deferralDescription, setDeferralDescription] = useState("");

  // ----------------------
  // HANDLERS
  // ----------------------
  const fetchCustomer = async (custNumber, loanType) => {
    try {
      setIsFetching(true);
      // mock data
      const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              customerName: "ERIC MEWA",
              businessName: "MEWA AND SONS LIMITED",
              customerNumber: "123456",
              accountNumber: "1234567890",
              accountType: "Business Current",
            }),
          1000
        )
      );

      setCustomerName(data.customerName);
      setBusinessName(data.businessName);
      setCustomerNumber(data.customerNumber);
      setAccountNumber(data.accountNumber);
      setAccountType(data.accountType);
      setDeferralTitle(`${data.customerName} — ${data.businessName}`);

      setIsCustomerFetched(true);
      setIsModalOpen(false);
    } finally {
      setIsFetching(false);
    }
  };

  const addApprover = () => setApprovers([...approvers, ""]);
  const updateApprover = (index, value) => {
    const arr = [...approvers];
    arr[index] = value;
    setApprovers(arr);
  };
  const removeApprover = (index) =>
    setApprovers(approvers.filter((_, i) => i !== index));

  const handleSubmitDeferral = async () => {
    setIsSubmitting(true);
    try {
      // Validation
      if (!deferralTitle) {
        message.error("Please enter a deferral title");
        setIsSubmitting(false);
        return;
      }
      
      if (!dclNumber) {
        message.error("Please enter DCL number");
        setIsSubmitting(false);
        return;
      }
      
      // Check if at least one approver is selected
      const hasApprover = approvers.some(approver => approver !== "");
      if (!hasApprover) {
        message.error("Please select at least one approver");
        setIsSubmitting(false);
        return;
      }
      
      // Your submission logic
      const newDeferral = {
        deferralNumber: `DF-${Date.now()}`,
        customerName,
        businessName,
        customerNumber,
        accountNumber,
        accountType,
        deferralTitle,
        deferralType,
        daysSought,
        nextDueDate,
        originalDueDate,
        previousDeferredDays,
        daysSoughtRows,
        cumulativeDeferredDays,
        facilities,
        selectedDocuments,
        approverFlow: approvers.filter(a => a !== ""),
        currentApprover: approvers.find(a => a !== "") || "Not Assigned",
        status: "deferral_requested",
        dclNumber,
        createdAt: new Date().toISOString(),
        rmReason: deferralDescription,
      };

      console.log("Submitting deferral:", newDeferral);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      message.success({
        content: (
          <div>
            <strong>Deferral submitted successfully!</strong>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              Deferral Number: {newDeferral.deferralNumber}
            </div>
          </div>
        ),
        duration: 3,
      });
      
      // Navigate back to deferrals page after a short delay
      setTimeout(() => {
        navigate('/rm/deferrals/pending');
      }, 1500);
      
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Failed to submit deferral. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCustomerInfoCard = () => (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderLeft: `4px solid ${ACCENT_LIME}`,
        background: "#fafafa",
      }}
    >
      <Title level={4} style={{ color: PRIMARY_PURPLE, marginBottom: 16 }}>
        <UserOutlined style={{ marginRight: 8 }} />
        Customer Information
      </Title>
      
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card size="small" style={{ background: "white" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Customer Name</Text>
            <Title level={5} style={{ margin: "4px 0 0", color: PRIMARY_PURPLE }}>
              {customerName}
            </Title>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" style={{ background: "white" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Business Name</Text>
            <Title level={5} style={{ margin: "4px 0 0", color: PRIMARY_PURPLE }}>
              {businessName}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ background: "white" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Customer Number</Text>
            <Text strong style={{ display: "block", marginTop: 4, color: SECONDARY_BLUE }}>
              {customerNumber}
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ background: "white" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Account Number</Text>
            <Text strong style={{ display: "block", marginTop: 4, color: SECONDARY_BLUE }}>
              {accountNumber}
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ background: "white" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Account Type</Text>
            <Tag color="blue" style={{ marginTop: 4 }}>
              {accountType}
            </Tag>
          </Card>
        </Col>
      </Row>
    </Card>
  );

  const renderDeferralDetailsCard = () => (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      title={
        <Title level={4} style={{ color: PRIMARY_PURPLE, margin: 0 }}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          Deferral Details
        </Title>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text strong>Deferral Title</Text>
          <Input
            value={deferralTitle}
            onChange={(e) => setDeferralTitle(e.target.value)}
            placeholder="Enter deferral title"
            size="large"
            required
          />
        </Col>
        
        <Col span={12}>
          <Text strong>Loan Amount</Text>
          <Select
            value={loanAmount}
            onChange={setLoanAmount}
            style={{ width: "100%" }}
            size="large"
            placeholder="Select loan amount"
          >
            <Option value="below75">Below 75 million</Option>
            <Option value="above75">Above 75 million</Option>
          </Select>
        </Col>
        
        <Col span={12}>
          <Text strong>Deferral Type</Text>
          <Select
            value={deferralType}
            onChange={setDeferralType}
            style={{ width: "100%" }}
            size="large"
            placeholder="Select type"
          >
            <Option value="New">New</Option>
            <Option value="Extension">Extension</Option>
          </Select>
        </Col>
        
        {deferralType === "New" && (
          <>
            <Col span={12}>
              <Text strong>No. of Days Sought</Text>
              <Select
                value={daysSought}
                onChange={setDaysSought}
                style={{ width: "100%" }}
                size="large"
                placeholder="Select days"
              >
                <Option value="10">10 days</Option>
                <Option value="20">20 days</Option>
                <Option value="30">30 days</Option>
                <Option value="45">45 days</Option>
              </Select>
            </Col>
            
            <Col span={12}>
              <Text strong>Next Document Due Date</Text>
              <DatePicker
                value={nextDueDate ? dayjs(nextDueDate) : null}
                onChange={(date) => setNextDueDate(date ? date.format("YYYY-MM-DD") : "")}
                style={{ width: "100%" }}
                size="large"
                format="DD/MM/YYYY"
              />
            </Col>
          </>
        )}
        
        {deferralType === "Extension" && (
          <Col span={12}>
            <Text strong>Original Due Date</Text>
            <DatePicker
              value={originalDueDate ? dayjs(originalDueDate) : null}
              onChange={(date) => setOriginalDueDate(date ? date.format("YYYY-MM-DD") : "")}
              style={{ width: "100%" }}
              size="large"
              format="DD/MM/YYYY"
            />
          </Col>
        )}
        
        {deferralType === "Extension" && (
          <Col span={24}>
            <Divider />
            <Title level={5} style={{ color: PRIMARY_PURPLE, marginBottom: 16 }}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              Extension Details
            </Title>
            
            <Table
              dataSource={previousDeferredDays.map((prev, idx) => ({
                key: idx,
                previousDeferredDays: prev,
                daysSought: daysSoughtRows[idx],
                cumulativeDays: cumulativeDeferredDays[idx],
              }))}
              columns={[
                {
                  title: "Previous Deferred Days",
                  dataIndex: "previousDeferredDays",
                  render: (value, record, idx) => (
                    <Select
                      value={value}
                      onChange={(val) => {
                        const newPrev = [...previousDeferredDays];
                        newPrev[idx] = Number(val);
                        setPreviousDeferredDays(newPrev);
                        
                        const newCum = [...cumulativeDeferredDays];
                        newCum[idx] = newPrev[idx] + daysSoughtRows[idx];
                        setCumulativeDeferredDays(newCum);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value="10">10 days</Option>
                      <Option value="20">20 days</Option>
                      <Option value="30">30 days</Option>
                      <Option value="45">45 days</Option>
                    </Select>
                  ),
                },
                {
                  title: "Days Sought",
                  dataIndex: "daysSought",
                  render: (value, record, idx) => (
                    <Select
                      value={value}
                      onChange={(val) => {
                        const newDays = [...daysSoughtRows];
                        newDays[idx] = Number(val);
                        setDaysSoughtRows(newDays);
                        
                        const newCum = [...cumulativeDeferredDays];
                        newCum[idx] = previousDeferredDays[idx] + newDays[idx];
                        setCumulativeDeferredDays(newCum);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value="10">10 days</Option>
                      <Option value="20">20 days</Option>
                      <Option value="30">30 days</Option>
                      <Option value="45">45 days</Option>
                    </Select>
                  ),
                },
                {
                  title: "Cumulative Days",
                  dataIndex: "cumulativeDays",
                  render: (value) => (
                    <Input
                      value={value}
                      readOnly
                      style={{ background: "#fafafa", fontWeight: "bold" }}
                    />
                  ),
                },
              ]}
              pagination={false}
              size="small"
            />
          </Col>
        )}
        
        {/* Document Picker Component - Renamed to "Document Name" */}
        <Col span={24}>
          <DocumentPicker 
            selectedDocuments={selectedDocuments}
            setSelectedDocuments={setSelectedDocuments}
          />
        </Col>
        
        <Col span={24}>
          <Text strong>Deferral Description (Reason)</Text>
          <TextArea
            value={deferralDescription}
            onChange={(e) => setDeferralDescription(e.target.value)}
            rows={4}
            placeholder="Enter reason for deferral..."
            required
          />
        </Col>
        
        {/* Facility Table Component - Added after description */}
        <Col span={24}>
          <FacilityTable 
            facilities={facilities}
            setFacilities={setFacilities}
          />
        </Col>
        
        <Col span={24}>
          <Text strong>DCL Number</Text>
          <Input
            value={dclNumber}
            onChange={(e) => setDclNumber(e.target.value)}
            placeholder="Enter DCL number"
            size="large"
            prefix={<FileTextOutlined />}
            required
          />
        </Col>
        
        <Col span={24}>
          <Card size="small" title="Mandatory: DCL Upload" style={{ marginBottom: 16 }}>
            <Upload disabled={!dclNumber}>
              <Button icon={<UploadOutlined />} disabled={!dclNumber}>
                Upload DCL Document
              </Button>
            </Upload>
            {!dclNumber && (
              <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
                Please enter DCL number first
              </Text>
            )}
          </Card>
        </Col>
        
        <Col span={24}>
          <Card size="small" title="Additional Documents">
            <Upload>
              <Button icon={<UploadOutlined />}>
                Upload Additional Documents
              </Button>
            </Upload>
          </Card>
        </Col>
      </Row>
    </Card>
  );

  const renderApproverSidebar = () => (
    <Card
      style={{
        height: "calc(100vh - 48px)",
        position: "sticky",
        top: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={4} style={{ color: PRIMARY_PURPLE, marginBottom: 16 }}>
        <UserOutlined style={{ marginRight: 8 }} />
        Approver Selection
      </Title>
      
      <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontSize: 14 }}>
        Select approver(s) for this deferral request.
      </Text>
      
      <Steps
        direction="vertical"
        current={-1}
        items={approvers.map((approver, index) => ({
          title: approver || `Approver ${index + 1}`,
          description: index === 0 ? "First Approver" : `Step ${index + 1}`,
        }))}
        style={{ marginBottom: 24 }}
      />
      
      <Divider />
      
      <Space direction="vertical" style={{ width: "100%" }}>
        {approvers.map((approver, index) => (
          <div key={index} style={{ marginBottom: 12 }}>
            <Text strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
              Approver {index + 1}
            </Text>
            <Select
              value={approver}
              onChange={(value) => updateApprover(index, value)}
              style={{ width: "100%" }}
              placeholder="-- Choose Approver --"
              size="middle"
            >
              <Option value="">-- Choose Approver --</Option>
              <Option value="James Mwangi">James Mwangi</Option>
              <Option value="Grace Nduta">Grace Nduta</Option>
              <Option value="Patrick Maingi">Patrick Maingi</Option>
              <Option value="Sarah Wambui">Sarah Wambui</Option>
              <Option value="Anthony Kariuki">Anthony Kariuki</Option>
            </Select>
            
            {approvers.length > 1 && (
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeApprover(index)}
                style={{ marginTop: 4, padding: '0 8px', fontSize: 12 }}
              >
                Remove Approver
              </Button>
            )}
          </div>
        ))}
        
        <Button
          icon={<PlusOutlined />}
          onClick={addApprover}
          style={{ width: "100%", marginTop: 8 }}
          size="middle"
        >
          Add Another Approver
        </Button>
      </Space>
      
      <Divider />
      
      <Button
        type="primary"
        size="large"
        loading={isSubmitting}
        onClick={handleSubmitDeferral}
        style={{
          width: "100%",
          backgroundColor: PRIMARY_PURPLE,
          borderColor: PRIMARY_PURPLE,
          fontWeight: "bold",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit Deferral"}
      </Button>
      
      <div style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        <Text type="secondary">
          Deferral will be created with status:{" "}
          <Tag color="orange" style={{ marginLeft: 4 }}>Pending</Tag>
        </Text>
      </div>
      
      {/* Add Cancel Button */}
      <Button
        type="default"
        size="large"
        onClick={() => navigate('/rm/deferrals/pending')}
        style={{
          width: "100%",
          marginTop: 16,
          fontWeight: "bold",
        }}
      >
        Cancel & Return to Deferrals
      </Button>
    </Card>
  );

  if (!isCustomerFetched) {
    return (
      <div style={{ padding: 24 }}>
        <Card
          style={{
            maxWidth: 600,
            margin: "100px auto",
            textAlign: "center",
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(43, 28, 103, 0.1)",
            borderTop: `4px solid ${ACCENT_LIME}`,
          }}
        >
          <BankOutlined style={{ fontSize: 64, color: PRIMARY_PURPLE, marginBottom: 24 }} />
          
          <Title level={3} style={{ color: PRIMARY_PURPLE, marginBottom: 8 }}>
            Start New Deferral Request
          </Title>
          
          <Text type="secondary" style={{ display: "block", marginBottom: 32, fontSize: 16 }}>
            Please search for a customer to begin the deferral request process
          </Text>
          
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() => setIsModalOpen(true)}
            loading={isFetching}
            style={{
              backgroundColor: PRIMARY_PURPLE,
              borderColor: PRIMARY_PURPLE,
              height: 48,
              fontSize: 16,
              padding: "0 32px",
            }}
          >
            {isFetching ? "Searching..." : "Search Customer"}
          </Button>
          
          <div style={{ marginTop: 24 }}>
            <Button
              type="default"
              onClick={() => navigate('/rm/deferrals/pending')}
              style={{ marginTop: 16 }}
            >
              ← Back to My Deferrals
            </Button>
          </div>
          
          <div style={{ marginTop: 24 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              You need customer details to proceed with deferral creation
            </Text>
          </div>
        </Card>
        
        <CustomerSearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={fetchCustomer}
          isFetching={isFetching}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 0]}>
        <Col span={18}>
          {renderCustomerInfoCard()}
          {renderDeferralDetailsCard()}
        </Col>
        
        <Col span={6}>
          {renderApproverSidebar()}
        </Col>
      </Row>
      
      <CustomerSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchCustomer}
        isFetching={isFetching}
      />
    </div>
  );
}