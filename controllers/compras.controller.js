const { compra, articulocompra } = require('../models');
const sequelize = require('../models').sequelize; // Importar sequelize para usar transacciones
let self = {};

self.create = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        const { usuario, estado, articulos } = req.body;

        const codigosArticulos = articulos.map(articulo => articulo.codigoArticulo);
        const preciosUnitarios = await obtenerPreciosUnitarios(codigosArticulos);

        for (let i = 0; i < articulos.length; i++) {
            const articulo = articulos[i];
            articulo.precioUnitario = preciosUnitarios[articulo.codigoArticulo];
            articulo.precioFinal = articulo.precioUnitario * articulo.cantidadArticulo;
        }

        // Calcular el monto final de la compra
        const montoFinal = articulos.reduce((total, articulo) => total + articulo.precioFinal, 0);

        console.log(montoFinal);
        const nuevaCompra = await compra.create({
            usuario,
            estado,
            fechaCompra: new Date(),
            montoFinal
        }, { transaction: t });

        const articulosCompra = articulos.map(articulo => ({
            cantidadArticulo: articulo.cantidadArticulo,
            precioUnitario: articulo.precioUnitario,
            precioFinal: articulo.precioFinal,
            codigoArticulo: articulo.codigoArticulo,
            idCompra: nuevaCompra.idCompra,
            idTalla: articulo.idTalla,
        }));

        await articulocompra.bulkCreate(articulosCompra, { transaction: t });
        await t.commit();
        res.status(201).json({ message: 'Compra realizada con éxito', compra: nuevaCompra, articulos: articulosCompra });

    } catch (error) {
        await t.rollback();
        return res.status(500).json({ error: error.message });
    }
};

}

async function obtenerPreciosUnitarios(codigosArticulos) {
    const articulos = await articulo.findAll({
        where: {
            codigoArticulo: codigosArticulos
        }
    });

    const preciosUnitarios = {};
    articulos.forEach(articulo => {
        preciosUnitarios[articulo.codigoArticulo] = articulo.precio;
        console.log(articulo.codigoArticulo + articulo.precio);
    });

    return preciosUnitarios;
}

module.exports = self

