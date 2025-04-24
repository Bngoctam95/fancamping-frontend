'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI } from '@/lib/api';

interface User {
        id: string;
        username: string;
        isAdmin: boolean;
}

export default function useAuth() {
        const [user, setUser] = useState<User | null>(null);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
                // Kiểm tra xem người dùng đã đăng nhập chưa
                const token = localStorage.getItem('access_token');
                if (token) {
                        // Trong thực tế, bạn sẽ gọi API để lấy thông tin người dùng
                        const userData = localStorage.getItem('user_data');
                        if (userData) {
                                setUser(JSON.parse(userData));
                        }
                }
                setLoading(false);
        }, []);

        const login = async (username: string, password: string) => {
                try {
                        setLoading(true);
                        const response = await loginAPI(username, password);
                        if (response.data) {
                                localStorage.setItem('access_token', response.data.token);

                                // Giả lập thông tin người dùng - trong thực tế sẽ được trả về từ API
                                const user = {
                                        id: '1',
                                        username,
                                        isAdmin: username === 'admin', // giả sử 'admin' là admin
                                };

                                localStorage.setItem('user_data', JSON.stringify(user));
                                if (user.isAdmin) {
                                        localStorage.setItem('is_admin', 'true');
                                }

                                setUser(user);
                                return { success: true };
                        }
                        return { success: false, error: response.message || 'Đăng nhập thất bại' };
                } catch {
                        return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' };
                } finally {
                        setLoading(false);
                }
        };

        const logout = () => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');
                localStorage.removeItem('is_admin');
                setUser(null);
                router.push('/');
        };

        return {
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.isAdmin || false,
        };
} 