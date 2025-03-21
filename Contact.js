class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddressCityState(address, "Address");
        this.city = this.validateAddressCityState(city, "City");
        this.state = this.validateAddressCityState(state, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    validateAddressCityState(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`${fieldName} must have at least 4 characters.`);
        }
        return value;
    }

    validateZip(zip) {
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Zip code must be a 6-digit number.");
        }
        return zip;
    }

    validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone number must be a 10-digit number.");
        }
        return phone;
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        return email;
    }

    toString() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state}, Zip: ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }
}

// Example Usage:
try {
    let contact1 = new Contact(
        "John", "Doe", "123 Main St", "New York", "NY", "123456", "9876543210", "john.doe@example.com"
    );
    console.log(contact1.toString());
} catch (error) {
    console.error(error.message);
}

try {
    let contact2 = new Contact(
        "jo", "smith", "xyz", "NY", "NY", "123", "12345678", "invalid.email"
    ); // This should throw an error
} catch (error) {
    console.error(error.message);
}
try {
    let contact2 = new Contact(
        "jo", "smith", "xyz", "NY", "NY", "123", "12345678", "invalid.email"
    ); // This should throw an error
} catch (error) {
    console.error(error.message);
}