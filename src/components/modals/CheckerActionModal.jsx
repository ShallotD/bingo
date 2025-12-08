import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Card,
  message,
  Tag,
  Row,
  Col,
  Space,
  Radio,
  Alert
} from "antd";
import { 
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
  WarningOutlined
} from "@ant-design/icons";

const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SUCCESS_GREEN = "#52c41a";
const ERROR_RED = "#ff4d4f";

const { TextArea } = Input;

const customStyles = `
  .ant-modal-header { background-color: white !important; color: ${PRIMARY_BLUE} !important; }
  .ant-input, .ant-input-textarea { border-radius: 6px !important; }
`;

const CheckerActionModal = ({ checklist, open, onClose }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleDocumentSelect = (docId, selected) => {
    if (selected) {
      setSelectedDocuments([...selectedDocuments, docId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    }
  };

  const handleSubmit = async (values) => {
    if (!values.decision) {
      message.error("Please select a decision");
      return;
    }

    if (values.decision === 'reject' && (!values.checkerComment || values.checkerComment.trim() === '')) {
      message.error("Please provide comments when rejecting");
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      message.success(
        values.decision === 'approve' 
          ? "DCL approved successfully!" 
          : "DCL returned to Creator successfully!"
      );
      setSubmitting(false);
      onClose();
    }, 1500);
  };

  // Calculate document stats
  const getDocumentStats = () => {
    const total = checklist?.documents?.reduce((total, category) => 
      total + (category.docList?.length || 0), 0) || 0;
    
    const approved = checklist?.documents?.reduce((total, category) => 
      total + (category.docList?.filter(doc => doc.status === 'approved')?.length || 0), 0) || 0;
    
    return { total, approved };
  };

  const { total, approved } = getDocumentStats();

  return (
    <>
      <style>{customStyles}</style>
      <Modal
        title={`Review DCL - ${checklist?.dclNo}`}
        open={open}
        onCancel={() => !submitting && onClose()}
        width={800}
        footer={null} // We'll handle footer in form
        closable={!submitting}
        maskClosable={!submitting}
      >
        {submitting && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            borderRadius: 8,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', color: PRIMARY_BLUE, marginBottom: 16 }}>
                {actionType === 'approve' ? 'Approving DCL...' : 'Returning DCL to Creator...'}
              </div>
            </div>
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={submitting}
        >
          {/* Checklist Info */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ fontWeight: 'bold', color: PRIMARY_BLUE, fontSize: 16 }}>
                  {checklist?.title}
                </div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                  Customer: {checklist?.customerName} ({checklist?.customerNumber}) • 
                  Loan Type: {checklist?.loanType}
                </div>
              </Col>
              <Col>
                <Tag color={PRIMARY_BLUE} style={{ fontWeight: 'bold', fontSize: 12 }}>
                  Pending Final Check
                </Tag>
              </Col>
            </Row>
          </Card>

          {/* Creator Comments */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: PRIMARY_BLUE, marginBottom: 8, fontSize: 14 }}>
              Creator's Comments
            </h4>
            <Card size="small" style={{ background: '#f0f5ff', fontSize: 13 }}>
              {checklist?.creatorGeneralComment || "No comments provided by creator"}
            </Card>
          </div>

          {/* Document Status Summary */}
          <div style={{ 
            marginBottom: 16,
            padding: "12px",
            background: approved === total ? "#f6ffed" : "#fff7e6",
            borderRadius: 6,
            border: `1px solid ${approved === total ? "#b7eb8f" : "#ffd591"}`
          }}>
            <div style={{ 
              fontWeight: 600, 
              color: approved === total ? SUCCESS_GREEN : WARNING_ORANGE,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              {approved === total ? <CheckCircleOutlined /> : <WarningOutlined />}
              Document Status Summary
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {approved} of {total} documents approved by Creator • 
              {approved === total 
                ? " All documents are ready for final review" 
                : " Some documents may need attention"}
            </div>
          </div>

          {/* Documents List */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: PRIMARY_BLUE, marginBottom: 8, fontSize: 14 }}>
              Documents for Review
            </h4>
            {checklist?.documents?.map((category, catIndex) => (
              <div key={catIndex} style={{ marginBottom: 12 }}>
                <div style={{ 
                  padding: "8px 12px", 
                  background: "#f0f5ff",
                  borderRadius: 4,
                  marginBottom: 8,
                  fontWeight: 600,
                  color: PRIMARY_BLUE,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  <FileTextOutlined />
                  {category.category}
                </div>
                
                {category.docList.map((doc, docIndex) => (
                  <Card 
                    key={doc._id}
                    size="small" 
                    style={{ 
                      marginBottom: 8,
                      borderLeft: `4px solid ${doc.status === 'approved' ? SUCCESS_GREEN : ACCENT_LIME}`
                    }}
                  >
                    <Row justify="space-between" align="middle">
                      <Col span={16}>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{doc.name}</div>
                        {doc.creatorComment && (
                          <div style={{ fontSize: 11, color: '#666', background: '#f5f5f5', 
                            padding: '4px 8px', borderRadius: 3, marginTop: 4 }}>
                            <span style={{ fontWeight: 500, color: PRIMARY_BLUE }}>Creator:</span> {doc.creatorComment}
                          </div>
                        )}
                      </Col>
                      <Col span={8} style={{ textAlign: 'right' }}>
                        <Space>
                          <Tag color={doc.status === 'approved' ? SUCCESS_GREEN : ACCENT_LIME} 
                            style={{ fontWeight: 500, fontSize: 11 }}>
                            {doc.status === 'approved' ? 'Approved' : 'Pending'}
                          </Tag>
                          <Button
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => window.open(doc.fileUrl, "_blank")}
                            disabled={!doc.fileUrl}
                          >
                            View
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            ))}
          </div>

          {/* Decision Section */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: PRIMARY_BLUE, marginBottom: 8, fontSize: 14 }}>
              Your Decision
            </h4>
            <Form.Item
              name="decision"
              rules={[{ required: true, message: 'Please select a decision' }]}
            >
              <Radio.Group style={{ width: '100%' }} disabled={submitting}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card 
                      hoverable
                      onClick={() => form.setFieldsValue({ decision: 'approve' })}
                      style={{ 
                        textAlign: 'center',
                        borderColor: SUCCESS_GREEN,
                        background: form.getFieldValue('decision') === 'approve' ? '#f6ffed' : 'white'
                      }}
                    >
                      <CheckCircleOutlined style={{ fontSize: 24, color: SUCCESS_GREEN, marginBottom: 8 }} />
                      <div style={{ fontWeight: 'bold', color: SUCCESS_GREEN }}>Approve</div>
                      <div style={{ fontSize: 12, color: '#666' }}>Final approval for this DCL</div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card 
                      hoverable
                      onClick={() => form.setFieldsValue({ decision: 'reject' })}
                      style={{ 
                        textAlign: 'center',
                        borderColor: ERROR_RED,
                        background: form.getFieldValue('decision') === 'reject' ? '#fff2f0' : 'white'
                      }}
                    >
                      <CloseCircleOutlined style={{ fontSize: 24, color: ERROR_RED, marginBottom: 8 }} />
                      <div style={{ fontWeight: 'bold', color: ERROR_RED }}>Return to Creator</div>
                      <div style={{ fontSize: 12, color: '#666' }}>Needs clarification or correction</div>
                    </Card>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Comments */}
          <Form.Item
            name="checkerComment"
            label="Your Comments"
            rules={[
              { required: true, message: 'Please provide your comments' },
              { 
                validator: (_, value) => {
                  if (form.getFieldValue('decision') === 'reject' && (!value || value.trim() === '')) {
                    return Promise.reject(new Error('Comments are required when rejecting'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <TextArea 
              rows={4}
              placeholder="Enter your review comments... (Required when rejecting)"
              disabled={submitting}
            />
          </Form.Item>

          {/* Action Buttons */}
          <div style={{ 
            marginTop: 24, 
            paddingTop: 16, 
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12
          }}>
            <Button 
              size="large" 
              onClick={onClose} 
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              size="large"
              danger
              icon={<CloseCircleOutlined />}
              loading={submitting && actionType === 'reject'}
              disabled={submitting}
              onClick={() => {
                setActionType('reject');
                form.submit();
              }}
            >
              Return to Creator
            </Button>
            <Button 
              size="large"
              type="primary"
              icon={<CheckCircleOutlined />}
              loading={submitting && actionType === 'approve'}
              disabled={submitting}
              onClick={() => {
                setActionType('approve');
                form.submit();
              }}
            >
              Approve
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CheckerActionModal;