import React from "react";
import { Link } from "react-router-dom";

import  HowToUse  from "../components/HowToUse";
import Footer from "../components/Footer";
import FeaturesGallery from "../components/FeaturesGallery";

const LandingPage: React.FC = () => {
    return (
        <div style={{ fontFamily: "'Poppins', sans-serif" }}>
            {/* Hero Section with Background */}
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url('/landingbg.jpg')", // put your image inside public/images
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                {/* Overlay for better readability */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        zIndex: 0,
                    }}
                />

                <div style={{ zIndex: 1, maxWidth: "800px", padding: "2rem" }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: 700, marginTop: "4rem", marginBottom: "1rem" }}>

                        Explore the World with <span style={{ color: "#00c6ff" }}>Travelbuddy</span>
                    </h1>
                    <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                        Plan trips, share experiences, and connect with fellow travelers.
                    </p>
                    <Link
                        to="/signup"
                        style={{
                            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                            padding: "0.8rem 2rem",
                            borderRadius: "30px",
                            color: "#fff",
                            fontSize: "1rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "0.3s ease",
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <HowToUse />
            <FeaturesGallery />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
