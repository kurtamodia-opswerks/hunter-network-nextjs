import RegisterForm from "@/components/register/RegisterForm";
import Image from "next/image";

export const metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <>
      {" "}
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
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
