/// src/pages/checker/ReportsPage.jsx
import React, { useState, useMemo } from "react";
import { 
  Tabs,
  Table,
  Button,
  Divider,
  Tag,
  Spin,
  Empty,
  Card,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Badge,
  Tooltip,
  Space,
  Typography
} from "antd";
import { 
  SearchOutlined, 
  DownloadOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

// Theme Colors (Checker theme - teal/blue)
const CHECKER_TEAL = "#36cfc9";
const CHECKER_BLUE = "#164679";
const HIGHLIGHT_GOLD = "#fcb116";
const LIGHT_YELLOW = "#fcd716";
const SECONDARY_PURPLE = "#7e6496";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";
const INFO_BLUE = "#1890ff";

// Mock Data for Checker Reports
const MOCK_DCLS = [
  {
    id: "DCL-10001",
    dclNo: "DCL-2024-10001",
    customerNumber: "458921",
    customerName: "Tech Innovations Ltd",
    documentName: "Business Registration Certificate",
    workstep: "WS-001",
    product: "Personal Loan",
    status: "Completed",
    completedDate: "2025-11-20",
    loanAmount: "KES 500,000",
    assignedCreator: { name: "Sarah Johnson" },
    assignedRM: { name: "John Kamau" },
    deferralStatus: "None",
    expiryDate: "2025-12-31",
    daysRemaining: 25,
    checkerComments: "All documents verified and approved",
    qualityScore: 95
  },
  {
    id: "DCL-10002",
    dclNo: "DCL-2024-10002",
    customerNumber: "772194",
    customerName: "Jane Smith Ltd",
    documentName: "Latest Bank Statements",
    workstep: "WS-002",
    product: "Home Loan",
    status: "Active",
    completedDate: null,
    loanAmount: "KES 8,000,000",
    assignedCreator: { name: "Michael Brown" },
    assignedRM: { name: "Jane Akinyi" },
    deferralStatus: "None",
    expiryDate: "2025-12-15",
    daysRemaining: 10,
    checkerComments: "Under review",
    qualityScore: null
  },
  {
    id: "DCL-10003",
    dclNo: "DCL-2024-10003",
    customerNumber: "993015",
    customerName: "Robert Kamau Enterprises",
    documentName: "Tax Compliance Certificate",
    workstep: "WS-003",
    product: "Credit Card",
    status: "Deferred",
    completedDate: "2025-11-25",
    loanAmount: "KES 1,000,000",
    assignedCreator: { name: "Alice Williams" },
    assignedRM: { name: "David Omondi" },
    deferralStatus: "Approved",
    expiryDate: "2025-12-10",
    daysRemaining: 5,
    checkerComments: "Document deferred pending KRA update",
    qualityScore: 88
  },
  {
    id: "DCL-10004",
    dclNo: "DCL-2024-10004",
    customerNumber: "551002",
    customerName: "Green Farms Co-op",
    documentName: "Audited Financial Statements",
    workstep: "WS-004",
    product: "Car Loan",
    status: "Completed",
    completedDate: "2025-11-22",
    loanAmount: "KES 3,500,000",
    assignedCreator: { name: "David Miller" },
    assignedRM: { name: "Sarah Wangui" },
    deferralStatus: "None",
    expiryDate: "2025-12-25",
    daysRemaining: 30,
    checkerComments: "Excellent documentation, approved without issues",
    qualityScore: 98
  },
  {
    id: "DCL-10005",
    dclNo: "DCL-2024-10005",
    customerNumber: "663018",
    customerName: "Tech Solutions Ltd",
    documentName: "Bank Statements",
    workstep: "WS-005",
    product: "Business Loan",
    status: "Active",
    completedDate: null,
    loanAmount: "KES 12,000,000",
    assignedCreator: { name: "John Doe" },
    assignedRM: { name: "Michael Chengo" },
    deferralStatus: "Rejected",
    expiryDate: "2025-12-05",
    daysRemaining: -2,
    checkerComments: "Insufficient documentation, returned to Creator",
    qualityScore: 65
  },
  {
    id: "DCL-10006",
    dclNo: "DCL-2024-10006",
    customerNumber: "774029",
    customerName: "Smart Investments",
    documentName: "Audited Financial Statements",
    workstep: "WS-006",
    product: "Investment Loan",
    status: "Completed",
    completedDate: "2025-11-18",
    loanAmount: "KES 6,000,000",
    assignedCreator: { name: "Jane Smith" },
    assignedRM: { name: "Elizabeth Njeri" },
    deferralStatus: "Approved",
    expiryDate: "2025-12-15",
    daysRemaining: 12,
    checkerComments: "Minor issues corrected, approved",
    qualityScore: 92
  },
];

const MOCK_DEFERRALS = [
  // Post-approval deferrals (Approved by checker)
  {
    id: "DEF-001",
    dclNo: "DCL-2024-10003",
    customerNumber: "993015",
    customerName: "Robert Kamau Enterprises",
    document: "Credit Report",
    reason: "Client traveling abroad, will provide document upon return",
    expiryDate: "2025-12-10",
    checkerComments: "Approved with condition to submit within 5 days of return",
    status: "Approved",
    decisionDate: "2025-11-25",
    decisionBy: "Checker John",
    loanAmount: "KES 1,000,000",
    product: "Credit Card",
    dateRequested: "2025-11-24",
    assignedCreator: { name: "Alice Williams" },
    assignedRM: { name: "David Omondi" },
    priority: "medium",
    daysRemaining: 5
  },
  {
    id: "DEF-002",
    dclNo: "DCL-2024-10006",
    customerNumber: "774029",
    customerName: "Smart Investments",
    document: "Audited Financial Statements",
    reason: "Auditor unavailable due to medical leave, will provide next week",
    expiryDate: "2025-12-15",
    checkerComments: "Approved - auditor medical situation verified",
    status: "Approved",
    decisionDate: "2025-11-19",
    decisionBy: "Checker Jane",
    loanAmount: "KES 6,000,000",
    product: "Investment Loan",
    dateRequested: "2025-11-18",
    assignedCreator: { name: "Jane Smith" },
    assignedRM: { name: "Elizabeth Njeri" },
    priority: "low",
    daysRemaining: 12
  },

  // Rejected deferrals (Rejected by checker)
  {
    id: "DEF-004",
    dclNo: "DCL-2024-10005",
    customerNumber: "663018",
    customerName: "Tech Solutions Ltd",
    document: "Bank Statements",
    reason: "Could not access online banking due to password issues",
    expiryDate: "2025-12-05",
    checkerComments: "Client should visit bank branch to reset credentials",
    status: "Rejected",
    decisionDate: "2025-11-26",
    decisionBy: "Checker Mary",
    loanAmount: "KES 12,000,000",
    product: "Business Loan",
    dateRequested: "2025-11-25",
    assignedCreator: { name: "John Doe" },
    assignedRM: { name: "Michael Chengo" },
    priority: "high",
    daysRemaining: -2
  },
  {
    id: "DEF-005",
    dclNo: "DCL-2024-10008",
    customerNumber: "996023",
    customerName: "Quick Retail Ltd",
    document: "Tax Compliance Certificate",
    reason: "KRA portal maintenance, cannot download certificate",
    expiryDate: "2025-12-12",
    checkerComments: "RM should have advised client to visit KRA office",
    status: "Rejected",
    decisionDate: "2025-11-29",
    decisionBy: "Checker John",
    loanAmount: "KES 2,500,000",
    product: "Overdraft Facility",
    dateRequested: "2025-11-28",
    assignedCreator: { name: "Sarah Williams" },
    assignedRM: { name: "Peter Maina" },
    priority: "medium",
    daysRemaining: 9
  },
];

export default function ReportsPage() {
  // Shared filters
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("postApproval");
  const [loading, setLoading] = useState(false);

  // Filter functions
  const filteredPostApprovalDeferrals = useMemo(() => {
    return MOCK_DEFERRALS.filter(
      (d) =>
        d.status === "Approved" &&
        (searchText === "" ||
          d.customerNumber.includes(searchText) ||
          d.dclNo.includes(searchText) ||
          d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
          d.document.toLowerCase().includes(searchText.toLowerCase())) &&
        (!dateRange ||
          (d.decisionDate &&
            dayjs(d.decisionDate).isBetween(
              dateRange[0],
              dateRange[1],
              "day",
              "[]"
            )))
    );
  }, [searchText, dateRange]);

  const filteredRejectedDeferrals = useMemo(() => {
    return MOCK_DEFERRALS.filter(
      (d) =>
        d.status === "Rejected" &&
        (searchText === "" ||
          d.customerNumber.includes(searchText) ||
          d.dclNo.includes(searchText) ||
          d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
          d.document.toLowerCase().includes(searchText.toLowerCase())) &&
        (!dateRange ||
          (d.decisionDate &&
            dayjs(d.decisionDate).isBetween(
              dateRange[0],
              dateRange[1],
              "day",
              "[]"
            )))
    );
  }, [searchText, dateRange]);

  const filteredAllDCLs = useMemo(() => {
    return MOCK_DCLS.filter(
      (d) =>
        (statusFilter === "All" || d.status === statusFilter) &&
        (searchText === "" ||
          d.customerNumber.includes(searchText) ||
          d.dclNo.includes(searchText) ||
          d.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
          d.documentName.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [statusFilter, searchText]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchText("");
    setDateRange(null);
    setStatusFilter("All");
  };

  // Get current tab data count
  const getCurrentDataCount = () => {
    switch (activeTab) {
      case "postApproval":
        return filteredPostApprovalDeferrals.length;
      case "rejected":
        return filteredRejectedDeferrals.length;
      case "allDCLs":
        return filteredAllDCLs.length;
      default:
        return 0;
    }
  };

  // Export functionality
  const exportReport = () => {
    let data = [];
    let filename = "";
    
    if (activeTab === "postApproval") {
      data = filteredPostApprovalDeferrals;
      filename = `checker_post_approval_deferrals_${dayjs().format('YYYYMMDD_HHmmss')}.csv`;
    } else if (activeTab === "rejected") {
      data = filteredRejectedDeferrals;
      filename = `checker_rejected_deferrals_${dayjs().format('YYYYMMDD_HHmmss')}.csv`;
    } else {
      data = filteredAllDCLs;
      filename = `checker_all_dcls_${dayjs().format('YYYYMMDD_HHmmss')}.csv`;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      data.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter component
  const renderFilters = () => (
    <Card 
      style={{ 
        marginBottom: 16,
        background: "#fafafa",
        border: `1px solid ${CHECKER_BLUE}20`
      }}
      size="small"
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by DCL No, Customer No, or Name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        
        {activeTab !== "allDCLs" && (
          <Col xs={24} sm={12} md={8}>
            <RangePicker
              style={{ width: '100%' }}
              placeholder={['Start Date', 'End Date']}
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              format="DD/MM/YYYY"
            />
          </Col>
        )}
        
        {activeTab === "allDCLs" && (
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Status"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              allowClear
            >
              <Option value="All">All Statuses</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Active">Active</Option>
              <Option value="Deferred">Deferred</Option>
            </Select>
          </Col>
        )}
        
        <Col xs={24} sm={12} md={activeTab === "allDCLs" ? 2 : 2}>
          <Button 
            onClick={clearAllFilters}
            style={{ width: '100%' }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Card>
  );

  // Common columns for Post-approval and Rejected Deferrals
  const commonDeferralColumns = [
    { 
      title: "DCL No", 
      dataIndex: "dclNo", 
      width: 150,
      render: (text) => (
        <div style={{ fontWeight: "bold", color: CHECKER_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
          {text}
        </div>
      )
    },
    { 
      title: "Customer No", 
      dataIndex: "customerNumber", 
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
      width: 180,
      render: (text) => (
        <div style={{ fontWeight: 600, color: CHECKER_BLUE }}>
          {text}
        </div>
      )
    },
    { 
      title: "Document", 
      dataIndex: "document", 
      width: 160,
      render: (text) => (
        <div style={{ fontWeight: 500, color: CHECKER_BLUE }}>
          {text}
        </div>
      )
    },
    { 
      title: "Creator", 
      dataIndex: "assignedCreator", 
      width: 130,
      render: (creator) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <UserOutlined style={{ color: CHECKER_BLUE, fontSize: 12 }} />
          <span style={{ color: CHECKER_BLUE, fontWeight: 500, fontSize: 13 }}>{creator?.name || "N/A"}</span>
        </div>
      )
    },
    { 
      title: "Reason", 
      dataIndex: "reason", 
      width: 200,
      render: (text) => (
        <div style={{ 
          fontStyle: "italic", 
          fontSize: 12, 
          color: "#666",
          lineHeight: 1.4
        }}>
          {text}
        </div>
      )
    },
    { 
      title: "Expiry Date", 
      dataIndex: "expiryDate", 
      width: 130,
      render: (date, record) => {
        const expiryDate = dayjs(record.expiryDate);
        const now = dayjs();
        const daysRemaining = expiryDate.diff(now, 'day');
        const isExpired = daysRemaining < 0;
        const isExpiringSoon = daysRemaining <= 3 && daysRemaining >= 0;

        let statusColor = SUCCESS_GREEN;
        let statusIcon = <ClockCircleOutlined />;
        let statusText = `${daysRemaining}d left`;

        if (isExpired) {
          statusColor = ERROR_RED;
          statusIcon = <ExclamationCircleOutlined />;
          statusText = `Expired`;
        } else if (isExpiringSoon) {
          statusColor = WARNING_ORANGE;
          statusIcon = <WarningOutlined />;
          statusText = `${daysRemaining}d left`;
        }

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {React.cloneElement(statusIcon, { style: { color: statusColor, fontSize: 14 } })}
            <span style={{ fontWeight: "bold", color: statusColor, fontSize: 12 }}>
              {dayjs(record.expiryDate).format("DD/MM/YYYY")}
            </span>
          </div>
        );
      }
    },
    { 
      title: "Checker Comment", 
      dataIndex: "checkerComments", 
      width: 200,
      render: (text) => (
        <div style={{ 
          fontSize: 12, 
          color: "#333",
          lineHeight: 1.4,
          backgroundColor: "#f8f9fa",
          padding: "8px",
          borderRadius: "4px"
        }}>
          {text}
        </div>
      )
    },
    { 
      title: "Decision Date", 
      dataIndex: "decisionDate", 
      width: 120,
      render: (date) => (
        <div style={{ fontWeight: 500, color: CHECKER_BLUE }}>
          {date ? dayjs(date).format("DD/MM/YYYY") : "-"}
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      width: 130,
      fixed: "right",
      render: (status) => (
        <div style={{ minWidth: 100 }}>
          <Tag 
            color={status === "Approved" ? SUCCESS_GREEN : ERROR_RED}
            style={{ 
              fontWeight: "bold",
              fontSize: 12,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              justifyContent: "center",
              minWidth: 90
            }}
            icon={status === "Approved" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          >
            {status}
          </Tag>
        </div>
      )
    }
  ];

  // All DCLs columns
  const allDCLColumns = [
    { 
      title: "DCL No", 
      dataIndex: "dclNo", 
      width: 180, 
      render: (text) => (
        <div style={{ fontWeight: "bold", color: CHECKER_BLUE, display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ color: SECONDARY_PURPLE }} />
          {text}
        </div>
      )
    },
    { 
      title: "Customer No", 
      dataIndex: "customerNumber", 
      width: 150, 
      render: (text) => (
        <div style={{ color: SECONDARY_PURPLE, fontWeight: 500, fontSize: 13 }}>
          {text}
        </div>
      )
    },
    { 
      title: "Customer Name", 
      dataIndex: "customerName", 
      width: 200, 
      render: (text, record) => (
        <div>
          <div style={{ 
            fontWeight: 600, 
            color: CHECKER_BLUE,
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 2
          }}>
            <CustomerServiceOutlined style={{ fontSize: 12 }} />
            {text}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>
            {record.product}
          </div>
        </div>
      )
    },
    { 
      title: "Document", 
      dataIndex: "documentName", 
      width: 200, 
      render: (text) => (
        <div>
          <div style={{ fontWeight: 600, color: CHECKER_BLUE }}>
            {text}
          </div>
        </div>
      )
    },
    { 
      title: "Creator", 
      dataIndex: "assignedCreator", 
      width: 120, 
      render: (creator) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <UserOutlined style={{ color: CHECKER_BLUE, fontSize: 12 }} />
          <span style={{ color: CHECKER_BLUE, fontWeight: 500, fontSize: 13 }}>{creator?.name || "N/A"}</span>
        </div>
      )
    },
    { 
      title: "RM", 
      dataIndex: "assignedRM", 
      width: 120, 
      render: (rm) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <UserOutlined style={{ color: CHECKER_TEAL, fontSize: 12 }} />
          <span style={{ color: CHECKER_TEAL, fontWeight: 500, fontSize: 13 }}>{rm?.name || "N/A"}</span>
        </div>
      )
    },
    { 
      title: "Timeline", 
      key: "timeline",
      width: 130,
      render: (_, record) => {
        const expiryDate = dayjs(record.expiryDate);
        const now = dayjs();
        const daysRemaining = expiryDate.diff(now, 'day');
        const isExpired = daysRemaining < 0;
        const isExpiringSoon = daysRemaining <= 3 && daysRemaining >= 0;

        let statusColor = SUCCESS_GREEN;
        let statusIcon = <ClockCircleOutlined />;
        let statusText = `${daysRemaining}d left`;

        if (isExpired) {
          statusColor = ERROR_RED;
          statusIcon = <ExclamationCircleOutlined />;
          statusText = `Expired`;
        } else if (isExpiringSoon) {
          statusColor = WARNING_ORANGE;
          statusIcon = <WarningOutlined />;
          statusText = `${daysRemaining}d left`;
        }

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {React.cloneElement(statusIcon, { style: { color: statusColor, fontSize: 14 } })}
            <span style={{ color: statusColor, fontWeight: "bold", fontSize: 12 }}>
              {statusText}
            </span>
          </div>
        );
      }
    },
    { 
      title: "Quality", 
      dataIndex: "qualityScore", 
      width: 100, 
      align: "center", 
      render: (score) => {
        if (score === null) return <Tag color="default">N/A</Tag>;
        
        let color = ERROR_RED;
        if (score >= 90) color = SUCCESS_GREEN;
        else if (score >= 70) color = WARNING_ORANGE;
        
        return (
          <Tag 
            color={color}
            style={{ 
              fontSize: 11, 
              borderRadius: 999, 
              fontWeight: "bold", 
              padding: "4px 8px",
              minWidth: 40
            }}
          >
            {score}
          </Tag>
        );
      } 
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      width: 120, 
      render: (status) => {
        const statusColor = status === "Completed" ? SUCCESS_GREEN :
                           status === "Active" ? INFO_BLUE :
                           status === "Deferred" ? WARNING_ORANGE : "default";
        
        return (
          <Tag 
            color={statusColor}
            style={{ 
              fontSize: 11, 
              borderRadius: 999, 
              fontWeight: "bold", 
              padding: "2px 8px"
            }}
          >
            {status}
          </Tag>
        );
      }
    },
    { 
      title: "Deferral Status", 
      dataIndex: "deferralStatus", 
      width: 140, 
      render: (status) => {
        if (status === "None") return <Tag>No Deferral</Tag>;
        if (status === "Approved") return (
          <Tag color="green" style={{ fontWeight: "bold" }}>
            Deferral Approved
          </Tag>
        );
        if (status === "Rejected") return (
          <Tag color="red" style={{ fontWeight: "bold" }}>
            Deferral Rejected
          </Tag>
        );
        return <Tag>{status}</Tag>;
      }
    }
  ];

  // Custom table styles
  const customTableStyles = `
    .checker-reports-table .ant-table-wrapper { 
      border-radius: 12px; 
      overflow: hidden; 
      box-shadow: 0 10px 30px rgba(22, 70, 121, 0.08); 
      border: 1px solid #e0e0e0; 
    }
    .checker-reports-table .ant-table-thead > tr > th { 
      background-color: #f7f7f7 !important; 
      color: ${CHECKER_BLUE} !important; 
      font-weight: 700; 
      font-size: 15px; 
      padding: 16px 16px !important; 
      border-bottom: 3px solid ${CHECKER_TEAL} !important; 
      border-right: none !important; 
    }
    .checker-reports-table .ant-table-tbody > tr > td { 
      border-bottom: 1px solid #f0f0f0 !important; 
      border-right: none !important; 
      padding: 14px 16px !important; 
      font-size: 14px; 
      color: #333; 
    }
    .checker-reports-table .ant-table-tbody > tr.ant-table-row:hover > td { 
      background-color: rgba(54, 207, 201, 0.1) !important; 
    }
    .checker-reports-table .ant-table-bordered .ant-table-container, 
    .checker-reports-table .ant-table-bordered .ant-table-tbody > tr > td, 
    .checker-reports-table .ant-table-bordered .ant-table-thead > tr > th { 
      border: none !important; 
    }
    .checker-reports-table .ant-pagination .ant-pagination-item-active { 
      background-color: ${CHECKER_TEAL} !important; 
      border-color: ${CHECKER_TEAL} !important; 
    }
    .checker-reports-table .ant-pagination .ant-pagination-item-active a { 
      color: white !important; 
      font-weight: 600; 
    }
    .checker-reports-table .ant-pagination .ant-pagination-item:hover { 
      border-color: ${CHECKER_TEAL} !important; 
    }
    .checker-reports-table .ant-pagination .ant-pagination-prev:hover .ant-pagination-item-link, 
    .checker-reports-table .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link { 
      color: ${CHECKER_TEAL} !important; 
    }
    .checker-reports-table .ant-pagination .ant-pagination-options .ant-select-selector { 
      border-radius: 8px !important; 
    }
  `;

  // Get current data for active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "postApproval":
        return filteredPostApprovalDeferrals;
      case "rejected":
        return filteredRejectedDeferrals;
      case "allDCLs":
        return filteredAllDCLs;
      default:
        return [];
    }
  };

  // Get current columns for active tab
  const getCurrentColumns = () => {
    switch (activeTab) {
      case "postApproval":
      case "rejected":
        return commonDeferralColumns;
      case "allDCLs":
        return allDCLColumns;
      default:
        return [];
    }
  };

  // Get tab title
  const getTabTitle = () => {
    switch (activeTab) {
      case "postApproval":
        return "Post-approval Deferrals";
      case "rejected":
        return "Rejected Deferrals";
      case "allDCLs":
        return "All DCLs";
      default:
        return "";
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <style>{customTableStyles}</style>

      {/* Header */}
      <Card
        style={{ 
          marginBottom: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderLeft: `4px solid ${CHECKER_TEAL}`
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h2 style={{ margin: 0, color: CHECKER_BLUE, display: "flex", alignItems: "center", gap: 12 }}>
              DCL Reports & Analytics
              <Badge 
                count={getCurrentDataCount()} 
                style={{ 
                  backgroundColor: CHECKER_TEAL,
                  fontSize: 12
                }}
              />
            </h2>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
              Comprehensive reports on deferrals and DCL statuses
            </p>
          </Col>
          
          <Col>
            <Space>
              <Tooltip title="Export Report">
                <Button 
                  icon={<DownloadOutlined />} 
                  onClick={exportReport}
                  disabled={getCurrentDataCount() === 0}
                >
                  Export Report
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Filters */}
      {renderFilters()}

      {/* Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onChange={(key) => {
          setActiveTab(key);
          clearAllFilters();
        }}
        type="card"
        size="large"
        style={{ marginBottom: 16 }}
      >
        <TabPane 
          tab={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircleOutlined />
              Post-approval Deferrals
            </span>
          } 
          key="postApproval"
        />
        <TabPane 
          tab={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CloseCircleOutlined />
              Rejected Deferrals
            </span>
          } 
          key="rejected"
        />
        <TabPane 
          tab={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FileTextOutlined />
              All DCLs
            </span>
          } 
          key="allDCLs"
        />
      </Tabs>

      {/* Table Title */}
      <Divider style={{ margin: "12px 0" }}>
        <span style={{ color: CHECKER_BLUE, fontSize: 16, fontWeight: 600 }}>
          {getTabTitle()} ({getCurrentDataCount()} items)
        </span>
      </Divider>

      {/* Table */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Spin tip="Loading reports..." />
        </div>
      ) : getCurrentDataCount() === 0 ? (
        <Empty 
          description={
            <div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No data found</p>
              <p style={{ color: "#999" }}>
                {searchText || dateRange || statusFilter !== "All" 
                  ? 'Try changing your filters' 
                  : 'No data available'}
              </p>
            </div>
          } 
          style={{ padding: 40 }} 
        />
      ) : (
        <div className="checker-reports-table">
          <Table 
            columns={getCurrentColumns()} 
            dataSource={getCurrentData()} 
            rowKey="id" 
            size="large" 
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true, 
              pageSizeOptions: ["10", "20", "50"], 
              position: ["bottomCenter"],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }} 
            rowClassName={(record, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
            scroll={{ x: 1400 }}
          />
        </div>
      )}

      {/* Footer Info */}
      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        background: "#f8f9fa", 
        borderRadius: 4,
        fontSize: 12,
        color: "#666"
      }}>
        <Row justify="space-between" align="middle">
          <Col>
            Report generated on: {dayjs().format('DD/MM/YYYY HH:mm:ss')}
          </Col>
          <Col>
            <Text type="secondary">
              Showing data as of latest system update
            </Text>
          </Col>
        </Row>
      </div>
    </div>
  );
}