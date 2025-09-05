"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { logoutUser } = useAuthStore();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [mounted, setMounted] = useState(false);

  // Sync isLoggedIn with localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NavigationMenu className="w-full p-2 md:p-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex flex-row items-center gap-2 font-medium">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hunter Network Logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          Hunter Network
        </Link>
      </div>

      {/* Right side */}
      <NavigationMenuList className="flex items-center gap-3">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/hunters">Hunters</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {mounted && isLoggedIn ? (
            <Button
              variant="destructive"
              onClick={logoutUser}
              className="px-4 py-2 text-sm"
            >
              Logout
            </Button>
          ) : (
            <NavigationMenuLink asChild>
              <Link href="/login">Login / Register</Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
