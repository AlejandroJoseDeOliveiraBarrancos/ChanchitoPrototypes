const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'commondatastorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
