const express = require('@vendia/serverless-express')
require("dotenv").config();
const app = require('./routes')
module.exports = express({ app })
