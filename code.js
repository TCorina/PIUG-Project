document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.open-btn').addEventListener('click', function () {
        document.querySelector('nav').classList.add('opened');
        document.querySelector('nav').classList.remove('closed');

    });

    document.querySelector('.close-btn').addEventListener('click', function () {
        document.querySelector('nav').classList.add('closed');
        document.querySelector('nav').classList.remove('opened');
    });

});

//validare

class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;

        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            let validFields = [];
            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);
                self.validateFields(input);
                validFields.push(self.validateFields(input));
            });
            if (validFields.every(isValid => isValid)) {
                const name = document.querySelector(`#${self.fields[0]}`).value;
                alert(`Appointment created for ${name}`);
                self.form.reset();
            }
        });
    }

    validateOnEntry() {
        let self = this;
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);

            input.addEventListener('input', function (event) {
                self.validateFields(input);
            });
        });
    }

    validateFields(field) {
        // Check presence of values
        if (field.value.trim() === "") {
            this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error");
            return; // Return from function if field is empty
        } else {
            this.setStatus(field, null, "success");
        }
        // check for a valid email address
        if (field.id === "email") {
            const re = /\S+@\S+\.\S+/;
            if (!re.test(field.value)) {
                this.setStatus(field, "Please enter a valid email address", "error");
                return; // Return from function if email is invalid
            }
        }

        // check for a valid phone number
        if (field.id === "phone") {
            const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format
            if (!phoneRegex.test(field.value)) {
                this.setStatus(field, "Please enter a valid phone number", "error");
                return; // Return from function if phone number is invalid
            }
        }

        // check for minimum text length
        if (field.id === "message") {
            if (field.value.length < 15) {
                this.setStatus(field, "Message must be at least 15 characters long", "error");
                return; // Return from function if message is too short
            }
        }

        // If all checks pass, set status to success
        this.setStatus(field, null, "success");
        return true;
    }

    setStatus(field, message, status) {
        const successIcon = field.parentElement.querySelector('.icon-success');
        const errorIcon = field.parentElement.querySelector('.icon-error');
        const errorMessage = field.parentElement.querySelector('.error-message');

        if (status === "success") {
            if (errorIcon) { errorIcon.classList.add('hidden'); }
            if (errorMessage) { errorMessage.innerText = ""; }
            successIcon.classList.remove('hidden');
            field.classList.remove('input-error');
        }

        if (status === "error") {
            if (successIcon) { successIcon.classList.add('hidden'); }
            field.parentElement.querySelector('.error-message').innerText = message;
            errorIcon.classList.remove('hidden');
            field.classList.add('input-error');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const fields = ["first-name", "last-name", "email", "phone", "message"];
    if (!form) {
        return;
    }
    const validator = new FormValidator(form, fields);
    validator.initialize();

});

//pages

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




















