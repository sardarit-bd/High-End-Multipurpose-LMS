import { NextResponse } from "next/server";


export async function proxy(request) {

    const token = request.cookies.get('accessToken')?.value;
console.log('Proxy middleware - Access Token:', token);
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

    const response = await fetch(`https://high-end-multipurpose-lms-api-v2.vercel.app/api/user/me`, {
        headers: { 'Authorization': `${token}` }  
    });

    console.log(response)
    const data = await response.json();
    const user = data?.data || null;
    if(!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
        if (user.role !== 'ADMIN' && user.role !== "SUPER_ADMIN") {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/instructor')) {
        console.log('Checking instructor access for user role:', user.role);
        if (user.role !== 'INSTRUCTOR') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/dashboard/student')) {
        if (user.role !== 'STUDENT') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith('/course')) {
        if (user.role !== 'STUDENT') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/course/:path*", "/dashboard/:path*"],
}