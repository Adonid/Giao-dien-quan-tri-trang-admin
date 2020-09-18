import mockComments from './dataComment';

const dataPostDetail = {
    postInfo: {
        id: 1,
        title: "Những gam màu của Mù Cang Chải",
        image: "https://i1-vnexpress.vnecdn.net/2020/09/14/DJI-0033.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=xRRrCnXkCgZ6Gz7xdCsUgw",
        author: "Giang Huy",
        time: "Thứ sáu, 18/9/2020, 02:08 (GMT+7)",
        content: `
        Những gam màu của Mù Cang Chải
        Những thửa ruộng bậc thang trên Mù Cang Chải đã bắt đầu ngập sắc vàng của lúa chín.
        https://i1-vnexpress.vnecdn.net/2020/09/14/DJI-0033.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=FrJm6Nz1URvv1nvh7r9FvQ        
        Mùa lúa chín ở Mù Cang Chải đẹp nhất thường diễn ra từ khoảng 15/9 đến 20/10 hàng năm, đây cũng là thời điểm thu hút đông khách du lịch nhất.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-8525-1600079970.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=UG__t93UETgrL6Ftdr-u6Q
        Ruộng bậc thang Mù Cang Chải vào mùa lúa chín gây ấn tượng mạnh với du khách phương xa bởi những gam màu rất riêng của vùi núi đồi Tây Bắc. Những biển lúa vàng ươm trải dài ngút tầm mắt, xen giữa màu xanh lá của cây rừng tạo nên vẻ đẹp độc đáo và hiếm có.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-8622.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=k6m68lOc_IJsxd4tgJhycQ
        Đồng bào người Mông khéo léo khai khẩn, đắp bờ, chia nước, biến từng vạt đồi thành những thửa ruộng bậc thang. Người Mông sẻ nước từ các khe suối vào các thửa ruộng quanh một quả đồi, tuy nhiên không nối liền mạch nhằm hạn chế tối đa độ màu của đất bị rửa trôi khi có mưa lũ hoặc dòng chảy mạnh. Những chỗ gồ ghề sẽ được cào bằng thêm, chỗ cao sẽ được san bớt đi.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-8776-1600079985.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Lh4Wq9d8tqd04eKQaps-fw
        Tại một số nơi người dân đã bắt đầu thu hoạch lúa.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-8966-1600079998.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=H2xcI4jekXsMKQMyqrlm6g
        Việc đồng áng của đồng bào người Mông không chỉ cung cấp lương thực cho gia đình, mà còn góp phần giữ gìn vẻ đẹp danh thắng biểu tượng của quê hương.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-7696-1600079962.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=kPieUJvMot5RXGPTmwyrJw
        Công việc đồng áng ngày mùa vất vả, kéo dài từ sáng sớm tới tối muộn nên đồng bào thường ăn trưa và nghỉ ngơi ngay trên những thửa ruộng bậc thang.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-8243-1600079966.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=YM2qBJjRnpMutQEF3zEU3A
        Ruộng bậc thang Mù Cang Chải là di sản văn hóa độc đáo và rất riêng của người dân bản địa qua nhiều thế hệ.
        https://i1-vnexpress.vnecdn.net/2020/09/14/HUY-7853-1600079964.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=AoyNq9b6_WDfFct08bLdzg
        Học sinh trường tiểu học La Pán Tẩn tan học về trong bộ đồ dân tộc Mông truyền thống.
        `,
    },

    dataComments: mockComments,

    limitInfo: {

    },
    userView: {
        id: 14,
        name: "Trương Định"
    }
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
                // Them vote
                newComment = newComment.map( comment => comment.id === id ? { ...comment, meVote: !vote, favourite: [ ...comment.favourite, { ...state.userView} ] } : comment );
            }
            else{
                // Bo vote
                newComment = newComment.map( comment => comment.id === id ? { ...comment, meVote: !vote, favourite: [ ...comment.favourite ].filter( item => item.id !== {...state.userView}.id) } : comment );
            }
            state = { ...state, dataComments: newComment };
            return state;

        default:
            return state
    }
}

export default PostDetailReducer;