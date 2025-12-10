// // src/components/modals/CreatorCompletedChecklistModal.jsx
// import React, { useMemo } from "react";
// import {
//   Modal,
//   Row,
//   Col,
//   Card,
//   Tag,
//   Button,
//   Typography,
//   Divider,
//   List,
//   Avatar,
//   Space,
//   Tooltip,
//   Collapse,
// } from "antd";
// import {
//   DownloadOutlined,
//   EyeOutlined,
//   FileTextOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import dayjs from "dayjs";

// const { Title, Text } = Typography;
// const { Panel } = Collapse;

// /**
//  * CreatorCompletedChecklistModal (Read-only)
//  *
//  * Props:
//  *  - checklist: object (the completed checklist)
//  *  - open: boolean
//  *  - onClose: function
//  *
//  * Features:
//  *  - Header with DCL, status tag, basic metadata
//  *  - Two-column layout: left = checklist summary + documents; right = comment thread + timeline
//  *  - Document cards show only if a file exists
//  *  - Download Checklist -> PDF (includes summary, document list and comment thread)
//  *  - Clean NCBA-like styling
//  */
// const CreatorCompletedChecklistModal = ({ checklist, open, onClose }) => {
//   const statusConfig = (status) => {
//     switch (status) {
//       case "approved":
//         return { color: "success", text: "Approved", icon: <CheckCircleOutlined /> };
//       case "approved_with_revisions":
//         return { color: "processing", text: "Revised", icon: <CheckCircleOutlined /> };
//       default:
//         return { color: "default", text: status || "Unknown", icon: null };
//     }
//   };

//   const docCount = useMemo(
//     () =>
//       (checklist?.documents || []).reduce(
//         (acc, cat) => acc + (cat.docList?.length || 0),
//         0
//       ),
//     [checklist]
//   );

//   // Detect common file fields for a single doc; return null if none
//   const extractFileUrl = (doc) =>
//     doc?.fileUrl ||
//     doc?.file ||
//     doc?.url ||
//     doc?.documentUrl ||
//     doc?.attachment ||
//     doc?.path ||
//     null;

//   const downloadableDocs = useMemo(() => {
//     const list = [];
//     (checklist?.documents || []).forEach((cat) => {
//       (cat.docList || []).forEach((d) => {
//         const url = extractFileUrl(d);
//         if (url) {
//           list.push({
//             ...d,
//             category: cat.category,
//             fileUrl: url,
//           });
//         }
//       });
//     });
//     return list;
//   }, [checklist]);

//   const downloadPDF = () => {
//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     doc.setFontSize(18);
//     doc.text(`Checklist: ${checklist?.dclNo || "N/A"}`, 40, 50);

//     doc.setFontSize(11);
//     doc.text(`Title: ${checklist?.title || "N/A"}`, 40, 74);
//     doc.text(`Loan Type: ${checklist?.loanType || "N/A"}`, 40, 90);
//     doc.text(`Customer: ${checklist?.customerName || "N/A"} (${checklist?.customerNumber || ""})`, 40, 106);
//     doc.text(`Completed: ${checklist?.completionDate ? dayjs(checklist.completionDate).format("DD/MM/YYYY HH:mm") : "N/A"}`, 40, 122);
//     doc.text(`Approved By: ${checklist?.approvedBy?.name || "N/A"}`, 40, 138);
//     doc.text(`Checker Comments:`, 40, 158);

//     const checkerText = checklist?.checkerComments || "N/A";
//     const splitText = doc.splitTextToSize(checkerText, 500);
//     doc.text(splitText, 40, 174);

//     // Table of documents (category, name, status)
//     const tableColumn = ["Category", "Document Name", "Status", "File"];
//     const tableRows = (checklist?.documents || []).flatMap((cat) =>
//       (cat.docList || []).map((d) => [
//         cat.category || "",
//         d.name || "",
//         d.status || "",
//         extractFileUrl(d) ? "Yes" : "No",
//       ])
//     );

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 240,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [22, 70, 121] },
//     });

