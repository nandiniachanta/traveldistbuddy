import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import WelcomeDashboard from "./pages/WelcomeDashboard";
import TravelDashboard from "./pages/TravelDashboard";
import RightSideInfo from "./components/RightSideInfo";
import "./components/RightSideInfo.css";
import { useEffect } from "react";

function DashboardRedirect() {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                src="http://localhost:5173"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Travel Landing Page"
            />
        </div>
    );
}

/* ========= Auth Layout ========= */
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        style={{
            display: "flex",
            minHeight: "100vh",
            width: "100%",
            fontFamily: "sans-serif",
        }}
    >
        {/* Left side: form container */}
        <div
            style={{
                flex: "0 0 30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(34, 34, 59, 0.85)",

                //background: "linear - gradient(135deg, rgba(15, 15, 35, 0.9), rgba(40, 40, 70, 0.85))",
                padding: "2rem",
            }}
        >
            {children}
        </div>

        {/* Right side: image */}
        {/* Right side: marketing info */}
        <div
            style={{
                flex: 1,
                position: "relative",
                backgroundImage: "url('/sigin.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
                }}
            />
            <div style={{ position: "relative", maxWidth: "600px", width: "100%" }}>
                <RightSideInfo />
            </div>
        </div>

    </div>
);

/* ========= Main App ========= */
const App: React.FC = () => {
    const [userName, setUserName] = useState<string>("");

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                {/* Landing page */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth pages */}
                <Route
                    path="/login"
                    element={
                        <AuthWrapper>
                            <LoginPage
                                onLogin={(email) => {
                                    setUserName(email.split("@")[0]);
                                }}
                            />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthWrapper>
                            <SignupPage
                                onSignup={(name, email) => {
                                    setUserName(name);
                                }}
                            />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/forgot"
                    element={
                        <AuthWrapper>
                            <ForgotPasswordPage />
                        </AuthWrapper>
                    }
                />

                {/* Dashboards */}
                <Route
                    path="/welcome"
                    element={
                        userName ? (
                            <WelcomeDashboard
                                name={userName}
                                onLogout={() => setUserName("")}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                {/*<Route*/}
                {/*    path="/dashboard"*/}
                {/*    element={*/}
                {/*        userName ? (*/}
                {/*            <TravelDashboard user={userName} onLogout={() => setUserName("")} />*/}
                {/*        ) : (*/}
                {/*            <Navigate to="/login" replace />*/}
                {/*        )*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="/dashboard"
                    element={
                        userName ? (
                            <DashboardRedirect />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
         

                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
