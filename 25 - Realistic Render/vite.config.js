<<<<<<< HEAD
const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

=======
>>>>>>> f2181c2d4285c7afb5c359ce169c16d6fa21fb6f
export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
<<<<<<< HEAD
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
=======
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
>>>>>>> f2181c2d4285c7afb5c359ce169c16d6fa21fb6f
}