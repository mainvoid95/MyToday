const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api/*', 
        { 
            target: 'https://localhost:443/',
            headers: {
                "Connection": "keep-alive"
            }, 
            "secure":false,
        }
    ));
}
