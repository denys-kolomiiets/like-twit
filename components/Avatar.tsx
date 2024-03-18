import React, { useCallback } from "react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      let url = `users/${userId}`;
      if (router.pathname.startsWith("/users/")) {
        url = `${userId}`;
      }
      router.push(url);
    },
    [userId, router]
  );
  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        `}
    >
      <Image
        fill
        alt="Avatar"
        onClick={onClick}
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
