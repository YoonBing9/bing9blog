import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/signin', (req, res) => {

  if(typeof req.body.password1 !== "string" || typeof req.body.password2 !== "string" ) {
      return res.status(401).json({ //401: 권한없음
          error: "LOGIN FAILED",
          code: 1
      });
  }

  Account.findOne({}, (err, account) => {
    if(err) throw err;

    // CHECK ACCOUNT EXISTANCY
    if(!account) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if(!account.validateHash1(req.body.password1) || !account.validateHash2(req.body.password2)) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // ALTER SESSION
    let session = req.session;
    session.loginInfo = {
        _id: account._id,
        username: account.username
    };

    // RETURN SUCCESS
    return res.json({
        success: true,
        username: account.username
    });
  });
});

router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
      return res.status(401).json({
          error: 1
      });
  }

  res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => { if(err) throw err; });
  return res.json({ sucess: true });
});

export default router;
