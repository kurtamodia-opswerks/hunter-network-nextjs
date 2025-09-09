"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/store/useAuthStore";
import { useHunterState, useHunterActions } from "@/store/useHunterStore";
import { UpdateHunterData } from "@/types/hunter";
import { verifyPassword } from "@/lib/api";

import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthState();
  const { hunter } = useHunterState();
  const { getHunter, updateHunter } = useHunterActions();

  const [formData, setFormData] = useState<UpdateHunterData | null>(null);
  const [initialFormData, setInitialFormData] =
    useState<UpdateHunterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load hunter data
  useEffect(() => {
    if (!user) return;
    getHunter(user.user_id);
  }, [user]);

  // Sync formData and initialFormData when hunter changes
  useEffect(() => {
    if (!hunter) return;

    const data: UpdateHunterData = {
      first_name: hunter.first_name || "",
      last_name: hunter.last_name || "",
      username: hunter.username || "",
      email: hunter.email || "",
      password: "",
      guild: hunter.guild ?? null,
      skills: hunter.skills || [],
      rank: hunter.rank || "E",
    };

    setFormData(data);
    setInitialFormData(data);
  }, [hunter]);

  // Check if form has changed
  const isChanged = () => {
    if (!formData || !initialFormData) return false;

    for (const key in formData) {
      const k = key as keyof UpdateHunterData;

      // Ignore blank password
      if (k === "password" && !formData.password) continue;

      const current = formData[k];
      const initial = initialFormData[k];

      if (Array.isArray(current) && Array.isArray(initial)) {
        if (JSON.stringify(current) !== JSON.stringify(initial)) return true;
      } else {
        if (current !== initial) return true;
      }
    }

    return false;
  };

  if (!hunter || !formData) return null; // handled by loading.tsx

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (
    field: keyof UpdateHunterData,
    value: string | number
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveClick = () => setConfirmOpen(true);

  const handleConfirmSubmit = async () => {
    if (!hunter || !formData) return;

    setLoading(true);
    try {
      const result = await verifyPassword(confirmPassword);
      if (!result.valid) {
        toast.error("Incorrect password. Please try again.");
        return;
      }

      const payload: UpdateHunterData = {
        ...formData,
        password: formData.password || undefined,
        guild: formData.guild ? Number(formData.guild) : null,
        skills: formData.skills.map(Number),
      };

      await updateHunter(hunter.id, payload);

      toast.success("Profile updated successfully!");
      setConfirmOpen(false);
      setConfirmPassword("");

      // Update initial form data to prevent save button from staying enabled
      setInitialFormData({ ...payload, password: "" });
      setFormData({ ...formData, password: "" });
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Edit Profile</CardTitle>
          <CardDescription className="text-center">
            Update your profile information below.
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Rank</Label>
              <Select
                value={formData.rank}
                onValueChange={(val) => handleSelectChange("rank", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  {["S", "A", "B", "C", "D", "E"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep unchanged"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={handleSaveClick}
              disabled={!isChanged()}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Go Back
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Password</DialogTitle>
            <DialogDescription>
              Enter your current password to save changes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            <Label htmlFor="confirmPassword">Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button onClick={handleConfirmSubmit} disabled={loading}>
              {loading ? "Saving..." : "Confirm"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false);
                setConfirmPassword("");
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
