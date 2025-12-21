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
  Descriptions,
  Space,
  Upload,
  Form,
  Input as AntdInput,
  Progress,
  List,
  Avatar,
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
  EyeOutlined
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
    loanType: "Mortgage DCL",
    deferralTitle: "Bank Statements",
    documentType: "Financial Statements",
    deferralType: "New",
    status: "deferral_requested",
    daysSought: 30,
    requestedExpiry: "2025-02-05T23:59:59Z",
    originalDueDate: "2025-01-05T23:59:59Z",
    currentApprover: { _id: "creator1", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
    rmReason: "Customer awaiting CBE clearance and bank statement generation for Q4 2024. The statements are expected to be available by end of month after the quarterly audit completion.",
    createdAt: "2025-01-05T09:30:00Z",
    updatedAt: "2025-01-05T09:30:00Z",
    slaExpiry: "2025-01-12T23:59:59Z",
    canEdit: true,
    canWithdraw: true,
    attachments: [
      { id: "att1", name: "customer_email.pdf", size: "2.4 MB", type: "pdf", uploadDate: "2025-01-05T09:45:00Z" }
    ],
    history: [
      { 
        action: "Requested", 
        user: "Sarah Johnson (RM)",
        date: "2025-01-05T09:30:00Z", 
        notes: "Deferral request submitted",
        comment: "Customer awaiting CBE clearance and bank statement generation for Q4 2024. The statements are expected to be available by end of month after the quarterly audit completion.",
        userRole: "RM"
      },
      { 
        action: "Assigned", 
        user: "System", 
        date: "2025-01-05T09:35:00Z", 
        notes: "Assigned to Diana Jebet (Deferral Management Team)",
        userRole: "System"
      },
      { 
        action: "Under Review", 
        user: "Diana Jebet (Deferral Management Team)", 
        date: "2025-01-06T10:15:00Z", 
        notes: "Request under review. Additional documentation may be required.",
        comment: "Request received. Need to verify CBE clearance timeline with customer. Please provide expected completion date.",
        userRole: "Deferral Management"
      }
    ]
  },
  {
    _id: "2",
    deferralNumber: "DEF-2024-002",
    dclNo: "DCL-2024-028",
    customerNumber: "CUST002",
    customerName: "Diana Mwangi",
    businessName: "DIANA MWANGI AND DAUGHTERS",
    loanType: "Buy & Build",
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
      { 
        action: "Requested", 
        user: "Sarah Johnson (RM)",
        date: "2025-01-11T14:20:00Z", 
        notes: "Deferral request submitted",
        comment: "CRB office experiencing delays in processing due to system upgrades. The office has indicated a 2-week delay in certificate issuance.",
        userRole: "RM"
      },
      { 
        action: "Assigned", 
        user: "System", 
        date: "2025-01-11T14:22:00Z", 
        notes: "Assigned to Raphael Eric (Deferral Management Team)",
        userRole: "System"
      },
      { 
        action: "Additional Info Requested", 
        user: "Raphael Eric (Deferral Management Team)", 
        date: "2025-01-12T09:45:00Z", 
        notes: "Requested additional information from CRB",
        comment: "Need official communication from CRB regarding the system upgrade delay. Please provide written confirmation if available.",
        userRole: "Deferral Management"
      }
    ]
  },
  {
    _id: "3",
    deferralNumber: "DEF-2024-003",
    dclNo: "DCL-2024-042",
    customerNumber: "CUST003",
    customerName: "Lucy Nyambura",
    businessName: "LUCY NYAMBURA AND SONS",
    loanType: "Construction Loan",
    deferralTitle: "Lease Agreement",
    documentType: "Legal Documents",
    deferralType: "New",
    status: "deferral_approved",
    daysSought: 45,
    requestedExpiry: "2025-03-05T23:59:59Z",
    originalDueDate: "2025-01-20T23:59:59Z",
    currentApprover: { _id: "creator6", name: "Titus Munene", email: "titus.m@ncba.co.ke" },
    rmReason: "Landlord traveling overseas, agreement pending signature upon return. The landlord will be back on February 15th.",
    createdAt: "2025-01-20T11:15:00Z",
    updatedAt: "2025-01-21T10:30:00Z",
    approvedDate: "2025-01-21T10:30:00Z",
    canEdit: false,
    canWithdraw: false,
    canUpload: true,
    attachments: [
      { id: "att1", name: "landlord_email.pdf", size: "1.2 MB", type: "pdf", uploadDate: "2025-01-20T11:30:00Z" },
      { id: "att2", name: "travel_itinerary.docx", size: "550 KB", type: "word", uploadDate: "2025-01-20T11:45:00Z" }
    ],
    history: [
      { 
        action: "Requested", 
        user: "Sarah Johnson (RM)",
        date: "2025-01-20T11:15:00Z", 
        notes: "Deferral request submitted",
        comment: "Landlord traveling overseas, agreement pending signature upon return. The landlord will be back on February 15th.",
        userRole: "RM"
      },
      { 
        action: "Assigned", 
        user: "System", 
        date: "2025-01-20T11:18:00Z", 
        notes: "Assigned to Titus Munene (Deferral Management Team)",
        userRole: "System"
      },
      { 
        action: "Under Review", 
        user: "Titus Munene (Deferral Management Team)", 
        date: "2025-01-20T15:30:00Z", 
        notes: "Reviewing travel documentation",
        comment: "Travel itinerary verified. Need to confirm landlord's return date matches the requested extension period.",
        userRole: "Deferral Management"
      },
      { 
        action: "Approved", 
        user: "Titus Munene (Deferral Management Team)", 
        date: "2025-01-21T10:30:00Z", 
        notes: "Deferral approved with comments",
        comment: "Approved. Please ensure document is submitted before expiry date. Note that further extensions may not be granted.",
        userRole: "Deferral Management"
      }
    ]
  },
  {
    _id: "4",
    deferralNumber: "DEF-2024-004",
    dclNo: "DCL-2024-055",
    customerNumber: "CUST004",
    customerName: "John Kamau",
    businessName: "KAMAU ENTERPRISES LTD",
    loanType: "Secured Loan DCL",
    deferralTitle: "Title Deed",
    documentType: "Legal Documents",
    deferralType: "New",
    status: "deferral_requested",
    daysSought: 20,
    requestedExpiry: "2025-02-15T23:59:59Z",
    originalDueDate: "2025-01-25T23:59:59Z",
    currentApprover: { _id: "creator2", name: "Diana Jebet", email: "diana.j@ncba.co.ke" },
    rmReason: "Title deed currently at lands office for registration. Process expected to take 3 weeks.",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    slaExpiry: "2025-01-22T23:59:59Z",
    canEdit: true,
    canWithdraw: true,
    attachments: [
      { id: "att1", name: "lands_receipt.pdf", size: "1.5 MB", type: "pdf", uploadDate: "2025-01-15T10:40:00Z" }
    ],
    history: [
      { 
        action: "Requested", 
        user: "Sarah Johnson (RM)",
        date: "2025-01-15T10:30:00Z", 
        notes: "Deferral request submitted",
        comment: "Title deed currently at lands office for registration. Process expected to take 3 weeks.",
        userRole: "RM"
      }
    ]
  },
  {
    _id: "5",
    deferralNumber: "DEF-2024-005",
    dclNo: "DCL-2024-063",
    customerNumber: "CUST005",
    customerName: "Mary Wanjiku",
    businessName: "MWANIKI TRADERS",
    loanType: "Stock Loan DCL",
    deferralTitle: "Stock Valuation Report",
    documentType: "Financial Statements",
    deferralType: "Extension",
    status: "deferral_approved",
    daysSought: 30,
    requestedExpiry: "2025-02-28T23:59:59Z",
    originalDueDate: "2025-01-28T23:59:59Z",
    currentApprover: { _id: "creator5", name: "Raphael Eric", email: "raphael.e@ncba.co.ke" },
    rmReason: "Valuer unavailable due to medical leave. Alternative valuer has been assigned.",
    createdAt: "2025-01-18T14:45:00Z",
    updatedAt: "2025-01-19T11:20:00Z",
    approvedDate: "2025-01-19T11:20:00Z",
    canEdit: false,
    canWithdraw: false,
    canUpload: true,
    attachments: [
      { id: "att1", name: "valuer_medical_leave.pdf", size: "1.1 MB", type: "pdf", uploadDate: "2025-01-18T14:55:00Z" },
      { id: "att2", name: "new_valuer_assignment.docx", size: "680 KB", type: "word", uploadDate: "2025-01-18T15:10:00Z" }
    ],
    history: [
      { 
        action: "Requested", 
        user: "Sarah Johnson (RM)",
        date: "2025-01-18T14:45:00Z", 
        notes: "Deferral request submitted",
        comment: "Valuer unavailable due to medical leave. Alternative valuer has been assigned.",
        userRole: "RM"
      },
      { 
        action: "Approved", 
        user: "Raphael Eric (Deferral Management Team)", 
        date: "2025-01-19T11:20:00Z", 
        notes: "Deferral approved",
        comment: "Approved due to unforeseen circumstances. Please ensure valuation report is submitted before new deadline.",
        userRole: "Deferral Management"
      }
    ]
  }
];

