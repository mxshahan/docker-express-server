const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/user');

exports.SignUp = async (req, res) => {
  const { fullname, username, password } = req.body;
  hashPassword = await bcrypt.hash(password, 12);
  try {
    const user = await UserModel.create({
      username,
      fullname,
      password: hashPassword,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      status: 'fail',
    });
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return res.status(403).json({
        status: 'fail',
        message: 'Password Mismatch!',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      status: 'fail',
    });
  }
};
