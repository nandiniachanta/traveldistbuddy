import React from "react";

const Highlights: React.FC = () => {
    const items = [
        { img: "/images/story1.jpg", text: "Anna saved 40% travel time in Europe!" },
        { img: "/images/story2.jpg", text: "Ravi explored 5 cities in 7 days." },
        { img: "/images/story3.jpg", text: "Sophia discovered hidden gems in Asia." },
    ];

    return (
        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
            <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>
                Traveler Stories 🌍
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                {items.map((item, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                        <img
                            src={item.img}
                            alt="story"
                            style={{ width: "100%", borderRadius: "8px", height: "200px", objectFit: "cover" }}
                        />
                        <p style={{ marginTop: "0.5rem" }}>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Highlights;
