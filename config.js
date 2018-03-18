const src  = 'app'
const dist = 'dist'

const paths = {
    src:  src,
    dist: dist,
    styles: {
        src:  `${src}/scss/**/*.scss`,
        dist: `${dist}/css/`
    },
    scripts: {
        src:  `${src}/js/**/*.js`,
        dist: `${dist}/js/`
    },
    images: {
        src:  `${src}/img/**/*`,
        dist: `${dist}/img/`
    },
    fonts: {
        src:  `${src}/fonts/**/*`,
        dist: `${dist}/fonts/`
    },
    html: {
        src:  `${src}/*.html`,
        dist: `${dist}/`
    }
}

export default paths