// // // import React, { useState } from "react";
// // // import { Menu } from "antd";
// // // import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// // // import { ClipboardList, Settings } from "lucide-react";

// // // import CreateChecklistPage from '../../pages/rm/RmChecklistPage.jsx'
// // // import RMReviewPage from "../../pages/rm/RmReviewPage.jsx";
// // // import Navbar from "../Navbar.jsx";


// // // const Sidebar = ({
// // //   selectedKey,
// // //   setSelectedKey,
// // //   collapsed,
// // //   toggleCollapse,
// // // }) => {
// // //   const handleClick = (e) => setSelectedKey(e.key);

// // //   return (
// // //     <div
// // //       style={{
// // //         width: collapsed ? 80 : 260,
// // //         background: "#2B1C67",
// // //         color: "white",
// // //         transition: "0.25s ease",
// // //         position: "relative",
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
// // //       }}
// // //     >
// // //       {/* Logo / Brand */}
// // //       <div
// // //         style={{
// // //           padding: collapsed ? "20px 0" : "25px 20px",
// // //           fontSize: collapsed ? 28 : 24,
// // //           fontWeight: "bold",
// // //           letterSpacing: collapsed ? 2 : 1,
// // //           textAlign: collapsed ? "center" : "left",
// // //         }}
// // //       >
// // //         {collapsed ? "RM" : "RM Dashboard"}
// // //       </div>

// // //       {/* MENU */}
// // //       <Menu
// // //         theme="dark"
// // //         mode="inline"
// // //         selectedKeys={[selectedKey]}
// // //         onClick={handleClick}
// // //         style={{
// // //           background: "transparent",
// // //           borderRight: "none",
// // //           fontSize: 15,
// // //         }}
// // //         inlineCollapsed={collapsed}
// // //         items={[
// // //           {
// // //             key: "myqueue",
// // //             label: "My Queue",
// // //             icon: <ClipboardList size={20} />,
// // //           },
// // //           {
// // //             key: "completedcl",
// // //             label: "Completed DCL",
// // //             icon: <ClipboardList size={20} />,
// // //           },
// // //           {
// // //             key: "deferral",
// // //             label: "Deferrals",
// // //             icon: <ClipboardList size={20} />,
// // //           },
// // //           {
// // //             key: "reports",
// // //             label: "Reports",
// // //             icon: <Settings size={20} />,
// // //           },
// // //         ]}
// // //       />

// // //       {/* Collapse Button */}
// // //       <div
// // //         style={{
// // //           marginTop: "auto",
// // //           padding: 20,
// // //           textAlign: "center",
// // //         }}
// // //       >
// // //         <button
// // //           onClick={toggleCollapse}
// // //           style={{
// // //             width: "100%",
// // //             padding: "8px 0",
// // //             borderRadius: 6,
// // //             border: "none",
// // //             background: "#fff",
// // //             color: "#2B1C67",
// // //             fontWeight: 600,
// // //             cursor: "pointer",
// // //             transition: "0.2s",
// // //           }}
// // //         >
// // //           {collapsed ? "Expand" : "Collapse"}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // <Navbar />

// // // const RmLayout = ({ userId }) => {
// // //   const [selectedKey, setSelectedKey] = useState("myqueue");
// // //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// // //   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

// // //   const renderContent = () => {
// // //     switch (selectedKey) {
// // //       case "myqueue":
// // //         return <CreateChecklistPage userId={userId} />;

// // //       case "completedcl":
// // //         return <RMReviewerPage />; // Same as old review checklist

// // //       case "deferral":
// // //         // Open the link in a new tab and prevent default sidebar navigation
// // //         window.open("https://newdcl.my.canva.site/deferral", "_blank", "noopener,noreferrer");


// // //       case "reports":
// // //         return <div style={pageStyle}>Reports Page</div>;

// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         display: "flex",
// // //         height: "100vh",
// // //         overflow: "hidden",
// // //         background: "#f4f6ff",
// // //       }}
// // //     >
// // //       <Sidebar
// // //         selectedKey={selectedKey}
// // //         setSelectedKey={setSelectedKey}
// // //         collapsed={sidebarCollapsed}
// // //         toggleCollapse={toggleSidebar}
// // //       />

