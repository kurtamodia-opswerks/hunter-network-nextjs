import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <NavigationMenu className="w-full p-2 md:p-4 flex items-center justify-between sticky top-0 z-50 bg-muted">
      {/* Left side - Logo */}
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
          <Separator orientation="vertical" className="w-2 h-16 bg-gray-400" />
        </Link>
      </div>

      {/* Right side - Nav Links */}
      <NavigationMenuList className="flex items-center gap-3">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/hunters">Hunters</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/login">Login / Register</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
