
const opts = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: "Descripción de la tarea por hacer"
    },
}

const opts2 = {
    completado: {
        alias: 'c',
        default: true,
        desc: "Marca como completado o pendiente la tarea"
    }
}

const argv = require("yargs")
                .scriptName("tareas")
                .command("crear", "Crea una tarea por hacer", opts)
                .command("actualizar", "Actualiza el esta de una tarea", {...opts, ...opts2})
                .command("listar", "Lista todas las tareas")
                .help()
                .argv;


module.exports = {
    argv
}