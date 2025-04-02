// Mock data for departments and subjects
const departments = [
    { id: 1, name: 'Computer Science', icon: 'fa-laptop-code' },
    { id: 2, name: 'Mechanical Engineering', icon: 'fa-gears' },
    { id: 3, name: 'Electrical Engineering', icon: 'fa-bolt' },
    { id: 4, name: 'Civil Engineering', icon: 'fa-building' },
    { id: 5, name: 'Chemical Engineering', icon: 'fa-flask' },
    { id: 6, name: 'Biomedical Engineering', icon: 'fa-heart-pulse' }
];

const allSubjects = [
    { id: 'cs101', name: 'Programming Fundamentals', deptId: 1, year: 1 },
    { id: 'cs102', name: 'Data Structures', deptId: 1, year: 2 },
    { id: 'me101', name: 'Thermodynamics', deptId: 2, year: 1 },
    { id: 'me201', name: 'Fluid Mechanics', deptId: 2, year: 2 },
    { id: 'ee101', name: 'Circuit Theory', deptId: 3, year: 1 }
];

// DOM elements
const departmentGrid = document.querySelector('.grid');
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('header button');

// Render department cards
function renderDepartments() {
    departmentGrid.innerHTML = departments.map(dept => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" 
             onclick="navigateToDepartment(${dept.id})">
            <div class="p-6 text-center">
                <i class="fas ${dept.icon} text-5xl text-blue-600 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-800">${dept.name}</h3>
                <p class="text-gray-600 mt-2">Click to view available years</p>
            </div>
        </div>
    `).join('');
}

// Navigation functions
function navigateToDepartment(deptId) {
    window.location.href = `department.html?id=${deptId}`;
}

function navigateToYear(deptId, year) {
    window.location.href = `year.html?dept=${deptId}&year=${year}`;
}

function navigateToSubject(subjectId) {
    window.location.href = `subject.html?subject=${subjectId}`;
}

function viewPDF(fileId) {
    window.location.href = `pdf-viewer.html?file=${fileId}`;
}

// Search functionality
function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (query.length < 2) return;

    const results = allSubjects.filter(subject => 
        subject.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        alert(`Found ${results.length} subjects matching "${query}".\n\n` +
              results.map(r => `• ${r.name} (Year ${r.year})`).join('\n') +
              '\n\nThis will show results in a modal in the final version.');
    } else {
        alert(`No subjects found matching "${query}"`);
    }
}

// Event listeners
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderDepartments();
    
    // Make navigation functions globally available
    window.navigateToDepartment = navigateToDepartment;
    window.navigateToYear = navigateToYear;
    window.navigateToSubject = navigateToSubject;
    window.viewPDF = viewPDF;
});
