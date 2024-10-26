let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

/**
 * Retrieves a list of posts and responds with a JSON object. If a valid `limit` query parameter
 * is provided, it returns a subset of posts up to the specified limit. Otherwise, returns all posts.
 *
 * @route GET /api/posts
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.limit - Optional query parameter to limit the number of posts returned.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - JSON response containing posts.
 */
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(400).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

/**
 * Retrieves a post by its ID and responds with the post in JSON format.
 * If the post is not found, responds with a 404 error.
 *
 * @route GET /api/posts/:id
 * @param {Object} req - The request object.
 * @param {Object} req.params - URL parameters for the request.
 * @param {string} req.params.id - The ID of the post to retrieve.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - JSON response containing the post with the specified ID.
 * @throws {Error} - Throws a 404 error if post is not found.
 */
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

/**
 * Creates a new post and responds with the updated list in JSON format.
 *
 * @route POST /api/posts/
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.title - The title of the new post.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - JSON response containing the updated list of posts.
 * @throws {Error} - Throws a 400 error if error.
 */
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
};

export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with ${id} is not found`);
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(post);
};

export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with ${id} is not found`);
    error.status = 400;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(post);
};
