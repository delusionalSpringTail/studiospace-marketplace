"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Camera, Mail, User, CalendarDays, Check, Loader } from "lucide-react";
import { useSession, updateUser } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/imgbb";

export function ProfileSettings() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store only local user overrides; null means "fall back to session.user"
  const [editedName, setEditedName] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Effect only handles external navigation side-effect
//   useEffect(() => {
//     if (!isPending && !session?.user) {
//       router.push("/login");
//     }
//   }, [session, isPending, router]);

  // Clean up object URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB.");
      return;
    }

    setSelectedFile(file);
    setLocalPreview(URL.createObjectURL(file));
  };

  if (isPending) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 animate-pulse space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-56 rounded bg-muted" />
          </div>
        </div>
        <div className="h-11 w-full rounded-lg bg-muted" />
        <div className="h-11 w-full rounded-lg bg-muted" />
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  // Derived values without syncing via useEffect
  const currentName = editedName ?? user.name ?? "";
  const currentImage = localPreview ?? user.image ?? null;

  const initial = (user.name?.trim().charAt(0) || "U").toUpperCase();
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const hasChanges =
    currentName.trim() !== (user.name || "") || selectedFile !== null;

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = currentName.trim();
    if (trimmedName.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    setIsSaving(true);
    try {
      let uploadedImageUrl = user.image || undefined;

      // Upload new avatar to ImgBB if user picked a file
      if (selectedFile) {
        uploadedImageUrl = await uploadImageToImgBB(selectedFile);
      }

      // Update Better Auth user record
      const { error } = await updateUser({
        name: trimmedName,
        ...(uploadedImageUrl ? { image: uploadedImageUrl } : {}),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      // Reset local overrides so UI reflects the fresh session data
      setEditedName(null);
      setSelectedFile(null);
      setLocalPreview(null);

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error updating profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View your account details and update your display name or photo.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden">
        {/* Top Profile Overview Banner */}
        <div className="p-6 sm:p-8 border-b border-border flex flex-col sm:flex-row items-center gap-5">
          <div className="relative group">
            {currentImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentImage}
                alt={user.name || "Profile"}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-2xl sm:text-3xl font-bold border border-emerald-600/20">
                {initial}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload profile picture"
              className="cursor-pointer absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-accent transition-colors"
            >
              <Camera size={15} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {joinedDate && (
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                <CalendarDays size={13} />
                <span>Member since {joinedDate}</span>
              </p>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="profile-name"
              className="text-sm font-medium text-foreground"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="profile-name"
                type="text"
                value={currentName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-lg border border-border bg-background pl-3.5 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#15803d] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803d] dark:focus:ring-emerald-500 transition-colors"
              />
              <User
                size={17}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>

          {/* Email Read-Only Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="profile-email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="profile-email"
                type="email"
                value={user.email || ""}
                disabled
                className="w-full rounded-lg border border-border bg-muted/50 pl-3.5 pr-10 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
              <Mail
                size={17}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email cannot be changed directly.
            </p>
          </div>

          {/* Upload Button Helper */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border bg-background hover:bg-accent px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground transition-colors"
            >
              <Camera size={15} />
              <span>
                {selectedFile ? selectedFile.name : "Change profile photo"}
              </span>
            </button>

            <button
              type="submit"
              disabled={isSaving || !hasChanges}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}