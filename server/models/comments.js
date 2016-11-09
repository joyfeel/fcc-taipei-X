import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
})

CommentSchema.plugin(timestamps)

export default mongoose.model('Comment', CommentSchema)
