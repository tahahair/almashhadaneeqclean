"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logedin, setLogedin] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the 'book' parameter as a string and convert to boolean
  const bookParam = searchParams.get('book');
  // UseEffect to check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.phoneVerified) {
        setError("Your phone number is not verified. Please verify it first.");
        return;
      }
      setName(user.name || "");
      setPhone(user.phone || "");
      setLogedin(user.logedin || false);
    }
  }, []);

  // UseEffect to redirect the user once they are logged in
  useEffect(() => {
    if (logedin) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      redirectUser(storedUser.type);
    }
  }, [logedin]);

  const redirectUser = (userType: string) => {
    // Set book parameter value (true or false)
     // You can determine this value based on your logic
    
    if (userType === "CUSTOMER") {
      router.push(`/customer-dashboard?book=${bookParam}`);
    } else if (userType === "ADMIN") {
      router.push(`/admin-dashboard `);
    } else if (userType === "WORKER") {
      router.push(`/worker-dashboard `);
    } else {
      setError("Unknown user type. Contact support.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }), // Only send phone and password for login
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }

    if (!data.user.phoneVerified) {
      setError("Your phone number is not verified. Please verify it first.");
      return;
    }

    // Save user info in localStorage
    const user = {
      name: data.user.name || name, // Use the name from response or input
      phone: data.user.phone,
      logedin: true,
      phoneVerified: data.user.phoneVerified,
      type: data.user.type,
    };
    localStorage.setItem("user", JSON.stringify(user));

    // Update the state
    setLogedin(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}