exports.getIndex = (req, res) => {
    res.render('shop/index');
}

exports.getProducts = (req, res) => {
    res.render('shop/products');
}
exports.getCart = (req, res) => {
    res.render('shop/cart');
}
exports.getAccount = (req, res) => {
    res.render('shop/account');
}
exports.getLogin = (req, res) => {
    res.render('shop/login');
}

exports.getCheckout = (req, res)=>{
    res.render('shop/checkout')
}
exports.getConfirmation =(req, res)=>{
    res.render('shop/confirmation');
}
exports.getProductDetail = (req, res) =>{
    res.render('shop/product-detail', product);
}

exports.getAboutUs = (req, res)=>{
    res.render('shop/about-us');
}
exports.getContact = (req, res)=>{
    res.render('shop/contact');
}
exports.getContact = (req, res)=>{
    res.render('shop/schlaginstrumente');
}