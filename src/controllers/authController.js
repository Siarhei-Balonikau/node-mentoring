import jwt from 'jsonwebtoken';

exports.authUser = (req, res) => {
    const login = req.body.login;
    const pass = req.body.pass;
    const correctLogin = '1';
    const correctPass = '1';
    if (login === correctLogin && pass === correctPass) {
        const token = jwt.sign({ login: login }, 'test');
        const respond = JSON.stringify({
          code: 200,
          message: 'OK',
          token: token
        });
    } else {
        const respond = JSON.stringify({
            code: 404,
            message: "Not Found"
        });
    }

    res.send(json);
};
