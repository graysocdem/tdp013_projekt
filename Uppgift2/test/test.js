const app = require("../server.js")
var expect = import("chai").expect
var request = require("request")


describe("Hej", function() {
    it("returns \"din mamma\"", function() {
        var returworth = app.hej()

        expect(returworth).to.equal("din mamma")
    })
})