require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app); // Tạo https sau
// const io = require('socket.io')(http);

const imageRoute = require("./routes/image");
const commentRoute = require('./routes/comment');
const uploadRoute = require("./routes/upload");
const searchRoute = require("./routes/search");
const homeRoute = require("./routes/home");
const privateImageRoute = require("./routes/privateImage");

const Comment = require('./models/Comment');
const Image = require('./models/Image');

app.use(express.json());
app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

// Routes
app.use('/comments', commentRoute); // Lấy comment trong phần detail image -- Idolplus.info/image/:id
app.use("/images", searchRoute); // Idolplus.info/images?category='' -- done
app.use("/upload", uploadRoute); // Idolplus.info/upload -- done
app.use('/image', imageRoute); // Idolplus.info/image/:id -- done
app.use('/k16', privateImageRoute); // Idolplus.info/k16
app.use("/", homeRoute); // Idolplus.info -- done


// Soket IO
let users = []
io.on('connection', socket => {
    // console.log(socket.id + ' connected.')
    socket.on('joinRoom', id => {
        // console.log(id) // id = field _id của docs trong collection productsroducts
        const user = { userId: socket.id, room: id }
        // console.log(user) // userId không đổi giữa các lần join room -- chỉ thay đổi nếu refresh trang

        // Đọan code này sẽ check xem có một người dùng mới hoàn toàn join vào room hay một nguời dùng cũ di chuyển giữa các room để thay đổi user.room cho người đó
        const check = users.every(user => user.userId !== socket.id)
        if (check) {
            users.push(user)
            socket.join(user.room)
        } else {
            users.map(user => {
                if (user.userId === socket.id) {
                    if (user.room !== id) {
                        socket.leave(user.room)
                        socket.join(id)
                        user.room = id
                    }
                }
            })
        }
        // console.log(users)
        // console.log(socket.adapter.rooms) // kiểm tra xem có bao nhiêu user đang ở trong một room_room hiện tại 2:05:00
    })

    // socket.emit('createComment', -- file FormInput.js
    socket.on('createComment', async msg => {
        // console.log(msg) // Tạo cmt rồi ân send -- bên này sẽ nhận được những field đó
        const { username, content, image_id, createdAt, send } = msg
        const newComment = new Comment({
            username, content, image_id, createdAt
        }) // Cú pháp của obj literal -- viết tắt nếu key và value trùng nhau

        if (send === 'replyComment') {
            const { _id, username, content, image_id, createdAt } = newComment
            const comment = await Comment.findById(image_id)

            if (comment) {
                comment.reply.push({ _id, username, content, createdAt })
                await comment.save()
                io.to(comment.image_id).emit('sendReplyCommentToClient', comment) // Tìm sendReplyCommentToClient trong DetailProduct.js_2:33:00
            }
        } else {
            await newComment.save()
            io.to(newComment.image_id).emit('sendCommentToClient', newComment)
        }
    })

    socket.on('editHeader', async msg => {
        const { title, description, id } = msg
        const updateImage = await Image.findOneAndUpdate(
            { _id: id },
            { title, description },
            { returnOriginal: false }
        )

        await updateImage.save()
        io.to(updateImage.id).emit('sendEditHeaderToClient', updateImage)
    })

    socket.on('disconnect', () => {
        // console.log(socket.id + ' disconnected.')
        users = users.filter(user => user.userId !== socket.id) // Lọc bỏ những users đã thoát web/ hoặc refresh web_2:54:30
    })
})

// Connection to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to Mongodb')
})

// Listen server
const PORT = process.env.PORT || 5555
http.listen(PORT, () => {
    console.log('Server is running on port', PORT)
}) 