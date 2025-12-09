import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tag,
  Modal,
  Input,
  Card,
  Descriptions,
  message,
  Space,
  Upload,
  Select,
} from "antd";

import {
  UploadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { useSubmitRmChecklistMutation } from "../../api/checklistApi";

// ------------------ COLORS ------------------
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";
const SECONDARY_PURPLE = "#7e6496";

// CUSTOM STYLES ------------------
const customStyles = `... same as yours ...`;

const ReviewChecklistModal = ({ checklist, open, onClose }) => {
  const [docs, setDocs] = useState([]);
  const [rmGeneralComment, setRmGeneralComment] = useState("");

  const [submitRmChecklist, { isLoading }] = useSubmitRmChecklistMutation();

  // ------------------------------ PREPARE DOCS
  useEffect(() => {
    if (!checklist || !checklist.documents) return;

    const flattenedDocs = checklist.documents.reduce((acc, categoryObj) => {
      const filteredDocs = categoryObj.docList
        .filter((doc) => doc.name?.trim() !== "")
        .map((doc) => ({
          ...doc,
          category: categoryObj.category,
        }));
      return acc.concat(filteredDocs);
    }, []);

    const preparedDocs = flattenedDocs.map((doc, idx) => ({
      ...doc,
      docIdx: idx,
      status: doc.status || "pending",
      comment: doc.comment || "",
      action: doc.action || "pending",
      fileUrl: doc.fileUrl || null,
      rmStatus: doc.rmStatus || "Pending from Customer",
      deferralReason: doc.deferralReason || "",
    }));

    setDocs(preparedDocs);
  }, [checklist]);

  // ------------------------------ STATUS TAG
  const renderStatusTag = (key) => {
    const map = {
      sighted: { color: PRIMARY_BLUE, text: "Sighted", icon: <EyeOutlined /> },
      pending: { color: "#fadb14", text: "Pending", icon: <ClockCircleOutlined /> },
      submitted: { color: "#52c41a", text: "Submitted", icon: <CheckCircleOutlined /> },
      deferred: { color: "#ff4d4f", text: "Deferred", icon: <CloseCircleOutlined /> },
    };

    const s = map[key?.toLowerCase()] || {
      color: "gray",
      text: key || "Unknown",
      icon: <SyncOutlined spin />,
    };

    return (
      <Tag
        className="status-tag"
        style={{
          color: s.color,
          backgroundColor: s.color + "22",
          borderColor: s.color + "55",
        }}
      >
        {s.icon}
        {s.text}
      </Tag>
    );
  };

  // ------------------------------ UPLOAD
  const handleFileUpload = (docIdx, file) => {
    setDocs((prev) =>
      prev.map((d, idx) => (idx === docIdx ? { ...d, fileUrl: URL.createObjectURL(file) } : d))
    );
    message.success(`File "${file.name}" uploaded successfully!`);
    return false;
  };

  // ------------------------------ SUBMIT

  const submitRM = async () => {
  try {
    if (!checklist?._id) throw new Error("Checklist ID missing");

    const payload = {
      checklistId: checklist._id,
      documents: docs.map((doc) => ({
        _id: doc._id,
        name: doc.name,
        category: doc.category,
        status: doc.status,
        action: doc.action,
        comment: doc.comment,
        fileUrl: doc.fileUrl || null,
      })),
    };

    await submitRmChecklist(payload).unwrap();

    // Refresh UI
    if (checklist?.refetch) checklist.refetch();

    message.success("Checklist submitted to RM!");
    onClose();

  } catch (err) {
    console.error(err);
    message.error(err?.data?.error || "Failed to submit checklist to RM");
  }
};

  // const submitToCO = async () => {
  //   try {
  //     const payload = {
  //       checklistId: checklist._id,
  //       documents: docs.map((doc) => ({
  //         _id: doc._id,
  //         name: doc.name,
  //         category: doc.category,
  //         status: doc.status,
  //         action: doc.action,
  //         comment: doc.comment,
  //         fileUrl: doc.fileUrl,
  //         deferralReason: doc.deferralReason,
  //         rmStatus: doc.rmStatus,
  //       })),
  //       rmGeneralComment,
  //     };

  //     const response = await submitRmChecklist(payload);
  //     console.log("submit checklist" ,response)
  //     message.success(response.data);
  //     onClose();
  //   } catch (err) {
  //     message.error("Failed to submit checklist");
  //     console.error(err);
  //   }
  // };

  // ------------------------------ SUMMARY COUNTS
  const total = docs.length;
  const pending = docs.filter((d) => d.rmStatus === "Pending from Customer").length;
  const submitted = docs.filter((d) => d.rmStatus === "Submitted for review").length;
  const deferred = docs.filter((d) => d.rmStatus === "Deferral Requested").length;

  const progressPercent =
    total === 0 ? 0 : Math.round((submitted / total) * 100);

  // ------------------------------ COLUMNS
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      render: (text) => (
        <span style={{ color: SECONDARY_PURPLE, fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Document Name",
      dataIndex: "name",
      width: 150,
      render: (text) => <Input size="small" value={text} disabled />,
    },
    {
      title: "Status from CO",
      dataIndex: "status",
      width: 100,
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Comment from CO",
      dataIndex: "comment",
      width: 150,
      render: (text) => <Input.TextArea rows={1} size="small" value={text} disabled />,
    },
    {
      title: "Actions",
      width: 150,
      render: (_, record) => (
        <Space size={4}>
          <Upload showUploadList={false} beforeUpload={(f) => handleFileUpload(record.docIdx, f)}>
            <Button size="small" icon={<UploadOutlined />} style={{ borderRadius: 6 }}>
              Upload
            </Button>
          </Upload>

          {record.fileUrl && (
            <>
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => window.open(record.fileUrl, "_blank")}
                style={{ borderRadius: 6 }}
              >
                View
              </Button>
              <Button
                size="small"
                danger
                onClick={() => {
                  setDocs((p) =>
                    p.map((d, i) => (i === record.docIdx ? { ...d, fileUrl: null } : d))
                  );
                  message.success("Uploaded file deleted.");
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
    {
      title: "RM Status",
      width: 200,
      render: (_, record) => {
        const statusKey =
          {
            "Pending from Customer": "pending",
            "Submitted for review": "submitted",
            "Deferral Requested": "deferred",
          }[record.rmStatus] || "pending";

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {renderStatusTag(statusKey)}

            {record.rmStatus === "Deferral Requested" && (
              <Input
                size="small"
                placeholder="Deferral no."
                value={record.deferralReason}
                style={{ width: 120 }}
                onChange={(e) =>
                  setDocs((prev) =>
                    prev.map((d, idx) =>
                      idx === record.docIdx ? { ...d, deferralReason: e.target.value } : d
                    )
                  )
                }
              />
            )}
          </div>
        );
      },
    },
    {
      title: "RM Actions",
      width: 150,
      render: (_, record) => (
        <Select
          size="small"
          value={record.rmStatus}
          style={{ width: "100%" }}
          onChange={(value) =>
            setDocs((prev) =>
              prev.map((d, idx) =>
                idx === record.docIdx ? { ...d, rmStatus: value } : d
              )
            )
          }
          options={[
            { label: "Pending from Customer", value: "Pending from Customer" },
            { label: "Submitted for review", value: "Submitted for review" },
            { label: "Deferral Requested", value: "Deferral Requested" },
          ]}
        />
      ),
    },
  ];

  // ------------------------------ RENDER
  return (
    <>
      <style>{customStyles}</style>

      <Modal
        title={`Review Checklist  ${checklist?.title || ""}`}
        open={open}
        onCancel={onClose}
        width={1100}
        footer={[
          <Button key="cancel" onClick={onClose}>Close</Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={submitRM}>
            Submit
          </Button>,
        ]}
      >
        {checklist && (
          <>
            <Card
              className="checklist-info-card"
              size="small"
              title="Checklist Details"
              style={{ marginBottom: 18, marginTop: 24 }}
            >
              <Descriptions column={{ xs: 1, sm: 2, lg: 3 }}>
                <Descriptions.Item label="DCL No">{checklist.dclNo}</Descriptions.Item>
                <Descriptions.Item label="Title">{checklist.title}</Descriptions.Item>
                <Descriptions.Item label="Loan Type">{checklist.loanType}</Descriptions.Item>
                <Descriptions.Item label="Created By">{checklist.createdBy?.name}</Descriptions.Item>
                <Descriptions.Item label="RM">{checklist.assignedToRM?.name}</Descriptions.Item>
                <Descriptions.Item label="Co-Checker">
                  {checklist.assignedToCoChecker?.name || "Pending"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* ------------------ SUMMARY BAR + PROGRESS BAR (UPDATED) ------------------ */}
            <div
              style={{
                padding: "16px",
                background: "#f7f9fc",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontWeight: "700", color: PRIMARY_BLUE }}>
                  Total Documents: {total}
                </div>

                <div style={{ fontWeight: "700", color: SECONDARY_PURPLE }}>
                  Pending: {pending}
                </div>

                <div style={{ fontWeight: "700", color: ACCENT_LIME }}>
                  Submitted: {submitted}
                </div>

                <div style={{ fontWeight: "700", color: "#ff4d4f" }}>
                  Deferred: {deferred}
                </div>
              </div>

              <div style={{ width: "100%", height: 12, background: "#e0e0e0", borderRadius: 50 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: PRIMARY_BLUE,
                    borderRadius: 50,
                    transition: "width 0.4s ease",
                  }}
                ></div>
              </div>

              <div
                style={{
                  textAlign: "right",
                  marginTop: 4,
                  fontWeight: "700",
                  color: PRIMARY_BLUE,
                }}
              >
                {progressPercent}%
              </div>
            </div>

            {/* ------------------------------------------- */}

            <h3 style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>Required Documents</h3>

            <Table
              className="doc-table"
              rowKey="docIdx"
              size="middle"
              pagination={false}
              dataSource={docs}
              columns={columns}
              scroll={{ x: "max-content" }}
            />

            <h3 style={{ marginTop: 24, color: PRIMARY_BLUE, fontWeight: "bold" }}>
              RM General Comment
            </h3>

            <Input.TextArea
              rows={3}
              value={rmGeneralComment}
              onChange={(e) => setRmGeneralComment(e.target.value)}
              placeholder="Enter RM general remarks..."
              style={{ borderRadius: 8, marginTop: 8 }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default ReviewChecklistModal;
