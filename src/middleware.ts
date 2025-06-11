import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 此中间件处理静态资源访问
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 检查是否访问improved-game-data目录下的图片
  if (pathname.startsWith('/improved-game-data/')) {
    // 从URL获取文件路径
    const filePath = pathname.replace(/^\/improved-game-data\//, '');
    
    // 构建新的URL指向public目录
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/improved-game-data/${filePath}`;
    
    // 返回重写后的响应
    return NextResponse.rewrite(newUrl);
  }
  
  return NextResponse.next();
}

// 配置中间件匹配模式
export const config = {
  matcher: [
    '/improved-game-data/:path*',
  ],
} 