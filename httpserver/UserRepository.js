const fs = require("fs");

class UserRepository {

    #path = ""
    #users = []

    constructor(path) {
        this.#path = path
        fs.readFile(this.#path, "utf-8", (err, data) => {
            if (err) {
                console.error(`[REPOSITORY] Error reading file from disk: ${err}`);
            } else {
                this.#users = JSON.parse(data);
            }
        });

    }

    retrieveAll() {
        return this.#users
    }

    findOne(id) {
        return this.#users.find(user => user.id == id)
    }

    deleteOne(id) {
        this.#users = this.#users.filter(user => user.id != id)
        return
    }

    create(user) {
        user.id = this.#users.length > 0 ? this.#users.length + 1 : 1
        this.#users = this.#users.concat(user)
        return user.id
    }

}

module.exports = UserRepository

