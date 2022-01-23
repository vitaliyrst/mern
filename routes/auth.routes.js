const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'min length 6').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                });
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'user with this email address already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save().then(result => console.log(result));

            res.status(201).json({message: 'user was added'});
        } catch (error) {

            res.status(500).json({message: 'something was wrong'});
        }
    });

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'enter email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                });
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'user doesn\'t exists'});
            }

            const isMatch = bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'incorrect password'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id});
        } catch (error) {
            res.status(500).json({message: 'something was wrong'});
        }
    });

module.exports = router;
