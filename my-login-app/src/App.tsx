import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import WelcomeDashboard from "./pages/WelcomeDashboard";
import TravelDashboard from "./pages/TravelDashboard";
import 'leaflet/dist/leaflet.css';



const CenterBox: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    {children}
  </div>
);

const AuthWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <CenterBox>{children}</CenterBox>
);

const App: React.FC = () => {
  // This holds the logged-in user's name (simulate auth)
  const [userName, setUserName] = useState<string>("");

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={
          <AuthWrapper>
            <LoginPage
              onLogin={email => {
                setUserName(email.split("@")[0]);
              }}
            />
          </AuthWrapper>
        } />
        <Route path="/signup" element={
          <AuthWrapper>
            <SignupPage
              onSignup={(name, email) => {
                setUserName(name);
              }}
            />
          </AuthWrapper>
        } />
        <Route path="/forgot" element={
          <AuthWrapper>
            <ForgotPasswordPage />
          </AuthWrapper>
        } />
        <Route path="/welcome" element={
          userName
            ? <WelcomeDashboard
                name={userName}
                onLogout={() => setUserName("")}
              />
            : <Navigate to="/login" replace />
        } />
        <Route path="/dashboard" element={
          userName
            ? <TravelDashboard
                user={userName}
                onLogout={() => setUserName("")}
              />
            : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;