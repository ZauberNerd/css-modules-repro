import postcss from 'rollup-plugin-postcss'
 
export default {
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    postcss({
      extract: true,
      modules: true
    })
  ]
}