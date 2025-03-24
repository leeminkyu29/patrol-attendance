import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin1234") {
      navigate("/admin/dashboard");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">관리자 로그인</h1>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="mb-4 max-w-xs"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </div>
  );
}
