"use client";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  text: string;
}

export default function LogoutButton({ text }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    // استرجاع بيانات المستخدم من localStorage
    const storedUser = localStorage.getItem("user");

    // التحقق من وجود البيانات وتحديث قيمة تسجيل الدخول
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.logedin = false;
      localStorage.setItem("user", JSON.stringify(user));
    }

    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      {text}
    </button>
  );
}
