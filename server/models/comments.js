import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import deepPopulate from 'mongoose-deep-populate'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  content: {
    type: String,
    required: true,
  },
})

CommentSchema.plugin(timestamps)
CommentSchema.plugin(deepPopulate(mongoose))

export default mongoose.model('Comment', CommentSchema)
