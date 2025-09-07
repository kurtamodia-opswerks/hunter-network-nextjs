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
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load profile from store
  useEffect(() => {
    if (!user) return;
    getHunter(user.user_id);
  }, [user]);

  // Sync formData when hunter changes
  useEffect(() => {
    if (!hunter) return;
    setFormData({
      first_name: hunter.first_name || "",
      last_name: hunter.last_name || "",
      username: hunter.username || "",
      email: hunter.email || "",
      password: "",
      guild: hunter.guild ?? null,
      skills: hunter.skills || [],
      rank: hunter.rank || "E",
    });
  }, [hunter]);

  if (!hunter || !formData)
    return (
      <p className="flex w-full items-center justify-center">
        Loading profile...
      </p>
    );

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
            <Button type="button" onClick={handleSaveClick}>
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                router.push("/");
              }}
            >
              Cancel
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
