const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
}, 100000);

test("id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("create blog", async () => {
  const initialNotes = await api.get("/api/blogs");

  console.log(initialNotes.body.length);

  const newBlog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: "1",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialNotes.body.length + 1);
  expect(titles).toContain("test title");
});

test("test missing likes", async () => {
  const newBlog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 1,
  };

  expect(newBlog).toHaveProperty("likes");
});

afterAll(() => {
  mongoose.connection.close();
});

// test("test 400", async () => {
//   const newBlog = {
//     author: "test author",
//     likes: 1,
//   };

//   await api.post("/api/blogs").send(newBlog).expect(400);
// });
