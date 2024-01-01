import Link from "next/link";
import Logout from "./Logout.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Navbar() {
  const user = await fetchUser();

  return (
    <div id="navbar">
      <Link href={"/"}>Home</Link>
      {user.id ? (
        <>
          <span>Welcome {user.username}</span>
          <Logout />
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </div>
  );
}
