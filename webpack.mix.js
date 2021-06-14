const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .autoload({
        jquery:['$','jQuery','window.jQuery'],
        "popper.js":['Popper']
    })
    .extract()
    .js('resources/js/dashboard.js', 'public/js')
    // .sass('resources/sass/app.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
    ])
    .postCss('resources/css/dashboard.css', 'public/css', [
    ])
    // .copyDirectory('resources/templates/dashboard/AdminLTE/dist/img','public/img')
    // .copyDirectory('resources/templates/front/Bethany/assets/img','public/img')
    .version();
    // mix.js('resources/js/turbo.js', 'public/js');
    // mix.js('resources/js/emoji.js', 'public/js');
