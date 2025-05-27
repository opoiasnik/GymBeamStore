// my-app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests through, no redirect
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Optionally, you can remove the matcher or leave it as is
    '/((?!_next|public).*)',
  ],
};