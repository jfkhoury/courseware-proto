var register = require("babel/register");

register({
    ignore: /node_modules(?:\/|\\)(?!@yuzu|@app)/,
    optional: ["es7.decorators"]
});
