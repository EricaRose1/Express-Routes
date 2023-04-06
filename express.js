const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');


app.get('/mean', function(request, response, next) {
    if (!request.query.nums) {
        throw new ExpressError('Must pass query key of nums', 400)
    }
    let stringNums = request.query.nums.split(',');
    let nums = convertValidateNumsArray(stringNums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation : "mean",
        result: findMean(nums)
    }
    return response.send(result);
});


app.get('/median', function(request, response, next) {
    if (!request.query.nums) {
        throw new ExpressError('Must pass query key of nums', 400)
    }
    let stringNums = request.query.nums.split(',');
    let nums = convertValidateNumsArray(stringNums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation : "median",
        result: findMedian(nums)
    }
    return response.send(result);
});


app.get('/mode', function(request, response, next) {
    if (!request.query.nums) {
        throw new ExpressError('Must pass query key of nums', 400)
    }
    let stringNums = request.query.nums.split(',');
    let nums = convertValidateNumsArray(stringNums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation : "mode",
        result: findMode(nums)
    }
    return response.send(result);
});


app.use(function (request, response, next) {
    const err = new ExpressError('Not Found', 404);
    return next(err);
});

// general error handler

app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    return response.json({
        error: err,
        message: err.message
    });
});


app.listen(3000, function() {
    console.log('App on port 3000');
});