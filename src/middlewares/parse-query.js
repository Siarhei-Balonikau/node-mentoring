import url from 'url';

const parseQuery = function (req, res, next) {
    req.parsedQuery = url.parse(req.url, true).query || {} ;
    next();
}

export default parseQuery;