// Custom CSS for modal styling
const customStyles = `
  .ant-modal-header { background-color: ${PRIMARY_BLUE} !important; padding: 18px 24px !important; }
  .ant-modal-title { color: white !important; font-size: 1.15rem !important; font-weight: 700 !important; letter-spacing: 0.5px; }
  .ant-modal-close-x { color: white !important; }

  .deferral-info-card .ant-card-head { border-bottom: 2px solid ${ACCENT_LIME} !important; }
  .deferral-info-card .ant-descriptions-item-label { font-weight: 600 !important; color: ${SECONDARY_PURPLE} !important; padding-bottom: 4px; }
  .deferral-info-card .ant-descriptions-item-content { color: ${PRIMARY_BLUE} !important; font-weight: 700 !important; font-size: 13px !important; }

  .ant-input, .ant-select-selector { border-radius: 6px !important; border-color: #e0e0e0 !important; }
  .ant-input:focus, .ant-select-focused .ant-select-selector { box-shadow: 0 0 0 2px rgba(22, 70, 121, 0.2) !important; border-color: ${PRIMARY_BLUE} !important; }

  .status-tag { font-weight: 700 !important; border-radius: 999px !important; padding: 3px 8px !important; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-flex; align-items: center; gap: 4px; justify-content: center; }

  .ant-modal-footer .ant-btn { border-radius: 8px; font-weight: 600; height: 38px; padding: 0 16px; }
  .ant-modal-footer .ant-btn-primary { background-color: ${PRIMARY_BLUE} !important; border-color: ${PRIMARY_BLUE} !important; }
`;

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf': return <FilePdfOutlined style={{ color: ERROR_RED }} />;
    case 'word': return <FileWordOutlined style={{ color: PRIMARY_BLUE }} />;
    case 'excel': return <FileExcelOutlined style={{ color: SUCCESS_GREEN }} />;
    case 'image': return <FileImageOutlined style={{ color: SECONDARY_PURPLE }} />;
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
  
  // Remove everything in parentheses including the parentheses
  // Example: "Sarah Johnson (RM)" becomes "Sarah Johnson"
  // Example: "Diana Jebet (Deferral Management Team)" becomes "Diana Jebet"
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

