This is a skeleton project I made to help out another lobste.rs user; I make no guarantees about its usefulness whatsoever!

The only dependency at runtime is Preact.

It builds using the following:

- esbuild, for building & serving in watch mode
- esbuild-sass-plugin and postcss, for SASS and CSS modules
  - You could remove this if you want to write straight CSS. TBH I use SASS just because I'm used to it but it's definitely less of a must-have in 2023.

You could easily set up something like Vite instead to build instead; I often end up using Vitest anyways for tests.
I just like esbuild because it's extremely fast, the quality of its code is good, and it's self-contained enough that I can trust it with projects I don't want to be constantly maintaining.
Also because I worked with Evan and think he's alright.

It also includes the following tools I've found useful. You could delete any of these and the project should still compile.

- typescript
- eslint, for code linting (especially useful for React/Preact hooks)
- prettier, for code formatting
- generate-license-file, for generating `public/ACKNOWLEDGEMENTS.txt`
- chokidar-cli, for watching files & running eslint in response (it doesn't have its own watch mode)
- esbuild-visualizer, for visualizing how much space in your JavaScript bundle is taken up by each dependency

To have esbuild serve at `http://localhost:8000` and launch eslint and tsc in watch mode, use:

```
./dev
```

... which will open a tmux session with all three programs running in the second window.

The entry points for the code are:

- `src/index.tsx`, which has some boilerplate to set up Preact & connect it to the DOM
- `src/App.tsx`, which contains the actual Preact application
- `public/index.html`
- `src/index.scss`

If you just want to launch esbuild, use:

```
pnpm install
pnpm run serve
```

To package up things for distribution, you can use:

```
make dist
```

... and you'll see `ACKONWLEDGEMENTS.txt`, `index.css`, `index.html`, and `index.js` in the `dist/` folder.
Personally I use Netlify, but obviously it should be easy to deploy these anywhere, e.g. GitHub pages or S3.

To autoformat code, use:

```
pnpm run format
```

To install the right versions of Node and PNPM, if you have asdf you can use:

```
asdf install
```

I've been deploying personal projects u

Misc. notes:

- This project would work just fine if you replaced `pnpm` with `npm`; I've included it just because it saves space by symlinking packages to deduplicate them, and I need to buy a bigger SSD for my laptop...
- I've used `jyc-preact-example` as the project name everywhere, so replacing it should be a simple `sed -i s/jyc-preact-example/your-name-here/g`.