//     // Comment thread
//     const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 240;
//     doc.setFontSize(12);
//     doc.text("Comment Thread:", 40, startY + 12);

//     const thread = checklist?.commentThread || [];
//     let y = startY + 28;
//     doc.setFontSize(10);
//     if (thread.length === 0) {
//       doc.text("No comments", 40, y);
//     } else {
//       thread.forEach((c) => {
//         const line = `${c.user || "User"} (${c.time || ""}): ${c.comment || ""}`;
//         const lines = doc.splitTextToSize(line, 500);
//         if (y + lines.length * 12 > 770) {
//           doc.addPage();
//           y = 40;
//         }
//         doc.text(lines, 40, y);
//         y += lines.length * 12 + 6;
//       });
//     }

//     doc.save(`Checklist_${checklist?.dclNo || "export"}.pdf`);
//   };

//   // layout helpers
//   const headerTag = statusConfig(checklist?.status);

//   return (
//     <Modal
//       title={null}
//       open={open}
//       onCancel={onClose}
//       width={1000}
//       footer={null}
//       bodyStyle={{ padding: 20 }}
//       destroyOnClose
//     >
//       <Row gutter={16} align="middle" style={{ marginBottom: 8 }}>
//         <Col flex="auto">
//           <Space direction="vertical" size={6}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <FileTextOutlined style={{ fontSize: 26, color: "#7e6496" }} />
//               <div>
//                 <Title level={4} style={{ margin: 0, color: "#164679" }}>
//                   {checklist?.dclNo || "DCL - N/A"}
//                 </Title>
//                 <Text type="secondary">{checklist?.title || checklist?.loanType || ""}</Text>
//               </div>
//             </div>
//           </Space>
//         </Col>

//         <Col>
//           <Space direction="vertical" align="end">
//             <Tag icon={headerTag.icon} color={headerTag.color} style={{ fontWeight: 700 }}>
//               {headerTag.text}
//             </Tag>
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               Completed: {checklist?.completionDate ? dayjs(checklist.completionDate).format("DD MMM YYYY") : "N/A"}
//             </Text>
//           </Space>
//         </Col>
//       </Row>

//       <Divider style={{ margin: "8px 0 16px" }} />

//       <Row gutter={16}>
//         {/* LEFT: Summary + Documents */}
//         <Col span={15}>
//           <Card
//             size="small"
//             bordered={false}
//             style={{ marginBottom: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.04)", borderRadius: 8 }}
//             bodyStyle={{ padding: 16 }}
//           >
//             <Row gutter={12}>
//               <Col span={12}>
//                 <Text strong>Customer</Text>
//                 <div style={{ marginTop: 6 }}>
//                   <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
//                     {checklist?.customerName || "N/A"}
//                   </Text>
//                   <Text type="secondary">{checklist?.customerNumber || ""}</Text>
//                 </div>
//               </Col>

//               <Col span={12}>
//                 <Text strong>Assigned RM</Text>
//                 <div style={{ marginTop: 6 }}>
//                   <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
//                     {checklist?.assignedToRM?.name || "N/A"}
//                   </Text>
//                   <Text type="secondary">{checklist?.assignedToRM?.email || ""}</Text>
//                 </div>
//               </Col>

//               <Col span={12} style={{ marginTop: 12 }}>
//                 <Text strong>Approved By</Text>
//                 <div style={{ marginTop: 6 }}>
//                   <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
//                     {checklist?.approvedBy?.name || "N/A"}
//                   </Text>
//                   <Text type="secondary">{checklist?.approvedBy?.email || ""}</Text>
//                 </div>
//               </Col>

//               <Col span={12} style={{ marginTop: 12 }}>
//                 <Text strong>Priority</Text>
//                 <div style={{ marginTop: 6 }}>
//                   <Tag color={checklist?.priority === "high" ? "error" : checklist?.priority === "medium" ? "warning" : "default"}>
//                     {checklist?.priority || "N/A"}
//                   </Tag>
//                 </div>
//               </Col>
//             </Row>
//           </Card>

