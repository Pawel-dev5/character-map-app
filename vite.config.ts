import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	build: {
		// Adjust chunk size warning limit to 1MB (1000 kB)
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					// Vendor chunk for React and related libraries
					vendor: ['react', 'react-dom'],
					// Separate chunk for Leaflet (heavy mapping library)
					leaflet: ['leaflet'],
					// Separate chunk for i18n libraries
					i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
					// Separate chunk for API utilities
					api: ['axios'],
				},
			},
		},
	},
});
