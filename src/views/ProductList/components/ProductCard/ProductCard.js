import React, { useState } from 'react';
import {
  Link as RouterLink
} from "react-router-dom";
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { ConfirmDialog } from 'alerts';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  Box,
  Link,
  IconButton,
  FormControlLabel,
  Avatar,
  Tooltip
} from '@material-ui/core';
import { SearchInput, SelectInput } from 'components';
import { getInitials } from 'helpers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(0.5)
  },
  row: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subSort: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControlLabel-root': {
      marginLeft: theme.spacing(2)
    }
  },
  gutterLeft: {
    marginLeft: theme.spacing(4)
  },
  textHighLightVerify: {
    color: '#4caf50',
    backgroundColor: '#4caf5014',
    fontWeight: 500,
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  textHighLightNoVerify:{
    color: '#ffab40',
    backgroundColor: '#ffefc2',
    fontWeight: 500,
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  textCategory: {
    display: 'inline',
    color: '#909399',
    backgroundColor: '#f0ebf7',
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  inARow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  }
}));

const lists = [
  {
    value: '1',
    label: 'Tên bài viết A-Z',
  },
  {
    value: '2',
    label: 'Tên bài viết Z-A',
  },
  {
    value: '3',
    label: 'Bài mới nhất',
  },
  {
    value: '4',
    label: 'Bài cũ nhất',
  },
  {
    value: '5',
    label: 'Đánh giá cao nhất',
  },
  {
    value: '6',
    label: 'Đánh giá thấp nhất',
  },
];
const categorys = [
  {
    value: '0',
    label: 'Bốn mùa mưa nắng',
  },
  {
    value: '1',
    label: 'Mùa thu',
  },
  {
    value: '2',
    label: 'Mùa hạ',
  },
  {
    value: '3',
    label: 'Mùa đông',
  },
  {
    value: '4',
    label: 'Mùa xuân',
  },
];

const to_slug = str => {

    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
}

