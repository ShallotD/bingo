import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  ListChecks,
  Clock,
  BarChart2,
  User,
} from "lucide-react";

// Import available Approver page components
import MyQueue from "../../pages/approver/MyQueue";
import Actioned from "../../pages/approver/Actioned";
import Reports from "../../pages/approver/Reports";
import Navbar from "../Navbar";

// Theme colors
const PRIMARY_BLUE = "#164679";
const ACCENT_LIME = "#b5d334";

const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
  navigate,
}) => {
  const location = useLocation();
  
  const handleClick = (e) => {
    console.log("Menu clicked:", e.key);
    setSelectedKey(e.key);
    navigate(`/approver/${e.key}`);
  };

  // Determine selected key from path
  const getSelectedKeyFromPath = () => {
    const path = location.pathname;
    if (path.includes("/approver/queue")) return "queue";
    if (path.includes("/approver/actioned")) return "actioned";
    if (path.includes("/approver/reports")) return "reports";
    return "queue"; // default to queue
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        background: PRIMARY_BLUE,
        color: "white",
        transition: "0.25s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
        height: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "linear-gradient(135deg, #164679 0%, #1e3a8a 100%)"
        }}
      >
        {collapsed ? (
          <div style={{ color: ACCENT_LIME, fontWeight: "bold" }}>A</div>
        ) : (
          <>
            <div style={{ fontSize: 20, marginBottom: 4 }}>Approver</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Credit Operations</div>
          </>
        )}
      </div>

      {/* User Profile (only when expanded) */}
      {!collapsed && (
        <div style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: ACCENT_LIME,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: PRIMARY_BLUE,
            fontWeight: "bold",
            fontSize: 16
          }}>
            AU
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: 14 }}>
              Approver User
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Senior Credit Officer
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKeyFromPath()]}
        onClick={handleClick}
        style={{ 
          background: "transparent", 
          borderRight: "none", 
          fontSize: 15,
          flex: 1,
          padding: "16px 0"
        }}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "queue",
            label: "My Queue",
            icon: <ListChecks size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "actioned",
            label: "Actioned",
            icon: <Clock size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "reports",
            label: "Reports",
            icon: <BarChart2 size={18} style={{ color: "#e5e7eb" }} />,
          },
        ]}
      />

      {/* Statistics Section (only when expanded) */}
      {!collapsed && (
        <div style={{
          padding: "16px",
          margin: "16px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
            Today's Summary
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: "bold" }}>12</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>Pending</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: "bold", color: ACCENT_LIME }}>8</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>Approved</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: "bold", color: "#ff6b6b" }}>4</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>Rejected</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <div style={{ padding: 20, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={toggleCollapse}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            background: ACCENT_LIME,
            color: PRIMARY_BLUE,
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
            fontSize: 14,
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "1";
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

const ApproverLayout = ({ userId }) => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("queue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
        navigate={navigate}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar}
          additionalButtons={
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 500, 
                color: PRIMARY_BLUE,
                background: "rgba(181, 211, 52, 0.1)",
                padding: "6px 12px",
                borderRadius: 20,
                border: `1px solid ${ACCENT_LIME}`
              }}>
                Approver Mode
              </div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 500, 
                color: PRIMARY_BLUE,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <User size={16} />
                Approver User
              </div>
            </div>
          }
        />
        
        {/* Main Content Area */}
        <div
          style={{
            padding: "25px",
            flex: 1,
            overflowY: "auto",
            background: "#f8fafc",
          }}
        >
          <Routes>
            {/* Default route redirects to My Queue */}
            <Route path="/" element={<MyQueue userId={userId || "approver_current"} />} />
            
            {/* Available routes */}
            <Route path="/queue" element={<MyQueue userId={userId || "approver_current"} />} />
            <Route path="/queue/*" element={<MyQueue userId={userId || "approver_current"} />} />
            
            {/* Actioned route - ensure Actioned component exists */}
            <Route path="/actioned" element={<Actioned userId={userId || "approver_current"} />} />
            
            {/* Reports route */}
            <Route path="/reports" element={<Reports userId={userId || "approver_current"} />} />
            
            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<MyQueue userId={userId || "approver_current"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ApproverLayout;







