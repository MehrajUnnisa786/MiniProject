const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0) {
        alert("Please complete the CAPTCHA.");
        return; // Stop further execution
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    fetch('http://localhost:4354/upload', {
        method: "POST",
        body: params,
    })
    .then(res => res.json())
    .then(data => {
        if (data.captchaSuccess) {
            console.log("Validation Successful");

            // Construct the URL with query parameters
            const name = fd.get('name');
            const message = fd.get('message');
            const queryString = `newpage.html?name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`;
            
            window.location.href = queryString; 
        } else {
            console.log("Validation Failed");
            alert("Captcha validation failed. Please try again.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
    });
});
