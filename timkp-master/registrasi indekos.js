const scriptURL = 'https://script.google.com/macros/s/AKfycbwnG2wJpiYp5M_3_QgOWawSxP7a7YpXbVJNZjIdCS_49IA1ek6_Os_iyd9IPdVLwNfpKA/exec';
const form = document.forms['contact-form'];
const fileInput = document.getElementById('file-input');

form.addEventListener('submit', e => {
  e.preventDefault();

  const reader = new FileReader();
  const formData = new FormData(form);

  reader.onload = function(event) {
    const base64File = event.target.result.split(',')[1];
    formData.append('File', base64File);

    // Submit the form with the file included
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => alert("Thank you! Your form is submitted successfully."))
      .then(() => { window.location.reload(); })
      .catch(error => console.error('Error!', error.message));
  };

  // Start reading the file if it exists
  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => alert("Thank you! Your form is submitted successfully."))
      .then(() => { window.location.reload(); })
      .catch(error => console.error('Error!', error.message));
  }
});
