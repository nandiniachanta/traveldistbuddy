import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

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

const SwitchForm = styled.div`
  text-align: center;
  font-size: 1rem;
`;

const ForgotLink = styled.span`
  font-size: 0.9rem;
  color: #a259f7;
  cursor: pointer;
  float: right;
  margin-top: -0.5rem;
  margin-bottom: 0.6rem;
  text-decoration: underline;
`;

export default function LoginPage({
  onLogin,
}: {
  onLogin: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    onLogin(email);
    navigate("/welcome");
  }

  return (
    <Card>
      <Title>Sign In</Title>
      <form onSubmit={handleLogin}>
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
        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputGroup>
        <ForgotLink onClick={() => navigate("/forgot")}>Forgot password?</ForgotLink>
        <Button type="submit" accent="teal">
          Login
        </Button>
      </form>
      <SwitchForm>
        Don&apos;t have an account?{" "}
        <LinkText onClick={() => navigate("/signup")}>Sign up</LinkText>
      </SwitchForm>
    </Card>
  );
}