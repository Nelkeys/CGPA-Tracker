let isEditMode = true;

function addField(semester, courseData = {}) {
    const container = document.querySelector(`.${semester} .get-input`);
    const newCourse = document.createElement('div');
    newCourse.classList.add('course');
    newCourse.innerHTML = `
        <div class='course-edit'>
            <div class='c-code-d'>
                <p>Course code</p>
                <input type="text" name="course-code" class="course-code" value="${courseData.courseCode || ''}">
            </div>
            <div class='credit-hours-d'>
                <p>Credit units</p>
                <select name="credit-hours" class="credit-hours">
                    <option value="1" ${courseData.creditHours == 1 ? 'selected' : ''}>1</option>
                    <option value="2" ${courseData.creditHours == 2 ? 'selected' : ''}>2</option>
                    <option value="3" ${courseData.creditHours == 3 ? 'selected' : ''}>3</option>
                    <option value="4" ${courseData.creditHours == 4 ? 'selected' : ''}>4</option>
                    <option value="5" ${courseData.creditHours == 5 ? 'selected' : ''}>5</option>
                    <option value="6" ${courseData.creditHours == 6 ? 'selected' : ''}>6</option>
                </select>
            </div>
            <div class='grade-d'>
                <p>Grade</p>
                <select name="grade" class="grade">
                    <option value="A" ${courseData.grade == 'A' ? 'selected' : ''}>A</option>
                    <option value="B" ${courseData.grade == 'B' ? 'selected' : ''}>B</option>
                    <option value="C" ${courseData.grade == 'C' ? 'selected' : ''}>C</option>
                    <option value="D" ${courseData.grade == 'D' ? 'selected' : ''}>D</option>
                    <option value="E" ${courseData.grade == 'E' ? 'selected' : ''}>E</option>
                    <option value="F" ${courseData.grade == 'F' ? 'selected' : ''}>F</option>
                </select>
            </div>
        </div>
        <div class='course-display'>
            <p class='display-course-code'>${courseData.courseCode || ''}</p>
            <p class='display-credit-hours'>${courseData.creditHours ? `${courseData.creditHours} Credit Units` : ''}</p>
            <p class='display-grade'>${courseData.grade || ''}</p>
        </div>
    `;
    container.appendChild(newCourse);
}

function removeField(semester) {
    const container = document.querySelector(`.${semester} .get-input`);
    const courses = container.querySelectorAll('.course');
    if (courses.length > 0) {
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
    let coursesData = [];

    const courses = document.querySelectorAll(`.${semester} .course`);
    courses.forEach(course => {
        const creditHours = parseInt(course.querySelector('.credit-hours').value);
        const grade = course.querySelector('.grade').value;
        const courseCode = course.querySelector('.course-code').value;

        creditSum += creditHours;
        gradeSum += gradePoints[grade] * creditHours;

        coursesData.push({
            courseCode: courseCode,
            creditHours: creditHours,
            grade: grade
        });

        course.querySelector('.display-course-code').textContent = courseCode;
        course.querySelector('.display-credit-hours').textContent = `${creditHours} Credit Units`;
        course.querySelector('.display-grade').textContent = grade;
    });

    let gpa = null;

    if (creditSum > 0) {
        gpa = gradeSum / creditSum;
    }

    document.querySelector(`.${semester} .GPA`).textContent = gpa !== null ? `GPA: ${gpa.toFixed(2)}` : 'GPA: null';

    toggleViewMode(semester);

    // Save GPA and courses data to local storage
    localStorage.setItem(`${semester}GPA`, gpa !== null ? gpa.toFixed(2) : 'null');
    localStorage.setItem(`${semester}Courses`, JSON.stringify(coursesData));
    updateOverallGPA();
}


function toggleEditMode(semester) {
    const section = document.querySelector(`.${semester}`);
    section.querySelector('#addField').style.display = 'block';
    section.querySelector('#removeField').style.display = 'block';
    section.querySelector('#solveGPA').style.display = 'block';
    section.querySelector('#toggleEditMode').style.display = 'none';

    section.classList.add('edit-mode');
    section.classList.remove('view-mode');

    // Save mode to local storage
    localStorage.setItem(`${semester}Mode`, 'edit');
}

function toggleViewMode(semester) {
    const section = document.querySelector(`.${semester}`);
    section.querySelector('#addField').style.display = 'none';
    section.querySelector('#removeField').style.display = 'none';
    section.querySelector('#solveGPA').style.display = 'none';
    section.querySelector('#toggleEditMode').style.display = 'block';

    section.classList.add('view-mode');
    section.classList.remove('edit-mode');

    // Save mode to local storage
    localStorage.setItem(`${semester}Mode`, 'view');
}

function updateOverallGPA() {
    // Retrieve GPA values for both semesters from local storage
    const firstSemesterGPA = parseFloat(localStorage.getItem('first-semesterGPA')) || 0;
    const secondSemesterGPA = parseFloat(localStorage.getItem('second-semesterGPA')) || 0;

    // Load courses from local storage
    const firstSemesterCourses = JSON.parse(localStorage.getItem('first-semesterCourses')) || [];
    const secondSemesterCourses = JSON.parse(localStorage.getItem('second-semesterCourses')) || [];

    // Calculate overall GPA only if both semesters have courses
    if (firstSemesterCourses.length > 0 && secondSemesterCourses.length > 0) {
        const overallGPA = (firstSemesterGPA + secondSemesterGPA) / 2;
        localStorage.setItem('overallGPA', overallGPA.toFixed(2));
        console.log(`Overall GPA: ${overallGPA.toFixed(2)}`);
    } else {
        // If either semester is empty, set overall GPA to 0
        localStorage.setItem('overallGPA', null);
        console.log('Overall GPA: 0.00 (One or both semesters are empty)');
    }
}




function loadInitialState() {
    const firstSemesterMode = localStorage.getItem('first-semesterMode') || 'edit';
    const secondSemesterMode = localStorage.getItem('second-semesterMode') || 'edit';

    // Load courses from local storage
    const firstSemesterCourses = JSON.parse(localStorage.getItem('first-semesterCourses')) || [];
    const secondSemesterCourses = JSON.parse(localStorage.getItem('second-semesterCourses')) || [];

    // Add fields only if there are no existing courses
    if (firstSemesterCourses.length === 0) {
        addField('first-semester');
    } else {
        firstSemesterCourses.forEach(courseData => addField('first-semester', courseData));
    }

    if (secondSemesterCourses.length === 0) {
        addField('second-semester');
    } else {
        secondSemesterCourses.forEach(courseData => addField('second-semester', courseData));
    }

    if (firstSemesterMode === 'view') {
        toggleViewMode('first-semester');
    } else {
        toggleEditMode('first-semester');
    }

    if (secondSemesterMode === 'view') {
        toggleViewMode('second-semester');
    } else {
        toggleEditMode('second-semester');
    }

    updateOverallGPA();
}


// Initial call to add one field by default for both semesters
if (!localStorage.getItem('first-semesterCourses')) addField('first-semester');
if (!localStorage.getItem('second-semesterCourses')) addField('second-semester');

// Load initial state from local storage
loadInitialState();

