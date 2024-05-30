const {compra, articulocompra} = require('../models');
let self = {}


self.create = async function (req, res){
    const t = await sequelize.transaction();
    try{
        const { usuario, estado, articulos } = req.body;
        const montoFinal = articulos.reduce((total, articulo) => total + articulo.precioFinal, 0);

        const nuevaCompra = await compra.create({
            usuario,
            estado,
            fechacompra: new Date(),
            montoFinal
        }, {transaction: t});

        const articulosCompra = articulos.map(articulo => ({
            cantidadArticulo: articulo.cantidadArticulo,
            precioUnitario: articulo.precioUnitario,
            precioFinal: articulo.precioFinal,
            codigoArticulo: articulo.codigoArticulo,
            idCompra: nuevaCompra.idCompra,
            idTalla: articulo.idTalla,
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

