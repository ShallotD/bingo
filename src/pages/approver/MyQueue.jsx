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
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text, Title } = Typography;
const { confirm } = Modal;

// Theme colors
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";
const PROCESSING_BLUE = "#1890ff";

const MyQueue = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  // Handle Approve
  const handleApprove = (record) => {
    confirm({
      title: 'Approve Deferral Request',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Are you sure you want to approve this deferral request?</p>
          <p><strong>{record.deferralNumber}</strong> - {record.customerName}</p>
          <p>Days Sought: <strong>{record.daysSought}</strong> days</p>
          {record.category === "Non-Allowable" && (
            <p style={{ color: ERROR_RED, fontWeight: 'bold' }}>
              ⚠️ This is a Non-Allowable document
            </p>
          )}
        </div>
      ),
      okText: 'Yes, Approve',
      okType: 'primary',
      okButtonProps: { style: { background: SUCCESS_GREEN, borderColor: SUCCESS_GREEN } },
      cancelText: 'Cancel',
      onOk() {
        // Simulate API call
        setIsLoading(true);
        setTimeout(() => {
          // Move to actioned and update status
          setDeferrals(prev => prev.filter(d => d.id !== record.id));
          setIsLoading(false);
          message.success(`Deferral ${record.deferralNumber} approved successfully!`);
        }, 500);
      },
    });
  };

  // Handle Reject
  const handleReject = (record) => {
    confirm({
      title: 'Reject Deferral Request',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Are you sure you want to reject this deferral request?</p>
          <p><strong>{record.deferralNumber}</strong> - {record.customerName}</p>
          <p>Requested by: <strong>{record.rmName}</strong></p>
          <p>Please provide a reason for rejection:</p>
          <Input.TextArea rows={3} placeholder="Enter rejection reason..." style={{ marginTop: 8 }} />
        </div>
      ),
      okText: 'Yes, Reject',
      okType: 'danger',
      okButtonProps: { style: { background: ERROR_RED, borderColor: ERROR_RED } },
      cancelText: 'Cancel',
      onOk() {
        // Simulate API call
        setIsLoading(true);
        setTimeout(() => {
          // Move to actioned and update status
          setDeferrals(prev => prev.filter(d => d.id !== record.id));
          setIsLoading(false);
          message.success(`Deferral ${record.deferralNumber} rejected successfully!`);
        }, 500);
      },
    });
  };

  // Handle Forward
  const handleForward = (record) => {
    confirm({
      title: 'Forward Deferral Request',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Forward this deferral request to:</p>
          <Select style={{ width: '100%', marginTop: 8 }} placeholder="Select approver">
            <Option value="chief_risk">Chief Risk Officer</Option>
            <Option value="compliance">Compliance Department</Option>
            <Option value="legal">Legal Department</Option>
            <Option value="ceo">CEO Office</Option>
          </Select>
        </div>
      ),
      okText: 'Forward',
      okType: 'default',
      cancelText: 'Cancel',
      onOk() {
        message.success(`Deferral ${record.deferralNumber} forwarded successfully!`);
      },
    });
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

  // Standardized Columns for the table
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
          <Tag
            color={config.color}
            icon={config.icon}
            style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Days Sought",
      dataIndex: "daysSought",
      width: 100,
      align: "center",
      render: (daysSought) => (
        <Tag color={daysSought > 30 ? ERROR_RED : daysSought > 15 ? WARNING_ORANGE : SUCCESS_GREEN}>
          {daysSought}d
        </Tag>
      ),
    },
    {
      title: "SLA",
      dataIndex: "slaExpiry",
      width: 100,
      render: (date, record) => {
        if (record.status !== "pending_approval" && record.status !== "in_review") {
          return <Tag color="default">N/A</Tag>;
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
          <Tag color={color} style={{ fontWeight: "bold", fontSize: 11 }}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      width: 200,
      fixed: "right",
      render: (record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              // Open detailed view modal
              message.info(`Opening detailed view for ${record.deferralNumber}`);
            }}
            style={{
              background: PRIMARY_BLUE,
              borderColor: PRIMARY_BLUE,
            }}
          >
            Review
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleApprove(record);
            }}
            style={{
              background: SUCCESS_GREEN,
              borderColor: SUCCESS_GREEN,
            }}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleReject(record);
            }}
          />
          <Button
            type="default"
            size="small"
            icon={<MoreOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleForward(record);
            }}
          />
        </Space>
      ),
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
            scroll={{ x: 1500 }}
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
                // Open detailed view
                message.info(`Opening detailed view for ${record.deferralNumber}`);
              },
            })}
          />
        </div>
      </Card>
    </div>
  );
};

export default MyQueue;









