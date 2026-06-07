export { default } from 'next-auth/middleware'
export const config = { matcher: ['/dashboard/:path*', '/chat/:path*', '/mood/:path*', '/checkin/:path*', '/exercises/:path*'] }
