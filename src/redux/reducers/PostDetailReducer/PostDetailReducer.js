import mockComments from './dataComment';

const dataPostDetail = {
    postInfo: {
        id: 1,
        category: {
            name: "Du lịch",
            image: "https://images.unsplash.com/photo-1597814419713-99e2923951b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        title: "Những gam màu của Mù Cang Chải",
        image: "https://i1-vnexpress.vnecdn.net/2020/09/14/DJI-0033.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=xRRrCnXkCgZ6Gz7xdCsUgw",
        tags: [
            {
                id: 1,
                name: "Đời sống"
            },
            {
                id: 2,
                name: "Châu Âu"
            },
            {
                id: 3,
                name: "Đại dương"
            },
            {
                id: 4,
                name: "Châu Á"
            },
        ],
        favorites: 109,
        viewer: 289,
        sharer: 12,
        author: {
            name: "Vân Trinh",
            avatar: "https://images.unsplash.com/photo-1599698000828-2cf0562f2bf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            quote: "I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...I like good music from Youtube."
        },
        time: "Thứ sáu, 18/9/2020, 02:08 (GMT+7)",
        content: `
            <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-8">
            <h3 class="jss347">The Castle Looks Different at Night...</h3>
            <p>This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more. We are here to make life better.<br /><br />And now I look and look around and there&rsquo;s so many Kanyes I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank you for turning my personal jean jacket into a couture piece.</p>
            <blockquote class="jss359 jss361">
            <p class="jss362 jss349">&ldquo;And thank you for turning my personal jean jacket into a couture piece.&rdquo;</p>
            <small class="jss363">Kanye West, Producer.</small></blockquote>
            </div>
            <div class="MuiGrid-root jss159 jss348 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-10 MuiGrid-grid-md-10">
            <div class="MuiGrid-root jss158  MuiGrid-container">
            <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss353 jss351 jss350" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog4.5de2130f.jpg" alt="..." /></div>
            <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss353 jss351 jss350" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog3.a4ee46b8.jpg" alt="..." /></div>
            <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss353 jss351 jss350" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog1.9313c5c1.jpg" alt="..." /></div>
            </div>
            </div>
            <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-8">
            <h3 class="jss347">Rest of the Story:</h3>
            <p>We are here to make life better. And now I look and look around and there&rsquo;s so many Kanyes I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank you for turning my personal jean jacket into a couture piece.<br />I speak yell scream directly at the old guard on behalf of the future. daytime All respect prayers and love to Phife&rsquo;s family Thank you for so much inspiration.</p>
            <p>Thank you Anna for the invite thank you to the whole Vogue team And I love you like Kanye loves Kanye Pand Pand Panda I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...The Pablo pop up was almost a pop up of influence. All respect prayers and love to Phife&rsquo;s family Thank you for so much inspiration daytime I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good music 2016!</p>
            <p>I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good music 2016!</p>
            </div>
        `,
    },

    dataComments: mockComments,

    limitInfo: {
        isStop: true,
        alert: {
            type    : "info",
            content : "Hello Word"
        },
    },
    userView: {
        id: 14,
        name: "Trương Định"
    },
}

const PostDetailReducer = (state = dataPostDetail, action) => {
    switch (action.type) {
        case 'FAVOURITE_COMMENT':
            let id = action.id; // id cua comment: int
            let vote = action.vote; // trang thai co vote hay khong: bool
            /** api xu ly yeu thich comment o day. Mac dinh BAI VIET va NGUOI DUNG da duoc biet truoc */

            /** end */

            // day la 1 vi du tra ve
            let newComment = [ ...state.dataComments ];
            if(!vote){
                // Them vote cho comment
                newComment = newComment.map( comment => comment.id === id ? { ...comment, meVote: !vote, favourite: [ ...comment.favourite, { ...state.userView} ] } : comment );
            }
            else{
                // Bo vote o comment
                newComment = newComment.map( comment => comment.id === id ? { ...comment, meVote: !vote, favourite: [ ...comment.favourite ].filter( item => item.id !== {...state.userView}.id) } : comment );
            }
            state = { ...state, dataComments: newComment };
            return state;
            
        case 'FAVOURITE_COMMENT_REPLY':
            let tempComReply = action.tempComReply;
            // {idComment: int, idReply: int, isVote: bool}
            /** api xu ly yeu thich comment reply */

            /** end */

            // VD sau khi goi api xong
            let newCommentReply = [ ...state.dataComments ].filter( comment => comment.id===tempComReply.idComment)[0];
            if (!tempComReply.isVote) {
                // Them vote cho comment reply
                newCommentReply = { ...newCommentReply, replyComments: [ ...newCommentReply.replyComments ].map( comment => comment.id === tempComReply.idReply ? { ...comment,  meVote: !tempComReply.isVote, favourite: [ ...comment.favourite, { ...state.userView} ] } : comment)};
            } else {
                // Bo vote o comment reply
                newCommentReply = { ...newCommentReply, replyComments: [ ...newCommentReply.replyComments ].map( comment => comment.id === tempComReply.idReply ? { ...comment,  meVote: !tempComReply.isVote, favourite: [ ...comment.favourite ].filter( item => item.id !== {...state.userView}.id) } : comment)};
            }
            let commentsNew = [ ...state.dataComments ].map( comment => comment.id===tempComReply.idComment ? newCommentReply : comment );
            state = { ...state, dataComments: commentsNew };
            return state;

        case 'REPLY_COMMENT':
            let commentReply = action.comment;
            // commentReply = { commentId: int, content: string}
            /** api reply vao comment */
                // --> Yeu cau cap nhat lai mockComments
            /** end */
            console.log(commentReply);
            
            return state;
            
        case 'COMMENT':
            let commentText = action.comment;
            // commentText: string, voi id post, id user da co trong state
            /** api them comment vao bai viet */
                // --> Yeu cau cap nhat lai mockComments
            /** end */
            console.log(commentText);
            
            return state;

        case 'CLOSE_POST':
            /** api dung dang bai - dung phe duyet */

            /** end */
            // vi du sau khi api tra ve
            state = { ...state, limitInfo: { ...state.limitInfo, isStop: true, alert: { type: "warning", content: "Đã dừng đăng bài viết!" }}};
            return state;

        case 'OPEN_POST':
            /** api dang bai lai - phe duyet */

            /** end */
            // vi du sau khi api tra ve
            state = { ...state, limitInfo: { ...state.limitInfo, isStop: false, alert: { type: "info", content: "Bài viết đã được đăng lại!" }}};
            return state;

        case 'DESTROY_POST':
            /** api xoa du lieu bai viet */

            /** end */
            // vi du sau khi api tra ve
            state = { ...state, limitInfo: { ...state.limitInfo, alert: { type: "error", content: "Bài viết đã bị xóa!" }}};
            return state;

        default:
            return state;
    }
}

export default PostDetailReducer;