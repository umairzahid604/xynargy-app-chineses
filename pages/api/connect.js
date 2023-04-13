const User = require("../../db/models/user")
require('dotenv').config()

export default async function handler(req, res) {
 res.json({greet:"hello"})
}
