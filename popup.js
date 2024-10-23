document.getElementById('checkReview').addEventListener('click', function () {
    const reviewText = document.getElementById('reviewText').value;

    if (reviewText.trim() === "") {
        alert("Please enter a review to check.");
        return;
    }

    // Send the review to the backend
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: reviewText }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.prediction === 'Fake') {
            resultDiv.textContent = "This review is likely fake.";
            resultDiv.className = 'result fake';
        } else {
            resultDiv.textContent = "This review seems genuine.";
            resultDiv.className = 'result genuine';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    });
});
