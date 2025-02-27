"use client";
import LogoutButton from "../components/LogoutButton";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the 'book' parameter as a string and convert to boolean
  const bookParam = searchParams.get('book');

  if (bookParam) {
    router.push(`/book`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, Customer!</h1>
      <LogoutButton />
    </div>
  );
}