//           {/* Documents section */}
//           <Card
//             title={
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <FileTextOutlined />
//                 <span>Documents ({docCount})</span>
//               </div>
//             }
//             bodyStyle={{ padding: 12 }}
//             style={{ marginBottom: 16, borderRadius: 8 }}
//           >
//             {/* Categories with files */}
//             <Collapse accordion>
//               {(checklist?.documents || []).map((cat, ci) => {
//                 const docsWithFile = (cat.docList || []).filter((d) => extractFileUrl(d));
//                 return (
//                   <Panel header={`${cat.category} (${cat.docList?.length || 0})`} key={ci}>
//                     {docsWithFile.length === 0 ? (
//                       <Text type="secondary">No uploaded files for this category.</Text>
//                     ) : (
//                       <List
//                         itemLayout="horizontal"
//                         dataSource={cat.docList}
//                         renderItem={(d) => {
//                           const file = extractFileUrl(d);
//                           return (
//                             <List.Item
//                               actions={[
//                                 file ? (
//                                   <Tooltip title="View file" key="view">
//                                     <Button
//                                       icon={<EyeOutlined />}
//                                       size="small"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         window.open(file, "_blank");
//                                       }}
//                                     />
//                                   </Tooltip>
//                                 ) : null,
//                               ].filter(Boolean)}
//                             >
//                               <List.Item.Meta
//                                 avatar={<Avatar icon={<FileTextOutlined />} />}
//                                 title={
//                                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                                     <span style={{ fontWeight: 600, color: "#164679" }}>{d.name}</span>
//                                     {d.status === "approved" ? (
//                                       <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginLeft: 8 }}>
//                                         Approved
//                                       </Tag>
//                                     ) : d.status === "pending" ? (
//                                       <Tag color="error" style={{ marginLeft: 8 }}>
//                                         Pending
//                                       </Tag>
//                                     ) : (
//                                       <Tag color="default" style={{ marginLeft: 8 }}>
//                                         {d.status || "N/A"}
//                                       </Tag>
//                                     )}
//                                   </div>
//                                 }
//                                 description={<Text type="secondary">{d.coComment || ""}</Text>}
//                               />
//                             </List.Item>
//                           );
//                         }}
//                       />
//                     )}
//                   </Panel>
//                 );
//               })}
//             </Collapse>
//           </Card>

//           {/* Download buttons */}
//           <Card size="small" bordered={false} style={{ borderRadius: 8 }}>
//             <Space>
//               <Button icon={<DownloadOutlined />} onClick={downloadPDF} type="primary">
//                 Download Checklist (PDF)
//               </Button>

//               {downloadableDocs.length > 0 && (
//                 <Button
//                   icon={<DownloadOutlined />}
//                   onClick={() => {
//                     // if you want zip download, integrate JSZip here
//                     // For now open the first file in new tab as an example
//                     window.open(downloadableDocs[0].fileUrl, "_blank");
//                   }}
//                 >
//                   Download First Document
//                 </Button>
//               )}
//             </Space>
//           </Card>
//         </Col>

//         {/* RIGHT: Comment thread + timeline */}
//         <Col span={9}>
//           <Card
//             title={
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <UserOutlined />
//                 <span>Comment Thread</span>
//               </div>
//             }
//             style={{ marginBottom: 16, borderRadius: 8 }}
//             bodyStyle={{ maxHeight: 300, overflowY: "auto" }}
//           >
//             {(checklist?.commentThread || []).length === 0 ? (
//               <Text type="secondary">No comments yet</Text>
//             ) : (
//               (checklist?.commentThread || []).map((c, i) => (
//                 <div key={i} style={{ padding: "8px 0", borderBottom: "1px dashed #eee" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
//                     <Text strong>{c.user || "User"}</Text>
//                     <Text type="secondary" style={{ fontSize: 12 }}>
//                       <ClockCircleOutlined /> {c.time ? dayjs(c.time).format("DD/MM/YYYY HH:mm") : ""}
//                     </Text>
//                   </div>
//                   <div style={{ marginTop: 6 }}>
//                     <Text>{c.comment}</Text>
//                   </div>
//                 </div>
//               ))
//             )}
//           </Card>

