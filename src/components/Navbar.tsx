import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <NavigationMenu>
        <div className="flex items-center gap-2 font-medium">
          <Link href="/">
            {" "}
            <Image
              src="/favicon.ico"
              alt="Hunter Network Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            Hunter Network
          </Link>

          <Separator orientation="vertical" className="w-2 h-16 bg-gray-400" />
        </div>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/login">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/hunters">Hunters</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
