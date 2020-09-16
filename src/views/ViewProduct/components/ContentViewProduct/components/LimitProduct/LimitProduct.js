import React from 'react';
import PropTypes from 'prop-types';
import { 
    Typography, 
    Button,
    Grid,
    Card,
    CardHeader,
    Divider,
    Box,
    CardContent
} from '@material-ui/core';

const LimitProduct = props => {
    return (
        <React.Fragment>
            <Grid 
                item 
                xs={12} 
                sm={4}
            >
                <Card>
                    <CardHeader title="Hạn chế người dùng" />
                    <Divider/>
                    <CardContent>
                        <Box>
                            {
                            props.userinfo.isClosed 
                            ?
                            <Button 
                                startIcon={ <LockOpenIcon fontSize="small" />}
                                onClick={ ()=>setOpenOpen(!openOpen) }
                            >
                                MỞ TÀI KHOẢN
                            </Button>
                            :
                            <Button 
                                startIcon={ <NotInterestedIcon fontSize="small" />}
                                onClick={ ()=>setOpenBlock(!openBlock) }
                            >
                                ĐÓNG TÀI KHOẢN
                            </Button>
                            }
                        </Box>
                        <Box className={ classes.textWarning}>
                            <Typography variant="body2" color="textSecondary">
                                Xóa toàn bộ dữ liệu của người dùng, nếu không chắc chắn bạn hãy chọn đóng tài khoản vì điều này sẽ xóa không trở lại.
                            </Typography>
                        </Box>
                        <ThemeProvider theme={themeButtonDelete}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={ <DeleteOutlinedIcon fontSize="small" />}
                                onClick={ ()=>setOpenDistroy(!openDistroy) }
                            >
                                XÓA TÀI KHOẢN
                            </Button>
                        </ThemeProvider>
                    </CardContent>
                </Card>
            </Grid>
            <ConfirmDialog action={ handleBlocking } openDialog={openBlock} content={{type:'block', title:'Đóng tài khoản người dùng', note:`Tài khoản người dùng ${ props.userinfo.name } sẽ bị vô hiệu hóa cho đến khi bạn cho phép kích hoạt trở lại. Đóng tài khoản?`}} />
            <ConfirmDialog action={ handleOpening } openDialog={openOpen} content={{type:'open', title:'Mở khóa tài khoản người dùng', note:`Tài khoản người dùng ${ props.userinfo.name } sẽ được phép hoạt động trở lại. Mở khóa cho tài khoản?`}} />
            <ConfirmDialog action={ handleDistroyUser } openDialog={openDistroy} content={{type:'delete', title:'Xóa vĩnh viễn tài khoản người dùng', note:`Tài khoản ${ props.userinfo.name } sẽ bị xóa hoàn toàn trên hệ thống, thực thi sẽ không khôi phục được. Bạn có chắc?`}}/>
        </React.Fragment>
    );
};

LimitProduct.propTypes = {
    
};

export default LimitProduct;