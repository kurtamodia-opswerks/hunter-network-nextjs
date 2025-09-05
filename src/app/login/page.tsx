import { LoginForm } from "@/components/login/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-row items-center justify-center gap-2 font-medium">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hunter Network Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            Hunter Network
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
