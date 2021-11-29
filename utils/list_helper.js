const _ = require("lodash");

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (p, c) => {
    return p.likes > c.likes ? p : c;
  };
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  const result = _.chain(blogs)
    .countBy("author")
    .entries()
    .maxBy(_.last)
    .value();

  return { author: result[0], blogs: result[1] };
};

module.exports = { totalLikes, favoriteBlog, mostBlogs };