//           <Card
//             title={
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <ClockCircleOutlined />
//                 <span>Timeline</span>
//               </div>
//             }
//             style={{ borderRadius: 8 }}
//           >
//             <List
//               itemLayout="horizontal"
//               dataSource={[
//                 { title: "Created", time: checklist?.createdAt },
//                 { title: "Submitted to Checker", time: checklist?.submittedToCheckerAt },
//                 { title: "Completed", time: checklist?.completionDate },
//                 { title: "Last updated", time: checklist?.updatedAt },
//               ].filter(Boolean)}
//               renderItem={(item) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={<Avatar icon={<ClockCircleOutlined />} />}
//                     title={<Text strong>{item.title}</Text>}
//                     description={<Text type="secondary">{item.time ? dayjs(item.time).format("DD MMM YYYY HH:mm") : "N/A"}</Text>}
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </Modal>
//   );
// };

// export default CreatorCompletedChecklistModal;




// src/components/modals/CompletedChecklistModal.jsx
import React, { useMemo } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Tag,
  Button,
  Typography,
  Divider,
  List,
  Avatar,
  Space,
  Tooltip,
  Collapse,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Panel } = Collapse;

/**
 * CompletedChecklistModal (Read-only)
 *
 * Props:
 *  - checklist: object (the completed checklist)
 *  - open: boolean
 *  - onClose: function
 *
 * Features:
 *  - Header with DCL, status tag, basic metadata
 *  - Two-column layout: left = checklist summary + documents; right = comment thread + timeline
 *  - Document cards show only if a file exists
 *  - Download Checklist -> PDF (includes summary, document list and comment thread)
 *  - Clean NCBA-like styling
 */
