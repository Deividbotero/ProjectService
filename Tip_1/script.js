document.addEventListener("DOMContentLoaded", function() {
    const roleSelect = document.getElementById("roleSelect");
    const modal = document.getElementById("modal");
    const profileContainer = document.getElementById("profileContainer");
    const closeModal = document.getElementById("closeModal");

    const profiles = {
        plomeria: [
            { name: "Juan Pérez", img: ('images/Trabajador1.jpg'), description: "Plomero con 2 años de experiencia en reparaciones residenciales.", skills: [{ name: "Reparación de fugas", level: "70%" }, { name: "Instalación de tuberías", level: "50%" }] },
            { name: "María Gómez", img: ('images/Trabajador3.jpg'), description: "Plomera con 5 años de experiencia en mantenimiento comercial.", skills: [{ name: "Reparación de fugas", level: "85%" }, { name: "Instalación de tuberías", level: "75%" }] },
            { name: "Carlos Jiménez", img: ('images/Trabajador2.jpg'), description: "Plomero senior con 10 años de experiencia en proyectos industriales.", skills: [{ name: "Reparación de fugas", level: "95%" }, { name: "Instalación de tuberías", level: "90%" }] }
        ],
        carpinteria: [
            { name: "José García", img: ('images/Trabajador4.jpg'), description: "Carpintero con 1 año de experiencia en fabricación de muebles.", skills: [{ name: "Carpintería básica", level: "65%" }, { name: "Diseño de muebles", level: "50%" }] },
            { name: "Ricardo Mendoza", img: ('images/Trabajador5.jpg'), description: "Carpintero con 4 años de experiencia en construcción y diseño.", skills: [{ name: "Carpintería", level: "80%" }, { name: "Diseño de interiores", level: "70%" }] },
            { name: "Manuel Rojas", img: ('images/Trabajador6.jpg'), description: "Carpintero senior con 15 años de experiencia en proyectos personalizados.", skills: [{ name: "Carpintería avanzada", level: "95%" }, { name: "Restauración de muebles", level: "90%" }] }
        ],
        mecanica: [
            { name: "Pedro Torres", img: ('images/Trabajador7.jpg'), description: "Mecánico automotriz con 3 años de experiencia en reparación básica.", skills: [{ name: "Reparación de motores", level: "60%" }, { name: "Electromecánica", level: "55%" }] },
            { name: "Raúl Ortega", img: ('images/Trabajador8.jpg'), description: "Mecánico con 6 años de experiencia en mantenimiento de vehículos ligeros.", skills: [{ name: "Reparación de motores", level: "75%" }, { name: "Sistemas eléctricos", level: "70%" }] },
            { name: "Enrique Díaz", img: ('images/Trabajador.jpg'), description: "Mecánico senior con 12 años de experiencia en sistemas avanzados.", skills: [{ name: "Diagnóstico avanzado", level: "95%" }, { name: "Mantenimiento preventivo", level: "90%" }] }
        ]
    };

    roleSelect.addEventListener("change", function() {
        const role = roleSelect.value;
        if (role && profiles[role]) {
            showProfiles(profiles[role]);
            modal.style.display = "flex";
        }
    });

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function showProfiles(roleProfiles) {
        profileContainer.innerHTML = ""; 
        roleProfiles.forEach(profile => {
            const profileCard = document.createElement("div");
            profileCard.classList.add("profile-card");
            profileCard.innerHTML = `
                <img src="${profile.img}" alt="${profile.name}" class="profile-img">
                <h2>${profile.name}</h2>
                <p>${profile.description}</p>
                <div class="skills">
                    ${profile.skills.map(skill => `
                        <div class="skill">
                            <span>${skill.name}</span>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${skill.level};"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

        
            profileCard.addEventListener("click", function() {
                window.location.href = "http://127.0.0.1:5501/Tip_2/calendario-citas.html";
            });

            profileContainer.appendChild(profileCard);
        });
    }
});
