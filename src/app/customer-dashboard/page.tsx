"use client";
import LogoutButton from "../components/LogoutButton";
 
export default function CustomerDashboard() {
 

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, Customer!</h1>
      <LogoutButton text="تسجيل الخروج" />
    </div>
  );
}