const CompletedChecklistModal = ({ checklist, open, onClose }) => {
  const statusConfig = (status) => {
    switch (status) {
      case "approved":
        return { color: "success", text: "Approved", icon: <CheckCircleOutlined /> };
      case "approved_with_revisions":
        return { color: "processing", text: "Revised", icon: <CheckCircleOutlined /> };
      default:
        return { color: "default", text: status || "Unknown", icon: null };
    }
  };

  const docCount = useMemo(
    () =>
      (checklist?.documents || []).reduce(
        (acc, cat) => acc + (cat.docList?.length || 0),
        0
      ),
    [checklist]
  );

  // Detect common file fields for a single doc; return null if none
  const extractFileUrl = (doc) =>
    doc?.fileUrl ||
    doc?.file ||
    doc?.url ||
    doc?.documentUrl ||
    doc?.attachment ||
    doc?.path ||
    null;

  const downloadableDocs = useMemo(() => {
    const list = [];
    (checklist?.documents || []).forEach((cat) => {
      (cat.docList || []).forEach((d) => {
        const url = extractFileUrl(d);
        if (url) {
          list.push({
            ...d,
            category: cat.category,
            fileUrl: url,
          });
        }
      });
    });
    return list;
  }, [checklist]);

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFontSize(18);
    doc.text(`Checklist: ${checklist?.dclNo || "N/A"}`, 40, 50);

    doc.setFontSize(11);
    doc.text(`Title: ${checklist?.title || "N/A"}`, 40, 74);
    doc.text(`Loan Type: ${checklist?.loanType || "N/A"}`, 40, 90);
    doc.text(`Customer: ${checklist?.customerName || "N/A"} (${checklist?.customerNumber || ""})`, 40, 106);
    doc.text(`Completed: ${checklist?.completionDate ? dayjs(checklist.completionDate).format("DD/MM/YYYY HH:mm") : "N/A"}`, 40, 122);
    doc.text(`Approved By: ${checklist?.approvedBy?.name || "N/A"}`, 40, 138);
    doc.text(`Checker Comments:`, 40, 158);

    const checkerText = checklist?.checkerComments || "N/A";
    const splitText = doc.splitTextToSize(checkerText, 500);
    doc.text(splitText, 40, 174);

    // Table of documents (category, name, status)
    const tableColumn = ["Category", "Document Name", "Status", "File"];
    const tableRows = (checklist?.documents || []).flatMap((cat) =>
      (cat.docList || []).map((d) => [
        cat.category || "",
        d.name || "",
        d.status || "",
        extractFileUrl(d) ? "Yes" : "No",
      ])
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 240,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 70, 121] },
    });

    // Comment thread
    const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 240;
    doc.setFontSize(12);
    doc.text("Comment Thread:", 40, startY + 12);

    const thread = checklist?.commentThread || [];
    let y = startY + 28;
    doc.setFontSize(10);
    if (thread.length === 0) {
      doc.text("No comments", 40, y);
    } else {
      thread.forEach((c) => {
        const line = `${c.user || "User"} (${c.time || ""}): ${c.comment || ""}`;
        const lines = doc.splitTextToSize(line, 500);
        if (y + lines.length * 12 > 770) {
          doc.addPage();
          y = 40;
        }
        doc.text(lines, 40, y);
        y += lines.length * 12 + 6;
      });
    }

    doc.save(`Checklist_${checklist?.dclNo || "export"}.pdf`);
  };

  // layout helpers
  const headerTag = statusConfig(checklist?.status);

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      width={1000}
      footer={null}
      bodyStyle={{ padding: 20 }}
      destroyOnClose
    >
      <Row gutter={16} align="middle" style={{ marginBottom: 8 }}>
        <Col flex="auto">
          <Space direction="vertical" size={6}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FileTextOutlined style={{ fontSize: 26, color: "#7e6496" }} />
              <div>
                <Title level={4} style={{ margin: 0, color: "#164679" }}>
                  {checklist?.dclNo || "DCL - N/A"}
                </Title>
                <Text type="secondary">{checklist?.title || checklist?.loanType || ""}</Text>
              </div>
            </div>
          </Space>
        </Col>

        <Col>
          <Space direction="vertical" align="end">
            <Tag icon={headerTag.icon} color={headerTag.color} style={{ fontWeight: 700 }}>
              {headerTag.text}
            </Tag>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Completed: {checklist?.completionDate ? dayjs(checklist.completionDate).format("DD MMM YYYY") : "N/A"}
            </Text>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "8px 0 16px" }} />

      <Row gutter={16}>
        {/* LEFT: Summary + Documents */}
        <Col span={15}>
          <Card
            size="small"
            bordered={false}
            style={{ marginBottom: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.04)", borderRadius: 8 }}
            bodyStyle={{ padding: 16 }}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Text strong>Customer</Text>
                <div style={{ marginTop: 6 }}>
                  <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
                    {checklist?.customerName || "N/A"}
                  </Text>
                  <Text type="secondary">{checklist?.customerNumber || ""}</Text>
                </div>
              </Col>

              <Col span={12}>
                <Text strong>Assigned RM</Text>
                <div style={{ marginTop: 6 }}>
                  <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
                    {checklist?.assignedToRM?.name || "N/A"}
                  </Text>
                  <Text type="secondary">{checklist?.assignedToRM?.email || ""}</Text>
                </div>
              </Col>

              <Col span={12} style={{ marginTop: 12 }}>
                <Text strong>Approved By</Text>
                <div style={{ marginTop: 6 }}>
                  <Text style={{ display: "block", color: "#164679", fontWeight: 600 }}>
                    {checklist?.approvedBy?.name || "N/A"}
                  </Text>
                  <Text type="secondary">{checklist?.approvedBy?.email || ""}</Text>
                </div>
              </Col>

              <Col span={12} style={{ marginTop: 12 }}>
                <Text strong>Priority</Text>
                <div style={{ marginTop: 6 }}>
                  <Tag color={checklist?.priority === "high" ? "error" : checklist?.priority === "medium" ? "warning" : "default"}>
                    {checklist?.priority || "N/A"}
                  </Tag>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Documents section */}
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FileTextOutlined />
                <span>Documents ({docCount})</span>
              </div>
            }
            bodyStyle={{ padding: 12 }}
            style={{ marginBottom: 16, borderRadius: 8 }}
          >
            {/* Categories with files */}
            <Collapse accordion>
              {(checklist?.documents || []).map((cat, ci) => {
                const docsWithFile = (cat.docList || []).filter((d) => extractFileUrl(d));
                return (
                  <Panel header={`${cat.category} (${cat.docList?.length || 0})`} key={ci}>
                    {docsWithFile.length === 0 ? (
                      <Text type="secondary">No uploaded files for this category.</Text>
                    ) : (
                      <List
                        itemLayout="horizontal"
                        dataSource={cat.docList}
                        renderItem={(d) => {
                          const file = extractFileUrl(d);
                          return (
                            <List.Item
                              actions={[
                                file ? (
                                  <Tooltip title="View file" key="view">
                                    <Button
                                      icon={<EyeOutlined />}
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(file, "_blank");
                                      }}
                                    />
                                  </Tooltip>
                                ) : null,
                              ].filter(Boolean)}
                            >
                              <List.Item.Meta
                                avatar={<Avatar icon={<FileTextOutlined />} />}
                                title={
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontWeight: 600, color: "#164679" }}>{d.name}</span>
                                    {d.status === "approved" ? (
                                      <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginLeft: 8 }}>
                                        Approved
                                      </Tag>
                                    ) : d.status === "pending" ? (
                                      <Tag color="error" style={{ marginLeft: 8 }}>
                                        Pending
                                      </Tag>
                                    ) : (
                                      <Tag color="default" style={{ marginLeft: 8 }}>
                                        {d.status || "N/A"}
                                      </Tag>
                                    )}
                                  </div>
                                }
                                description={<Text type="secondary">{d.coComment || ""}</Text>}
                              />
                            </List.Item>
                          );
                        }}
                      />
                    )}
                  </Panel>
                );
              })}
            </Collapse>
          </Card>

          {/* Download buttons */}
          <Card size="small" bordered={false} style={{ borderRadius: 8 }}>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={downloadPDF} type="primary">
                Download Checklist (PDF)
              </Button>

              {downloadableDocs.length > 0 && (
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    // if you want zip download, integrate JSZip here
                    // For now open the first file in new tab as an example
                    window.open(downloadableDocs[0].fileUrl, "_blank");
                  }}
                >
                  Download First Document
                </Button>
              )}
            </Space>
          </Card>
        </Col>

        {/* RIGHT: Comment thread + timeline */}
        <Col span={9}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UserOutlined />
                <span>Comment Thread</span>
              </div>
            }
            style={{ marginBottom: 16, borderRadius: 8 }}
            bodyStyle={{ maxHeight: 300, overflowY: "auto" }}
          >
            {(checklist?.commentThread || []).length === 0 ? (
              <Text type="secondary">No comments yet</Text>
            ) : (
              (checklist?.commentThread || []).map((c, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: "1px dashed #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <Text strong>{c.user || "User"}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      <ClockCircleOutlined /> {c.time ? dayjs(c.time).format("DD/MM/YYYY HH:mm") : ""}
                    </Text>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <Text>{c.comment}</Text>
                  </div>
                </div>
              ))
            )}
          </Card>

          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ClockCircleOutlined />
                <span>Timeline</span>
              </div>
            }
            style={{ borderRadius: 8 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "Created", time: checklist?.createdAt },
                { title: "Submitted to Checker", time: checklist?.submittedToCheckerAt },
                { title: "Completed", time: checklist?.completionDate },
                { title: "Last updated", time: checklist?.updatedAt },
              ].filter(Boolean)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ClockCircleOutlined />} />}
                    title={<Text strong>{item.title}</Text>}
                    description={<Text type="secondary">{item.time ? dayjs(item.time).format("DD MMM YYYY HH:mm") : "N/A"}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default CompletedChecklistModal;