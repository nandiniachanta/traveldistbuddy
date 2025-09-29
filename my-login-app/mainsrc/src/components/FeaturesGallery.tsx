
import React from "react";
import "./FeaturesGallery.css";

const features = [
    {
        image:
            "https://images.unsplash.com/photo-1758272959019-654aab64b1fb?ixlib=rb-4.0.3&q=80&w=1080",
        title: "Interactive Route Planning",
        description:
            "Visualize your optimized route on an interactive map with turn-by-turn directions.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1722498703803-448733d0b712?ixlib=rb-4.0.3&q=80&w=1080",
        title: "Multiple Destinations",
        description:
            "Plan complex trips with multiple stops, attractions, and points of interest seamlessly.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1671293258300-979f65eec4bb?ixlib=rb-4.0.3&q=80&w=1080",
        title: "Mobile-First Design",
        description:
            "Access your travel plans anywhere with our responsive mobile-optimized interface.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1723902281477-fc5a683354e9?ixlib=rb-4.0.3&q=80&w=1080",
        title: "Happy Travelers",
        description:
            "Join thousands of satisfied travelers who've optimized their journeys with TravelBuddy.",
    },
];

export default function FeaturesGallery() {
    return (
        <section className="features">
            <div className="features-header">
                <h2>Features & Benefits</h2>
                <p>
                    Discover what makes TravelBuddy the perfect companion for your
                    multi-destination adventures.
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-image">
                            <img src={feature.image} alt={feature.title} />
                        </div>
                        <div className="feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
