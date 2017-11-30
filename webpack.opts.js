
module.exports = {
    frameworks: {
        bootstrap: false,
        gridBootstrapOnly: true,
        sources: {
            bootstrap: 'bootstrap-loader',
            grid: 'bootstrap-sass-grid'
        }
    },
    settings: {
        prod: {
            minHTML: true,
            minJS: true
        },
        assetsDir: 'assets'
    }
}