import React from "react";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";
interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            fill
            alt="cover Image"
            style={{ objectFit: "cover" }}
            src={fetchedUser.coverImage}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
