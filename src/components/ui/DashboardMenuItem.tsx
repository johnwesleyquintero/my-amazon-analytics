
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface DashboardMenuItemProps {
  title: string;
  icon: ReactNode;
  path: string;
  description: string;
  className?: string;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean;
}

export function DashboardMenuItem({ title, icon, path, description, className, "aria-current": ariaCurrent }: DashboardMenuItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        onClick={handleNavigation}
        isActive={location.pathname === path}
        className={`flex items-center gap-2 ${className || ''}`}
        title={description}
        aria-current={ariaCurrent}
      >
        {icon && <>{icon}</>}
        <span>{title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
