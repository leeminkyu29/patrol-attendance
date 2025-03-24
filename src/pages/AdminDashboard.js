import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Button } from "@/components/ui/button";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "attendance"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecords(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "attendance", id));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">출근 기록 관리</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">이름</th>
            <th className="p-2 border">날짜</th>
            <th className="p-2 border">교대</th>
            <th className="p-2 border">삭제</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.date}</td>
              <td className="p-2 border">{r.shift}</td>
              <td className="p-2 border">
                <Button variant="destructive" onClick={() => handleDelete(r.id)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
