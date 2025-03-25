import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "활동", value: 94 },
  { name: "남은 비율", value: 6 },
];

const COLORS = ["#3498db", "#ecf0f1"];

const monthlyData = {
  "1월": [
    { name: "10월", 재해건수: 5, 매출액: 6000 },
    { name: "11월", 재해건수: 4, 매출액: 5800 },
    { name: "12월", 재해건수: 2, 매출액: 4500 },
    { name: "1월", 재해건수: 1, 매출액: 4000 },
    { name: "2월", 재해건수: 2, 매출액: 3800 },
  ],
  "2월": [
    { name: "11월", 재해건수: 3, 매출액: 5800 },
    { name: "12월", 재해건수: 2, 매출액: 5000 },
    { name: "1월", 재해건수: 2, 매출액: 4300 },
    { name: "2월", 재해건수: 1, 매출액: 3900 },
    { name: "3월", 재해건수: 2, 매출액: 3600 },
  ],
};

const notices = [
  { no: 1, title: "모바일 S&H 실행 오류 안내", date: "2025-01-21", read: false },
  { no: 2, title: "[완료] 안전보건관리 IT 시스템 개선", date: "2025-01-17", read: false },
  { no: 3, title: "아웃 시스템 개선안 추가 안내", date: "2024-12-20", read: false },
  { no: 4, title: "모바일 S&H/핵심안전보건 일시 중단", date: "2024-12-16", read: false },
];

const approvals = [
  { no: 1, status: "진행중", title: "안전교육 결과 보고", department: "안전팀" },
  { no: 2, status: "대기", title: "위험성평가 자료 결재", department: "현장관리팀" },
  { no: 3, status: "완료", title: "보호구 지급 내역", department: "자재팀" },
];

export default function DashboardTemplate() {
  const [month, setMonth] = useState("1월");
  const barData = monthlyData[month];

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen text-gray-800">
      {/* 상단 네비게이션 바 + 프로필 */}
      <div className="w-full bg-blue-700 text-white flex items-center justify-between p-3 rounded-xl shadow">
        <div className="text-xl font-bold">S&H-PORTAL</div>
        <div className="flex space-x-6 items-center">
          <button className="hover:underline">POLICY</button>
          <button className="hover:underline">PLAN</button>
          <button className="hover:underline">DO</button>
          <button className="hover:underline">CHECK</button>
          <button className="hover:underline">기본정보</button>
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/30" className="rounded-full" alt="profile" />
            <span className="text-sm">관리자 홍길동</span>
            <Button size="sm" variant="secondary">로그아웃</Button>
          </div>
        </div>
      </div>

      {/* 월별 선택 버튼 */}
      <div className="flex gap-2">
        {Object.keys(monthlyData).map((m) => (
          <Button
            key={m}
            variant={month === m ? "default" : "outline"}
            onClick={() => setMonth(m)}
          >
            {m}
          </Button>
        ))}
      </div>

      {/* 대시보드 카드 및 차트 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">무사고 일수</h2>
            <p className="text-blue-600 font-bold text-3xl">1690일</p>
            <p className="text-sm text-muted-foreground mt-1">플랜트 기준</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">NCR 활동률</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">매출액 대비 재해건수 ({month})</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="재해건수" fill="#f1c40f" />
                <Line yAxisId="right" type="monotone" dataKey="매출액" stroke="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">공지사항</h2>
            <ul className="text-sm divide-y">
              {notices.map((n) => (
                <li key={n.no} className="py-2 flex justify-between">
                  <span className="text-blue-600 hover:underline cursor-pointer">{n.title}</span>
                  <span className="text-gray-400 text-xs">{n.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">결재문서</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-1">No</th>
                  <th className="py-1">진행상태</th>
                  <th className="py-1">제목</th>
                  <th className="py-1">협력사명</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr key={a.no} className="border-b hover:bg-gray-50">
                    <td className="py-1">{a.no}</td>
                    <td className="py-1">{a.status}</td>
                    <td className="py-1">{a.title}</td>
                    <td className="py-1">{a.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
