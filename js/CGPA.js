function calculateOverallGPAForLevel(level) {
    const firstSemesterGPA = parseFloat(localStorage.getItem(`${level}-first-semesterGPA`));
    const secondSemesterGPA = parseFloat(localStorage.getItem(`${level}-second-semesterGPA`));

    let gpaSum = 0;
    let count = 0;

    if (!isNaN(firstSemesterGPA)) {
        gpaSum += firstSemesterGPA;
        count++;
    }

    if (!isNaN(secondSemesterGPA)) {
        gpaSum += secondSemesterGPA;
        count++;
    }

    const overallGPA = count > 0 ? (gpaSum / count).toFixed(2) : null;
    localStorage.setItem(`${level}-overallGPA`, overallGPA);

    return overallGPA;
}

function calculateTotalOverallGPA() {
    const levels = ['100L', '200L', '300L', '400L'];
    let totalGPA = 0;
    let levelCount = 0;

    levels.forEach(level => {
        const levelGPA = parseFloat(localStorage.getItem(`${level}-overallGPA`));
        if (!isNaN(levelGPA)) {
            totalGPA += levelGPA;
            levelCount++;
        }
    });

    const totalOverallGPA = levelCount > 0 ? (totalGPA / levelCount).toFixed(2) : 'CANT BE CALCULATED BECAUSE A SEMSTER HAS NOT BEEN EDITED PROPERLY';
    localStorage.setItem('totalOverallGPA', totalOverallGPA);

    console.log(`Total Overall GPA: ${totalOverallGPA}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const levels = ['100L', '200L', '300L', '400L'];
    levels.forEach(level => {
        calculateOverallGPAForLevel(level);
    });
    calculateTotalOverallGPA();
});
