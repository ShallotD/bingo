import React, { useState, useEffect } from "react";
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
  Descriptions,
  Tooltip,
  List
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  FileTextOutlined,
  UploadOutlined,
  BankOutlined,
  CalendarOutlined,
  FileOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileImageOutlined
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
  
  // User state - will be populated from your auth system
  const [currentUser, setCurrentUser] = useState({
    name: "",
    role: "",
    email: "",
    employeeId: ""
  });

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

  // File upload states
  const [dclFile, setDclFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  // ----------------------
  // EFFECT to get current user
  // ----------------------
  useEffect(() => {
    // This function should fetch the current logged-in user from your auth system
    // Replace this with your actual authentication logic
    const fetchCurrentUser = async () => {
      try {
        // Example: Get user from localStorage, context, or API
        const userData = localStorage.getItem('currentUser');
        
        if (userData) {
          // If you store user data in localStorage
          const parsedUser = JSON.parse(userData);
          setCurrentUser({
            name: parsedUser.name || "Current User",
            role: parsedUser.role || "Relationship Manager",
            email: parsedUser.email || "",
            employeeId: parsedUser.employeeId || ""
          });
        } else {
          // Mock user data for demonstration
          // In production, replace this with actual auth logic
          setCurrentUser({
            name: "John Doe", // This should come from your auth system
            role: "Relationship Manager",
            email: "john.doe@bank.com",
            employeeId: "EMP00123"
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Fallback to mock data
        setCurrentUser({
          name: "Current User",
          role: "Relationship Manager",
          email: "",
          employeeId: ""
        });
      }
    };

    fetchCurrentUser();
  }, []);

  // ----------------------
  // FORMAT LOAN TYPE FUNCTION
  // ----------------------
  const formatLoanType = (loanType) => {
    if (!loanType) return "Not selected";
    
    // Map lowercase values to display values
    const loanTypeMap = {
      "asset finance": "Asset Finance",
      "business loan": "Business Loan", 
      "consumer": "Consumer",
      "mortgage": "Mortgage",
      "construction": "Construction Loan",
      "shamba loan": "Shamba Loan"
    };
    
    return loanTypeMap[loanType.toLowerCase()] || 
           loanType.charAt(0).toUpperCase() + loanType.slice(1);
  };

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
  // FILE UPLOAD HANDLERS
  // ----------------------
  const handleDCLUpload = (file) => {
    // Check file type
    const allowedTypes = ['.pdf', '.PDF', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      message.error(`File type not allowed. Please upload: ${allowedTypes.join(', ')}`);
      return false;
    }
    
    setDclFile(file);
    message.success(`${file.name} selected for DCL upload`);
    return false; // Prevent auto upload
  };

  const handleAdditionalFileUpload = (file) => {
    // Check file type
    const allowedTypes = ['.pdf', '.PDF', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      message.error(`File type not allowed. Please upload: ${allowedTypes.join(', ')}`);
      return false;
    }
    
    // Add to existing files
    const newFileList = [...additionalFiles, file];
    setAdditionalFiles(newFileList);
    message.success(`${file.name} added to additional documents`);
    return false; // Prevent auto upload
  };

  const removeDCLFile = () => {
    setDclFile(null);
    message.info('DCL file removed');
  };

  const removeAdditionalFile = (file) => {
    const newFileList = additionalFiles.filter(f => f.uid !== file.uid);
    setAdditionalFiles(newFileList);
    message.info(`${file.name} removed`);
  };

  // ----------------------
  // DOCUMENT VIEW HANDLER
  // ----------------------
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: ERROR_RED }} />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined style={{ color: PRIMARY_BLUE }} />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined style={{ color: SUCCESS_GREEN }} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <FileImageOutlined style={{ color: WARNING_ORANGE }} />;
      default:
        return <FileOutlined />;
    }
  };

  const handleViewDocument = (file) => {
    if (file && file.originFileObj) {
      // Create a URL for the file
      const fileURL = URL.createObjectURL(file.originFileObj);
      
      // Open in new tab
      window.open(fileURL, '_blank');
      
      // Clean up the URL object after some time
      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 10000);
      
      message.info(`Opening ${file.name}`);
    } else if (file) {
      // If it's a file object directly
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 10000);
      message.info(`Opening ${file.name}`);
    }
  };

  // ----------------------
  // RENDER DOCUMENT LIST ITEMS
  // ----------------------
  const renderDocumentItem = (file, isDCL = false) => {
    const fileSize = file.size ? `${(file.size / 1024).toFixed(2)} KB` : 'Size unknown';
    
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        border: '1px solid #f0f0f0',
        borderRadius: '6px',
        marginBottom: '8px',
        backgroundColor: '#fafafa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {getFileIcon(file.name)}
          <div>
            <Text strong style={{ display: 'block', fontSize: '13px' }}>
              {file.name}
            </Text>
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {fileSize}
            </Text>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title="View document">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined style={{ color: PRIMARY_BLUE }} />}
              onClick={() => handleViewDocument(file)}
            />
          </Tooltip>
          <Tooltip title="Delete document">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => isDCL ? removeDCLFile() : removeAdditionalFile(file)}
            />
          </Tooltip>
        </div>
      </div>
    );
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
      
      if (!dclFile) {
        message.error("Please upload DCL document");
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
      
      // Get the first approver (or "Pending" if none selected)
      const firstApprover = approvers.find(a => a !== "") || "Pending";
      
      // Prepare files for submission
      const formData = new FormData();
      if (dclFile) {
        formData.append('dclDocument', dclFile);
      }
      
      additionalFiles.forEach((file, index) => {
        formData.append(`additionalDocument_${index}`, file);
      });
      
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
        currentApprover: firstApprover,
        status: "deferral_requested",
        dclNumber,
        dclFileName: dclFile ? dclFile.name : null,
        additionalFileCount: additionalFiles.length,
        createdAt: new Date().toISOString(),
        rmReason: deferralDescription,
        createdBy: currentUser.name,
        createdByRole: currentUser.role,
        createdByEmployeeId: currentUser.employeeId,
        loanType: formatLoanType(loanType)
      };

      console.log("Submitting deferral:", newDeferral);
      console.log("FormData files:", {
        dclFile: dclFile?.name,
        additionalFiles: additionalFiles.map(f => f.name)
      });
      
      // Add deferral data to formData
      Object.keys(newDeferral).forEach(key => {
        if (typeof newDeferral[key] === 'object') {
          formData.append(key, JSON.stringify(newDeferral[key]));
        } else {
          formData.append(key, newDeferral[key]);
        }
      });
      
      // Simulate API call with file upload
      message.loading({ content: 'Uploading files and submitting deferral...', key: 'submit', duration: 0 });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      message.success({
        content: (
          <div>
            <strong>Deferral submitted successfully!</strong>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              Deferral Number: {newDeferral.deferralNumber}
            </div>
            <div style={{ fontSize: '12px', marginTop: '2px' }}>
              Files uploaded: {1 + additionalFiles.length}
            </div>
          </div>
        ),
        duration: 4,
        key: 'submit'
      });
      
      // Navigate back to deferrals page after a short delay
      setTimeout(() => {
        navigate('/rm/deferrals/pending');
      }, 1500);
      
    } catch (error) {
      message.error({
        content: "Failed to submit deferral. Please try again.",
        key: 'submit'
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------
  // RENDER FUNCTIONS
  // ----------------------
  const renderCustomerInfoCard = () => {
    // Get the first selected approver or show "Pending" if none
    const firstApprover = approvers.find(a => a !== "") || "Pending";
    
    return (
      <Card
        size="small"
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 4,
              height: 20,
              backgroundColor: ACCENT_LIME,
              marginRight: 12,
              borderRadius: 2
            }} />
            {/* Changed to use Title level={4} to match Deferral Details */}
            <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
              Customer Information
            </Title>
          </div>
        }
        style={{
          marginBottom: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        headStyle={{
          borderBottom: "1px solid #f0f0f0",
          padding: "12px 16px",
        }}
        bodyStyle={{
          padding: "16px"
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
          <Descriptions.Item label="Approver">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text strong style={{ 
                color: firstApprover === "Pending" ? "#d9d9d9" : PRIMARY_PURPLE 
              }}>
                {firstApprover}
              </Text>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Loan Type">
            <Text strong style={{ color: SECONDARY_BLUE }}>
              {formatLoanType(loanType)}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  const renderDeferralDetailsCard = () => (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            width: 4,
            height: 20,
            backgroundColor: ACCENT_LIME,
            marginRight: 12,
            borderRadius: 2
          }} />
          {/* Removed FileTextOutlined icon and kept just the title */}
          <Title level={4} style={{ color: PRIMARY_PURPLE, margin: 0 }}>
            Deferral Details
          </Title>
        </div>
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
            {/* Updated Extension Details with same font styling as Customer Information */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 4,
                height: 20,
                backgroundColor: ACCENT_LIME,
                marginRight: 12,
                borderRadius: 2
              }} />
              <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
                Extension Details
              </Title>
            </div>
            
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
        
        {/* Document Picker Component - Imported with custom title */}
        <Col span={24}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 4,
                height: 20,
                backgroundColor: ACCENT_LIME,
                marginRight: 12,
                borderRadius: 2
              }} />
              <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
                Document Name
              </Title>
            </div>
          </div>
          <DocumentPicker 
            selectedDocuments={selectedDocuments}
            setSelectedDocuments={setSelectedDocuments}
          />
        </Col>
        
        <Col span={24}>
          <Text strong>Deferral Description</Text>
          <TextArea
            value={deferralDescription}
            onChange={(e) => setDeferralDescription(e.target.value)}
            rows={4}
            placeholder="Enter reason for deferral..."
            required
          />
        </Col>
        
        {/* Facility Table Component - Imported with custom title */}
        <Col span={24}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 4,
                height: 20,
                backgroundColor: ACCENT_LIME,
                marginRight: 12,
                borderRadius: 2
              }} />
              <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
                Facility Details
              </Title>
            </div>
          </div>
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
          {/* Updated Mandatory: DCL Upload with view and delete actions */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 4,
                height: 20,
                backgroundColor: ACCENT_LIME,
                marginRight: 12,
                borderRadius: 2
              }} />
              <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
                Mandatory: DCL Upload
              </Title>
            </div>
            <Upload
              disabled={!dclNumber}
              accept=".pdf,.PDF,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              beforeUpload={handleDCLUpload}
              fileList={[]}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} disabled={!dclNumber}>
                Upload DCL Document
              </Button>
            </Upload>
            
            {dclFile && (
              <div style={{ marginTop: 16 }}>
                {renderDocumentItem(dclFile, true)}
              </div>
            )}
            
            {!dclNumber ? (
              <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
                Please enter DCL number first
              </Text>
            ) : !dclFile ? (
              <Text type="secondary" style={{ display: "block", marginTop: 8, color: WARNING_ORANGE }}>
                DCL document is required for submission
              </Text>
            ) : (
              <div>
                <Text type="success" style={{ display: "block", marginTop: 8, fontSize: '12px' }}>
                  ✓ DCL document ready: {dclFile.name}
                </Text>
                <Text type="secondary" style={{ display: "block", marginTop: 4, fontSize: '10px' }}>
                  Click the eye icon to view or trash icon to delete
                </Text>
              </div>
            )}
            <Text type="secondary" style={{ display: "block", marginTop: 8, fontSize: '12px' }}>
              Accepted formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG
            </Text>
          </Card>
        </Col>
        
        <Col span={24}>
          {/* Updated Additional Documents with view and delete actions */}
          <Card size="small">
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 4,
                height: 20,
                backgroundColor: ACCENT_LIME,
                marginRight: 12,
                borderRadius: 2
              }} />
              <Title level={4} style={{ color: PRIMARY_BLUE, margin: 0 }}>
                Additional Documents
              </Title>
            </div>
            <Upload
              accept=".pdf,.PDF,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              beforeUpload={handleAdditionalFileUpload}
              fileList={[]}
              multiple
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>
                Upload Additional Documents
              </Button>
            </Upload>
            
            {additionalFiles.length > 0 && (
              <div style={{ marginTop: 16 }}>
                {additionalFiles.map((file, index) => (
                  <div key={file.uid || index}>
                    {renderDocumentItem(file)}
                  </div>
                ))}
                <div>
                  <Text type="success" style={{ display: "block", marginTop: 8, fontSize: '12px' }}>
                    ✓ {additionalFiles.length} additional document{additionalFiles.length !== 1 ? 's' : ''} ready
                  </Text>
                  <Text type="secondary" style={{ display: "block", marginTop: 4, fontSize: '10px' }}>
                    Click the eye icon to view or trash icon to delete each document
                  </Text>
                </div>
              </div>
            )}
            <Text type="secondary" style={{ display: "block", marginTop: 8, fontSize: '12px' }}>
              Upload multiple files: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG
            </Text>
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
        dclFileReady={!!dclFile}
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
                      <Option value="shamba loan">Shamba Loan</Option>
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