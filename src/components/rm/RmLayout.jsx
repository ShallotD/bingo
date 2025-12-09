// File: src/components/rm/RmLayout.jsx
import React, { useState } from "react";
import { Menu } from "antd";
import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// Using the same icons as CreatorSidebar
import { Inbox, CheckCircle, BarChart2, Clock } from "lucide-react";

// Import your RM components
import MyQueue from "../../pages/rm/MyQueue";
import Completed from "../../pages/rm/Completed";
import ReportsPage from "../../pages/rm/Reports";

const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  const handleClick = (e) => {
    console.log("Menu clicked:", e.key);
    
    // If deferral is clicked, open in new window and don't set selected key
    if (e.key === "deferral") {
      window.open("https://newdcl.my.canva.site/deferral", "_blank", "noopener,noreferrer");
      return; // Don't change selected key
    }
    
    setSelectedKey(e.key);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        background: "#3A2A82", // Changed to match Creator sidebar color
        color: "white",
        transition: "0.25s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "RM" : "RM Dashboard"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
        inlineCollapsed={collapsed}
        items={[
          { 
            key: "myqueue", 
            label: "My Queue", 
            icon: <Inbox size={16} style={{ color: "#e5e7eb" }} /> // Same as Creator
          },
          { 
            key: "completed", 
            label: "Completed", 
            icon: <CheckCircle size={16} style={{ color: "#e5e7eb" }} /> // Same as Creator
          },
          {
            key: "deferral",
            label: "Deferrals",
            icon: <Clock size={16} style={{ color: "#e5e7eb" }} /> // Same as Creator
          },
          { 
            key: "reports", 
            label: "Reports", 
            icon: <BarChart2 size={16} style={{ color: "#e5e7eb" }} /> // Same as Creator
          },
        ]}
      />

      <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
        <button
          onClick={toggleCollapse}
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "#fff",
            color: "#3A2A82", // Updated to match new sidebar color
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      style={{
        height: 65,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <MenuOutlined
        onClick={toggleSidebar}
        style={{ fontSize: 24, cursor: "pointer", color: "#3A2A82" }} // Updated color
      />
      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <BellOutlined style={{ fontSize: 22, cursor: "pointer", color: "#3A2A82" }} />
        <UserOutlined style={{ fontSize: 22, cursor: "pointer", color: "#3A2A82" }} />
      </div>
    </div>
  );
};

const RmLayout = ({ userId }) => {
  const [selectedKey, setSelectedKey] = useState("myqueue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderContent = () => {
    console.log("Rendering RM content for:", selectedKey);
    console.log("User ID:", userId || "rm_current");
    
    try {
      switch (selectedKey) {
        case "myqueue":
          return <MyQueue userId={userId || "rm_current"} />;
        
        case "completed":
          return <Completed userId={userId || "rm_current"} />;
        
        case "reports":
          return <ReportsPage userId={userId || "rm_current"} />;
            
        default:
          return <MyQueue userId={userId || "rm_current"} />;
      }
    } catch (error) {
      console.error("Error rendering content:", error);
      return (
        <div style={{ padding: 25 }}>
          <div style={{ 
            backgroundColor: "#fff2f0", 
            padding: 20, 
            borderRadius: 8,
            border: "1px solid #ffccc7"
          }}>
            <h3 style={{ color: "#ff4d4f" }}>Error Loading Page</h3>
            <p>{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ 
                marginTop: 10, 
                padding: "8px 16px",
                backgroundColor: "#3A2A82", // Updated color
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f0f2f5" }}>
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ padding: "25px", flex: 1, overflowY: "auto", background: "#f0f2f5" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RmLayout;