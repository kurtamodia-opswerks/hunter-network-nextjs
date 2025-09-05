// components/navbar/LogoNav.tsx
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator"; // use your shadcn Separator

export default function LogoNav() {
  return (
    <div className="flex items-center gap-4 font-medium">
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

      {/* Vertical separator */}
      <Separator orientation="vertical" className="h-6" />

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/hunters">Hunters</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </div>
  );
}
