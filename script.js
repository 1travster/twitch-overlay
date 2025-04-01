function showAlert(message) {
    const alertBox = document.getElementById("alert-box");
    alertBox.innerText = message;
    alertBox.style.display = "block";
    
    // Hide after 5 seconds
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 5000);
}

// Simulating different alerts
setTimeout(() => showAlert("New Follower: JohnDoe!"), 2000);
setTimeout(() => showAlert("New Subscriber: JaneSmith!"), 7000);
setTimeout(() => showAlert("Donation: $10 from CoolUser!"), 12000);
setTimeout(() => showAlert("Chat: 'This is awesome!'"), 17000);
