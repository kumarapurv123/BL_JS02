const Contact = require("./Contact");

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (contact instanceof Contact) {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        } else {
            throw new Error("Invalid contact. Must be an instance of Contact class.");
        }
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("Address Book is empty.");
        } else {
            console.log("Address Book:");
            this.contacts.forEach(contact => console.log(contact.toString()));
        }
    }

    editContact(firstName, lastName, updatedDetails) {
        let contact = this.contacts.find(c => c.firstName === firstName && c.lastName === lastName);
        
        if (!contact) {
            console.log(`Contact with name ${firstName} ${lastName} not found.`);
            return;
        }

        try {
            // Apply validation before updating
            Object.keys(updatedDetails).forEach(key => {
                if (contact.hasOwnProperty(key)) {
                    if (key === "firstName" || key === "lastName") {
                        contact[key] = contact.validateName(updatedDetails[key], key);
                    } else if (key === "address" || key === "city" || key === "state") {
                        contact[key] = contact.validateAddressCityState(updatedDetails[key], key);
                    } else if (key === "zip") {
                        contact[key] = contact.validateZip(updatedDetails[key]);
                    } else if (key === "phone") {
                        contact[key] = contact.validatePhone(updatedDetails[key]);
                    } else if (key === "email") {
                        contact[key] = contact.validateEmail(updatedDetails[key]);
                    } else {
                        contact[key] = updatedDetails[key]; // Assign other properties directly
                    }
                }
            });

            console.log(`Contact ${firstName} ${lastName} updated successfully!`);
        } catch (error) {
            console.error(`Error updating contact: ${error.message}`);
        }
    }
}

// Example Usage:
try {
    let addressBook = new AddressBook();

    let contact1 = new Contact(
        "John", "Doe", "123 Main St", "New York", "NewYork", "123456", "9876543210", "john.doe@example.com"
    );
    
    addressBook.addContact(contact1);
    addressBook.displayContacts();

    // Editing Contact with validation
    addressBook.editContact("John", "Doe", { address: "456 Park Ave", city: "Los Angeles", state: "CA", phone: "9123456789" });

    addressBook.displayContacts(); // Updated Contact Details
} catch (error) {
    console.error(error.message);
}