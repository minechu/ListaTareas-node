const {argv} = require('./Config/yargs');
const {tarea, listar, actualizar, borrar} = require('./tareas/tareas.js');

let tareas = {

    crear: () => tarea(argv.descripcion),

    listar: () => listar(),

    actualizar: () => actualizar(argv.descripcion,argv.completado),

    borrar: () => borrar(argv.descripcion)
}

let comando = argv._[0];
if(!tareas.hasOwnProperty(comando))
{
    throw Error("Comando no es reconocido.");
}

try
{
    (() => {
        let descripcion = argv.descripcion || "";
        let completado = argv.completado || "";
        if(typeof descripcion === "object" || typeof completado === "object"){
            throw new  Error("Error al ejecutar el comando");
        }

        tareas[comando]();
    })()
}
catch({message})
{
    console.log(message);
}

