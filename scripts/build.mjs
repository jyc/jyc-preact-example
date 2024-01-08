import * as fs from "fs";

import esbuild from "esbuild";
import { sassPlugin, postcssModules } from "esbuild-sass-plugin";

async function beep(hasError) {
  if (hasError) {
    // Beep twice on failure.
    process.stderr.write("\x07");
    await new Promise((resolve) => setTimeout(resolve, 500));
    process.stderr.write("\x07");
  }
}

async function onBuildEnd(result) {
  const hasError = result.errors.length > 0;
  await beep(hasError);

  if (result?.metafile) {
    const METAFILE_PATH = "public/meta.json";
    const metafileJson = JSON.stringify(result.metafile);
    const didMetaFileChange =
      !fs.existsSync(METAFILE_PATH) || fs.readFileSync(METAFILE_PATH).toString() !== metafileJson;
    if (didMetaFileChange) {
      fs.writeFileSync(METAFILE_PATH, metafileJson);
    }
  }
}

const debug = ["true", "1", undefined].indexOf(process.env.DEBUG) !== -1;
const minify = ["true", "1"].indexOf(process.env.MINIFY) !== -1;
const serve = ["true", "1"].indexOf(process.env.SERVE) !== -1;
const port = process.env.PORT ?? 8000;

try {
  const plugins = [
    sassPlugin({
      type: "css",
      transform: postcssModules({
        // ...put here the options for postcss-modules: https://github.com/madyankin/postcss-modules
      }),
    }),
  ];

  plugins.push({
    name: "exclude",
    setup: (build) => {
      build.onResolve({ filter: /\.(woff|woff2|eot)$/ }, (args) => {
        return { path: args.path, external: true };
      });
    },
  });

  if (serve) {
    plugins.push({
      name: "watch",
      setup: (build) => {
        build.onEnd(onBuildEnd);
      },
    });
  }

  const ctx = await esbuild.context({
    entryPoints: ["src/index.tsx"],

    bundle: true,
    external: ["woff2/", "eot/"],
    metafile: true,
    minify,
    outdir: "public",
    platform: "browser",
    plugins,
    sourcemap: true,

    define: {
      DEBUG: debug ? "true" : "false",
    },
  });
  if (serve) {
    await Promise.all([
      ctx.watch(),
      ctx.serve({
        port,
        servedir: "public",
      }),
    ]);
  } else {
    const result = await ctx.rebuild();
    onBuildEnd(result);
    await ctx.dispose();
  }
} catch (e) {
  await beep(e);
  console.error(e);
  process.exit(1);
}
