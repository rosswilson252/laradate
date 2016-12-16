var fs = require('fs');
var rollup = require('rollup');
var uglify = require('uglify-js');
var babel = require('rollup-plugin-babel');
var package = require('../package.json');

var rollupVue = require('rollup-plugin-vue')

var banner =
    "/*!\n" +
    " * laradate v" + package.version + "\n" +
    " * https://github.com/rosswilson252/laradate\n" +
    " * Released under the MIT License.\n" +
    " */\n";

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        rollupVue(),
        babel({
            presets: ['es2015-loose-rollup'],
        })
    ]
})
    .then(function (bundle) {
        return write('dist/laradate.js', bundle.generate({
            format: 'umd',
            moduleName: 'Laradator'
        }).code, bundle);
    })
    .then(function (bundle) {
        return write('dist/laradate.min.js',
            banner + '\n' + uglify.minify('dist/laradate.js').code,
            bundle);
    })
    .then(function (bundle) {
        return write('dist/laradate.es2015.js', bundle.generate({}).code, bundle);
    })
    .then(function (bundle) {
        return write('dist/laradate.common.js', bundle.generate({
            format: 'cjs',
        }).code, bundle);
    })
    .catch(logError);

function write(dest, code, bundle) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            console.log(blue(dest) + ' ' + getSize(code));
            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
