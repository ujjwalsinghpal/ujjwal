let validCredentials = [];

// Fetch and load the CSV file on page load
window.onload = function() {
    fetch('credentials.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');

            // Parse CSV data
            rows.forEach((row, index) => {
                if (index !== 0 && row.trim()) { // Skip header row
                    const [name, password, officeId] = row.split(',');
                    validCredentials.push({ name: name.trim(), password: password.trim(), officeId: officeId.trim() });
                }
            });
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
};

// Validate form on submit
function validateForm() {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const officeId = document.getElementById('officeId').value;

    // Check if valid credentials are loaded
    if (validCredentials.length === 0) {
        alert("Credentials are not loaded, please try again later.");
        return false;
    }

    // Validate against loaded credentials
    const isValid = validCredentials.some(cred => cred.name === name && cred.password === password && cred.officeId === officeId);

    if (isValid) {
        alert("Login successful!"); // Or redirect to another page
        return true; // Allow form submission
    } else {
        alert("Invalid credentials, please try again."); // Show error message
        return false; // Prevent form submission
    }
}

document.getElementById('toggleButton').addEventListener('click', function() {
    // Toggle the "dark-mode" class on the body
    document.body.classList.toggle('dark-mode');
    
    // Change the button symbol depending on the mode
    if (document.body.classList.contains('dark-mode')) {
        this.textContent = '🌙'; // Moon symbol for dark mode
    } else {
        this.textContent = '🌞'; // Sun symbol for light mode
    }
});


