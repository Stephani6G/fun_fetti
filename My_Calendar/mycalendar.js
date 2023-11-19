document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const calendarHeader = document.getElementById("current-month");

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        calendarHeader.textContent = firstDay.toLocaleString("default", { month: "long" }) + " " + currentYear;

        const calendarGrid = document.querySelector(".calendar-grid");
        calendarGrid.innerHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.innerHTML += '<div class="day"></div>';
        }

        const today = new Date();
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = i;
            dayElement.classList.add("day");

            if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && i === today.getDate()) {
                dayElement.classList.add("today");
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    updateCalendar();

    const prevMonthButton = document.querySelector(".prev-month");
    const nextMonthButton = document.querySelector(".next-month");

    prevMonthButton.addEventListener("click", function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        updateCalendar();
    });
});
