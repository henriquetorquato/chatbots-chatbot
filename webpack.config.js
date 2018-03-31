var path = require('path');

module.exports = {
    watch: true,
    entry: './src/library.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'library.js',
        library: 'Library',
        libraryTarget: 'var',
        path: path.resolve(__dirname, 'dist/popup/js')
    }
};
