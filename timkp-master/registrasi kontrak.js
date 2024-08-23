const scriptURL = 'https://script.google.com/macros/s/AKfycbxt5UNLG05HeXIf2qkQr7ygImW-sz-Vww1unzc-jNjh6jPctEu1dBKEX9HbwAP0l-peZg/exec';
const form = document.forms['contact-form'];
const fileInput1 = document.getElementById('file1-input');
const fileInput2 = document.getElementById('file2-input');

form.addEventListener('submit', e => {
  e.preventDefault();

  const reader1 = new FileReader();
  const reader2 = new FileReader();
  const formData = new FormData(form);

  // Function to handle file reading and submission
  const submitForm = () => {
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => alert("Thank you! Your form is submitted successfully."))
      .then(() => { window.location.reload(); })
      .catch(error => console.error('Error!', error.message));
  };

  // Handle first file
  reader1.onload = function(event) {
    const base64File1 = event.target.result.split(',')[1];
    formData.append('File1', base64File1);
    
    // Handle second file
    if (fileInput2.files[0]) {
      reader2.readAsDataURL(fileInput2.files[0]);
    } else {
      submitForm();
    }
  };

  reader2.onload = function(event) {
    const base64File2 = event.target.result.split(',')[1];
    formData.append('File2', base64File2);

    // Submit form after both files are read
    submitForm();
  };

  // Start reading the first file
  if (fileInput1.files[0]) {
    reader1.readAsDataURL(fileInput1.files[0]);
  } else if (fileInput2.files[0]) {
    reader2.readAsDataURL(fileInput2.files[0]);
  } else {
    submitForm();
  }
});
