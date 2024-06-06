const {categoria} = require ('../models')
let self = {}

//GET api/categorias
self.getAll = async function (req, res){
    try{
        const  categorias = await categoria.findAll({ attributes: [
            ['idCategoria', 'idCategoria'],
            'nombre'
        ]});    
        return res.status(200).json(categorias);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }
}

//GET api/categorias/id
self.get = async function (req, res){

}


module.exports = self;