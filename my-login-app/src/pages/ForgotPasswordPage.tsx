import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const Card = styled.div`
  background: rgba(255,255,255,0.9);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 350px;
  max-width: 92vw;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Title = styled.h2`
  margin: 0 0 0.6rem 0;
  font-weight: 700;
  font-size: 2rem;
  color: #22223B;
  letter-spacing: -1px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 0.9rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0a0a0;
  font-size: 1.08rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem 1rem 0.85rem 2.7rem;
  border-radius: 0.7rem;
  border: 1.5px solid #d0d0d0;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  font-family: inherit;
  &:focus {
    border: 1.5px solid #3681f7;
  }
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  return (
    <Card>
      <Title>Forgot Password</Title>
      {sent ? (
        <div>
          A password reset link has been sent to your email.
          <br />
          <Button accent="teal" onClick={() => navigate("/login")}>Back to Login</Button>
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputGroup>
          <Button type="submit" accent="teal">
            Send Reset Link
          </Button>
          <div style={{ marginTop: "1rem" }}>
            <LinkText onClick={() => navigate("/login")}>Back to Login</LinkText>
          </div>
        </form>
      )}
    </Card>
  );
}