const ProductCard = props => {
  const { className, mockData, deniedProduct, ...rest } = props;

  const classes = useStyles();

  const list =  lists;

  const [ originUsers ] = useState(mockData);
  const [ users, setUsers] = useState(mockData);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [ openDialog, setOpenDialog ] = useState(false);

  const handleSelectAll = event => {
    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDenied = () => {
    deniedProduct(selectedUsers);
  }

  const sortBy = val => {
    let usersBy = [...users];
    switch (Number(val)) {
      case 1:
        // Theo moi nhat
        usersBy.sort( (a, b) =>  a.createdAt - b.createdAt).reverse();
        setUsers(usersBy);
        // end
        break;
      
      case 2:
        // Theo cu nhat 
        usersBy.sort( (a, b) =>  a.createdAt - b.createdAt);
        setUsers(usersBy);
        // end
        break;
      
      case 3:
        // Theo ten A-Z
        usersBy.sort( (a, b) => {
          let x = to_slug(a.name);
          let y = to_slug(b.name);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // name same same
         return 0;
        });
        setUsers(usersBy);
        // end
        break;
      
      case 4:
        // Theo ten Z-A
        usersBy.sort( (a, b) => {
          let x = to_slug(a.name);
          let y = to_slug(b.name);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // name same same
         return 0;
        }).reverse();
        setUsers(usersBy);
        // end
        break;
      
      default:
        break;
    }
  }

  const handleSearch = val => {
    const index = [...originUsers].map( item => (item.name.indexOf(val) !== -1) ? item : null).filter( item => item!=null);
    setUsers( index );
  }

  return (
    <React.Fragment>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >

        <CardContent className={classes.content}>
          <PerfectScrollbar>
            
            <div className={classes.row}>
              <SearchInput
                className={classes.searchInput}
                placeholder="Search user"
                search={ val => handleSearch(val) }
              />
              <SelectInput list={ list } action={ val => sortBy(val) } />
            </div>
            <div className={ classes.subSort }>
              <SelectInput list={ categorys } label="Danh mục" action={ val => sortBy(val) } />
              <FormControlLabel
                control={
                  <Checkbox
                    // onChange={}
                    color="primary"
                  />
                }
                label={ <Typography variant="body1">Đang ĐĂNG</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // onChange={}
                    color="primary"
                  />
                }
                label={ <Typography variant="body1">Bài tôi viết</Typography>}
              />
            </div>

            <div className={classes.inner}>
              <Table>
                
                <TableHead>
                  <TableRow>
                    <TableCell>Chọn</TableCell>
                    <TableCell>Bài viết</TableCell>
                    <TableCell>Ngày đăng</TableCell>
                    <TableCell>Đánh giá</TableCell>
                    <TableCell>Tình trạng</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { users.slice( page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.indexOf(user.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, user.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box className={classes.nameContainer}>
                          <Tooltip placement="top" title={ `Tác giả ${user.author.name}`}>
                            <Avatar
                              className={classes.avatar}
                              src={ user.author.avatar }
                            >
                              {getInitials( user.author.name )}
                            </Avatar>
                          </Tooltip>
                          <div>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography className={ classes.textCategory } variant="body2" color="inherit">{ user.category }</Typography>
                            &nbsp;
                            · 
                            &nbsp;
                            <Typography className={ classes.textCategory } variant="body2" color="inherit">{moment(user.createdAt).format('DD/MM/YYYY | HH:MM')}</Typography>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className={ classes.inARow }>
                          <FavoriteBorderOutlinedIcon fontSize="small"/>
                          { user.like }
                          &nbsp;
                          <VisibilityOutlinedIcon fontSize="small"/>
                          { user.viewer }
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className={ classes.inARow }>
                          <StarBorderOutlinedIcon fontSize="small"/>
                          <Typography variant="h6"> { user.rating} </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {
                            user.active
                            ?
                              <Typography variant="span" className={ classes.textHighLightVerify }>
                                  ĐÃ DUYỆT
                              </Typography>
                            :
                              <Typography variant="span" className={ classes.textHighLightNoVerify }>
                                  CHƯA DUYỆT
                              </Typography>
                          }
                      </TableCell>
                      <TableCell align="right">
                        <Link component={RouterLink} to="/user-editor">
                          <IconButton><EditAttributesIcon /></IconButton>
                        </Link>
                        <Link component={RouterLink} to="/user-detail">
                          <IconButton><ArrowForwardIcon fontSize="small" /></IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>

        <CardActions className={classes.actions}>
          <div>
          <Checkbox
              checked={selectedUsers.length === users.length}
              color="primary"
              indeterminate={
                selectedUsers.length > 0 &&
                selectedUsers.length < users.length
              }
              onChange={handleSelectAll}
            />
          <Button 
            variant="outlined" 
            disabled={ !selectedUsers.length ? true : false } 
            className={ classes.gutterLeft} 
            onClick={() => {setOpenDialog(!openDialog)}}
          >
            DỪNG ĐĂNG{ selectedUsers.length ? `(${selectedUsers.length})` : ''}
          </Button>
          </div>
          
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 25, 50, 80, +100]}
          />
        </CardActions>
      
      </Card>
      <ConfirmDialog action={ handleDenied } openDialog={ openDialog } content={{type:'denied', title:`Dừng đăng ${selectedUsers.length>1 ? selectedUsers.length : ''} bài viết đã chọn`, note:`Ẩn ${selectedUsers.length>1 ? selectedUsers.length : ''} bài viết này khỏi hệ thống cho tới khi được duyệt lại. Bạn có chắc?`}} />
    </React.Fragment>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  mockData: PropTypes.array.isRequired,
  deniedProduct: PropTypes.func.isRequired,
};

  const mapStateToProps = (state, ownProps) => {
    return {
      mockData: state.dataProductsList.productsList
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      deniedProduct: productsTick => {
        dispatch({
          type: 'DENIED',
          productsTick: productsTick
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
