const express = require('express');
const JsonEnv = require('./common/JsonEnv.js');
const graph = require('./graph.json');
const app = express();
const serveStatic = require('serve-static')
const path = require('path');
const staticAssets = new serveStatic(
  path.join(process.env.npm_config_local_prefix, "web"), { 'index': ['default.html', 'default.htm'] })

// set the port of our application
var port = process.env.PORT || 2708;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(process.env.npm_config_local_prefix, "web"));
// use .html instead .ejs
app.engine('html', require('ejs').renderFile);


var jsonEnv = new JsonEnv();
var pageVariables = jsonEnv.loadJsonFile(path.join(process.env.npm_config_local_prefix, "server", "settings.json"));

/*Optional security*/
if(process.env.ENABLE_SECURITY == "true"){

  const basicAuth = require('express-basic-auth');
  var userName = process.env.AUTH_USER;
  var users = {};
  users[userName] = process.env.AUTH_PASSWORD;
  app.use(basicAuth({
      users: users,
      challenge: true
  }))
}


app.get('/graph.json', function(req, res, next) {
  res.json(graph);
});

/**
 * If your html is About.html, just create a file About.json in
 * variables folder in a path equal of your html real location. Sample
 * web/About.html
 * web/About.json
 *
 * framework will find your html and its variables in order to render it using ejs
 */
// set routes and assets
app.get('*', function(req, res, next) {
    console.log(req.path)
    if(req.path === "/"){      
      res.render('index.html', pageVariables);
    }else{
      return staticAssets(req, res, next);
    }

});

app.listen(port, function() {
    console.log('Our app is running on port: ' + port);
});
