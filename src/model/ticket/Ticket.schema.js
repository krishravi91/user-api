import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  clientID: {
      type: Schema.Types.ObjectId
  },
  
  subject: {
      type: String,
      maxlength:100,
      required: true,
      default:""
  },

  openAt:{
      type: Date,
      required:true,
      default: Date.now()

  },

  status: {
    type: String,
    maxlength:50,
    required: true,
    default:"pending operator response"
  },


  conversations: [
      {
        sender:{
            type: String,
            maxlength: 1000,
            required: true,
            default: ""
        },
        message: {
            type: String,
            maxlength: 1000,
            required: true,
            default: ""
        },
        msgAt:{
            type: Date,
            required:true,
            default: Date.now()
        }
  }
]
  
});

const tScheme = mongoose.model('Ticket', TicketSchema);


export {tScheme};