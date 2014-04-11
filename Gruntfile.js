module.exports = function(grunt){
    var browsers = [{
        browserName: "chrome",
        version: "33",
        platform: "XP"
    }, {
        browserName: "chrome",
        version: "33",
        platform: "Linux"
    }];


  grunt.initConfig({
    'saucelabs-mocha': {
            all: {
                options: {
                    urls: ["http://127.0.0.1:8000/mocha/browser/test.html"],
                    username: "rynomadCSU",
                    key: "c954c8b8-41ce-45b1-bba2-3b8806d5e2cf",
                    tunnelTimeout: 5,
                    concurrency: 3,
                    browsers: browsers,
                    testname: "ndn-cache",
                    tags: ["master"]
                }
            }
        },
    connect:{
      server:{}
    },
    browserify: {
      test: {
        files: {
          "mocha/browser/testLib.js": ["mocha/browser/browser-spec.js"]
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-browserify') 
  grunt.loadNpmTasks('grunt-saucelabs')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.registerTask('build', ['browserify', 'connect', 'saucelabs-mocha'])

}
