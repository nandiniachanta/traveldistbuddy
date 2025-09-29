import React from "react";

const Features: React.FC = () => {
    const steps = [
        { title: "Plan", desc: "Choose your destinations easily." },
        { title: "Optimize", desc: "AI finds the most efficient route." },
        { title: "Travel", desc: "Enjoy your journey stress-free." },
    ];

    return (
        <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>How It Works</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            padding: "2rem",
                            background: "#f9f9f9",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
