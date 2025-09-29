
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* Full screen wrapper with background */
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
  background-image: url("https://images.unsplash.com/photo-1649522864970-668297e255f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB3b3JsZCUyMG1hcCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU4OTc0MjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
  //background-image: url("/landingbg.jpg"); /* put image in public/images */
  background-size: cover;
  background-position: center;
  position: relative;
`;

/* Optional dark overlay for readability */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

/* Glass card */
const DashboardBox = styled.div`
  position: relative; /* ensure above overlay */
  z-index: 1;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 2.7rem 2rem 2rem 2rem;
  width: 390px;
  max-width: 94vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const Title = styled.h2`
  margin: 0 0 0.6rem 0;
  font-weight: 700;
  font-size: 2rem;
  color: #22223B;
  letter-spacing: -1px;
`;

const Button = styled.button<{ accent?: "teal" | "orange" }>`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 0.7rem;
  background: ${({ accent }) =>
        accent === "orange"
            ? "linear-gradient(90deg, #ff8500 0%, #ffb347 100%)"
            : "linear-gradient(90deg, #14b8a6 0%, #43e97b 100%)"};
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0px 4px 20px #2c2c2c10;
  margin-top: 0.1rem;
  margin-bottom: 0.3rem;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.97);
  }
`;

const LinkText = styled.span`
  color: #3681f7;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #7b2ff7;
  }
`;

const Welcome = styled.div`
  text-align: center;
`;

export default function WelcomeDashboard({
    name,
    onLogout,
}: {
    name: string;
    onLogout: () => void;
}) {
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <Overlay />
            <DashboardBox>
                <Welcome>
                    <Title style={{ fontSize: "2.2rem", marginBottom: "0.4rem" }}>
                        Welcome{name ? `, ${name.split(" ")[0]}` : ""}!
                    </Title>
                    <div style={{ color: "#3a3a50", fontSize: "1.16rem", marginBottom: "1.7rem" }}>
                        You&apos;ve logged in. Ready to explore your dashboard?
                    </div>
                    <Button
                        accent="teal"
                        style={{ width: "auto", minWidth: 160 }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Get Started
                    </Button>
                    <div style={{ marginTop: "1.2rem", textAlign: "center" }}>
                        <LinkText
                            onClick={() => {
                                onLogout();
                                navigate("/login");
                            }}
                        >
                            Log out
                        </LinkText>
                    </div>
                </Welcome>
            </DashboardBox>
        </PageWrapper>
    );
}
