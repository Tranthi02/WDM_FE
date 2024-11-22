import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassPlugin from 'vite-plugin-sass'; // Import the sass plugin

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false
            }
          ]
        ]
      }
    }),
    sassPlugin() 
  ],
  resolve: {
    alias: {
      'moment': 'moment/moment.js'
    }
  }
});