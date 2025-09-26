import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSearchLocation, FaBars, FaTimes } from "react-icons/fa";
import RouteMap from "../components/RouteMap";

// ----------------- Styled Components -----------------

// Background
const TravelDashboardBg = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background:
    linear-gradient(rgba(0,0,0,0.18), rgba(255,255,255,0.17)),
    url('/traveldashboard.jpg') no-repeat center center fixed;
  background-size: cover;
`;

// Top Bar
const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background: #0f172a;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

// Layout
const PageLayout = styled.div`
  display: flex;
  height: calc(100vh - 40px); /* subtract top bar */
  width: 100%;
`;

// Sidebar
const SidebarContainer = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? "260px" : "0")};
  transition: width 0.3s ease;
  background: #fff;
  border-right: ${(props) => (props.open ? "1px solid #ddd" : "none")};
  overflow: hidden;
  position: relative;
  z-index: 2;
  padding: ${(props) => (props.open ? "1rem" : "0")};
`;

// Toggle Button
const SidebarToggle = styled.button`
  position: fixed;
  top: 40px; /* was 60px, now a bit higher */
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #aaa;
  background: #fff;
  cursor: pointer;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: left 0.3s ease, top 0.3s ease;
`;


// Sidebar items
const SidebarSection = styled.div`
  margin-top: 1.5rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SidebarItem = styled.div`
  background: #f6f6fa;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background: #e1e1f0;
  }
`;

// Dashboard
const DashboardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transition: all 0.3s ease;
`;

// Dashboard Content Split
const DashboardMain = styled.div`
  display: flex;
  gap: 1.5rem;
  flex: 1;
`;

// Left Panel (Form)
const FormSection = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px #0002;
  padding: 1.5rem;
`;

// Right Panel (Map)
const MapSection = styled.div`
  flex: 1.5;
  background: #f3f8fe;
  border-radius: 1rem;
  box-shadow: 0 2px 12px #0002;
  padding: 1.5rem;
`;

// Consult Button
const ConsultButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  &:hover {
    background: #0f9d92;
  }
`;

// ----------------- Types -----------------
type SearchRecord = {
  destinations: string[];
  timestamp: number;
};

// ----------------- Destination Form -----------------
function DestinationForm({ onSearch }: { onSearch: (dests: string[]) => void }) {
  const [num, setNum] = useState(2);
  const [dests, setDests] = useState<string[]>(["", ""]);

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let n = Math.max(2, Math.min(10, Number(e.target.value) || 2));
    setNum(n);
    setDests(prev => {
      let arr = prev.slice(0, n);
      while (arr.length < n) arr.push("");
      return arr;
    });
  };

  const handleDestChange = (idx: number, value: string) => {
    setDests(prev => {
      const arr = [...prev];
      arr[idx] = value;
      return arr;
    });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(dests.map(s => s.trim()).filter(Boolean));
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Add Your Destinations</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Number of Destinations:{" "}
          <input
            type="number"
            min={2}
            max={10}
            value={num}
            style={{ width: 60, marginLeft: 10 }}
            onChange={handleNumChange}
          />
        </label>
      </div>

      {Array.from({ length: num }).map((_, idx) => (
        <div key={idx} style={{ marginBottom: "0.7rem" }}>
          <span style={{ width: 25, display: "inline-block" }}>{idx + 1}.</span>
          <input
            type="text"
            value={dests[idx] || ""}
            placeholder={`Destination ${idx + 1}`}
            onChange={e => handleDestChange(idx, e.target.value)}
            required
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #bbb",
              width: "70%",
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.5rem",
          borderRadius: "0.6rem",
          border: "none",
          background: "linear-gradient(90deg, #14b8a6 0%, #43e97b 100%)",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <FaSearchLocation /> Search Route
      </button>
    </form>
  );
}

// ----------------- Main Dashboard -----------------
export default function TravelDashboard({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [past, setPast] = useState<SearchRecord[]>(() =>
    JSON.parse(localStorage.getItem("travelPastSearches") || "[]")
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

    // NEW: locations state
    const [locations, setLocations] = useState<string[]>([]);

    // NEW: handleRouteSearch
    const handleRouteSearch = (destinations: string[]) => {
        console.log("Destinations passed to RouteMap:", destinations);
        setLocations(destinations);
        saveSearch(destinations); // optional: save to past searches
    };

  const saveSearch = (destinations: string[]) => {
    const record: SearchRecord = { destinations, timestamp: Date.now() };
    const updated = [...past, record].slice(-10);
    setPast(updated);
    localStorage.setItem("travelPastSearches", JSON.stringify(updated));
  };


    


  return (
    <>
      {/* Background */}
      <TravelDashboardBg />

 <TopBar>
  {/* Left: Contact Info */}
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    📧 info@travelapp.com
    <a
      href="/help"
      style={{ color: "#fff", textDecoration: "underline", fontSize: "0.9rem" }}
    >
      Help
    </a>
  </div>

  {/* Center: Branding */}
  <div style={{ textAlign: "center" }}>
    <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>🌍 TravelApp</div>
    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
      Plan Your Perfect Journey
    </div>
  </div>

  {/* Right: User Actions */}
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    📞 +91 9876543210
    <div style={{ cursor: "pointer" }}>👤 Profile</div>
    <div style={{ cursor: "pointer" }}>🔔</div>
  </div>
</TopBar>


      {/* Layout */}
      <PageLayout>
        {/* Sidebar */}
        {/* Sidebar */}
<SidebarContainer open={sidebarOpen}>
  {sidebarOpen && (
    <>
      <SidebarSection>
        <SidebarTitle>{user}</SidebarTitle>
        <SidebarItem
          onClick={() => {
            onLogout();
            navigate("/login");
          }}
        >
          <FaSignOutAlt /> Logout
        </SidebarItem>
      </SidebarSection>

      {past.length > 0 && (
        <SidebarSection>
          <SidebarTitle>Past Searches</SidebarTitle>
          {past
            .slice()
            .reverse()
            .map((record) => (
              <SidebarItem
                key={record.timestamp}
                onClick={() => handleRouteSearch(record.destinations)}
              >
                {record.destinations.join(" → ")}
              </SidebarItem>
            ))}
        </SidebarSection>
      )}
    </>
  )}
</SidebarContainer>

{/* Sidebar toggle always visible */}
<SidebarToggle
  onClick={() => setSidebarOpen(!sidebarOpen)}
  style={{ left: sidebarOpen ? 260 : 0 }}
>
  {sidebarOpen ? <FaTimes /> : <FaBars />}
</SidebarToggle>


        {/* Dashboard */}
        <DashboardContainer>
          <DashboardMain>
            <FormSection>
              <DestinationForm onSearch={handleRouteSearch} />
            </FormSection>
                      <MapSection>
                          <RouteMap locations={locations} />
              <h3>Route Map</h3>
              <p>Here we’ll visualize the destinations and path.</p>
            </MapSection>
          </DashboardMain>
        </DashboardContainer>
      </PageLayout>

      {/* Consult Button */}
      <ConsultButton>💬 Consult with us</ConsultButton>
    </>
  );
}
