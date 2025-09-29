
import React from "react";
import { MapPin, Clock, Users } from "lucide-react";
import "./RightSideInfo.css";
import { useState } from "react";



export default function RightSideInfo() {

    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };
    return (

        <div className="right-side">
            {/* Header */}
            <div className="right-side-header">
                <div className="tag">🚀 AI-Powered Travel Optimization</div>

                <h1>
                    Find the Perfect Route for Your{" "}
                    <span className="highlight">Multi-Destination</span> Trip
                </h1>

                <p>
                    TravelBuddy uses advanced algorithms to optimize your travel routes
                    across multiple destinations. Save time, reduce costs, and maximize
                    your travel experience with our intelligent route planning.
                </p>
            </div>

            {/* Features - now in one row */}
            <div className="features-row">
                <div className="feature-card">
                    <div className="icon blue">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="feature-title">Smart Routing</p>
                        <p className="feature-sub">AI-powered optimization</p>
                    </div>
                </div>

                <div className="feature-card">
                    <div className="icon green">
                        <Clock size={22} />
                    </div>
                    <div>
                        <p className="feature-title">Save 40%</p>
                        <p className="feature-sub">Travel Time</p>
                    </div>
                </div>

                <div className="feature-card">
                    <div className="icon orange">
                        <Users size={22} />
                    </div>
                    <div>
                        <p className="feature-title">10K+</p>
                        <p className="feature-sub">Happy Users</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="cta">
                <button className="cta-btn" onClick={handleLoginClick}>
                    Start Planning Your Trip Now
                </button>
                <div className="cta-tags">
                    <span>✔ Free to get started</span>
                    <span>✔ No credit card required</span>
                    <span>✔ Export to any map app</span>
                </div>
            </div>
            {showLogin && (
                <div className="login-modal-overlay">
                    <div className="login-modal">
                        <h2>Please register yourself</h2>
                        <div className="modal-actions" style={{ justifyContent: 'center' }}>
                            <button className="cta-btn" onClick={handleCloseLogin}>
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
