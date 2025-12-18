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
  message
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
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // Add this import

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

export default function DeferralForm({ userId, onSuccess }) {
  const navigate = useNavigate(); // Add navigate hook
  
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
        approverFlow: approvers,
        currentApprover: approvers[0] || "Not Assigned",
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
          <Text strong>Deferral Description (Reason)</Text>
          <TextArea
            value={deferralDescription}
            onChange={(e) => setDeferralDescription(e.target.value)}
            rows={4}
            placeholder="Enter reason for deferral..."
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
      <Title level={4} style={{ color: PRIMARY_PURPLE, marginBottom: 24 }}>
        <UserOutlined style={{ marginRight: 8 }} />
        Approver Flow
      </Title>
      
      <Steps
        direction="vertical"
        current={-1}
        items={approvers.map((approver, index) => ({
          title: approver || `Approver ${index + 1}`,
          description: index === 0 ? "First Approver" : `Step ${index + 1}`,
        }))}
      />
      
      <Divider />
      
      <Space direction="vertical" style={{ width: "100%" }}>
        {approvers.map((approver, index) => (
          <Input
            key={index}
            value={approver}
            onChange={(e) => updateApprover(index, e.target.value)}
            placeholder={`Enter approver ${index + 1} email`}
            addonAfter={
              approvers.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeApprover(index)}
                  size="small"
                />
              )
            }
            style={{ marginBottom: 8 }}
          />
        ))}
        
        <Button
          icon={<PlusOutlined />}
          onClick={addApprover}
          style={{ width: "100%" }}
        >
          Add Approver
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

