import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
    return (
        <section
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                padding: "3rem",
            }}
        >
            {/* Left: text */}
            <div style={{ flex: 1, padding: "2rem" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>
                    Plan Smarter, Travel Better ✈️
                </h1>
                <p style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
                    TravelBuddy helps you create the most efficient routes across multiple
                    destinations — saving time and money while maximizing experiences.
                </p>
                <Link
                    to="/signup"
                    style={{
                        display: "inline-block",
                        marginTop: "1rem",
                        padding: "1rem 2rem",
                        borderRadius: "8px",
                        background: "#ff007f",
                        color: "#fff",
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    Get Started Free
                </Link>
            </div>

            {/* Right: image */}
            <div
                style={{
                    flex: 1,
                    backgroundImage: "url('/images/travel-hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                }}
            />
        </section>
    );
};

export default Hero;
