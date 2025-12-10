import vite from 'vite';
import dotenv from 'dotenv';
import { env } from 'node:process';
import gulp, { series } from 'gulp';
import alias from 'vite-tsconfig-paths';
import { execSync } from 'node:child_process';

function npx(script: string) {
  execSync('npx ' + script, { stdio: 'inherit' });
}

gulp.task('dev', async () => {
  npx('tsx src/main.ts');
});

gulp.task('lint', async () => {
  npx('eslint src');
  npx('prettier --check src');
});

gulp.task('fix', async () => {
  npx('eslint --fix src');
  npx('prettier --write src');
});

gulp.task(
  'build',
  series('lint', async function build() {
    npx('tsc --noEmit');
    npx('vite build');
    npx('vite build --ssr --outDir dist/server');

    await vite.build({
      configFile: false,
      plugins: [alias()],
      build: {
        ssr: true,
        target: 'node18',
        emptyOutDir: false,
        copyPublicDir: false,
        lib: {
          formats: ['es'],
          entry: 'src/main.ts',
        },
      },
    });
  })
);

gulp.task(
  'prod',
  series('build', async function serve() {
    dotenv.config();
    env.NODE_ENV = 'production';
    execSync('node dist/main.js', { stdio: 'inherit' });
  })
);
