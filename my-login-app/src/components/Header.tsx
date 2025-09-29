import React, { useState } from "react";
import { MapPin, Menu } from "lucide-react";

interface TopBarProps {
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    activeSection: string;
    onNavigate: (section: string) => void;
}

export function Header({ isDarkMode, onToggleDarkMode, activeSection, onNavigate }: TopBarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: "home", label: "Home" },
        { id: "plan", label: "Plan Trip" },
        { id: "history", label: "Past Searches" },
        { id: "about", label: "About" },
    ];

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                {/* Logo */}
                <div style={styles.logoContainer}>
                    <div style={styles.iconWrapper}>
                        <MapPin size={24} color="white" />
                    </div>
                    <h1 style={styles.title}>🌍 TravelApp</h1>
                </div>

                {/* Desktop Nav */}
                <nav style={styles.desktopNav}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            style={{
                                ...styles.navButton,
                                borderBottom:
                                    activeSection === item.id ? "2px solid #007bff" : "none",
                                color: activeSection === item.id ? "#007bff" : "#000",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Dark Mode Toggle */}
                <label style={styles.toggleContainer}>
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={onToggleDarkMode}
                        style={styles.toggleInput}
                    />
                    <span
                        style={{
                            ...styles.toggleSlider,
                            backgroundColor: isDarkMode ? "#333" : "#ccc",
                        }}
                    />
                </label>

                {/* Mobile Menu Button */}
                <button
                    style={styles.mobileMenuButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div style={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            style={{
                                ...styles.mobileNavButton,
                                fontWeight: activeSection === item.id ? "bold" : "normal",
                                color: activeSection === item.id ? "#007bff" : "#000",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}

// ===== CSS-in-JS =====
const styles: { [key: string]: React.CSSProperties } = {
    header: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #ccc",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        flexWrap: "wrap",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    iconWrapper: {
        background: "linear-gradient(to right, #007bff, #6f42c1)",
        padding: "6px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: "20px", margin: 0 },
    desktopNav: {
        display: "flex",
        gap: "16px",
    },
    navButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        fontSize: "16px",
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "40px",
        height: "20px",
        cursor: "pointer",
    },
    toggleInput: {
        opacity: 0,
        width: 0,
        height: 0,
    },
    toggleSlider: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "10px",
        transition: "0.3s",
    },
    mobileMenuButton: {
        display: "none", // show via media query in real CSS
        background: "none",
        border: "none",
        cursor: "pointer",
    },
    mobileMenu: {
        position: "absolute",
        right: 0,
        top: "64px",
        width: "200px",
        backgroundColor: "#fff",
        boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: "12px",
    },
    mobileNavButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "18px",
        textAlign: "left",
    },
};
