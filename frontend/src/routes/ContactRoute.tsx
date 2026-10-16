import AppLayout from "@/components/layout/AppLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import { useAuth } from "@/contexts/useAuth";
import ContactPage from "@/pages/ContactPage";

export default function ContactRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <AppLayout>
        <ContactPage />
      </AppLayout>
    );
  }

  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  );
}
