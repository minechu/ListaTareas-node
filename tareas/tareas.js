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

const actualizar = (descripcion, completado) =>{
    if(!descripcion){
        throw new Error("La tarea no existe")
    }

    cargarDB();

    let index = listadoTareas.findIndex(x => x.descripcion.toUpperCase() === descripcion.toUpperCase())

    if(index < 0){
        throw new Error("La tarea para actualizar no existe")
    }

    //listadoTareas.push(porHacer);

    listadoTareas[index].completado = completado;
    guardarDB();
}

const borrar = (descripcion) => {
    if(!descripcion){
        throw Error("La descripcion es requerida");
    }
    cargarDB();
    listadoTareas = listadoTareas.filter(x => x.descripcion.toUpperCase() !== descripcion.toUpperCase())

    guardarDB();
}

module.exports = {
    tarea,
    listar,
    actualizar,
    borrar
}