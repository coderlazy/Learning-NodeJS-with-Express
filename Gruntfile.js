module.exports = function(grunt) {
    var port = process.env.PORT || 3000;

    var ip = process.env.IP || 'localhost';

    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    // configure plugins
    grunt.initConfig({
        cafemocha: {
            all: {
                src: 'qa/tests-*.js',
                options: {
                    ui: 'tdd'
                },
            }
        },
        jshint: {
            app: ['app.js', 'public/js/**/*.js',
                'lib/**/*.js'
            ],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },
        exec: {
            linkchecker: {
                cmd: 'linkchecker http://' + ip + ':' + port,
            }
        },
    });

    // register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};