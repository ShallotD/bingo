// import React, { useState } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import {
//   ChevronLeft,
//   Home,
//   FileText,
//   ListChecks,
//   CheckCircle,
//   XCircle,
//   BarChart2,
//   Settings,
//   Bell,
//   User,
//   Search,
//   Filter
// } from "lucide-react";

// // Theme colors matching NCBA
// const PRIMARY_BLUE = "#164679";
// const ACCENT_LIME = "#b5d334";
// const DARK_BLUE = "#1e3a8a";
// const LIGHT_BLUE = "#1e40af";

// const ApproverLayout = ({ userId }) => {
//   const navigate = useNavigate();
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [notifications, setNotifications] = useState(3); // Mock notification count

//   const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: <Home size={18} />,
//       path: "/approver",
//       badge: null
//     },
//     {
//       id: "queue",
//       label: "Deferral Queue",
//       icon: <ListChecks size={18} />,
//       path: "/approver/queue",
//       badge: 5 // Pending deferrals count
//     },
//     {
//       id: "approved",
//       label: "Approved",
//       icon: <CheckCircle size={18} />,
//       path: "/approver/approved",
//       badge: null
//     },
//     {
//       id: "rejected",
//       label: "Rejected",
//       icon: <XCircle size={18} />,
//       path: "/approver/rejected",
//       badge: null
//     },
//     {
//       id: "reports",
//       label: "Reports",
//       icon: <BarChart2 size={18} />,
//       path: "/approver/reports",
//       badge: null
//     },
//     {
//       id: "settings",
//       label: "Settings",
//       icon: <Settings size={18} />,
//       path: "/approver/settings",
//       badge: null
//     }
//   ];

//   // Mock user data
//   const userData = {
//     name: "Approver User",
//     role: "Senior Credit Officer",
//     initials: "AU",
//     email: "approver@ncba.co.ke"
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
//       {/* Approver Sidebar */}
//       <div
//         style={{
//           width: sidebarCollapsed ? 80 : 280,
//           background: `linear-gradient(180deg, ${PRIMARY_BLUE} 0%, ${DARK_BLUE} 100%)`,
//           color: "white",
//           transition: "0.25s ease",
//           display: "flex",
//           flexDirection: "column",
//           height: "100vh",
//           boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
//           position: "relative",
//           zIndex: 100
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: sidebarCollapsed ? "20px 0" : "25px 20px",
//             textAlign: sidebarCollapsed ? "center" : "left",
//             borderBottom: "1px solid rgba(255,255,255,0.1)",
//           }}
//         >
//           {sidebarCollapsed ? (
//             <div style={{ 
//               fontSize: 24, 
//               fontWeight: "bold",
//               color: ACCENT_LIME 
//             }}>
//               A
//             </div>
//           ) : (
//             <>
//               <div style={{ 
//                 fontSize: 24, 
//                 fontWeight: "bold", 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: 10,
//                 marginBottom: 4
//               }}>
//                 <span>Approver</span>
//                 <div style={{
//                   fontSize: 12,
//                   background: ACCENT_LIME,
//                   color: PRIMARY_BLUE,
//                   padding: "2px 8px",
//                   borderRadius: 12,
//                   fontWeight: "bold"
//                 }}>
//                   PRO
//                 </div>
//               </div>
//               <div style={{ fontSize: 12, opacity: 0.7 }}>
//                 Credit Operations Dashboard
//               </div>
//             </>
//           )}
//         </div>

//         {/* User Profile Section */}
//         {!sidebarCollapsed && (
//           <div style={{
//             padding: "20px",
//             borderBottom: "1px solid rgba(255,255,255,0.1)",
//             display: "flex",
//             alignItems: "center",
//             gap: 12
//           }}>
//             <div style={{
//               width: 48,
//               height: 48,
//               borderRadius: "50%",
//               background: ACCENT_LIME,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: PRIMARY_BLUE,
//               fontWeight: "bold",
//               fontSize: 18
//             }}>
//               {userData.initials}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontWeight: "bold", fontSize: 14 }}>
//                 {userData.name}
//               </div>
//               <div style={{ fontSize: 11, opacity: 0.7 }}>
//                 {userData.role}
//               </div>
//               <div style={{ fontSize: 10, opacity: 0.5 }}>
//                 {userData.email}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <div style={{ padding: "20px 0", flex: 1, overflowY: "auto" }}>
//           {/* Back to Home */}
//           <div
//             onClick={() => navigate("/")}
//             style={{
//               padding: sidebarCollapsed ? "12px 0" : "12px 20px",
//               margin: sidebarCollapsed ? "12px 8px" : "12px",
//               borderRadius: 8,
//               background: "rgba(255,255,255,0.1)",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: sidebarCollapsed ? "center" : "flex-start",
//               gap: 12,
//               transition: "0.2s",
//               fontSize: "14px",
//               marginBottom: 8
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.15)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.1)";
//             }}
//           >
//             <ChevronLeft size={16} />
//             {!sidebarCollapsed && <span>Back to Home</span>}
//           </div>

