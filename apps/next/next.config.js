/** @type {import('next').NextConfig} */
const nextConfig = {}

if(process.env.NODE_ENV === 'development') {
   const { setupDevBindings } = require('@cloudflare/next-on-pages/__experimental__next-dev');
   setupDevBindings({
     kvNamespaces: ['MY_KV'],
   });
}

module.exports = nextConfig
