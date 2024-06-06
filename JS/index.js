let BaseDeDatosFalsa = [
    {
        id: 'a', 
        nombre: "Juan",
        apellido: "Perez",
        edad: 66,
        profecion: "Ing Mecanico"
    },
    {
        id: 2,
        nombre: "Sofía",
        apellido: "Rodríguez",
        edad: 22,
        profecion: "Lic Marketing Digital"
    },
    {
        id: 3,
        nombre: "Mariana",
        apellido: "García",
        edad: 33,
        profecion: "Ing Sistemas Computacionales"
    },
    {
        id: 4,
        nombre: null,
        apellido: "Martínez",
        edad: 18,
        profecion: "Ing Industrial"
    },
    {
        id: 5,
        nombre: "Valentina",
        apellido: "Gómez",
        edad: 26,
        profecion: "Lic Derecho"
    },
    {
        id: 6,
        nombre: "Alejandro",
        apellido: "Flores",
        edad: 17,
    },
];

class ErrorIDnum extends Error {
    constructor(message){
        super(message);
        this.name = "El ID debe ser un numero";
    }
}

class ErrorUserNotFound extends Error { 
    constructor(message){
        super(message);
        this.name = "Usuario no encontrado";
    }
}

class ErrorNullName extends Error { 
    constructor(message){   
        super(message);
        this.name = "El nombre contiene un null";
    }
}

class ErrorPropertyMissing extends Error {
    constructor(property) {
        super(`La propiedad ${property} falta en el usuario`);
        this.name = "ErrorPropertyMissing";
    }
}

function consultarUsuario() {
    let entrada = document.getElementById('entrada').value; 
    let result = document.getElementById('resultado');
    result.innerHTML = ''; 

    try {
        if (entrada === '') {
            throw new ErrorIDnum("El campo está vacío, ingrese un ID.");
        }

        if (isNaN(entrada)) {
            throw new ErrorIDnum("El ID debe ser un número.");
        }

        let user = BaseDeDatosFalsa.find(user => user.id == entrada); 

        if (!user) { 
            throw new ErrorUserNotFound("Usuario no encontrado");
        }

        if (user.nombre === null) {
            throw new ErrorNullName("El nombre contiene un valor nulo");
        }

        let requiredProperties = ['nombre', 'apellido', 'edad', 'profecion'];
        for (let prop of requiredProperties) {
            if (!(prop in user)) {
                throw new ErrorPropertyMissing(prop);
            }
        }

        let userInfo = `
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Nombre:</strong> ${user.nombre}</p>
            <p><strong>Apellido:</strong> ${user.apellido}</p>
            <p><strong>Edad:</strong> ${user.edad}</p>
            <p><strong>Profecion:</strong> ${user.profecion ? user.profecion : 'No especificado'}</p>
        `;
        result.innerHTML = userInfo;

    } catch(error) {
        result.innerHTML = `<p class="error">Error: ${error.message}</p>`; 
    }
}