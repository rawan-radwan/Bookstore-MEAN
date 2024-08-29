require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbConfig = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const commentRoutes = require('./routes/comment.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const errorHandler = require('./middleware/errorHandler.middleware');



const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());    // to be able to send a json in the body of post
app.use('/uploads', express.static('./uploads'));     // to have access on static files

// Connect to MongoDB
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
