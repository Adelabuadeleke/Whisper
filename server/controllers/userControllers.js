const User = require('../models/UserSchema')

module.exports.login = async(req, res) => {
 const { email } = req.body;

 if (typeof email !== 'string' || !validator.isEmail(email)) {
  res.status(406).json({
   message: 'Email is invalid',
  });

  return;
 }

 try {
  let user = await User.find({ email });

  if (!user) {
   user = await User.create({ email });
  }

  res.status(200).json({
   id: user._id,
  });
 } catch (err) {
  return res.status(500).json({
   message: 'An error occured while logging in',
  });
 }
}

module.exports.add_user = async(req, res) => {
 try {
  await User.create({
   email: req.body.email,
  },
  (err, data) => {
   if (err) {
    console.log(err);
   } else {
    return res.status(202).json(data);
   }
  });
 } catch(err) {
  return res.status(500).json({
   message: 'An error occured while creating user',
  });
 }
}

module.exports.find_user = async(req, res) => {
 try {
  await User.find(req.query, (err, data) => {
   if (err) {
    console.log(err);
   } else {
    if (data.length === 0) {
     res.sendStatus(202);
    } else {
     const user = {};
     user['id'] = data[0]._id.toString();
     res.status(200).send(JSON.stringify(user));
    }
   }
  });
 } catch (err) {
  return res.status(500).json({
   message: 'An error occured',
  });
 }
}