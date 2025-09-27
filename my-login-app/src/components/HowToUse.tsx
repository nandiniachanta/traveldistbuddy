import "./HowToUse.css";

export default function HowToUse() {
    const steps = [
        {
            icon: "📍",
            title: "Add Your Destinations",
            description:
                "Input all the places you want to visit. Add cities, landmarks, restaurants, or any location.",
        },
        {
            icon: "🛣️",
            title: "Get Optimized Route",
            description:
                "Our algorithm calculates the most efficient path to minimize travel time and distance.",
        },
        {
            icon: "⏱️",
            title: "Save Time & Money",
            description:
                "Reduce travel time by up to 40% and save money on transportation.",
        },
        {
            icon: "🎉",
            title: "Enjoy Your Trip",
            description:
                "Focus on creating memories while we handle the logistics.",
        },
    ];

    return (
        <section className="howto">
            <div className="howto-header">
                <span className="tag">Simple 4-Step Process</span>
                <h2>How to Use TravelBuddy</h2>
                <p>
                    Planning your multi-destination trip has never been easier. Follow
                    these simple steps to optimize your route and create unforgettable
                    experiences.
                </p>
            </div>

            <div className="steps-grid">
                {steps.map((step, index) => (
                    <div key={index} className="step-card">
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-number">{index + 1}</div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>

            <div className="howto-footer">
                ✅ Join 10,000+ travelers who’ve optimized their routes
            </div>
        </section>
    );
}
