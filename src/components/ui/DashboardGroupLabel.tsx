import { SidebarGroupLabel } from "@/components/ui/sidebar";

interface DashboardGroupLabelProps {
  label: string;
}

export function DashboardGroupLabel({ label }: DashboardGroupLabelProps) {
  return (
    <SidebarGroupLabel className="text-brand-primary dark:text-brand-lightGray bg-brand-secondary hover:bg-brand-darkGray transition-colors duration-200">
      {label}
    </SidebarGroupLabel>
  );
}