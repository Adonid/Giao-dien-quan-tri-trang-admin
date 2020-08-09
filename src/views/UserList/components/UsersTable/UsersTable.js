import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
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
  IconButton
} from '@material-ui/core';
import { SearchInput, SelectInput } from 'components';
import { getInitials } from 'helpers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

import { ConfirmDialog } from 'alerts';
import mockData from './data';

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
  gutterLeft: {
    marginLeft: theme.spacing(4)
  }
}));

const lists = [
  {
    value: '1',
    label: 'Người dùng mới nhất',
  },
  {
    value: '2',
    label: 'Người dùng cũ nhất',
  },
  {
    value: '3',
    label: 'Theo tên A-Z',
  },
  {
    value: '4',
    label: 'Theo tên Z-A',
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

const UsersTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const list =  lists;

  const [ originUsers, setOriginUsers] = useState(mockData);
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

  const deleteUsers = () => {
    // Goi redux xoa cac nguoi dung da chon trong selectedUsers
    // Dua ra notify sau khi api thuc thi tra ve ket qua
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

            <div className={classes.inner}>
              <Table>
                
                <TableHead>
                  <TableRow>
                    <TableCell>Chọn</TableCell>
                    <TableCell>Người dùng</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Bài viết</TableCell>
                    <TableCell>Ngày đăng kí</TableCell>
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
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <div>
                            <Typography variant="h6">{user.name}</Typography>
                            <Link ></Link>
                            <Link href={'mailto:'+user.email} variant="body2" color="inherit">
                              {user.email}
                            </Link>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Link href={'tel:'+user.phone} color="inherit">
                            {user.phone}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {user.address.city}, {user.address.state},{' '}
                        {user.address.country}
                      </TableCell>
                      <TableCell>{moment(user.createdAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align="right">
                        <Link>
                          <IconButton><EditAttributesIcon /></IconButton>
                        </Link>
                        <Link>
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
            XÓA{ selectedUsers.length ? `(${selectedUsers.length})` : ''}
          </Button>
          </div>
          
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <ConfirmDialog action={ deleteUsers} openDialog={ openDialog } content={{type:'info', title:`Xóa ${selectedUsers.length>1 ? selectedUsers.length : ''} người dùng đã chọn`, note:`Loại bỏ ${selectedUsers.length>1 ? selectedUsers.length : ''} người này dùng khỏi hệ thống. Bạn có chắc?`}} />
    </React.Fragment>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string
};

  const mapStateToProps = (state, ownProps) => {
    return {
      prop: state.prop
    }
  }

export default UsersTable;
