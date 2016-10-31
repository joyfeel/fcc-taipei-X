import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import deepPopulate from 'mongoose-deep-populate'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  dislikeCount: {
    type: Number,
    default: 0
  }
})

PostSchema.plugin(timestamps)
PostSchema.plugin(deepPopulate(mongoose))

export default mongoose.model('Post', PostSchema)