//           {/* Menu Items */}
//           {menuItems.map((item) => {
//             const isActive = window.location.pathname === item.path;
//             return (
//               <div
//                 key={item.id}
//                 onClick={() => navigate(item.path)}
//                 style={{
//                   padding: sidebarCollapsed ? "16px 0" : "16px 20px",
//                   margin: sidebarCollapsed ? "8px 8px" : "8px 12px",
//                   borderRadius: 8,
//                   background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: sidebarCollapsed ? "center" : "space-between",
//                   gap: 12,
//                   transition: "0.2s",
//                   fontSize: "14px",
//                   borderLeft: isActive ? `4px solid ${ACCENT_LIME}` : "4px solid transparent",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isActive) {
//                     e.target.style.background = "rgba(255,255,255,0.08)";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isActive) {
//                     e.target.style.background = "transparent";
//                   }
//                 }}
//               >
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                   {item.icon}
//                   {!sidebarCollapsed && <span>{item.label}</span>}
//                 </div>
//                 {!sidebarCollapsed && item.badge && (
//                   <div style={{
//                     background: ACCENT_LIME,
//                     color: PRIMARY_BLUE,
//                     fontSize: 10,
//                     fontWeight: "bold",
//                     padding: "2px 6px",
//                     borderRadius: 10,
//                     minWidth: 20,
//                     textAlign: "center"
//                   }}>
//                     {item.badge}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Statistics Section (Only when expanded) */}
//           {!sidebarCollapsed && (
//             <div style={{
//               margin: "20px 12px",
//               padding: "16px",
//               background: "rgba(255,255,255,0.05)",
//               borderRadius: 8,
//               border: "1px solid rgba(255,255,255,0.1)"
//             }}>
//               <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
//                 Today's Stats
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <div>
//                   <div style={{ fontSize: 20, fontWeight: "bold" }}>12</div>
//                   <div style={{ fontSize: 10, opacity: 0.7 }}>Pending</div>
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 20, fontWeight: "bold", color: ACCENT_LIME }}>8</div>
//                   <div style={{ fontSize: 10, opacity: 0.7 }}>Approved</div>
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 20, fontWeight: "bold", color: "#ff6b6b" }}>4</div>
//                   <div style={{ fontSize: 10, opacity: 0.7 }}>Rejected</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Collapse Button */}
//         <div style={{ padding: 20, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
//           <button
//             onClick={toggleSidebar}
//             style={{
//               width: "100%",
//               padding: "10px 0",
//               borderRadius: 8,
//               border: "none",
//               background: "rgba(255,255,255,0.1)",
//               color: "white",
//               fontWeight: 500,
//               cursor: "pointer",
//               transition: "0.2s",
//               fontSize: "14px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.15)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.1)";
//             }}
//           >
//             {sidebarCollapsed ? "›" : "‹"}
//             {!sidebarCollapsed && <span>Collapse Sidebar</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column", 
//         background: "#f8fafc",
//         overflow: "hidden"
//       }}>
//         {/* Top Navigation Bar */}
//         <div style={{
//           height: 64,
//           background: "white",
//           borderBottom: "1px solid #e2e8f0",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "0 24px",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <button
//               onClick={toggleSidebar}
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 background: "white",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: PRIMARY_BLUE,
//                 transition: "0.2s"
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "#f1f5f9";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "white";
//               }}
//             >
//               {sidebarCollapsed ? "›" : "‹"}
//             </button>

//             {/* Search Bar */}
//             <div style={{
//               position: "relative",
//               width: 300
//             }}>
//               <Search size={18} style={{
//                 position: "absolute",
//                 left: 12,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#94a3b8"
//               }} />
//               <input
//                 type="text"
//                 placeholder="Search deferrals, customers, DCL..."
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px 8px 40px",
//                   borderRadius: 8,
//                   border: "1px solid #e2e8f0",
//                   background: "#f8fafc",
//                   fontSize: 14,
//                   outline: "none",
//                   transition: "0.2s"
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = PRIMARY_BLUE;
//                   e.target.style.background = "white";
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = "#e2e8f0";
//                   e.target.style.background = "#f8fafc";
//                 }}
//               />
//             </div>

