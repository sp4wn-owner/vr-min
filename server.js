const express = require('express');
const fs = require('fs');
const UglifyJS = require('uglify-js');
const path = require('path');
const app = express();

// Middleware to serve minified JavaScript file
app.get('/vrclient.min.js', (req, res) => {
    const filePath = path.join(__dirname, 'client.js');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        res.status(404).send('File not found');
        return;
    }

    // Read the original JavaScript file
    fs.readFile(filePath, 'utf8', (err, code) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Minify the code using UglifyJS
        try {
            const minifiedCode = UglifyJS.minify(code).code;

            // Set appropriate headers for JavaScript
            res.setHeader('Content-Type', 'application/javascript');
            res.send(minifiedCode);
        } catch (e) {
            console.error('Error minifying code:', e);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
