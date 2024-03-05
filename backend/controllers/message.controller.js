import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

 const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body;
        const{id : receiverId} = req.params;
        
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants:{ $all : [senderId , receiverId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants :[senderId, receiverId]
            });
        }
        const newMessage = new Message ({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //Socket io will go here
        // await conversation.save();
        // await newMessage.save();
        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sendmessage controller",error.message);
        res.status(500).json({error:"internal server error"});

    }

}

 export const getMessages = async(req,res)=>{
    try{
        const{id:userToChatId} = req.params;
        const senderId = req.user._id;//coming from protectroute
        const conversation = await Conversation.findOne({
            participants:{ $all : [senderId , userToChatId]}
        }).populate("messages");//amazing method
        res.status(200).json(conversation.messages);




    }catch(error){
       console.log("Error in sendMessage controller",error.message);
       res.status(500).json({error:"internal server error"});
    }
}
export default sendMessage;

