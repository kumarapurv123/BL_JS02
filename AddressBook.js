const Contact = require("./Contact");

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact. Must be an instance of Contact class.");
        }

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

    sortContactsBy(field) {
        if (this.contacts.length === 0) {
            console.log("Address Book is empty. Nothing to sort.");
            return;
        }

        const validFields = ["city", "state", "zip"];
        if (!validFields.includes(field)) {
            console.log("Invalid field. Please choose from 'city', 'state', or 'zip'.");
            return;
        }

        this.contacts.sort((a, b) => {
            let valueA = a[field].toLowerCase();
            let valueB = b[field].toLowerCase();
            return valueA.localeCompare(valueB);
        });

        console.log(`\nContacts Sorted by ${field.charAt(0).toUpperCase() + field.slice(1)}:`);
        this.displayContacts();
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

    let contact3 = new Contact(
        "Emily", "Clark", "789 Maple St", "Chicago", "Illinois", "789456", "9012345678", "emily.clark@example.com"
    );

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);

    addressBook.displayContacts();

    console.log("\nSorting Contacts by City:");
    addressBook.sortContactsBy("city");

    console.log("\nSorting Contacts by State:");
    addressBook.sortContactsBy("state");

    console.log("\nSorting Contacts by Zip Code:");
    addressBook.sortContactsBy("zip");

} catch (error) {
    console.error(error.message);
}