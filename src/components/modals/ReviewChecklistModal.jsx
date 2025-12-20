// // export default ReviewChecklistModal;
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Table,
//   Tag,
//   Modal,
//   Input,
//   Select,
//   Card,
//   Descriptions,
//   message,
//   Upload,
//   Spin,
//   List,
//   Avatar,
//   Popconfirm,
//   Progress,
// } from "antd";
// import { UploadOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
// import { loanTypes } from "../../pages/docTypes";

// // import DocumentInputSection from "../../components/creator/DocumentInputSection";
// import {
//   useSubmitChecklistToRMMutation,
//   useUpdateChecklistStatusMutation,
//   useGetChecklistCommentsQuery,
// } from "../../api/checklistApi";
// import DocumentInputSectionCoCreator from "../creator/DocumentInputSection";

// const { Option } = Select;

// // Theme Colors
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const SECONDARY_PURPLE = "#7e6496";

// // Custom CSS
// const customStyles = `
//   .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
//   .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
//   .ant-modal-close-x { color: white !important; }

//   .checklist-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
//   .checklist-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
//   .checklist-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

//   .doc-table.ant-table-wrapper table { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
//   .doc-table .ant-table-thead > tr > th { background-color: #f7f9fc !important; color: ${PRIMARY_BLUE} !important; font-weight: 600 !important; padding: 12px 16px !important; }
//   .doc-table .ant-table-tbody > tr > td { padding: 10px 16px !important; border-bottom: 1px dashed #f0f0f0 !important; }

//   .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
//   .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

//   .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

//   .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
//   .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
// `;

// const getRoleTag = (role) => {
//   let color = "blue";
//   const roleLower = (role || "").toLowerCase();
//   switch (roleLower) {
//     case "rm":
//       color = "purple";
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

// const CommentTrail = ({ comments, isLoading }) => {
//   if (isLoading) return <Spin className="block m-5" />;
//   if (!comments || comments.length === 0)
//     return <i className="pl-4">No historical comments yet.</i>;

