export default (token='') => {
    return `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_PROJECT_ID}.appspot.com/o/${process.env.REACT_APP_CATEGORY_FOLDER}${token}.jpg?alt=media&token=${token}`
}