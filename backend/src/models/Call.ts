import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  transcription: {
    type: String,
    required: true
  },
  audioUrl: String,
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    required: true
  },
  tags: [String],
  notes: [{
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'cancelled'],
    default: 'completed'
  }
}, {
  timestamps: true
});

export const Call = mongoose.model('Call', callSchema);