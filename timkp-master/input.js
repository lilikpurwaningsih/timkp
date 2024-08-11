const scriptURL = 'https://script.google.com/macros/s/AKfycbynpAQq5NQQkDn7EO0ADgKVaXt8x1yYxEFW9_REuzFlAVfYBFbrALc8mX8Npp8JrCoV/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
 e.preventDefault()
 fetch(scriptURL, { method: 'POST', body: new FormData(form)})
 .then(response => alert("Thank you! your form is submitted successfully." ))
 .then(() => { window.location.reload(); })
 .catch(error => console.error('Error!', error.message))
})