// // //       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
// // //         <Navbar toggleSidebar={toggleSidebar} />

// // //         <div
// // //           style={{
// // //             padding: "25px",
// // //             flex: 1,
// // //             overflowY: "auto",
// // //             background: "#f4f6ff",
// // //           }}
// // //         >
// // //           {renderContent()}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* Shared Page Style */
// // // const pageStyle = {
// // //   fontSize: 28,
// // //   fontWeight: "bold",
// // //   color: "#2B1C67",
// // // };

// // // export default RmLayout;



// // import React, { useState } from "react";
// // import { Menu } from "antd";
// // import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// // import { ClipboardList, Settings } from "lucide-react";

// // import RmChecklistPage from '../../pages/rm/RmChecklistPage.jsx';


// // import MyQueue from "../../pages/rm/MyQueue.jsx";
// // import Completed from "../../pages/rm/Completed.jsx";


// // const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
// //   const handleClick = (e) => setSelectedKey(e.key);

// //   return (
// //     <div
// //       style={{
// //         width: collapsed ? 80 : 260,
// //         background: "#2B1C67",
// //         color: "white",
// //         transition: "0.25s ease",
// //         position: "relative",
// //         display: "flex",
// //         flexDirection: "column",
// //         boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
// //       }}
// //     >
// //       <div
// //         style={{
// //           padding: collapsed ? "20px 0" : "25px 20px",
// //           fontSize: collapsed ? 28 : 24,
// //           fontWeight: "bold",
// //           letterSpacing: collapsed ? 2 : 1,
// //           textAlign: collapsed ? "center" : "left",
// //         }}
// //       >
// //         {collapsed ? "RM" : "RM Dashboard"}
// //       </div>

// //       <Menu
// //         theme="dark"
// //         mode="inline"
// //         selectedKeys={[selectedKey]}
// //         onClick={handleClick}
// //         style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
// //         inlineCollapsed={collapsed}
// //         items={[
// //           { key: "myqueue", label: "My Queue", icon: <ClipboardList size={20} /> },
// //           { key: "completedcl", label: "Completed DCL", icon: <ClipboardList size={20} /> },
// //           {
// //             key: "deferral",
// //             label: "Deferrals",
// //             icon: <ClipboardList size={20} />,
// //             onClick: () => {
// //               window.open("https://newdcl.my.canva.site/deferral");
// //             },
// //             // children: [
// //             //   { key: "pendingdeferral", label: "Pending Deferral" },
// //             //   { key: "requestdeferral", label: "Request Deferral" },
// //             // ],
// //           },
// //           { key: "reports", label: "Reports", icon: <Settings size={20} /> },
// //         ]}
// //       />

// //       <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
// //         <button
// //           onClick={toggleCollapse}
// //           style={{
// //             width: "100%",
// //             padding: "8px 0",
// //             borderRadius: 6,
// //             border: "none",
// //             background: "#fff",
// //             color: "#2B1C67",
// //             fontWeight: 600,
// //             cursor: "pointer",
// //             transition: "0.2s",
// //           }}
// //         >
// //           {collapsed ? "Expand" : "Collapse"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // const Navbar = ({ toggleSidebar }) => {
// //   return (
// //     <div
// //       style={{
// //         height: 65,
// //         background: "#ffffff",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "space-between",
// //         padding: "0 25px",
// //         boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
// //         position: "sticky",
// //         top: 0,
// //         zIndex: 1000,
// //       }}
// //     >
// //       <MenuOutlined
// //         onClick={toggleSidebar}
// //         style={{ fontSize: 24, cursor: "pointer", color: "#2B1C67" }}
// //       />
// //       <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
// //         <BellOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
// //         <UserOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
// //       </div>
// //     </div>
// //   );
// // };

// // const RmLayout = ({ userId }) => {
// //   const [selectedKey, setSelectedKey] = useState("myqueue");
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// //   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

