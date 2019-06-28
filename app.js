const {argv} = require('./Config/yargs');
const {tarea, listar, actualizar} = require('./tareas/tareas.js');

let tareas = {
    crear: () => {
        let hacer = tarea(argv.descripcion);
    },

    listar: () => {
        listar();
    },

    actualizar: () => {
        actualizar({
            descripcion: argv.descripcion,
            completado : argv.completado
        });
    }
}

let comando = argv._[0];
if(!tareas.hasOwnProperty(comando))
{
    throw Error("Comando no es reconocido.");
}

tareas[comando]();
