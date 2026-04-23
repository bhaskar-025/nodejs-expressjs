const path = require('path');
const rootDir = require('../utils/pathutil');
const Home = require('../models/home');
const { check, validationResult } = require('express-validator');

exports.getlogin = (req, res, next) => {
    res.render('auth/login',{editing: false, userid: null, isloggedin: req.session.isloggedin || false});
};

exports.postsignup = [
    check('firstName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long')
        .matches(/^[A-Za-z]+$/ )
        .withMessage('First name must contain only letters'),

    check('lastName')
        .matches(/^[A-Za-z]*$/)
        .withMessage('Last name must contain only letters'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character')
        .trim(),

    check('confirmPassword')
        .trim()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    check('userType')
        .notEmpty()
        .withMessage('Please select a user type')
        .isIn(['host', 'guest'])
        .withMessage('Invalid user type selected'),

    check('terms')
        .notEmpty()
        .withMessage('You must accept the terms and conditions')
        .custom((value, {req}) => {
            if(value !== 'on'){
                throw new Error('You must accept the terms and conditions');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const { firstName, lastName, email, password, userType } = req.body;
            return res.status(422).render('auth/signup', {
                isloggedin: req.session.isloggedin || false,
                editing: false,
                userid: null,
                errors: errors.array(),
                oldInput: { 
                    firstName: firstName || '', 
                    lastName: lastName || '', 
                    email: email || '', 
                    password: password || '', 
                    userType: userType || '' 
                }
            });
        }
        console.log("Signup attempt with data: ", req.body);
        res.redirect('/login');
    }
];

exports.postlogin = (req, res, next) => {
    const { email, password } = req.body;
    console.log("Login attempt with email: ", email, " and password: ", password);
    req.session.isloggedin = true;
    res.redirect('/');
};

exports.postlogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

exports.getsignup = (req, res, next) => {
    res.render('auth/signup',{editing: false, userid: null, isloggedin: req.session.isloggedin || false});
};

