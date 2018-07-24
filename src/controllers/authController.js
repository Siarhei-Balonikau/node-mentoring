import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './../models/user.js';

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

exports.getUser = function(req, res, next) {
  User.find({}, '', function(err, blogs) {
    if (err) {
      res.status(500);
      res.render('error', { title: 'Error', message: 'Can not get all blogs' });
    }

    res.render('blogs', { title: 'All blogs', message: 'All blogs', blogs: blogs });
  });
};
