const controller = {
    index: (req, res) => {
        res.render('index');
    },
    noticias: (req, res) => {
        res.render('products/noticias');
    },
    usuarios: (req, res) => {
        res.render('usuarios/users');
    }
}
module.exports = controller;