// Helper function to get file extension type
const getFileExtension = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'word';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'excel';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) return 'image';
  return 'other';
};

// Redesigned Deferral Details Modal
const DeferralDetailsModal = ({ deferral, open, onClose, onAction }) => {
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [localDeferral, setLocalDeferral] = useState(deferral);
  
  // Update local deferral when prop changes
  useEffect(() => {
    setLocalDeferral(deferral);
  }, [deferral]);
  
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

  const statusConfig = getStatusConfig(localDeferral?.status);

  const handleAddComment = (deferralId, comment) => {
    const newComment = {
      action: 'Comment Added',
      user: 'Sarah Johnson (RM)',
      date: new Date().toISOString(),
      notes: 'Additional comment added by RM',
      comment: comment,
      userRole: 'RM'
    };
    
    // Add to history
    if (onAction) {
      onAction('addComment', deferralId, newComment);
    }
  };

  const handleDirectFileUpload = (file) => {
    // Show loading message
    message.loading(`Uploading ${file.name}...`, 2);
    
    // Simulate upload process
    setTimeout(() => {
      // Create new attachment object
      const newAttachment = {
        id: `att_${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: getFileExtension(file.name),
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file) // Create URL for preview
      };
      
      // Update local state immediately for UI feedback
      setLocalDeferral(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));
      
      // Add to attachments via parent
      if (onAction) {
        onAction('uploadComplete', localDeferral._id, [newAttachment]);
      }
      
      message.success(`${file.name} uploaded successfully!`);
      
      // Add to history
      const historyEntry = {
        action: 'Document Uploaded',
        user: 'Sarah Johnson (RM)',
        date: new Date().toISOString(),
        notes: `Document uploaded: ${file.name}`,
        comment: 'Document uploaded by RM as requested.',
        userRole: 'RM'
      };
      
      if (onAction) {
        onAction('addComment', localDeferral._id, historyEntry);
      }
    }, 1500);
  };

  const handleWithdraw = () => {
    Modal.confirm({
      title: 'Withdraw Deferral Request',
      content: 'Are you sure you want to withdraw this deferral request? This action cannot be undone.',
      okText: 'Yes, Withdraw',
      okType: 'danger',
      onOk: () => {
        message.success('Deferral request withdrawn successfully');
        if (onAction) onAction('withdraw', localDeferral._id);
        onClose();
      }
    });
  };

  if (!localDeferral) return null;

  return (
    <>
      <style>{customStyles}</style>
      <Modal
        title={`Deferral Request: ${localDeferral.deferralNumber}`}
        open={open}
        onCancel={onClose}
        width={950}
        bodyStyle={{ padding: "0 24px 24px" }}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Close
          </Button>,
          // Edit Comment Button - Always available for RM to add comments
          <Button
            key="editComment"
            icon={<EditOutlined />}
            onClick={() => setAddCommentVisible(true)}
          >
            Add Comment
          </Button>,
          localDeferral.canWithdraw && (
            <Popconfirm
              title="Withdraw Deferral Request?"
              description="This action cannot be undone."
              okText="Yes, Withdraw"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={handleWithdraw}
            >
              <Button key="withdraw" danger icon={<DeleteOutlined />}>
                Withdraw Request
              </Button>
            </Popconfirm>
          ),
          localDeferral.canUpload && (
            <Upload
              accept=".pdf,.PDF,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              beforeUpload={(file) => {
                // File validation
                const allowedTypes = ['.pdf', '.PDF', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!allowedTypes.includes(fileExtension)) {
                  message.error(`File type not allowed. Please upload: ${allowedTypes.join(', ')}`);
                  return false;
                }
                
                // Check file size (max 10MB)
                const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                if (file.size > maxSize) {
                  message.error('File size exceeds 10MB limit');
                  return false;
                }
                
                // Handle the upload
                handleDirectFileUpload(file);
                return false; // Prevent auto upload
              }}
              fileList={[]}
              showUploadList={false}
            >
              <Button
                key="upload"
                type="primary"
                style={{ 
                  backgroundColor: SUCCESS_GREEN, 
                  borderColor: SUCCESS_GREEN 
                }}
                icon={<UploadOutlined />}
              >
                Upload Document
              </Button>
            </Upload>
          )
        ]}
      >
        {localDeferral && (
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
                    {localDeferral.deferralNumber}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="DCL No">
                  {localDeferral.dclNo}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <div style={{ fontWeight: 500 }}>
                    {statusConfig.label}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Customer">
                  <div style={{ fontWeight: 500 }}>
                    {localDeferral.customerName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Type">
                  <div style={{ fontWeight: 500 }}>
                    {localDeferral.loanType}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Document">
                  <div style={{ fontWeight: 500 }}>
                    {localDeferral.deferralTitle}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Deferral Type">
                  <div style={{ fontWeight: 500 }}>
                    {localDeferral.deferralType}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Days Sought">
                  <div style={{
                    fontWeight: "bold",
                    color: localDeferral.daysSought > 45 ? ERROR_RED : localDeferral.daysSought > 30 ? WARNING_ORANGE : PRIMARY_BLUE,
                    fontSize: 14
                  }}>
                    {localDeferral.daysSought} days
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Current Approver">
                  {localDeferral.currentApprover?.name || "Pending Assignment"}
                </Descriptions.Item>
                <Descriptions.Item label="SLA Expiry">
                  <div style={{ color: dayjs(localDeferral.slaExpiry).isBefore(dayjs()) ? ERROR_RED : PRIMARY_BLUE }}>
                    {dayjs(localDeferral.slaExpiry).format('DD MMM YYYY HH:mm')}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Attachments Section */}
            <Card
              size="small"
              title={
                <span style={{ color: PRIMARY_BLUE, fontSize: 14 }}>
                  Attachments ({localDeferral.attachments?.length || 0} files)
                </span>
              }
              style={{ marginBottom: 18 }}
            >
              {localDeferral.attachments && localDeferral.attachments.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {localDeferral.attachments.map(att => (
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
                          onClick={() => {
                            // Simulate download
                            if (att.url) {
                              const link = document.createElement('a');
                              link.href = att.url;
                              link.download = att.name;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              message.success(`Downloading ${att.name}...`);
                            }
                          }}
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
                history={localDeferral.history} 
                isLoading={loadingComments}
              />
            </div>

            {/* Add Comment Modal */}
            <AddCommentModal
              open={addCommentVisible}
              onClose={() => setAddCommentVisible(false)}
              onAddComment={handleAddComment}
              deferralId={localDeferral._id}
            />
          </>
        )}
      </Modal>
    </>
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
        d.deferralTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        (d.loanType && d.loanType.toLowerCase().includes(searchText.toLowerCase()))
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
      case 'addComment':
        // Add new comment to history
        setMockData(prev => prev.map(d => 
          d._id === deferralId ? { 
            ...d, 
            history: [...d.history, data] 
          } : d
        ));
        break;
      case 'uploadComplete':
        // Add uploaded files to attachments
        setMockData(prev => prev.map(d => 
          d._id === deferralId ? { 
            ...d, 
            attachments: [...d.attachments, ...data]
          } : d
        ));
        break;
      default:
        break;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
  };

  // Updated Columns - No sorting functionality
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
      )
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
      )
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 160,
      render: (text) => (
        <div style={{
          fontWeight: 600,
          color: PRIMARY_BLUE,
        }}>
          {text}
        </div>
      )
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      width: 140,
      render: (text) => (
        <div style={{
          fontSize: 12,
          fontWeight: 500,
          color: PRIMARY_BLUE,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {text || "Not Specified"}
        </div>
      ),
      filters: [
        { text: 'Buy & Build', value: 'Buy & Build' },
        { text: 'Mortgage DCL', value: 'Mortgage DCL' },
        { text: 'Construction Loan', value: 'Construction Loan' },
        { text: 'Secured Loan DCL', value: 'Secured Loan DCL' },
        { text: 'Stock Loan DCL', value: 'Stock Loan DCL' },
        { text: 'Equity Release Loan', value: 'Equity Release Loan' },
        { text: 'Shamba Loan', value: 'Shamba Loan' }
      ],
      onFilter: (value, record) => record.loanType === value
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
      filters: [
        { text: 'Bank Statements', value: 'Bank Statements' },
        { text: 'CR12 Certificate', value: 'CR12 Certificate' },
        { text: 'Lease Agreement', value: 'Lease Agreement' },
        { text: 'Title Deed', value: 'Title Deed' },
        { text: 'Stock Valuation Report', value: 'Stock Valuation Report' }
      ],
      onFilter: (value, record) => record.deferralTitle === value,
    },
    {
      title: "Type",
      dataIndex: "deferralType",
      key: "deferralType",
      width: 100,
      render: (type) => (
        <div style={{
          fontSize: 11,
          fontWeight: "bold",
          color: PRIMARY_BLUE
        }}>
          {type}
        </div>
      ),
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Extension', value: 'Extension' }
      ],
      onFilter: (value, record) => record.deferralType === value
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
          <div style={{ 
            fontSize: 11,
            fontWeight: "bold",
            color: config.color === 'orange' ? WARNING_ORANGE : 
                   config.color === 'green' ? SUCCESS_GREEN : 
                   config.color === 'red' ? ERROR_RED : '#666'
          }}>
            {config.text}
          </div>
        );
      },
      filters: [
        { text: 'Pending', value: 'deferral_requested' },
        { text: 'Approved', value: 'deferral_approved' }
      ],
      onFilter: (value, record) => record.status === value
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
      )
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
      }
    }
  ];

  // Custom table styles - Remove sorting hover effects
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
      font-size: 13px;
      padding: 14px 12px !important;
      border-bottom: 3px solid ${ACCENT_LIME} !important;
      border-right: none !important;
      cursor: default !important;
    }
    .deferral-pending-table .ant-table-thead > tr > th:hover {
      background-color: #f7f7f7 !important;
    }
    .deferral-pending-table .ant-table-tbody > tr > td {
      border-bottom: 1px solid #f0f0f0 !important;
      border-right: none !important;
      padding: 12px 12px !important;
      font-size: 13px;
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
    
    /* Remove sorting icons completely */
    .deferral-pending-table .ant-table-column-sorter {
      display: none !important;
    }
    .deferral-pending-table .ant-table-column-sorters {
      cursor: default !important;
    }
    .deferral-pending-table .ant-table-column-sorters:hover {
      background: none !important;
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
              placeholder="Search by Deferral No, DCL No, Customer, Loan Type, or Document"
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