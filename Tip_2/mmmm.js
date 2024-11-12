document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const selectedDateElement = document.getElementById('selected-date');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const addressInput = document.getElementById('address'); 
    const timeSelect = document.getElementById('time');
    const serviceModal = document.getElementById('service-modal');
    const nextBtn = document.getElementById('next-btn');
    const closeServiceBtn = document.querySelector('.close-btn-service');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const appointmentDetails = document.getElementById('appointment-details');

    let selectedDay = null;
    let selectedAddress = ''; 
    let selectedTime = '';
    let currentDate = new Date();
    const today = new Date();

    const bookedDays = ['2024-10-25', '2024-10-28'];

    // Expresión regular para validar el formato de la dirección (Ej. Calle 100 # 50-20)
    const addressRegex = /^[a-zA-Z0-9\s\#\-.,]+$/; // Permite letras, números, espacios, #, -, y coma

    function generateCalendar(date) {
        calendar.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyElement = document.createElement('div');
            calendar.appendChild(emptyElement);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.innerText = day;

            const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            if (bookedDays.includes(formattedDate)) {
                dayElement.classList.add('booked');
            }

            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayElement.classList.add('current-day');
            }

            dayElement.addEventListener('click', function () {
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }
                dayElement.classList.add('selected');
                selectedDay = dayElement;
                selectedDateElement.innerText = `Día seleccionado: ${day} de ${getMonthName(month)} ${year}`;

                updateAvailableTimes(year, month, day);

                serviceModal.style.display = 'block';
            });

            calendar.appendChild(dayElement);
        }
    }

    function getMonthName(monthIndex) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[monthIndex];
    }

    function updateAvailableTimes(year, month, day) {
        const selectedDate = new Date(year, month, day);
        const isToday = selectedDate.toDateString() === today.toDateString();
        const currentHour = today.getHours();

        timeSelect.disabled = false;

        const options = timeSelect.querySelectorAll('option');
        options.forEach(option => {
            const hour = parseInt(option.value.split(':')[0], 10);
            if (isToday && hour <= currentHour) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    }

    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    closeServiceBtn.addEventListener('click', function () {
        serviceModal.style.display = 'none';
    });

    addressInput.addEventListener('input', function () {
        selectedAddress = addressInput.value.trim();
        enableNextButton();
    });

    timeSelect.addEventListener('change', function () {
        selectedTime = timeSelect.value;
        enableNextButton();
    });

    function enableNextButton() {
        // Validar que la dirección cumpla con el formato de la expresión regular
        if (addressRegex.test(selectedAddress) && selectedTime) {
            nextBtn.disabled = false; // Habilitar el botón si la dirección es válida y se seleccionó una hora
        } else {
            nextBtn.disabled = true; // Deshabilitar si no cumple con los requisitos
        }
    }

    nextBtn.addEventListener('click', function () {
        if (!addressRegex.test(selectedAddress)) {
            alert('Por favor, ingresa una dirección válida (Ej. Calle 100 # 50-20)');
            return; // Evitar que se siga si la dirección no es válida
        }

        serviceModal.style.display = 'none';

        const selectedDate = selectedDay.innerText;
        const selectedMonth = getMonthName(currentDate.getMonth());
        const selectedYear = currentDate.getFullYear();

        appointmentDetails.innerText = `Día: ${selectedDate} de ${selectedMonth} ${selectedYear}\nHora: ${selectedTime}\nDirección: ${selectedAddress}`;
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    confirmBtn.addEventListener('click', function () {
        alert('¡Cita confirmada con éxito!');
        modal.style.display = 'none';
    });

    generateCalendar(currentDate);
});
