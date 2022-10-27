const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'postCreated') {
    // get the post from the data from the event broker
    const { id, title } = data;
    /**
     * set the stores object that it should have a key of the id
     * gotten from the event broker to have data of id, title, comments initialized to an
     * empty array since no comments has been made yet
     */
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'commentCreated') {
    //get the comments from the event broker
    const { commentId, content, post_id, status } = data;

    // get stores with the id that matches post_id
    const store = posts[post_id];

    //update comments from the stores object
    store.comments = [...store.comments, { commentId, content, status }];
  }

  if (type === 'commentUpdated') {
    // do something...
    const { commentId, content, post_id, status } = data;
    const store = posts[post_id];

    const comment = store.comments.find(
      comment => comment.commentId == commentId
    );
    comment.status = status;
  }
};

app.get('/blog', (req, res) => {
  //
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log('app listening at port 4002');

  try {
    const res = await axios.get('http://event-bus-srv:5000/events');
    for (let event of res.data) {
      handleEvent(event.type, event.data);
    }
  } catch (error) {}
});
