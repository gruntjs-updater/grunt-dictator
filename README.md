# grunt-dictator
![Alt text](https://raw.github.com/justspamjustin/grunt-dictator/master/img/dictator-cat.jpeg)

> Generic grunt task to generate scaffolding files for your project in the way you dictate them to be built.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dictator --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dictator');
```

## The "dictator" task

### Overview
In your project's Gruntfile, add a section named `dictator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dictator: {
    itemview: {
        
    }
  },
})
```

### Usage Examples
```
grunt dictator:itemview --dest=path/to/destination --name=SomeTemplateParameter --param2=AnotherTemplateParameter
```

