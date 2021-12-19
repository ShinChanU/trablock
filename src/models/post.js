import mongoose from 'mongoose';

const { Schema } = mongoose;

// PostSchema라는 스키마 구조 정의
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

// Post라는 model 만듦
// model(만들 스키마이름, 만들어둔 스키마객체)
const Post = mongoose.model('Post', PostSchema); // db의 collection 이름 posts
export default Post;