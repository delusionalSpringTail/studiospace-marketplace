import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <>
      <header className="container m-auto flex items-center justify-between border-b px-4 ">
        <Image src="/logo.png" width={200} height={100} alt="logo" />
        <ThemeToggle />
    </header>
    </>
  );
}
