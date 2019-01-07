// MKCOL method should create a dir by calling mkdir
const {mkdir, stat} = require('fs').promises;
const {parse} = require('url');
const {resolve, sep} = require('path');

// Get URL Path-------------------------------------------------
const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathName} = parse(url);
    let path = resolve(decodeURIComponent(pathName).slice(1));

    // if path doesn't start with base directory, throw error
    if (path !== baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
            throw {status: 403, body: "Forbidden"};
        }
    return path;
}

// MKCOL method-----------------------------------------------
methods.MKCOL = async function(request) {
    let path = urlPath(request.url);
    let stats;
    
    try {
        stats = await stat(path);
    } catch (err) {
        // if error isn't "file not found" throw error
        if (error.code !== "ENOENT") throw error;
        await mkdir(path);
        return {status: 204}; // success but no content
    }

    if (stats.isDirectory()) {
        return {status: 204}; // success but no content
    } else {
        return {status: 400, body: "No content"};
    }
}