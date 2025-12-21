// src/pages/approver/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Progress,
  Timeline,
  Avatar,
  Badge,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text } = Typography;

// Theme colors
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";
const WARNING_ORANGE = "#faad14";
const PROCESSING_BLUE = "#1890ff";

const Dashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    pending: 12,
    inReview: 8,
    approved: 24,
    rejected: 4,
    total: 48,
    avgProcessingTime: "2.5 hours",
    slaCompliance: "92%",
  });

  const [recentDeferrals, setRecentDeferrals] = useState([
    {
      id: "DF-001",
      customerName: "JOHN DOE ENTERPRISES",
      deferralTitle: "Annual Report Deferral",
      daysSought: 30,
      requestedDate: "2024-01-15",
      status: "pending_approval",
      priority: "high",
    },
    {
      id: "DF-002",
      customerName: "SMART TECH SOLUTIONS",
      deferralTitle: "Financial Statement Extension",
      daysSought: 45,
      requestedDate: "2024-01-14",
      status: "in_review",
      priority: "medium",
    },
    {
      id: "DF-003",
      customerName: "GLOBAL LOGISTICS LTD",
      deferralTitle: "Audit Report Deferral",
      daysSought: 15,
      requestedDate: "2024-01-13",
      status: "approved",
      priority: "low",
    },
  ]);

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    {
      id: "DF-004",
      title: "Credit Review - ABC Corp",
      deadline: "2024-01-18",
      daysLeft: 2,
      priority: "high",
    },
    {
      id: "DF-005",
      title: "Financial Analysis - XYZ Ltd",
      deadline: "2024-01-20",
      daysLeft: 4,
      priority: "medium",
    },
    {
      id: "DF-006",
      title: "Risk Assessment - DEF Inc",
      deadline: "2024-01-22",
      daysLeft: 6,
      priority: "low",
    },
  ]);

  useEffect(() => {
    // Fetch dashboard data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: "Pending Review",
      value: stats.pending,
      icon: <ClockCircleOutlined />,
      color: WARNING_ORANGE,
      suffix: "",
      action: () => navigate("/approver/queue"),
    },
    {
      title: "In Review",
      value: stats.inReview,
      icon: <FileTextOutlined />,
      color: PROCESSING_BLUE,
      suffix: "",
      action: () => navigate("/approver/queue?tab=in-review"),
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <CheckCircleOutlined />,
      color: SUCCESS_GREEN,
      suffix: "",
      action: () => navigate("/approver/history?status=approved"),
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <CloseCircleOutlined />,
      color: ERROR_RED,
      suffix: "",
      action: () => navigate("/approver/history?status=rejected"),
    },
    {
      title: "SLA Compliance",
      value: stats.slaCompliance,
      icon: <BarChartOutlined />,
      color: PRIMARY_BLUE,
      suffix: "",
      action: () => navigate("/approver/reports"),
    },
    {
      title: "Avg Processing Time",
      value: stats.avgProcessingTime,
      icon: <TeamOutlined />,
      color: ACCENT_LIME,
      suffix: "",
      action: () => navigate("/approver/reports"),
    },
  ];

  const columns = [
    {
      title: "Deferral ID",
      dataIndex: "id",
      width: 100,
      render: (id) => (
        <Text strong style={{ color: PRIMARY_BLUE }}>
          {id}
        </Text>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      width: 150,
    },
    {
      title: "Title",
      dataIndex: "deferralTitle",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Days",
      dataIndex: "daysSought",
      width: 80,
      render: (days) => (
        <Tag color={days > 30 ? ERROR_RED : days > 15 ? WARNING_ORANGE : PROCESSING_BLUE}>
          {days}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => {
        const statusConfig = {
          pending_approval: { color: WARNING_ORANGE, text: "Pending" },
          in_review: { color: PROCESSING_BLUE, text: "In Review" },
          approved: { color: SUCCESS_GREEN, text: "Approved" },
          rejected: { color: ERROR_RED, text: "Rejected" },
        };
        const config = statusConfig[status] || { color: "default", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 100,
      render: (priority) => (
        <Tag color={
          priority === 'high' ? ERROR_RED :
          priority === 'medium' ? WARNING_ORANGE :
          SUCCESS_GREEN
        }>
          {priority}
        </Tag>
      ),
    },
    {
      title: "Action",
      width: 100,
      render: (record) => (
        <Button
          type="link"
          onClick={() => navigate(`/approver/deferrals/${record.id}`)}
          style={{ color: PRIMARY_BLUE, padding: 0 }}
        >
          Review <ArrowRightOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      {/* Welcome Header */}
      <Card
        style={{
          marginBottom: 24,
          background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, #1e3a8a 100%)`,
          color: "white",
          borderRadius: 12,
          border: "none",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ color: "white", margin: 0 }}>
              Welcome back, Approver User
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
              Here's what's happening with your deferral requests today
            </Text>
          </Col>
          <Col>
            <Avatar
              size={64}
              style={{ backgroundColor: ACCENT_LIME, color: PRIMARY_BLUE }}
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={4} key={index}>
            <Card
              size="small"
              hoverable
              onClick={card.action}
              style={{
                borderLeft: `4px solid ${card.color}`,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <Statistic
                title={card.title}
                value={card.value}
                prefix={
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: `${card.color}15`,
                      marginRight: 8,
                    }}
                  >
                    {card.icon}
                  </div>
                }
                valueStyle={{ color: card.color, fontWeight: "bold" }}
                suffix={card.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content Area */}
      <Row gutter={[24, 24]}>
        {/* Recent Deferrals */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Title level={5} style={{ margin: 0, color: PRIMARY_BLUE }}>
                <FileTextOutlined style={{ marginRight: 8 }} />
                Recent Deferral Requests
              </Title>
            }
            extra={
              <Button
                type="link"
                onClick={() => navigate("/approver/queue")}
                style={{ color: PRIMARY_BLUE }}
              >
                View All <ArrowRightOutlined />
              </Button>
            }
            style={{ borderRadius: 12 }}
          >
            <Table
              columns={columns}
              dataSource={recentDeferrals}
              rowKey="id"
              pagination={false}
              loading={loading}
              size="small"
            />
          </Card>
        </Col>

        {/* Upcoming Deadlines */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Title level={5} style={{ margin: 0, color: PRIMARY_BLUE }}>
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                Upcoming Deadlines
              </Title>
            }
            style={{ borderRadius: 12 }}
          >
            <Timeline>
              {upcomingDeadlines.map((item, index) => (
                <Timeline.Item
                  key={index}
                  color={
                    item.priority === 'high' ? ERROR_RED :
                    item.priority === 'medium' ? WARNING_ORANGE :
                    SUCCESS_GREEN
                  }
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <Text strong>{item.title}</Text>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        Due: {dayjs(item.deadline).format("DD MMM YYYY")}
                      </div>
                    </div>
                    <Badge
                      count={`${item.daysLeft} days`}
                      style={{
                        backgroundColor:
                          item.daysLeft <= 2 ? ERROR_RED :
                          item.daysLeft <= 5 ? WARNING_ORANGE :
                          SUCCESS_GREEN,
                      }}
                    />
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() => navigate("/approver/queue")}
                style={{
                  background: PRIMARY_BLUE,
                  borderColor: PRIMARY_BLUE,
                }}
              >
                View All Deadlines
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Additional Stats Row */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card
            title="Approval Rate Trend"
            style={{ borderRadius: 12 }}
          >
            <div style={{ padding: 20, textAlign: "center" }}>
              <Progress
                type="dashboard"
                percent={85}
                strokeColor={SUCCESS_GREEN}
                width={150}
                format={(percent) => `${percent}% Approval`}
              />
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Last 30 days approval rate</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Quick Actions"
            style={{ borderRadius: 12 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                block
                size="large"
                onClick={() => navigate("/approver/queue")}
                style={{
                  background: PRIMARY_BLUE,
                  borderColor: PRIMARY_BLUE,
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Review Pending Requests</span>
                <Badge count={stats.pending} />
              </Button>
              <Button
                block
                size="large"
                onClick={() => navigate("/approver/history")}
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>View Decision History</span>
                <ArrowRightOutlined />
              </Button>
              <Button
                block
                size="large"
                onClick={() => navigate("/approver/reports")}
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Generate Reports</span>
                <BarChartOutlined />
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;