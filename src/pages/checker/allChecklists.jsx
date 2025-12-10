


import React, { useState } from "react";
import { Table, Button, Divider } from "antd";
import ChecklistsPage from "./ChecklistsPage.jsx";
import CheckerReviewChecklistModal from "../../components/modals/CheckerReviewChecklistModal.jsx";
import { useGetChecklistsQuery } from "../../api/checklistApi.js";

const PRIMARY_BLUE = "#164679";
const SECONDARY_PURPLE = "#7e6496";
const LIGHT_YELLOW = "#fcd716";

const AllChecklists = ({ userId }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const { data: checklists = [], refetch } = useGetChecklistsQuery();

  // Filter to show checklists assigned to this Checker
  const myChecklists = checklists.filter(
    (c) => c.assignedToCoChecker?._id === userId
  );

  const columns = [
    {
      title: "DCL No",
      dataIndex: "dclNo",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: PRIMARY_BLUE }}>{text}</span>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      render: (text) => (
        <span style={{ color: SECONDARY_PURPLE }}>{text || "N/A"}</span>
      ),
    },
    {
      title: "Customer Number",
      dataIndex: "customerNumber",
      render: (text) => (
        <span style={{ fontWeight: "500", color: PRIMARY_BLUE }}>
          {text || "N/A"}
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => (
        <span style={{ color: SECONDARY_PURPLE }}>{text}</span>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
    },
    {
      title: "Assigned RM",
      dataIndex: "assignedToRM",
      render: (rm) => (
        <span style={{ color: PRIMARY_BLUE }}>{rm?.name || "Not Assigned"}</span>
      ),
    },
    {
      title: "# Docs",
      dataIndex: "documents",
      render: (docs) => (
        <span
          style={{
            backgroundColor: LIGHT_YELLOW,
            padding: "2px 8px",
            borderRadius: 12,
            fontWeight: "bold",
          }}
        >
          {docs?.length || 0}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let display = status || "Pending Checker";
        let color = PRIMARY_BLUE;
        
        // You can add status-specific colors
        if (status === "approved") color = "#52c41a";
        if (status === "rejected") color = "#ff4d4f";
        if (status === "pending") color = "#faad14";
        
        return (
          <span style={{ fontWeight: "bold", color: color }}>
            {display}
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          size="small"
          type="link"
          style={{ color: SECONDARY_PURPLE, fontWeight: "bold" }}
          onClick={() => setSelectedChecklist(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      {/* <Button 
        type="primary" 
        size="small" 
        onClick={() => setDrawerOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Create New DCL
      </Button> */}

      {drawerOpen && (
        <ChecklistsPage
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            refetch();
          }}
          coCreatorId={userId}
        />
      )}

      <Divider style={{ margin: "12px 0" }}>Active DCLs Assigned</Divider>

      <Table
        columns={columns}
        dataSource={myChecklists}
        rowKey="_id"
        pagination={{ pageSize: 5, showSizeChanger: true }}
        onRow={(record) => ({
          onClick: () => setSelectedChecklist(record),
          style: { cursor: "pointer" }
        })}
      />

      {selectedChecklist && (
        <CheckerReviewChecklistModal
          checklist={selectedChecklist}
          open={!!selectedChecklist}
          onClose={() => {
            setSelectedChecklist(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default AllChecklists;