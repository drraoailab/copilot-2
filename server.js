const express = require('express');
const path = require('path');
const { body, validationResult, matchedData } = require('express-validator');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('form', { errors: {}, old: {} });
});

app.post(
  '/submit',
  [
    body('name').trim().notEmpty().withMessage('Full Name is required').escape(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Enter a valid email')
      .normalizeEmail(),
    body('age')
      .notEmpty()
      .withMessage('Age is required')
      .isInt({ min: 18, max: 120 })
      .withMessage('Age must be between 18 and 120')
      .toInt(),
    body('phone')
      .optional({ checkFalsy: true })
      .trim()
      .matches(/^\+?[0-9\s\-()]{7,20}$/)
      .withMessage('Phone number must be a valid format')
      .escape(),
    body('bio')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage('Biography must be 500 characters or fewer')
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mapped = {};
      errors.array().forEach((err) => {
        mapped[err.param] = err.msg;
      });
      return res.status(400).render('form', { errors: mapped, old: req.body });
    }

    const data = matchedData(req, { locations: ['body'] });
    res.render('success', { data });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
