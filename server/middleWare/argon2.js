import { argon2id, hash, verify } from "argon2";

const hashingOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const validationPassword = (req, res, next) => {
  const { email, password } = req.body;
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]).{8,}$/.test(
    password
  );

  if (!emailValid || !passwordValid) {
    res.sendStatus(401);
    return;
  }

  next();
};

const hashPassword = (req, res, next) => {
  if (req.body.password) {
    hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.password = hashedPassword;
        next();
      })
      .catch((err) => {
        console.error(err.message);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    return await verify(hashedPassword, password);
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default {
  validationPassword,
  hashPassword,
  verifyPassword,
};