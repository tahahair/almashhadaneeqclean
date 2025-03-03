"use client";
import { useEffect } from 'react';
import LogoutButton from "../components/LogoutButton";
import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const router = useRouter();


  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, Customer!</h1>
      <LogoutButton text="تسجيل الخروج" />
    </div>
  );
}
