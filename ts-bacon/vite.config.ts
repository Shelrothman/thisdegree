import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    //! as long as you keep EVERYTHING in linux, you shuldnt have to do this for hmr
    // server: {
    // watch: {
    // usePolling: true,
    // }
    // }
})
