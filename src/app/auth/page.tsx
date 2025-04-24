'use client';

import { useState } from 'react';

export default function AuthPage() {
        const [isLogin, setIsLogin] = useState(true);

        return (
                <div>
                        <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
                        {/* Form đăng nhập/đăng ký sẽ được thêm ở đây */}
                        <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Chuyển sang đăng ký' : 'Chuyển sang đăng nhập'}
                        </button>
                </div>
        );
} 