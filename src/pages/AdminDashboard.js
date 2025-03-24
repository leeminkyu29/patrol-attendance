
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "attendance"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAttendance(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">관리자 출근기록</h1>
      <ul>
        {attendance.map((item) => (
          <li key={item.id}>
            {item.name} - {item.date} - {item.shift}
          </li>
        ))}
      </ul>
    </div>
  );
}
