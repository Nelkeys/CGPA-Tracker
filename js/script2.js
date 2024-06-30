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

    // Save GPA and courses data to Firebase
    firebase.database().ref(`${semester}`).set({
        GPA: gpa !== null ? gpa.toFixed(2) : 'null',
        courses: coursesData
    });
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

function updateOverallGPA() {
    const semesters = ['first-semester', 'second-semester'];

    let overallGPA = 0;
    let count = 0;

    semesters.forEach(semester => {
        firebase.database().ref(`${semester}/GPA`).once('value').then(snapshot => {
            const gpa = parseFloat(snapshot.val());
            if (!isNaN(gpa)) {
                overallGPA += gpa;
                count++;
            }

            if (count === semesters.length) {
                const finalGPA = count > 0 ? (overallGPA / count).toFixed(2) : 'CANT BE CALCULATED BECAUSE A SEMSTER HAS NOT BEEN EDITED PROPERLY';
                firebase.database().ref('overallGPA').set(finalGPA);
                console.log(`Overall GPA: ${finalGPA}`);
            }
        });
    });
}

function loadInitialState() {
    const semesters = ['first-semester', 'second-semester'];

    semesters.forEach(semester => {
        firebase.database().ref(`${semester}/courses`).once('value').then(snapshot => {
            const courses = snapshot.val() || [];
            courses.forEach(courseData => addField(semester, courseData));
        });

        firebase.database().ref(`${semester}/GPA`).once('value').then(snapshot => {
            const gpa = snapshot.val();
            document.querySelector(`.${semester} .GPA`).textContent = gpa !== null ? `GPA: ${gpa}` : 'GPA: null';
        });

        toggleEditMode(semester);
    });

    updateOverallGPA();
}

document.addEventListener('DOMContentLoaded', () => {
    loadInitialState();
});
