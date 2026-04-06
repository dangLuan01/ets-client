import MobileHeader from "@/components/layout/MobileHeader";
import DesktopHeader from "@/components/layout/DesktopHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import Footer from "@/components/layout/Footer";
import { menuService } from "@/services/menuService";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLinks = await menuService.getMenu(10, "header");
  const footerLinks = await menuService.getMenu(10, "footer");

  return (
    <>
      <MobileHeader />
      <DesktopHeader navLinks={headerLinks ?? []} />

      <main>{children}</main>

      <BottomNavigation />
      <Footer footerLinks={footerLinks ?? []} />
    </>
  );
}
