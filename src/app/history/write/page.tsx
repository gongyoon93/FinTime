"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #121212;
  color: white;
  height: 100vh;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 1rem;

  button {
    flex: 1;
    padding: 0.5rem 0;
    background-color: transparent;
    color: white;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 1rem;
    cursor: pointer;

    &.active {
      border-bottom: 2px solid red;
      font-weight: bold;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #aaaaaa;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    background-color: #222222;
    border: 1px solid #333333;
    border-radius: 0.25rem;
    color: white;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #fe6725;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e65b21;
  }
`;

const ContinueButton = styled(SaveButton)`
  background-color: transparent;
  color: #fe6725;
  border: 1px solid #fe6725;

  &:hover {
    background-color: #fe6725;
    color: white;
  }
`;

export default function WritePage() {
  const router = useRouter();
  useEffect(() => {
    console.log("write page 초기 로딩 이후");
  }, [router]);
  return (
    <PageContainer>
      <TabContainer>
        <button className="active">수입</button>
        <button>지출</button>
        <button>이체</button>
      </TabContainer>

      <InputContainer>
        <label>날짜</label>
        <input type="text" defaultValue="24/11/25 (월) 오후 6:14" />
      </InputContainer>

      <InputContainer>
        <label>금액</label>
        <input type="number" placeholder="금액을 입력하세요" />
      </InputContainer>

      <InputContainer>
        <label>분류</label>
        <select>
          <option>카테고리를 선택하세요</option>
          <option>식비</option>
          <option>교통비</option>
          {/* 기타 옵션 추가 */}
        </select>
      </InputContainer>

      <InputContainer>
        <label>내용</label>
        <input type="text" placeholder="내용을 입력하세요" />
      </InputContainer>

      <InputContainer>
        <label>메모</label>
        <input type="text" placeholder="메모를 입력하세요" />
      </InputContainer>

      <SaveButton>저장하기</SaveButton>
      <ContinueButton>계속</ContinueButton>
    </PageContainer>
  );
}
