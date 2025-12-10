// import React, { useState, useEffect } from "react";
// import { Menu } from "antd";
// import {
//   ClockCircleOutlined,
//   CheckCircleOutlined,
//   BarChartOutlined,
//   MenuOutlined,
//   BellOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { useSelector } from "react-redux";

// // Import Checker's pages - CORRECT PATH from src/components/checker/
// import MyQueue from "../../pages/checker/MyQueue"; 
// import Completed from "../../pages/checker/Completed"; // This is the correct path
// import ReportsPage from "../../pages/checker/Reports"; // Optional - if you have it

// // If you don't have Reports yet:
// const ReportsPlaceholder = () => (
//   <div style={{ padding: 20 }}>
//     <h2>Reports</h2>
//     <p>This page will show reports and analytics. Coming soon...</p>
//   </div>
// );

// // Sidebar Component (keep existing code...)
// const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
//   const handleClick = (e) => setSelectedKey(e.key);

//   return (
//     <div
//       style={{
//         width: collapsed ? 80 : 250,
//         background: "#3A2A82",
//         paddingTop: 20,
//         transition: "width 0.2s",
//         color: "white",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           fontSize: 22,
//           marginBottom: 35,
//           fontWeight: "bold",
//           padding: "0 10px",
//         }}
//       >
//         {collapsed ? "N" : "CO Checker Dashboard"}
//       </h2>

//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         onClick={handleClick}
//         style={{ background: "#3A2A82", flex: 1 }}
//         inlineCollapsed={collapsed}
//         items={[
//           { key: "myQueue", icon: <ClockCircleOutlined />, label: "My Queue" },
//           { key: "completed", icon: <CheckCircleOutlined />, label: "Completed" }, // Changed key to "completed"
//           { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
//         ]}
//       />

//       <div
//         style={{
//           padding: "20px",
//           textAlign: "center",
//         }}
//       >
//         <button
//           onClick={toggleCollapse}
//           style={{
//             background: "#fff",
//             color: "#3A2A82",
//             border: "none",
//             borderRadius: 4,
//             padding: "8px 16px",
//             cursor: "pointer",
//             width: "100%",
//             fontWeight: "bold",
//           }}
//         >
//           {collapsed ? "Expand" : "Collapse"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Navbar Component (keep existing code...)
// const Navbar = ({ toggleSidebar }) => (
//   <div
//     style={{
//       height: 60,
//       background: "#fff",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "0 20px",
//       boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//       position: "sticky",
//       top: 0,
//       zIndex: 100,
//     }}
//   >
//     <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
//       <MenuOutlined style={{ fontSize: 24 }} />
//     </div>
//     <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//       <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
//       <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
//     </div>
//   </div>
// );

// // Main Layout - UPDATED RENDER CONTENT
// const CheckerLayout = () => {
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.id || "checker_current";

//   const [selectedKey, setSelectedKey] = useState("myQueue");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

//   useEffect(() => {
//     if (!selectedKey) setSelectedKey("myQueue");
//   }, [sidebarCollapsed, selectedKey]);

//   const renderContent = () => {
//     switch (selectedKey) {
//       case "myQueue":
//         return <MyQueue userId={userId} />;
//       case "completed":
//         return <Completed userId={userId} />; // ✅ Uses the imported Completed component
//       case "reports":
//         try {
//           // If you have ReportsPage component
//           return <ReportsPage userId={userId} />;
//         } catch (error) {
//           // Fallback to placeholder
//           return <ReportsPlaceholder />;
//         }
//       default:
//         return <MyQueue userId={userId} />;
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       <Sidebar
//         selectedKey={selectedKey}
//         setSelectedKey={setSelectedKey}
//         collapsed={sidebarCollapsed}
//         toggleCollapse={toggleSidebar}
//       />

//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div
//           style={{
//             padding: 20,
//             flex: 1,
//             overflowY: "auto",
//             background: "#f0f2f5",
//           }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckerLayout;



import React, { useState, useEffect } from "react";
import { Menu } from "antd";
// Import from @ant-design/icons for Navbar
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined
} from "@ant-design/icons";
// Import from lucide-react for Sidebar
import {
  Inbox,
  CheckCircle,
  BarChart2
} from "lucide-react";
import { useSelector } from "react-redux";

// Import Checker's pages
import MyQueue from "../../pages/checker/MyQueue";
import Completed from "../../pages/checker/Completed";
import ReportsPage from "../../pages/checker/Reports";
import AllChecklists from "../../pages/checker/allChecklists";

// Sidebar Component with lucide-react icons
const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  const handleClick = (e) => setSelectedKey(e.key);

  return (
    <div
      style={{
        width: collapsed ? 80 : 250,
        background: "#3A2A82",
        paddingTop: 20,
        transition: "width 0.2s",
        color: "white",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 22,
          marginBottom: 35,
          fontWeight: "bold",
          padding: "0 10px",
        }}
      >
        {collapsed ? "N" : "CO Checker Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{ background: "#3A2A82", flex: 1 }}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "myQueue",
            icon: <Inbox size={16} style={{ color: "#e5e7eb" }} />,
            label: "My Queue"
          },
          {
            key: "completed",
            icon: <CheckCircle size={16} style={{ color: "#e5e7eb" }} />,
            label: "Completed"
          },
           {
            key: "allchecklists",
            icon: <CheckCircle size={16} style={{ color: "#e5e7eb" }} />,
            label: "allChecklists"
          },
          {
            key: "reports",
            icon: <BarChart2 size={16} style={{ color: "#e5e7eb" }} />,
            label: "Reports"
          },
        ]}
      />

      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <button
          onClick={toggleCollapse}
          style={{
            background: "#fff",
            color: "#3A2A82",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

// Navbar Component using @ant-design/icons
const Navbar = ({ toggleSidebar }) => (
  <div
    style={{
      height: 60,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}
  >
    <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
      <MenuOutlined style={{ fontSize: 24 }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
    </div>
  </div>
);

// Main Layout
const CheckerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || "checker_current";

  const [selectedKey, setSelectedKey] = useState("myQueue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  useEffect(() => {
    if (!selectedKey) setSelectedKey("myQueue");
  }, [sidebarCollapsed, selectedKey]);

  const renderContent = () => {
    switch (selectedKey) {
      case "myQueue":
        return <MyQueue userId={userId} />;
      case "completed":
        return <Completed userId={userId} />;
      case "reports":
        return <ReportsPage userId={userId} />;
      case "allchecklists":
        return <AllChecklists />;


      default:
        return <MyQueue userId={userId} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div
          style={{
            padding: 20,
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;