import { ThemeToggle } from "./theme-toggle";


export function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <span className="text-sm font-semibold tracking-tight">STUDIO-SPACE</span>
      <ThemeToggle />
    </header>
  )
}