// //   const renderContent = () => {
// //     switch (selectedKey) {
// //       case "myqueue":
// //         return <RmChecklistPage userId={userId} mode="queue" />;
// //       case "completedcl":
// //         return <RmChecklistPage userId={userId} mode="completed" />;
// //       // case "pendingdeferral":
// //       //   return <div style={pageStyle}>Pending Deferral Page</div>;
// //       // case "requestdeferral":
// //       //   return <div style={pageStyle}>Request Deferral Page</div>;
// //       case "reports":
// //         return <div style={pageStyle}>Reports Page</div>;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f4f6ff" }}>
// //       <Sidebar
// //         selectedKey={selectedKey}
// //         setSelectedKey={setSelectedKey}
// //         collapsed={sidebarCollapsed}
// //         toggleCollapse={toggleSidebar}
// //       />
// //       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
// //         <Navbar toggleSidebar={toggleSidebar} />
// //         <div style={{ padding: "25px", flex: 1, overflowY: "auto", background: "#f4f6ff" }}>
// //           {renderContent()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* Shared Page Style */
// // const pageStyle = {
// //   fontSize: 28,
// //   fontWeight: "bold",
// //   color: "#2B1C67",
// // };

// // export default RmLayout;









// // File: src/components/rm/RmLayout.jsx
// import React, { useState } from "react";
// import { Menu } from "antd";
// import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// import { ClipboardList, Settings, CheckSquare } from "lucide-react";

// // Import your RM components
// import MyQueue from "../../pages/rm/MyQueue";           // Your MyQueue.jsx with modal
// import Completed from "../../pages/rm/Completed";       // Your Completed.jsx
// // Keep RmChecklistPage if you still need it for other pages

// const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
//   const handleClick = (e) => {
//     console.log("Menu clicked:", e.key);
//     setSelectedKey(e.key);
//   };

//   return (
//     <div
//       style={{
//         width: collapsed ? 80 : 260,
//         background: "#2B1C67",
//         color: "white",
//         transition: "0.25s ease",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
//         height: "100vh",
//       }}
//     >
//       <div
//         style={{
//           padding: collapsed ? "20px 0" : "25px 20px",
//           fontSize: collapsed ? 28 : 24,
//           fontWeight: "bold",
//           letterSpacing: collapsed ? 2 : 1,
//           textAlign: collapsed ? "center" : "left",
//         }}
//       >
//         {collapsed ? "RM" : "RM Dashboard"}
//       </div>

//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         onClick={handleClick}
//         style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
//         inlineCollapsed={collapsed}
//         items={[
//           { 
//             key: "myqueue", 
//             label: "My Queue", 
//             icon: <ClipboardList size={20} /> 
//           },
//           { 
//             key: "completed",  // Changed from "completedcl" to match component name
//             label: "Completed DCLs", 
//             icon: <CheckSquare size={20} />  // Better icon for completed
//           },
//           {
//             key: "deferral",
//             label: "Deferrals",
//             icon: <ClipboardList size={20} />,
//             onClick: () => {
//               window.open("https://newdcl.my.canva.site/deferral");
//             },
//           },
//           { 
//             key: "reports", 
//             label: "Reports", 
//             icon: <Settings size={20} /> 
//           },
//         ]}
//       />

//       <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
//         <button
//           onClick={toggleCollapse}
//           style={{
//             width: "100%",
//             padding: "8px 0",
//             borderRadius: 6,
//             border: "none",
//             background: "#fff",
//             color: "#2B1C67",
//             fontWeight: 600,
//             cursor: "pointer",
//             transition: "0.2s",
//           }}
//         >
//           {collapsed ? "Expand" : "Collapse"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <div
//       style={{
//         height: 65,
//         background: "#ffffff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 25px",
//         boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       <MenuOutlined
//         onClick={toggleSidebar}
//         style={{ fontSize: 24, cursor: "pointer", color: "#2B1C67" }}
//       />
//       <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
//         <BellOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
//         <UserOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
//       </div>
//     </div>
//   );
// };

// const RmLayout = ({ userId }) => {
//   const [selectedKey, setSelectedKey] = useState("myqueue");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

