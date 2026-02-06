import { NextResponse } from "next/server";


export async function middleware(request) {

    console.log(request)
console.log(request.headers.get("cookie"))
    const token = request.cookies.get('accessToken')?.value || null;
    console.log(token)


    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
    //     headers: { 'Authorization': `${token}` }
    // });

    // const data = await response.json();
    // const user = data?.data || null;
    // if (!user) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }


    // if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
    //     if (user.role !== 'ADMIN' && user.role !== "SUPER_ADMIN") {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //     }
    // }

    // if (request.nextUrl.pathname.startsWith('/dashboard/instructor')) {
    //     console.log('Checking instructor access for user role:', user.role);
    //     if (user.role !== 'INSTRUCTOR') {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //     }
    // }

    // if (request.nextUrl.pathname.startsWith('/dashboard/student')) {
    //     if (user.role !== 'STUDENT') {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //     }
    // }

    // if (request.nextUrl.pathname.startsWith('/course')) {
    //     if (user.role !== 'STUDENT') {
    //         return NextResponse.redirect(new URL('/login', request.url))
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/course/:path*", "/dashboard/:path*"],
}