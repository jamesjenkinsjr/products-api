module.exports = function notFoundHandler(req, res){
    res.status(404).send('Lions, tigers, and bears -- OH MY!')
}