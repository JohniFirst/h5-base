import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import postCssPxToRem from 'postcss-pxtorem'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
	return {
		plugins: [
			vue(),
			vueDevTools(),
			// 开启gzip压缩
			configEnv.mode === 'gzip'
				? viteCompression({
						// 压缩后删除原文件
						deleteOriginFile: false,
					})
				: undefined,
			configEnv.mode === 'analyzer' ? bundleAnalyzer({}) : undefined,
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		css: {
			postcss: {
				plugins: [
					postCssPxToRem({
						rootValue: 37.5,
						propList: ['*'],
					}),
				],
			},
		},
		build: {
			cssCodeSplit: false,
			rollupOptions: {
				output: {
					entryFileNames: 'js/[name].js',
					chunkFileNames: ({ name }) => {
						return `js/${name.split('.')[0]}.js`
					},
					assetFileNames: (assetInfo) => {
						const info = assetInfo?.name?.split('.')
						let extType = info?.[info.length - 1]

						const { name } = assetInfo
						if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
							extType = 'media'
						} else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(name)) {
							extType = 'img'
						} else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
							extType = 'fonts'
						}
						return `${extType}/[name].[ext]`
					},
				},
			},
		},
	}
})