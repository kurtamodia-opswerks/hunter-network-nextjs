// components/navbar/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import LogoNav from "./LogoNav";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render Navbar fully after mount to avoid hydration issues
  if (!mounted) return null;

  return (
    <NavigationMenu className="w-full p-2 md:p-4 flex items-center justify-between">
      <LogoNav />
      <UserMenu />
    </NavigationMenu>
  );
}