//             {/* Filter Button */}
//             <button
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 background: "white",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 fontSize: 14,
//                 color: "#475569",
//                 transition: "0.2s"
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "#f1f5f9";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "white";
//               }}
//             >
//               <Filter size={16} />
//               Filters
//             </button>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             {/* Notifications */}
//             <div style={{ position: "relative", cursor: "pointer" }}>
//               <Bell size={20} color="#475569" />
//               {notifications > 0 && (
//                 <div style={{
//                   position: "absolute",
//                   top: -4,
//                   right: -4,
//                   width: 16,
//                   height: 16,
//                   borderRadius: "50%",
//                   background: "#ef4444",
//                   color: "white",
//                   fontSize: 10,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: "bold"
//                 }}>
//                   {notifications}
//                 </div>
//               )}
//             </div>

//             {/* User Menu */}
//             <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
//               <div style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: "50%",
//                 background: `linear-gradient(135deg, ${PRIMARY_BLUE}, ${ACCENT_LIME})`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: 14
//               }}>
//                 {userData.initials}
//               </div>
//               {!sidebarCollapsed && (
//                 <div>
//                   <div style={{ fontSize: 14, fontWeight: "bold", color: "#1e293b" }}>
//                     {userData.name}
//                   </div>
//                   <div style={{ fontSize: 12, color: "#64748b" }}>
//                     {userData.role}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div style={{ 
//           flex: 1, 
//           overflowY: "auto", 
//           padding: "24px",
//           background: "#f8fafc"
//         }}>
//           {/* Breadcrumb */}
//           <div style={{ 
//             marginBottom: 24,
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             fontSize: 14,
//             color: "#64748b"
//           }}>
//             <span style={{ cursor: "pointer" }} onClick={() => navigate("/approver")}>
//               Approver
//             </span>
//             <span>›</span>
//             <span style={{ color: PRIMARY_BLUE, fontWeight: "bold" }}>
//               {menuItems.find(item => item.path === window.location.pathname)?.label || "Dashboard"}
//             </span>
//           </div>

//           {/* Page Content */}
//           <div style={{
//             background: "white",
//             borderRadius: 12,
//             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             minHeight: "calc(100vh - 180px)",
//             overflow: "hidden"
//           }}>
//             <Outlet />
//           </div>

//           {/* Footer */}
//           <div style={{
//             marginTop: 24,
//             padding: "16px",
//             textAlign: "center",
//             fontSize: 12,
//             color: "#64748b",
//             borderTop: "1px solid #e2e8f0"
//           }}>
//             © 2024 NCBA Bank PLC. All rights reserved. • Deferral Management System v2.0
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApproverLayout;




import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  ListChecks,
  Clock,
  BarChart2,
  Settings,
  CheckCircle,
  XCircle
} from "lucide-react";

// Import Approver page components
import Dashboard from "../../pages/approver/Approver";
import DeferralQueue from "../../pages/approver/DeferralQueue";
import DeferralHistory from "../../pages/approver/DeferralHistory";
import Reports from "../../pages/approver/Reports";
import SettingsPage from "../../pages/approver/Settings";
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
    if (path.includes("/approver/history")) return "history";
    if (path.includes("/approver/reports")) return "reports";
    if (path.includes("/approver/settings")) return "settings";
    return "dashboard"; // default
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
            key: "dashboard",
            label: "Dashboard",
            icon: <Home size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "queue",
            label: "Deferral Queue",
            icon: <ListChecks size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "history",
            label: "Decision History",
            icon: <Clock size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "reports",
            label: "Reports",
            icon: <BarChart2 size={18} style={{ color: "#e5e7eb" }} />,
          },
          {
            key: "settings",
            label: "Settings",
            icon: <Settings size={18} style={{ color: "#e5e7eb" }} />,
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
  const [selectedKey, setSelectedKey] = useState("dashboard");
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
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: PRIMARY_BLUE }}>
                Approver Dashboard
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
            {/* Main Approver Routes */}
            <Route path="/" element={<Dashboard userId={userId || "approver_current"} />} />
            <Route path="/dashboard" element={<Dashboard userId={userId || "approver_current"} />} />
            <Route path="/queue" element={<DeferralQueue userId={userId || "approver_current"} />} />
            <Route path="/history" element={<DeferralHistory userId={userId || "approver_current"} />} />
            <Route path="/reports" element={<Reports userId={userId || "approver_current"} />} />
            <Route path="/settings" element={<SettingsPage userId={userId || "approver_current"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ApproverLayout;