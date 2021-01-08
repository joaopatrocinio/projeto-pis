class User {
    constructor(id, email, /*password,*/ firstName, lastName, userTypeId, contacto) {
        this.id = id;
        this.email = email;
        //this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userTypeId = userTypeId;
        this.contacto = contacto;
    }
}