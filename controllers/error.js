exports.get404 = (req, res)=>{
    res.status(404).send('<h1> Error 404 Page not found :( </h1>');
}