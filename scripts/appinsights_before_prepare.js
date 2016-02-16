/*
Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved.
Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.
*/

/*jshint node: true*/

module.exports = function (ctx) {

       var ConfigParser;
    var path = ctx.requireCordovaModule('path');
    var shell = ctx.requireCordovaModule('shelljs');

 // If we are running Cordova 5.4 or abova - use parser from cordova-common.
     // Otherwise - from cordova-lib.+
    try {
       ConfigParser = ctx.requireCordovaModule('cordova-common/src/ConfigParser/ConfigParser');
     } catch (e) {
       ConfigParser = ctx.requireCordovaModule('cordova-lib/src/configparser/ConfigParser')
     }

    var pluginConfigFile = path.resolve(ctx.opts.plugin.dir, 'www', 'AppInsights.js');
    var projectConfigXml = new ConfigParser(path.join(ctx.opts.projectRoot, 'config.xml'));
    var instrKey = projectConfigXml.getGlobalPreference('instrumentation_key');

    //console.log("Replacing 'instrumentationKey' parameter in plugin with " + instrKey);

    if (instrKey) {
        // replace instrumentation key stub with provided value
        console.log("Replacing 'instrumentationKey' parameter in plugin with value " + instrKey);
        shell.sed('-i',
            /instrumentationKey:\s"(.*?)"/g,
            'instrumentationKey: "' + instrKey + '"',
            pluginConfigFile);
    }
};
