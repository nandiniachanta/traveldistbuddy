import React from "react";

const Testimonials: React.FC = () => {
    const reviews = [
        { name: "Emily", text: "TravelBuddy saved me so much planning stress!" },
        { name: "Carlos", text: "I optimized my trip and saw 3 extra places." },
        { name: "Yuki", text: "Best travel app for group trips!" },
    ];

    return (
        <section style={{ padding: "4rem 2rem", background: "#f4f4f4" }}>
            <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>
                What Our Travelers Say ❤️
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                {reviews.map((rev, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            padding: "2rem",
                            background: "#fff",
                            borderRadius: "8px",
                        }}
                    >
                        <p>"{rev.text}"</p>
                        <strong>- {rev.name}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
