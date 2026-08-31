import { ReactNode } from "react";
import Sidebar, { MobileNav } from "./Sidebar";
import TopBar from "./TopBar";

interface Props {
  children: ReactNode;
  title: string;
  breadcrumb?: string;
}

export default function AppShell({ children, title, breadcrumb }: Props) {
  return (
    <div className="flex h-full" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} breadcrumb={breadcrumb} />
        <main
          className="flex-1 overflow-y-auto"
          style={{
            marginTop: 56,
            marginLeft: 0,
            paddingBottom: "72px", /* space for mobile nav */
          }}
        >
          {/* Desktop: push content right of sidebar */}
          <style>{`@media (min-width: 768px) { main { margin-left: 72px; padding-bottom: 0; } }`}</style>
          <div style={{ padding: "24px 20px" }} className="sm:p-7">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
