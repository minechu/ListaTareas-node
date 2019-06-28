const fs = require('fs');
const colors = require('colors/safe');

let listadoTareas = [];

const guardarDB = () =>{

    let data = JSON.stringify(listadoTareas);
    fs.writeFile('db/data.json', data, (err) =>{
        if(err){
            throw new Error('No se pudo guardar los datos', err);
        }
        console.log("Tarea guardada.");
    })
}

const cargarDB = () =>{

    try
    {
        listadoTareas = require('../db/data.json');
    }
    catch
    {
        listadoTareas = [];
    }
    
}

const tarea = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoTareas.push(porHacer);
    guardarDB();
    return porHacer;
}

const listar = () => {
    cargarDB();
    
    if(listadoTareas.length <= 0){
        console.log(colors.green(colors.green("No se han registrado tareas")));
        return;
    }

    console.log(colors.green("Lista de tareas pendientes."));
    
    listadoTareas.forEach( (tarea, index) => {
        console.log(colors.green(`******** Tarea ${index} ********`));
        console.log(colors.grey(`descripción: ${tarea.descripcion}`));
        console.log(colors.grey(`completado: ${tarea.completado}`));
        console.log(colors.green('********************************'));
    });
    console.log(colors.green("fin"));
}

const actualizar = (porHacer) =>{
    if(!porHacer){
        throw new Error("La tarea no existe")
    }

    cargarDB();

    let tarea = listadoTareas.find(x => x.descripcion.toUpperCase() === porHacer.descripcion.toUpperCase())

    if(!tarea){
        throw new Error("La tarea no existe")
    }

    listadoTareas.push(porHacer);
    guardarDB();    
}

module.exports = {
    tarea,
    listar,
    actualizar
}