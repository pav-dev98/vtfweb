// @ts-check
// import { defineConfig } from 'astro/config';
// import vercel from '@astrojs/vercel/serverless';
// import tailwind from '@astrojs/tailwind';

// // https://astro.build/config
// export default defineConfig({
//   integrations: [tailwind()],
//   devToolbar: {enabled: false},
//   output:'server',
//   adapter: vercel({}),

// });

// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: { enabled: false },
  output: 'server',
  adapter: vercel({})
});