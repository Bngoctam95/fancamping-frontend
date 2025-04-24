import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Danh sách các route cần bảo vệ
const protectedRoutes = ['/blogs/create'];

export function middleware(request: NextRequest) {
        const path = request.nextUrl.pathname;

        // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách cần bảo vệ không
        const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

        if (isProtectedRoute) {
                // Lấy token từ cookie (thực tế sẽ dùng hệ thống auth thật)
                const token = request.cookies.get('access_token')?.value;

                // Nếu không có token, chuyển hướng đến trang đăng nhập
                if (!token) {
                        return NextResponse.redirect(new URL('/auth', request.url));
                }
        }

        return NextResponse.next();
}

// Chỉ định các path sẽ chạy middleware này
export const config = {
        matcher: [
                '/blogs/create'
        ],
}; 