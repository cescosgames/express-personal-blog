// this is our authorization middleware, from basic authentication video from the roadmap

function decodeCredentials(authHeader) {
    // check if our header exists
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new Error('Invalid or missing Authorization header');
    }

    const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, '');
    const decodedCredentials = atob(encodedCredentials);

    // Split username and password
    const [username, password] = decodedCredentials.split(':');
    
    if (!username || !password) {
        throw new Error('Invalid credentials format');
    }

    return { username, password };
}

function authMiddleware(req, res, next) {
    try {
        const { username, password } = decodeCredentials(req.headers.authorization || '');

        if (username === 'admin' && password === 'admin') {
            return next(); // Proceed to the next middleware/route handler
        }

        // add WWW-Authenticate header to prompt the browser for credentials
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send('Authentication Required To Access Admin Page');
    } catch (error) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send('Authentication Required: ' + error.message);
    }
}

export default authMiddleware;