import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Sidebar Toggle Button (Hamburger) */}
      <button
        onClick={toggleSidebar}
        style={{
          backgroundColor: "#007bff",
          border: "none",
          color: "#fff",
          padding: "10px",
          fontSize: "18px",
          display: "inline-block",
          position: "fixed",
          top: "10px",
          left: "15px",
          zIndex: 1001,
          borderRadius: "6px",
        }}
      >
        ☰
      </button>

      {/* Layout Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          marginTop: "0px",
        }}
      >
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside
            style={{
              width: "250px",
              backgroundColor: "#343a40",
              color: "#fff",
              paddingTop: "60px",
              position: "fixed",
              height: "100%",
              top: 0,
              left: 0,
              overflowY: "auto",
              transition: "all 0.3s ease",
              zIndex: 1000,
            }}
          >
            <nav>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ padding: "15px" }}>
                  <Link
                    to="createuser"
                    style={{ color: "#fff", textDecoration: "none" }}
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    ➕ Create User
                  </Link>
                </li>
                <li style={{ padding: "15px" }}>
                  <Link
                    to="assigntask"
                    style={{ color: "#fff", textDecoration: "none" }}
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    📌 Assign Task
                  </Link>
                </li>
                <li style={{ padding: "15px" }}>
                  <Link
                    to="usertaskreport"
                    style={{ color: "#fff", textDecoration: "none" }}
                    onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
                  >
                    📋 Task Report
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            marginLeft: isSidebarOpen && window.innerWidth > 768 ? "250px" : "0px",
            padding: "20px",
            paddingTop: "60px",
            overflowY: "auto",
            width: "100%",
            boxSizing: "border-box",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar close */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );
};

export default DashBoard;
