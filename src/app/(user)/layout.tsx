import UserHeader from "@/components/layouts/user-header";
import UserFooter from "@/components/layouts/user.footer";

export default function UserLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <div className="flex min-h-screen flex-col">
                        <UserHeader />
                        <main className="flex-1">
                                {children}
                        </main>
                        <UserFooter />
                </div>
        );
} 