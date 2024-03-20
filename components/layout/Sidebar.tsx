import { BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { FaFaceSmile, FaHouse } from "react-icons/fa6";
const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: FaHouse,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaFaceSmile,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-4">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div className="flex flex-row items-center">
            <SidebarLogo />{" "}
            <span className="hidden lg:block text-white text-xl font-bold">
              Meowtter
            </span>
          </div>

          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
