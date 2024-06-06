const {talla} = require ('../models')
let self = {}

self.getAll = async function (req, res){
    try{
        const tallas = await talla.findAll({attributes: [
            ['idTalla', 'idTalla'],
            nombre
        ]});
        return res.status(200).json(tallas);
    }catch(error){
        return res.status(500).json({error: 'Error interno del servidor'});
    }

}


module.exports = self;