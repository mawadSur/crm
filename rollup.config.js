// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      extract: true,
      // Or with custom file name
      // extract: path.resolve('dist/my-custom-file-name.css')
    }),
  ],
  output: [
    {
      format: 'cjs',
    },
  ],
};
