const {talla} = require ('../models')
let self = {}

self.getAll = async function (req, res){
    try{
        const tallas = await talla.findAll({attributes: [
            ['id', 'tallaid'],
            nombre
        ]});
        return res.status(200).json(tallas);
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}


module.exports = self;