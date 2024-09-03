/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["sbseg-designtechnology.intuit.com"],
  },
  output: "export",

  /** To build for
   *
   * 1. Uncomment `basepath`
   * 2. Go to `types/enums.ts` and update AssetPrefixes to use `SbsegExpertPhotos`
   */

  // basePath: "/prototypes/gcanady/expert-photos",

  // ** Build (optional) ** change the output directory `out` -> `dist`
  // distDir: "expert-photos",

  // This doesn't seem to have any effect on the output for static imgs
  // assetPrefix: "/prototypes/gcanady/expert-photos",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
};

export default nextConfig;
