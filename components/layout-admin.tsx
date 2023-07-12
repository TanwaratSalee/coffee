import Navmenu from "@/pages/admin/Nav/navmenu";

type LayoutProps = {
  children: React.ReactNode;
};

export default function LayoutAdmin({ children }: LayoutProps) {
  return (
    <main>
      <Navmenu />
      {children}
    </main>
  );
}
