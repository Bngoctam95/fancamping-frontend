import UserHeader from "@/components/layouts/user-header";

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
                        <footer className="py-6 border-t">
                                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                                        &copy; {new Date().getFullYear()} FanCamping. All rights reserved.
                                </div>
                        </footer>
                </div>
        );
} 