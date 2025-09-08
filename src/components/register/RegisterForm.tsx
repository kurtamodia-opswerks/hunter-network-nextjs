"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { registerHunter } from "@/lib/api";
import { RegisterHunterData } from "@/types/hunter";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterHunterData>({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    rank: "E",
  });
  const [loading, setLoading] = useState(false);

  const fields: {
    id: keyof RegisterHunterData;
    type: string;
    label: string;
  }[] = [
    { id: "first_name", type: "text", label: "First Name" },
    { id: "last_name", type: "text", label: "Last Name" },
    { id: "username", type: "text", label: "Username" },
    { id: "email", type: "email", label: "Email" },
    { id: "password", type: "password", label: "Password" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerHunter(formData);
      toast.success("Registered Successfully!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container w-full flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account to join the platform
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {fields.map(({ id, type, label }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  value={formData[id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex flex-row justify-between mt-4">
            <CardAction>
              <Button type="submit" className="w-28" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </CardAction>
            <CardAction>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/login")}
              >
                Cancel
              </Button>
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
