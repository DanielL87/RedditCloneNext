"use client";

import { useRouter } from "next/navigation.js";
import Link from "next/link.js";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/users/logout", { method: "POST" });
    const info = await response.json();
    router.push("/");
    router.refresh();
  }

  return (
    <Link onClick={handleLogout} href={"/"}>
      Logout
    </Link>
  );
}
