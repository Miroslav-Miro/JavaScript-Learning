document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const rows = document.querySelectorAll("table tr");
    const hoursCells = document.querySelectorAll(".hours");
    const closedCells = document.querySelectorAll(".closed");
    const toggleButton = document.createElement("button");
    const statusText = document.createElement("p");

    // Create toggle button
    toggleButton.textContent = "Toggle Store Hours";
    toggleButton.classList.add("toggle-btn");

    // Insert elements into the document
    document.body.insertBefore(toggleButton, document.querySelector("table"));
    document.body.insertBefore(statusText, toggleButton);

    // Highlight the current day's row
    if (today > 0 && today < 6) { // Monday to Friday
        rows[today].classList.add("current-day");
    } else { // Saturday & Sunday (closed)
        rows[today].classList.add("closed-day");
    }

    // Toggle visibility of store hours
    toggleButton.addEventListener("click", function () {
        hoursCells.forEach(cell => cell.style.display = cell.style.display === "none" ? "table-cell" : "none");
        closedCells.forEach(cell => cell.style.display = cell.style.display === "none" ? "table-cell" : "none");
    });

    // Function to check if store is open
    function checkStoreStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        let isOpenDay = today >= 1 && today <= 5;
        let isOpenHour = currentHour >= 8 && currentHour < 17;

        const day = today === 0 ? "Sunday" : today === 6 ? "Saturday" : "Weekday";
        let closedMessage = `It's ${day} The store is currently CLOSED`;
        if (!isOpenHour && isOpenDay) {
            let hour = currentHour.toPrecision(4);
            let minute = now.getMinutes();
            let ampm = currentHour >= 12 ? "PM" : "AM";
            hour = hour > 12 ? hour - 12 : hour;
            closedMessage = `It's ${day} ${hour}:${minute}${ampm} The store is currently CLOSED. We open at 8:00 AM`;
        }
        statusText.textContent = isOpenDay && isOpenHour ? `It's ${day} The store is currently OPEN` : closedMessage;
        statusText.style.color = isOpenDay ? "green" : "red";
    }

    checkStoreStatus();
    setInterval(checkStoreStatus, 60000); // Update every minute
});
