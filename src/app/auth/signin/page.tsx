"use client";

import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  width: 150px;
  height: 150px;
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Input = styled.input<{ isValid: boolean; isError: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid
    ${(props) =>
      props.isValid ? "#10b981" : props.isError ? "#ef4444" : "#e5e7eb"};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const ValidationMessage = styled.p<{ isError?: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.isError ? "#ef4444" : "#10b981")};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #60a5fa;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3b82f6;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("이메일을 입력하세요.");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("이메일 형식을 확인하세요.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("패스워드를 입력하세요.");
      return false;
    }
    if (value.length < 3) {
      setPasswordError("패스워드는 3자 이상 입력해야 합니다.");
      return false;
    }
    // if (!/[A-Z]/.test(value)) {
    //   setPasswordError("Password must contain at least one uppercase letter");
    //   return false;
    // }
    // if (!/[a-z]/.test(value)) {
    //   setPasswordError("Password must contain at least one lowercase letter");
    //   return false;
    // }
    if (!/[0-9]/.test(value)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      await signIn("credentials", {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: "/abook",
      });
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Image
          src="/img/fashong.png"
          alt="Cute mascot"
          width={150}
          height={150}
          priority
        />
      </LogoContainer>
      <FormCard>
        <Title>Welcome Back!</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              isValid={!!email && !!!emailError}
              isError={!!emailError}
            />
            {emailError && (
              <ValidationMessage isError>
                <AlertCircle size={16} />
                {emailError}
              </ValidationMessage>
            )}
            {email && !emailError && (
              <ValidationMessage>
                <CheckCircle2 size={16} />
                Email is valid
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              isValid={!!password && !!!passwordError}
              isError={!!passwordError}
            />
            {passwordError && (
              <ValidationMessage isError>
                <AlertCircle size={16} />
                {passwordError}
              </ValidationMessage>
            )}
            {password && !passwordError && (
              <ValidationMessage>
                <CheckCircle2 size={16} />
                Password meets requirements
              </ValidationMessage>
            )}
          </InputGroup>

          <Button
            type="submit"
            disabled={!email || !password || !!emailError || !!passwordError}
          >
            Sign In
          </Button>
        </form>
      </FormCard>
    </Container>
  );
}
