import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

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

export default function SignupPage({
  onSignup,
}: {
  onSignup: (name: string, email: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (pw !== cpw) {
      setErr("Passwords don't match.");
      return;
    }
    onSignup(name, email);
    navigate("/welcome");
  }
  return (
    <Card>
      <Title>Sign Up</Title>
      <form onSubmit={handleSignup}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="text"
            placeholder="Full Name"
            required
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </InputGroup>
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
            autoComplete="new-password"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            autoComplete="new-password"
            value={cpw}
            onChange={e => setCpw(e.target.value)}
          />
        </InputGroup>
        {err && (
          <div style={{ color: "#ff8500", fontSize: "0.98rem", marginBottom: "0.4rem" }}>
            {err}
          </div>
        )}
        <Button type="submit" accent="orange">
          Sign Up
        </Button>
      </form>
      <SwitchForm>
        Already have an account?{" "}
        <LinkText onClick={() => navigate("/login")}>Log in</LinkText>
      </SwitchForm>
    </Card>
  );
}