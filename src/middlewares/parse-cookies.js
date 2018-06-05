const parseCookies = function (req, res, next) {
    if (req.headers.cookie) {
        const arCookies = req.headers.cookie.split(';');
        const cookies = arCookies.map(cookie => {
            const arCookie = cookie.split('=');
            return {
                [arCookie[0]]: arCookie[1]
            }
        });

        req.parsedCookies = cookies;
    }

    next();
}

export default parseCookies;
