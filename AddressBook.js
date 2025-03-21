const Contact = require("./Contact");

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact. Must be an instance of Contact class.");
        }

        // **UC6: Prevent duplicate entries**
        let duplicate = this.contacts.some(
            (c) => c.firstName === contact.firstName && c.lastName === contact.lastName
        );

        if (duplicate) {
            console.log(`Contact with name ${contact.firstName} ${contact.lastName} already exists.`);
            return;
        }

        this.contacts.push(contact);
        console.log("Contact added successfully!");
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
                        contact[key] = updatedDetails[key];
                    }
                }
            });

            console.log(`Contact ${firstName} ${lastName} updated successfully!`);
        } catch (error) {
            console.error(`Error updating contact: ${error.message}`);
        }
    }

    deleteContact(firstName, lastName) {
        let index = this.contacts.findIndex(c => c.firstName === firstName && c.lastName === lastName);

        if (index === -1) {
            console.log(`Contact with name ${firstName} ${lastName} not found.`);
            return;
        }

        this.contacts.splice(index, 1);
        console.log(`Contact ${firstName} ${lastName} deleted successfully!`);
    }

    countContacts() {
        console.log(`Total Contacts: ${this.contacts.length}`);
        return this.contacts.length;
    }
}

// Example Usage:
try {
    let addressBook = new AddressBook();

    let contact1 = new Contact(
        "John", "Doe", "123 Main St", "New York", "NewYork", "123456", "9876543210", "john.doe@example.com"
    );
    
    let contact2 = new Contact(
        "Jane", "Smith", "456 Elm St", "Los Angeles", "California", "654321", "9123456789", "jane.smith@example.com"
    );

    let contactDuplicate = new Contact(
        "John", "Doe", "789 Oak St", "Chicago", "Illinois", "987654", "9012345678", "john.duplicate@example.com"
    );

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contactDuplicate); // This should be blocked as a duplicate

    addressBook.displayContacts();
    addressBook.countContacts();
} catch (error) {
    console.error(error.message);
}