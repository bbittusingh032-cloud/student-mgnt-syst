export const loadStudentsFromStorage = () => {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : [];
};

export const saveStudentsToStorage = (students) => {
    localStorage.setItem("students", JSON.stringify(students));
};
