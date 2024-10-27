document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.add-row').addEventListener('click', function() {
        const tbody = document.getElementById('course-body');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox" checked></td>
            <td>Course #${tbody.children.length + 1}</td>
            <td>
                <select class="grade">
                    <option value="">--</option>
                    <option value="4.0">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.5">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.5">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.7">D-</option>
                    <option value="0.0">F</option>
                </select>
            </td>
            <td><input type="number" class="credits" min="0" step="0.5" placeholder="Credits"></td>
            <td><button class="delete-btn">X</button></td>
        `;
        tbody.appendChild(newRow);
    });

    document.getElementById('course-body').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.parentElement.remove();
        }
    });

    document.querySelector('.reset').addEventListener('click', function() {
        const rows = document.querySelectorAll('#course-body tr');
        rows.forEach(row => {
            if (row.querySelector('input[type="checkbox"]').checked) {
                row.querySelector('.grade').value = "";
                row.querySelector('.credits').value = "";
            }
        });
        document.getElementById('gpa-value').textContent = '--';
    });

    document.querySelector('.calculate').addEventListener('click', function() {
        let totalCredits = 0;
        let totalPoints = 0;
        const rows = document.querySelectorAll('#course-body tr');
        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const gradeElement = row.querySelector('.grade');
                const creditsElement = row.querySelector('.credits');
                const grade = parseFloat(gradeElement.value);
                const credits = parseFloat(creditsElement.value);
                if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
                    totalCredits += credits;
                    totalPoints += grade * credits;
                }
            }
        });
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '--';
        document.getElementById('gpa-value').textContent = gpa;
    });
});
