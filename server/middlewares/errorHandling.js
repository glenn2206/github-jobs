function errorHandling (err, req, res, next) {
    if(err.name === 'Username cannot be empty') res.status(400).send({message: err.name})
    if(err.name === 'Password cannot be empty') res.status(400).send({message: err.name})
    if(err.name === 'User not found') res.status(404).send({message: err.name})
    if(err.name === 'Invalid username/password') res.status(401).send({message: err.name})
    if(err.name === 'You are not authorized') res.status(403).send({message: err.name})
    if(err.name === 'JsonWebTokenError') res.status(401).send({message: 'Invalid token'})
    res.status(500).send({message: 'Internal server error'})
}

module.exports = errorHandling