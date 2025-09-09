// components/navbar/LogoNav.tsx
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useAuthState } from "@/store/useAuthStore";

// Import Google Font from Next.js
import { Orbitron } from "next/font/google";

// Initialize font
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function LogoNav() {
  const { isLoggedIn } = useAuthState();

  return (
    <div className="flex items-center gap-4 font-medium w-full">
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

      <Separator orientation="vertical" className="h-6" />

      {isLoggedIn ? (
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/hunters">Hunters</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/guilds">Guilds</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      ) : (
        <div
          className={`${orbitron.className} flex-1 text-center text-teal-600 text-sm md:text-base`}
        >
          Connect, collaborate, and conquer challenges together in the world of
          hunters.
        </div>
      )}
    </div>
  );
}
