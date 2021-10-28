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

module.exports = { totalLikes, favoriteBlog };
