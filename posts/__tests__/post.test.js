const request = require("request");

test("api should give 201 as success", (done) => {
  request("http://localhost:4000/post", (err, res) => {
    expect(res.statusCode).toEqual(201);
    done();
  });
});
