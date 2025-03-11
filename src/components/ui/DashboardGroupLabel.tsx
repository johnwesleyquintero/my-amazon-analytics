import { SidebarGroupLabel } from "@/components/ui/sidebar";

interface DashboardGroupLabelProps {
  label: string;
}

export function DashboardGroupLabel({ label }: DashboardGroupLabelProps) {
  return (
    <SidebarGroupLabel>{label}</SidebarGroupLabel>
  );
}