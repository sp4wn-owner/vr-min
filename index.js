const express = require('express');
const fs = require('fs');
const UglifyJS = require('uglify-js');
const app = express();

// Middleware to serve minified JavaScript file
app.get('/yourfile.min.js', (req, res) => {
    // Read the original JavaScript file
    const code = fs.readFileSync('client.js', 'utf8');

    // Minify the code using UglifyJS
    const minifiedCode = UglifyJS.minify(code).code;

    // Set appropriate headers for JavaScript
    res.setHeader('Content-Type', 'application/javascript');
    res.send(minifiedCode);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});