//   const renderContent = () => {
//     console.log("Rendering RM content for:", selectedKey);
//     console.log("User ID:", userId || "rm_current");
    
//     try {
//       switch (selectedKey) {
//         case "myqueue":
//           // Use your MyQueue.jsx (with RMActionModal)
//           return <MyQueue userId={userId || "rm_current"} />;
        
//         case "completed":
//           // Use your Completed.jsx
//           return <Completed userId={userId || "rm_current"} />;
        
//         case "deferral":
//           return (
//             <div style={{ padding: 25 }}>
//               <h2 style={{ color: "#2B1C67" }}>Deferrals</h2>
//               <p>Opening deferrals page in a new window...</p>
//               <p style={{ fontSize: 14, marginTop: 10, color: "#666" }}>
//                 <a href="https://newdcl.my.canva.site/deferral" target="_blank" rel="noopener noreferrer">
//                   Click here if not redirected
//                 </a>
//               </p>
//             </div>
//           );
        
//         case "reports":
//           return (
//             <div style={{ padding: 25 }}>
//               <h2 style={{ color: "#2B1C67", marginBottom: 20 }}>Reports</h2>
//               <div style={{
//                 backgroundColor: "white",
//                 padding: 30,
//                 borderRadius: 12,
//                 boxShadow: "0 4px 12px rgba(43, 28, 103, 0.1)",
//               }}>
//                 <p>Reports and analytics page is coming soon...</p>
//               </div>
//             </div>
//           );
        
//         default:
//           return <MyQueue userId={userId || "rm_current"} />;
//       }
//     } catch (error) {
//       console.error("Error rendering content:", error);
//       return (
//         <div style={{ padding: 25 }}>
//           <div style={{ 
//             backgroundColor: "#fff2f0", 
//             padding: 20, 
//             borderRadius: 8,
//             border: "1px solid #ffccc7"
//           }}>
//             <h3 style={{ color: "#ff4d4f" }}>Error Loading Page</h3>
//             <p>{error.message}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               style={{ 
//                 marginTop: 10, 
//                 padding: "8px 16px",
//                 backgroundColor: "#2B1C67",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 4,
//                 cursor: "pointer"
//               }}
//             >
//               Reload Page
//             </button>
//           </div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f4f6ff" }}>
//       <Sidebar
//         selectedKey={selectedKey}
//         setSelectedKey={setSelectedKey}
//         collapsed={sidebarCollapsed}
//         toggleCollapse={toggleSidebar}
//       />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div style={{ padding: "25px", flex: 1, overflowY: "auto", background: "#f4f6ff" }}>
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RmLayout;





// File: src/components/rm/RmLayout.jsx
import React, { useState } from "react";
import { Menu } from "antd";
import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { ClipboardList, Settings, CheckSquare } from "lucide-react";

// Import your RM components
import MyQueue from "../../pages/rm/MyQueue";
import Completed from "../../pages/rm/Completed";

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
        background: "#2B1C67",
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
            icon: <ClipboardList size={20} /> 
          },
          { 
            key: "completed", 
            label: "Completed DCLs", 
            icon: <CheckSquare size={20} />
          },
          {
            key: "deferral",
            label: "Deferrals",
            icon: <ClipboardList size={20} />
          },
          { 
            key: "reports", 
            label: "Reports", 
            icon: <Settings size={20} /> 
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
            color: "#2B1C67",
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
        style={{ fontSize: 24, cursor: "pointer", color: "#2B1C67" }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <BellOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
        <UserOutlined style={{ fontSize: 22, cursor: "pointer", color: "#2B1C67" }} />
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
          return (
            <div style={{ padding: 25 }}>
              <h2 style={{ color: "#2B1C67", marginBottom: 20 }}>Reports</h2>
              <div style={{
                backgroundColor: "white",
                padding: 30,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(43, 28, 103, 0.1)",
              }}>
                <p>Reports and analytics page is coming soon...</p>
              </div>
            </div>
          );
        
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
                backgroundColor: "#2B1C67",
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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f4f6ff" }}>
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ padding: "25px", flex: 1, overflowY: "auto", background: "#f4f6ff" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RmLayout;