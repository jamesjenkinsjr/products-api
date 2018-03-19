module.exports = function logger(req, ers, next){
    const { url } = req;
    const date = new Date();
    console.log(`URL: ${url} @ ${date}`);
    next();
}