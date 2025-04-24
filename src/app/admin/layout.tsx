'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        const router = useRouter();

        // Kiểm tra quyền admin
        useEffect(() => {
                const token = localStorage.getItem('access_token');
                const isAdmin = localStorage.getItem('is_admin');

                if (!token || !isAdmin) {
                        router.push('/auth');
                }
        }, [router]);

        return (
                <div className="admin-layout">
                        <div className="admin-sidebar">
                                {/* Sidebar sẽ được thêm vào đây */}
                        </div>
                        <div className="admin-content">
                                <header className="admin-header">
                                        {/* Header sẽ được thêm vào đây */}
                                </header>
                                <main>
                                        {children}
                                </main>
                        </div>
                </div>
        );
} 