//   return (
//     <div className="max-h-52 overflow-y-auto">
//       <List
//         dataSource={comments}
//         itemLayout="horizontal"
//         renderItem={(item) => (
//           <List.Item>
//             <List.Item.Meta
//               avatar={<Avatar icon={<UserOutlined />} />}
//               title={
//                 <div className="flex justify-between">
//                   <div>
//                     <b>{item.userId?.name || "System"}</b>
//                     {getRoleTag(item.userId?.role || "system")}
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {new Date(
//                       item.createdAt || item.timestamp
//                     ).toLocaleString()}
//                   </span>
//                 </div>
//               }
//               description={<div className="break-words">{item.message}</div>}
//             />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// const ReviewChecklistModal = ({ checklist, open, onClose }) => {
//   const [docs, setDocs] = useState([]);
//   const [newDocName, setNewDocName] = useState("");
//   const [selectedCategoryName, setSelectedCategoryName] = useState(null);
//   const [creatorComment, setCreatorComment] = useState("");
//   const [checkerComment] = useState("");
//   const [checkerFiles, setCheckerFiles] = useState([]);
//   const [loanType, setLoanType] = useState("");

//   const [submitRmChecklist, { isLoading }] = useSubmitChecklistToRMMutation();
//   const [updateChecklistStatus, { isLoading: isCheckerSubmitting }] =
//     useUpdateChecklistStatusMutation();
//   const { data: comments, isLoading: commentsLoading } =
//     useGetChecklistCommentsQuery(checklist?._id, { skip: !checklist?._id });

//   // Client-side: Inside ReviewChecklistModal
//   const isActionDisabled = !["pending", "co_creator_review"].includes(
//     checklist?.status?.toLowerCase()
//   );

//   useEffect(() => {
//     if (!checklist || !checklist.documents) return;

//     const flatDocs = checklist.documents.reduce((acc, item) => {
//       if (item.docList && Array.isArray(item.docList) && item.docList.length) {
//         const nestedDocs = item.docList.map((doc) => ({
//           ...doc,
//           category: item.category,
//         }));
//         return acc.concat(nestedDocs);
//       }
//       if (item.category) return acc.concat(item);
//       return acc;
//     }, []);

//     const preparedDocs = flatDocs.map((doc, idx) => ({
//       ...doc,
//       docIdx: idx,
//       status: doc.status || "pendingrm",
//       action: doc.status || "pendingrm",
//       comment: doc.comment || "",
//       fileUrl: doc.fileUrl || null,
//     }));

//     setDocs(preparedDocs);
//   }, [checklist]);

//   const handleDelete = (idx) => {
//     const updated = docs
//       .filter((_, i) => i !== idx)
//       .map((doc, i) => ({ ...doc, docIdx: i }));
//     setDocs(updated);
//     message.success("Document deleted.");
//   };

//   // post comment

//   const handlePostCreatorComment = () => {
//     if (!creatorComment.trim()) {
//       message.error("Comment cannot be empty");
//       return;
//     }

//     message.success("Comment added");
//   };

//   console.log("loanType:", loanType);
//   // console.log("categories:", categoriesToDisplay);

//   const handleAddNewDocument = () => {
//     if (!newDocName.trim() || !selectedCategoryName)
//       return message.error(
//         "Please enter a document name and select a category."
//       );
//     setDocs((prevDocs) => [
//       ...prevDocs,
//       {
//         docIdx: prevDocs.length,
//         name: newDocName.trim(),
//         category: selectedCategoryName,
//         status: "pendingrm",
//         action: "pendingrm",
//         comment: "",
//         fileUrl: null,
//       },
//     ]);
//     message.success(
//       `Document '${newDocName.trim()}' added to ${selectedCategoryName}.`
//     );
//     setNewDocName("");
//     setSelectedCategoryName(null);
//   };

//   const handleActionChange = (idx, value) => {
//     const updated = [...docs];
//     updated[idx].action = value;
//     updated[idx].status = value;
//     setDocs(updated);
//   };

//   const handleCommentChange = (idx, value) => {
//     const updated = [...docs];
//     updated[idx].comment = value;
//     setDocs(updated);
//   };

//   const handleFileUpload = (docIdx, file) => {
//     const updated = [...docs];
//     updated[docIdx].fileUrl = URL.createObjectURL(file);
//     updated[docIdx].status = "uploaded";
//     setDocs(updated);
//     message.success("File uploaded");
//     return false;
//   };

//   const ALLOWED_DOC_ACTIONS = [
//     "submitted_for_review",
//     "sighted",
//     "waived",
//     "deferred",
//     "tbo",
//     "approved",
//     "submitted",
//   ];

//   const canSubmitToCoChecker =
//     checklist?.status === "co_creator_review" &&
//     docs.length > 0 &&
//     docs.every((doc) =>
//       ALLOWED_DOC_ACTIONS.includes((doc.action || "").toLowerCase())
//     );

//   const submitToRM = async () => {
//     try {
//       if (!checklist?._id) throw new Error("Checklist ID missing");
//       const nestedDocuments = docs.reduce((acc, doc) => {
//         let categoryGroup = acc.find((c) => c.category === doc.category);
//         if (!categoryGroup) {
//           categoryGroup = { category: doc.category, docList: [] };
//           acc.push(categoryGroup);
//         }
//         categoryGroup.docList.push({
//           _id: doc._id,
//           name: doc.name,
//           category: doc.category,
//           status: doc.status,
//           action: doc.action,
//           comment: doc.comment,
//           fileUrl: doc.fileUrl,
//           deferralReason: doc.deferralReason,
//         });
//         return acc;
//       }, []);
//       const payload = { creatorComment, documents: nestedDocuments };
//       await submitRmChecklist({ id: checklist._id, body: payload }).unwrap();
//       message.success("Checklist submitted to RM!");
//       onClose();
//     } catch (err) {
//       console.error(err);
//       message.error(err?.data?.error || "Failed to submit checklist to RM");
//     }
//   };

//   const submitToCheckers = async () => {
//     if (!checklist?.dclNo) return message.error("DCL No missing.");
//     try {
//       message.loading({
//         content: "Submitting checklist to Co-Checker...",
//         key: "checkerSubmit",
//       });
//       const payload = {
//         dclNo: checklist.dclNo,
//         documents: docs,
//         status: "co_checker_review",
//         submittedToCoChecker: true,
//         finalComment: checkerComment,
//         attachments: checkerFiles,
//       };
//       await updateChecklistStatus(payload).unwrap();
//       message.success({
//         content: "Checklist submitted to Co-Checker!",
//         key: "checkerSubmit",
//         duration: 3,
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       message.error({
//         content: err?.data?.error || "Failed to submit checklist.",
//         key: "checkerSubmit",
//       });
//     }
//   };

//   const uniqueCategories = [...new Set(docs.map((doc) => doc.category))];
//   const allDocsApproved =
//     docs.length > 0 && docs.every((doc) => doc.action === "submitted");
//   const total = docs.length;
//   const submitted = docs.filter(
//     (d) => d.action === "submitted" || d.action === "uploaded"
//   ).length;
//   const pending = docs.filter((d) =>
//     ["pendingrm", "pendingco", "tbo"].includes(d.action)
//   ).length;
//   const deferred = docs.filter((d) => d.action === "deferred").length;
//   const progressPercent =
//     total === 0 ? 0 : Math.round((submitted / total) * 100);

//   const columns = [
//     {
//       title: "Category",
//       dataIndex: "category",
//       width: 120,
//       render: (text) => (
//         <span
//           style={{ fontSize: 12, color: SECONDARY_PURPLE, fontWeight: 500 }}
//         >
//           {text}
//         </span>
//       ),
//     },
//     {
//       title: "Document Name",
//       dataIndex: "name",
//       width: 250,
//       render: (text, record) => (
//         <Input
//           size="small"
//           value={record.name}
//           onChange={(e) => {
//             const updated = [...docs];
//             updated[record.docIdx].name = e.target.value;
//             setDocs(updated);
//           }}
//           disabled={isActionDisabled}
//         />
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       width: 140,
//       render: (text, record) => (
//         <Select
//           size="small"
//           value={record.action}
//           style={{ width: "100%" }}
//           onChange={(val) => handleActionChange(record.docIdx, val)}
//           disabled={isActionDisabled}
//         >
//           <Option value="submitted">Submitted</Option>
//           <Option value="pendingrm">Pending from RM</Option>
//           <Option value="pendingco">Pending from Co</Option>
//           <Option value="tbo">TBO</Option>
//           <Option value="sighted">Sighted</Option>
//           <Option value="waived">Waived</Option>
//           <Option value="deferred">Deferred</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Co status",
//       dataIndex: "status",
//       width: 120,
//       render: (status) => {
//         let color = "default";
//         switch ((status || "").toLowerCase()) {
//           case "submitted":
//             color = "green";
//             break;
//           case "pendingrm":
//             color = "#6E0C05";
//             break;
//           case "pendingco":
//             color = "#6E0549";
//             break;
//           // case "deferred":
//           case "waived":
//             color = "#C4AA1D";
//             break;
//           case "sighted":
//             color = "#02ECF5";
//             break;
//           case "deferred":
//             color = "#55C41D";
//             break;
//           case "tbo":
//             color = "#0F13E5";
//             break;
//           default:
//             color = "default";
//         }
//         return (
//           <Tag className="status-tag" color={color}>
//             {status}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "Co comment",
//       dataIndex: "comment",
//       width: 200,
//       render: (text, record) => (
//         <Input.TextArea
//           rows={1}
//           size="small"
//           value={text}
//           onChange={(e) => handleCommentChange(record.docIdx, e.target.value)}
//           disabled={isActionDisabled}
//         />
//       ),
//     },
//     {
//       title: "View",
//       key: "view",
//       width: 80,
//       render: (_, record) =>
//         record.fileUrl ? (
//           <Button
//             type="primary"
//             icon={<EyeOutlined />}
//             onClick={() => {
//               const newWindow = window.open(
//                 record.fileUrl,
//                 "_blank",
//                 "noopener,noreferrer"
//               );
//               if (!newWindow)
//                 message.error("Popup blocked! Please allow popups.");
//             }}
//             size="small"
//             style={{
//               backgroundColor: PRIMARY_BLUE,
//               borderColor: PRIMARY_BLUE,
//               borderRadius: 6,
//             }}
//             disabled={isActionDisabled}
//           >
//             View
//           </Button>
//         ) : (
//           <Tag color="default">No File</Tag>
//         ),
//     },
//     {
//       title: "Delete",
//       key: "delete",
//       width: 80,
//       render: (_, record) => (
//         <Popconfirm
//           title="Delete document?"
//           description="This action cannot be undone."
//           okText="Yes, Delete"
//           cancelText="Cancel"
//           okButtonProps={{ danger: true }}
//           onConfirm={() => handleDelete(record.docIdx)}
//         >
//           <Button type="text" danger size="small" disabled={isActionDisabled}>
//             Delete
//           </Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <>
//       <style>{customStyles}</style>
//       <Modal
//         title={`Review Checklist  ${checklist?.title || ""}`}
//         open={open}
//         onCancel={onClose}
//         width={1150}
//         bodyStyle={{ padding: "0 24px 24px" }}
//         footer={[
//           <Button key="cancel" onClick={onClose}>
//             Close
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             disabled={isActionDisabled || allDocsApproved}
//             loading={isLoading}
//             onClick={submitToRM}
//           >
//             Submit to RM
//           </Button>,

//           // <Button
//           //   key="submit-checker"
//           //   type="primary"
//           //   loading={isCheckerSubmitting}
//           //   onClick={submitToCheckers}
//           //   disabled={checklist?.status !== "rm_review" || docs.length === 0}
//           // >
//           //   Submit to Co-Checker
//           // </Button>,

//           <Button
//             key="submit-checker"
//             type="primary"
//             loading={isCheckerSubmitting}
//             onClick={submitToCheckers}
//             disabled={!canSubmitToCoChecker}
//           >
//             Submit to Co-Checker
//           </Button>,
//         ]}
//       >
//         {checklist && (
//           <>
//             <Card
//               className="checklist-info-card"
//               size="small"
//               title={
//                 <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
//                   Checklist Details
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
//                 <Descriptions.Item label="DCL No">
//                   {checklist.dclNo}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Created At">
//                   {checklist.createdAt}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Loan Type">
//                   {checklist.loanType}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Created By">
//                   {checklist.createdBy?.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="RM">
//                   {checklist.assignedToRM?.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Co-Checker">
//                   {checklist.assignedToCoChecker?.name || "Pending"}
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>

//             <div
//               style={{
//                 padding: "16px",
//                 background: "#f7f9fc",
//                 borderRadius: 8,
//                 border: "1px solid #e0e0e0",
//                 marginBottom: 18,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginBottom: 12,
//                 }}
//               >
//                 <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
//                   Total: {total}
//                 </div>
//                 <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
//                   Pending: {pending}
//                 </div>
//                 <div style={{ fontWeight: "700", color: "green" }}>
//                   Submitted: {submitted}
//                 </div>
//                 <div style={{ fontWeight: "700", color: "orange" }}>
//                   Deferred: {deferred}
//                 </div>
//               </div>
//               <Progress percent={progressPercent} />
//             </div>

//             <Table
//               className="doc-table"
//               columns={columns}
//               dataSource={docs}
//               pagination={false}
//               rowKey="docIdx"
//               size="small"
//               scroll={{ x: "max-content" }}
//             />

//             <div style={{ marginTop: 18 }}>
//               {/* <DocumentInputSectionCoCreator
//                 uniqueCategories={uniqueCategories}
//                 // disabled={isActionDisabled}
//                 newDocName={newDocName}
//                 setNewDocName={setNewDocName}
//                 selectedCategoryName={selectedCategoryName} 
//                 setSelectedCategoryName={setSelectedCategoryName}
//                 handleAddNewDocument={handleAddNewDocument}
//               /> */}

//               {/* 🔹 Document Input */}
//               <DocumentInputSectionCoCreator
//                 loanType={loanTypes} // ✅ THIS FIXES EVERYTHING
//                 newDocName={newDocName}
//                 setNewDocName={setNewDocName}
//                 selectedCategoryName={selectedCategoryName}
//                 setSelectedCategoryName={setSelectedCategoryName}
//                 handleAddNewDocument={handleAddNewDocument}
//               />
//             </div>

//             <div style={{ marginTop: 24 }}>
//               <h4>Creator Comment</h4>

//               <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
//                 <Input.TextArea
//                   rows={2}
//                   value={creatorComment}
//                   onChange={(e) => setCreatorComment(e.target.value)}
//                   disabled={isActionDisabled}
//                   placeholder="Add a comment for RM / Co-Checker"
//                 />

//                 <Button
//                   type="primary"
//                   onClick={handlePostCreatorComment}
//                   disabled={isActionDisabled || !creatorComment.trim()}
//                   style={{
//                     height: 38,
//                     backgroundColor: PRIMARY_BLUE,
//                     borderColor: PRIMARY_BLUE,
//                   }}
//                 >
//                   Post Comment
//                 </Button>
//               </div>
//             </div>

//             <div style={{ marginTop: 24 }}>
//               <h4>Comment Trail & History</h4>
//               <CommentTrail comments={comments} isLoading={commentsLoading} />
//             </div>
//           </>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default ReviewChecklistModal;






import React, { useState } from "react";
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
  Modal,
  Steps,
  Space,
  message,
  Form,
  InputNumber,
  Descriptions
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  FileTextOutlined,
  UploadOutlined,
  BankOutlined,
  CalendarOutlined,
  FileOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// Import the separate components
import DocumentPicker from "../../components/deferrals/DocumentPicker";
import ApproverSelector from "../../components/deferrals/ApproverSelector";
import FacilityTable from "../../components/deferrals/FacilityTable";

// Theme colors from MyQueue
const PRIMARY_PURPLE = "#2B1C67";
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SECONDARY_BLUE = "#164679";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function DeferralForm({ userId, onSuccess }) {
  const navigate = useNavigate();
  
  // ----------------------
  // STATES
  // ----------------------
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [loanType, setLoanType] = useState(""); // Added for customer info card

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

  // Customer search form state
  const [searchCustomerNumber, setSearchCustomerNumber] = useState("");
  const [searchLoanType, setSearchLoanType] = useState("");

  // ----------------------
  // HANDLERS for ApproverSelector
  // ----------------------
  const addApprover = () => setApprovers([...approvers, ""]);
  
  const updateApprover = (index, value) => {
    const arr = [...approvers];
    arr[index] = value;
    setApprovers(arr);
  };
  
  const removeApprover = (index) =>
    setApprovers(approvers.filter((_, i) => i !== index));

  // ----------------------
  // CUSTOMER FETCH
  // ----------------------
  const fetchCustomer = async () => {
    try {
      setIsFetching(true);
      // mock data
      const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              customerName: "ERIC MEWA",
              businessName: "MEWA AND SONS LIMITED",
              customerNumber: searchCustomerNumber || "123456",
              accountNumber: "1234567890",
              accountType: "Business Current",
              loanType: searchLoanType,
            }),
          1000
        )
      );

      setCustomerName(data.customerName);
      setBusinessName(data.businessName);
      setCustomerNumber(data.customerNumber);
      setAccountNumber(data.accountNumber);
      setAccountType(data.accountType);
      setLoanType(data.loanType);
      setDeferralTitle(`${data.customerName} — ${data.businessName}`);

      setIsCustomerFetched(true);
      setShowSearchForm(false);
      // Clear search form
      setSearchCustomerNumber("");
      setSearchLoanType("");
    } finally {
      setIsFetching(false);
    }
  };

  // ----------------------
  // SUBMIT HANDLER
  // ----------------------
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

  // ----------------------
  // RENDER FUNCTIONS
  // ----------------------
  const renderCustomerInfoCard = () => (
    <Card
      size="small"
      title={
        <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
          Customer Information
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
        <Descriptions.Item label="Customer Name">
          <Text strong style={{ color: PRIMARY_PURPLE }}>
            {customerName}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Customer Number">
          <Text strong style={{ color: PRIMARY_BLUE }}>
            {customerNumber}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="DCL No">
          <Text strong style={{ color: SECONDARY_BLUE }}>
            {dclNumber || "Not entered"}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <div>
            <Text strong style={{ color: PRIMARY_PURPLE }}>
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </Text>
            <Text type="secondary" style={{ fontSize: 11, marginLeft: 4 }}>
              {new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          <div style={{ display: "flex", alignItems: "center" }}>
            <UserOutlined style={{ color: PRIMARY_PURPLE, marginRight: 6, fontSize: 12 }} />
            <Text strong style={{ color: PRIMARY_PURPLE }}>
              Current User
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: 11, marginTop: 2 }}>
            Relationship Manager
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Loan Type">
          <Tag 
            color={loanType ? "blue" : "default"} 
            style={{ fontSize: 13 }}
          >
            {loanType || "Not selected"}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
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
        
        {/* Document Picker Component - Imported */}
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
        
        {/* Facility Table Component - Imported */}
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

  // ----------------------
  // APPROVER SIDEBAR (using imported ApproverSelector)
  // ----------------------
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
      <ApproverSelector
        approvers={approvers}
        updateApprover={updateApprover}
        addApprover={addApprover}
        removeApprover={removeApprover}
        onSubmitDeferral={handleSubmitDeferral}
        isSubmitting={isSubmitting}
      />
      
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
        Cancel
      </Button>
    </Card>
  );

  // ----------------------
  // RENDER LOGIC
  // ----------------------
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
          
          {/* Only show the search form if showSearchForm is true */}
          {showSearchForm ? (
            <>
              <Divider style={{ margin: "24px 0" }} />
              
              <div style={{ textAlign: "left", marginBottom: 32 }}>
                <Form
                  layout="vertical"
                  onFinish={fetchCustomer}
                >
                  <Form.Item
                    label="Customer Number"
                    name="customerNumber"
                    rules={[{ required: true, message: 'Please enter customer number' }]}
                  >
                    <Input
                      type="text"
                      size="large"
                      value={searchCustomerNumber}
                      onChange={(e) => setSearchCustomerNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 123456"
                      autoFocus
                    />
                  </Form.Item>
                  
                  <Form.Item
                    label="Loan Type"
                    name="loanType"
                    rules={[{ required: true, message: 'Please select loan type' }]}
                  >
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      value={searchLoanType}
                      onChange={setSearchLoanType}
                      placeholder="Select loan type"
                    >
                      <Option value="asset finance">Asset Finance</Option>
                      <Option value="business loan">Business Loan</Option>
                      <Option value="consumer">Consumer</Option>
                      <Option value="mortgage">Mortgage</Option>
                      <Option value="construction">Construction Loan</Option>
                    </Select>
                  </Form.Item>
                  
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
                    <Button
                      type="default"
                      onClick={() => setShowSearchForm(false)}
                      size="large"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isFetching}
                      size="large"
                      style={{
                        backgroundColor: PRIMARY_PURPLE,
                        borderColor: PRIMARY_PURPLE,
                      }}
                    >
                      {isFetching ? "Fetching..." : "Fetch Customer"}
                    </Button>
                  </div>
                </Form>
              </div>
            </>
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={() => setShowSearchForm(true)}
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
          )}
          
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

          </div>
        </Card>
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
    </div>
  );
}