// Aquí puedes agregar la lógica para redirigir a la página de selección de rol después de iniciar sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('nav ul li a[href="#"]');
    
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulación de inicio de sesión
        const userLoggedIn = confirm('¿Deseas iniciar sesión como cliente?');
        
        if (userLoggedIn) {
            const userRole = prompt('Escoge tu rol: "cliente" o "prestador"');
            if (userRole.toLowerCase() === 'cliente') {
                alert('Has iniciado sesión como cliente. Ahora puedes solicitar un servicio.');
                // Redirige a la página de solicitud de servicios
                window.location.href = 'solicitud-servicio.html';
            } else if (userRole.toLowerCase() === 'prestador') {
                alert('Has iniciado sesión como prestador de servicios.');
                // Aquí podrías redirigir a otra página para prestadores
            } else {
                alert('Rol no válido.');
            }
        }
    });
});
