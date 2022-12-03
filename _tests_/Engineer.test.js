const Engineer = require("../lib/Engineer");

describe("Testing Engineer Class", () => {
    it("should be able to create instance", () => {
        //data set up
        const name = "Ana";
        const id = 77;
        const email = "ana@ana.com";
        const github = "brigantinojoe";
        // create case
        const engineer = new Engineer(name, id, email, github);
        // make assertion
        expect(engineer.name).toBe(name);
        expect(engineer.id).toBe(id);
        expect(engineer.email).toBe(email);
        expect(engineer.github).toBe(github);
    });
});