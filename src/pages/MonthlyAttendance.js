
import React, { useState } from "react";
import { format, isSameDay } from "date-fns";

const getPeriodRange = (currentDate) => {
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  let start, end;
  if (day >= 26) {
    start = new Date(year, month, 26);
    end = new Date(year, month + 1, 25);
  } else {
    start = new Date(year, month - 1, 26);
    end = new Date(year, month, 25);
  }

  return { start, end };
};

export default function MonthlyAttendance() {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [shift, setShift] = useState("");
  const [type, setType] = useState("L");
  const [currentDate] = useState(new Date());

  const { start, end } = getPeriodRange(currentDate);
  const dates = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  const handleSubmit = () => {
    if (!name || !position || !shift) return alert("모든 항목을 입력하세요.");
    const today = new Date();
    const record = {
      name,
      position,
      shift,
      type,
      date: format(today, "yyyy-MM-dd"),
    };
    setRecords((prev) => [...prev, record]);
  };

  const getCellValue = (user, date) => {
    const found = records.find(
      (r) => r.name === user.name && isSameDay(new Date(r.date), date)
    );
    return found ? found.type : "";
  };

  const uniqueUsers = Array.from(
    new Map(records.map((r) => [r.name, r])).values()
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">월간 출근표</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="포지션"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <select
          className="border p-2"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
        >
          <option value="">Shift 선택</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
        </select>
        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="L">L (근무)</option>
          <option value="H">H (휴무)</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        등록
      </button>

      <h3 className="mt-6 font-semibold">
        출근표 ({format(start, "yyyy.MM.dd")} ~ {format(end, "yyyy.MM.dd")})
      </h3>
      <div className="overflow-x-auto mt-2">
        <table className="table-auto border text-sm">
          <thead>
            <tr>
              <th className="border px-2">이름</th>
              <th className="border px-2">포지션</th>
              <th className="border px-2">Shift</th>
              {dates.map((d, i) => (
                <th key={i} className="border px-1 whitespace-nowrap">
                  {format(d, "MM/dd")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueUsers.map((user, i) => (
              <tr key={i}>
                <td className="border px-2">{user.name}</td>
                <td className="border px-2">{user.position}</td>
                <td className="border px-2">{user.shift}</td>
                {dates.map((d, j) => (
                  <td key={j} className="border px-1 text-center">
                    {getCellValue(user, d)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
