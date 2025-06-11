/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.onlinegames.io',
      'html5.gamedistribution.com',
      'cloud.onlinegames.io',
      'unblocked-games.s3.amazonaws.com',
      'www.crazygames.com',
      'playhop.com',
      'kirka.io'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 配置iframe源允许
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  // 配置静态资源目录
  // 这允许直接从public目录访问improved-game-data下的图片
  async rewrites() {
    return [
      {
        source: '/improved-game-data/:path*',
        destination: '/improved-game-data/:path*',
      },
    ];
  },
  // 配置输出和静态资源
  output: 'standalone',
  
  // 移出实验性配置，符合Next.js 15规范
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  outputFileTracingIncludes: {
    '/': ['improved-game-data/**/*'],
  },
}

module.exports = nextConfig 