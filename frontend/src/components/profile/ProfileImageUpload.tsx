import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { uploadProfileImage } from "@/services/user.service";

interface ProfileImageUploadProps {
  profileImage?: string | null;
  fullName: string;
  onUpdated: (profileImage: string) => void;
}

export default function ProfileImageUpload({
  profileImage,
  fullName,
  onUpdated,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    try {
      setIsUploading(true);

      const updatedUser = await uploadProfileImage(file);

      if (updatedUser.profileImage) {
        onUpdated(updatedUser.profileImage);
      }

      toast.success("Photo de profil mise à jour.");
    } catch (error) {
      console.error(error);

      toast.error(
          "Impossible de mettre à jour la photo."
      );
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="relative shrink-0">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-3xl font-semibold text-neutral-600 ring-4 ring-white shadow-md">
        {profileImage ? (
          <img
            src={profileImage}
            alt={fullName}
            className="h-full w-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute bottom-0 right-0 h-9 w-9 rounded-full border-2 border-white shadow-md"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        aria-label="Modifier la photo de profil"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}