let isEditMode = true;

function addField(semester) {
    const container = document.querySelector(`.${semester} .get-input`);
    const newCourse = document.createElement('div');
    newCourse.classList.add('course');
    newCourse.innerHTML = `
        <div class='course-edit'>
            <div class='c-code-d'>
                <p>Course code</p>
                <input type="text" name="course-code" class="course-code">
            </div>
            <div class='credit-hours-d'>
                <p>Credit units</p>
                <select name="credit-hours" class="credit-hours">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
            <div class='grade-d'>
                <p>Grade</p>
                <select name="grade" class="grade">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </div>
        </div>
        <div class='course-display'>
            <p class='display-course-code'></p>
            <p class='display-credit-hours'></p>
            <p class='display-grade'></p>
        </div>
    `;
    container.appendChild(newCourse);
}

function removeField(semester) {
    const container = document.querySelector(`.${semester} .get-input`);
    const courses = container.querySelectorAll('.course');
    if (courses.length > 1) {
        container.removeChild(courses[courses.length - 1]);
    }
}

function solveGPA(semester) {
    const gradePoints = {
        'A': 5,
        'B': 4,
        'C': 3,
        'D': 2,
        'E': 1,
        'F': 0
    };

    let creditSum = 0;
    let gradeSum = 0;

    const courses = document.querySelectorAll(`.${semester} .course`);
    courses.forEach(course => {
        const creditHours = parseInt(course.querySelector('.credit-hours').value);
        const grade = course.querySelector('.grade').value;
        const courseCode = course.querySelector('.course-code').value;

        creditSum += creditHours;
        gradeSum += gradePoints[grade] * creditHours;

        course.querySelector('.display-course-code').textContent = courseCode;
        course.querySelector('.display-credit-hours').textContent = `${creditHours} Credit Units`;
        course.querySelector('.display-grade').textContent = grade;
    });

    const gpa = gradeSum / creditSum || 0;

    document.querySelector(`.${semester} .GPA`).textContent = `GPA: ${gpa.toFixed(2)}`;

    toggleViewMode(semester);
}

function toggleEditMode(semester) {
    const section = document.querySelector(`.${semester}`);
    section.querySelector('#addField').style.display = 'block';
    section.querySelector('#removeField').style.display = 'block';
    section.querySelector('#solveGPA').style.display = 'block';
    section.querySelector('#toggleEditMode').style.display = 'none';

    section.classList.add('edit-mode');
    section.classList.remove('view-mode');
}

function toggleViewMode(semester) {
    const section = document.querySelector(`.${semester}`);
    section.querySelector('#addField').style.display = 'none';
    section.querySelector('#removeField').style.display = 'none';
    section.querySelector('#solveGPA').style.display = 'none';
    section.querySelector('#toggleEditMode').style.display = 'block';

    section.classList.add('view-mode');
    section.classList.remove('edit-mode');
}

// Initial call to add one field by default for both semesters
addField('first-semester');
addField('second-semester');
