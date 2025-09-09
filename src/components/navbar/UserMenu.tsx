// components/navbar/UserMenu.tsx
"use client";

import { useState } from "react";
import { useAuthActions, useAuthState } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/navbar/ThemeToggle";

import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthState();
  const { logoutUser } = useAuthActions();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    logoutUser();
    toast.success("You have been logged out.");
    router.push("/");
    setOpenLogoutDialog(false);
  };

  if (!isLoggedIn || !user) {
    return (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="flex flex-row gap-2">
            <Link href="/login">
              <LogIn />
              Login
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </NavigationMenuList>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {user.username ? (
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            ) : (
              <AvatarFallback>U</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile">Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenLogoutDialog(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
        <div className="flex items-center gap-2 ml-4">
          <ThemeToggle />
        </div>
      </DropdownMenu>

      <Dialog open={openLogoutDialog} onOpenChange={setOpenLogoutDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="py-2">Are you sure you want to log out?</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
