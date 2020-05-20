import Post from '../models/post_model';


export const createPost = (req, res) => {
  const p = new Post();
  p.title = req.body.title;
  p.tags = req.body.tags;
  p.content = req.body.content;
  p.coverUrl = req.body.coverUrl;
  p.author = req.user._id;
  p.save()
    .then((result) => {
      res.json('Created Post!');
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  return p;
};

export const getPosts = (req, res) => {
  return Post.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  return Post.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  return Post.remove({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'Post Deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  return Post.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.json({ message: 'Post Updated!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
