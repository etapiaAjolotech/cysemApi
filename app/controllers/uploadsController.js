
const fs = require('fs')
const { response, request } = require("express");
const XLSX = require('xlsx');
const {subirArchivo} = require('../../helpers');
const Producto = require('../../models/productModel');



const cargarArchivo = async (req = request, res = response) => {

    
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        res.status(400).json({
            msg: 'No hay archivo por subir'
        });
        return
    }

    try{
        await Producto.deleteMany({ $or :[{estado: true}, {estado: false}]});
        const archivoCargado = await subirArchivo(req.files);
        
        const workbook = XLSX.readFile(archivoCargado);
        const workBookSheets = workbook.SheetNames;
        const sheet = workBookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        for(const itemFile of dataExcel) {
            const {codigoProducto, description, marca, precio, disponibilidad} = itemFile;
            const producto = new Producto({codigoProducto, description, marca, precio, disponibilidad});
            await producto.save();
        }
        const totales = await Producto.countDocuments();
        fs.unlinkSync(archivoCargado)

        
        res.json({
            nombreArchivo: archivoCargado,
            totales
        });
    }catch(error){
        res.status(400).json({
            error
        })
    }



}


module.exports = {
    cargarArchivo
}