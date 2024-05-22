const {compra, articulocompra} = require('../models');
let self = {}


self.create = async function (req, res){
    const t = await sequelize.transaction();
    try{
        const { idusuario, estado, articulos } = req.body;
        const montofinal = articulos.reduce((total, articulo) => total + articulo.preciofinal, 0);

        const nuevaCompra = await compra.create({
            idusuario,
            estado,
            fechacompra: new Date(),
            montofinal
        }, {transaction: t});

        const articulosCompra = articulos.map(articulo => ({
            cantidadarticulo: articulo.cantidadarticulo,
            preciounitario: articulo.preciounitario,
            preciofinal: articulo.preciofinal,
            idarticulo: articulo.idarticulo,
            idcompra: nuevaCompra.id,
            idtalla: articulo.idtalla,
            idcolor: articulo.idcolor
        }));
        
        await articulocompra.bulkCreate(articulosCompra, {transaction: t});
        await t.commit();
        res.status(201).json({ message: 'Compra realizada con éxito', 
            compra: nuevaCompra, articulos: articulosCompra });

    }catch(error){
        await t.rollback();
        return res.status(500).json({error: error.message});
    }

}


module.exports = self

