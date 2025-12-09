import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Table,
  Input,
  Button,
  Tag,
  Space,
  Progress,
  Row,
  Col,
} from "antd";
import {
  CheckCircleOutlined,
  EyeOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GREEN = "#52c41a";
const ORANGE = "#ffa940";
const RED = "red";

const CheckerReviewChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState([]);
  const [checkerComment, setCheckerComment] = useState("");
  const [commentThread, setCommentThread] = useState([]);

  useEffect(() => {
    if (!checklist || !checklist.documents) return;
    const flattened = checklist.documents.reduce((acc, catObj) => {
      const mapped = catObj.docList.map((doc) => ({
        ...doc,
        category: catObj.category,
        status: "submitted",
        approved: false,
      }));
      return acc.concat(mapped);
    }, []);
    setDocs(flattened);

    setCheckerComment(checklist?.checkerComment || "");
    setCommentThread(checklist?.commentThread || []);
  }, [checklist]);

  const handleDocApprove = (index) => {
    setDocs((prev) => {
      const updated = [...prev];
      updated[index].approved = true;
      updated[index].status = "submitted";
      return updated;
    });
  };

  const handleDocReject = (index) => {
    setDocs((prev) => {
      const updated = [...prev];
      updated[index].approved = false;
      updated[index].status = "pending"; // rejected becomes pending
      return updated;
    });
  };

  const submitCheckerAction = (action) => {
    console.log("Action:", action, docs, checkerComment, commentThread);
    onClose();
  };

  const postComment = () => {
    if (!checkerComment.trim()) return; // ignore empty comment

    const newComment = {
      user: "Checker", // Replace with actual user name if needed
      comment: checkerComment,
      time: new Date().toLocaleString(),
    };

    setCommentThread((prev) => [newComment, ...prev]);
    setCheckerComment(""); // clear input after posting
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Checklist - DCL No: ${checklist?.dclNo}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Loan Type: ${checklist?.loanType}`, 14, 28);
    doc.text(`Created By: ${checklist?.createdBy?.name}`, 14, 36);
    doc.text(`Co-Checker: ${checklist?.coChecker || "Pending"}`, 14, 44);
    doc.text(`Checker Comment: ${checkerComment || "N/A"}`, 14, 52);

    const tableColumn = ["Category", "Document Name", "Status", "Co Comment"];
    const tableRows = docs.map((d) => [
      d.category,
      d.name,
      d.status === "submitted" ? "Submitted" : "Pending",
      d.coComment || "",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    doc.save(`Checklist_${checklist?.dclNo}.pdf`);
  };

  const columns = [
    { title: "Category", dataIndex: "category" },
    { title: "Document Name", dataIndex: "name" },
    {
      title: "Co Status",
      render: (_, record) => {
        if (record.status === "pending") return <Tag color={RED}>Pending</Tag>;
        return <Tag color={record.approved ? GREEN : ORANGE}>Submitted</Tag>;
      },
    },
    { title: "Co Comment", dataIndex: "coComment" },
    {
      title: "Action",
      render: (_, record, index) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleDocApprove(index)}
            disabled={record.status === "pending"} // cannot approve pending doc
          >
            Approve
          </Button>
          <Button danger size="small" onClick={() => handleDocReject(index)}>
            Reject
          </Button>
          {/* Only show View button if file exists */}
          {record.fileUrl && (
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => window.open(record.fileUrl, "_blank")}
            >
              View
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const totalDocs = docs.length;
  const approvedDocs = docs.filter((d) => d.approved).length;
  const pendingDocs = docs.filter((d) => d.status === "pending").length;
  const submittedDocs = docs.filter((d) => d.status === "submitted" && d.approved).length;
  const progressPercent = totalDocs ? (submittedDocs / totalDocs) * 100 : 0;

  const allApproved = totalDocs > 0 && docs.every((d) => d.approved);
  const hasPending = docs.some((d) => d.status === "pending");

  return (
    <Modal
      title="Review Checklist"
      open={open}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      {/* Checklist Details */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <p>
              <b>DCL No:</b>{" "}
              <span style={{ color: "#6b52b0" }}>{checklist?.dclNo}</span>
            </p>
            <p>
              <b>Loan Type:</b> <b>{checklist?.loanType}</b>
            </p>
          </Col>
          <Col span={8}>
            <p>
              <b>Created By:</b> {checklist?.createdBy?.name}
            </p>
            <p>
              <b>RM:</b> {checklist?.rm || "N/A"}
            </p>
          </Col>
          <Col span={8}>
            <p>
              <b>Co-Checker:</b> {checklist?.coChecker || "Pending"}
            </p>
            <p>
              <b>Created At:</b> {checklist?.createdAt}
            </p>
          </Col>
        </Row>
      </Card>

      {/* Progress Summary */}
      <Card style={{ marginBottom: 16 }}>
        <p>
          <b>Total:</b> {totalDocs} &nbsp; | &nbsp;
          <b>Submitted:</b> {submittedDocs} &nbsp; | &nbsp;
          <b style={{ color: RED }}>Pending:</b> {pendingDocs}
        </p>
        <Progress percent={progressPercent} showInfo={false} strokeColor={GREEN} />
      </Card>

      {/* Documents Table */}
      <Table columns={columns} dataSource={docs} pagination={false} />

      {/* Comment Section */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        {/* Editable Checker Comment */}
        <Col span={12}>
          <Card title="Checker Comment">
            <Input.TextArea
              rows={3}
              value={checkerComment}
              onChange={(e) => setCheckerComment(e.target.value)}
              placeholder="Add your comment here..."
            />
            <Button
              type="primary"
              style={{ marginTop: 8 }}
              onClick={postComment}
            >
              Post Comment
            </Button>
          </Card>
        </Col>

        {/* Comment Thread (read-only) */}
        <Col span={12}>
          <Card
            title="Comment Thread"
            style={{ maxHeight: 160, overflowY: "auto" }}
          >
            {commentThread.map((c, idx) => (
              <p key={idx}>
                <b>{c.user}:</b> {c.comment}{" "}
                <i style={{ fontSize: 10 }}>{c.time}</i>
              </p>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Bottom Buttons */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Button icon={<UploadOutlined />}>Upload Documents</Button>
          <Button icon={<DownloadOutlined />} onClick={downloadPDF}>
            Download Checklist
          </Button>
        </Space>

        <Space>
          <Button danger onClick={() => submitCheckerAction("returned")}>
            Return to Creator
          </Button>

          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => submitCheckerAction("approved")}
            disabled={!allApproved || hasPending} // cannot approve if any pending
            style={{
              backgroundColor: !allApproved || hasPending ? "#d9d9d9" : undefined,
            }}
          >
            Approve
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CheckerReviewChecklistModal;


