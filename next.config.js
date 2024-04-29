/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["vps63222.hyperhost.name", "storage.googleapis.com", "brain.com.ua", "netlify.com", "firebasestorage.googleapis.com"],
    },
};

module.exports = nextConfig;
