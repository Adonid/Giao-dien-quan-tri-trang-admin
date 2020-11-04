import React, { useEffect, useState } from 'react';
import {
  Link as RouterLink
} from "react-router-dom";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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
  IconButton,
  LinearProgress 
} from '@material-ui/core';
import { SearchInput, SelectInput } from 'components';
import { getInitials, toSlug } from 'helpers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

import { connect } from 'react-redux';
import { GetAllUsers } from 'redux/actions';
import { 
  LOCK_USERS, OPEN_DIALOG_CONFIRM
} from 'redux/constans';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  contentLoading: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    width: "50%",
    textAlign: "center",
    margin: "auto",
  },
  cardLoading: {
    backgroundColor: "#9e9e9e14"
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
  },
  textHighLightVerify: {
    color: '#4caf50',
    backgroundColor: '#4caf5014',
    fontWeight: 500,
    fontSize: 11,
    padding: '2px 5px',
    borderRadius: 3,
    width: "fit-content",
    textTransform: "uppercase"
  },
  textHighLightNoVerify:{
    color: '#ffab40',
    backgroundColor: '#ffefc2',
    fontWeight: 500,
    fontSize: 11,
    padding: '2px 5px',
    borderRadius: 3,
    width: "fit-content",
    textTransform: "uppercase"
  },
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

const UsersTable = props => {
  const { className, loading, getAllUsers, lockUsers, mockData, ...rest } = props;

  const classes = useStyles();

  const list =  lists;

  const [ originUsers, setOriginUsers ] = useState(mockData);
  const [ users, setUsers] = useState(mockData);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // Moi lan vao component se tu dong loading lai data user va cap nhat lai vao cac state
  useEffect( () => {
    getAllUsers();
  }, []);
  useEffect( () => {
    setOriginUsers(mockData);
    setUsers(mockData);
    setSelectedUsers([]);
  }, [mockData]);

  const handleSelectAll = event => {
    let userSelect;

    if (event.target.checked) {
      userSelect = users.map(user => user.uid);
    } else {
      userSelect = [];
    }

    setSelectedUsers(userSelect);
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

  const lockUsersSelect = () => {
    const contentConfirm = {
      action: LOCK_USERS,
      type:'block', 
      title:`Đóng ${selectedUsers.length} tài khoản đã chọn`, 
      note:`Khóa tài khoản của ${selectedUsers.length} người dùng này. Bạn có chắc?`
    }
    lockUsers(selectedUsers, contentConfirm);
  };

  const sortBy = val => {
    let usersBy = [...users];
    switch (Number(val)) {
      case 1:
        // Theo moi nhat
        usersBy.sort( (a, b) =>  a.creationTime - b.creationTime).reverse();
        setUsers(usersBy);
        // end
        break;
      
      case 2:
        // Theo cu nhat 
        usersBy.sort( (a, b) =>  a.creationTime - b.creationTime);
        setUsers(usersBy);
        // end
        break;
      
      case 3:
        // Theo ten A-Z
        usersBy.sort( (a, b) => {
          let x = toSlug(a.displayName);
          let y = toSlug(b.displayName);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // displayName same same
         return 0;
        });
        setUsers(usersBy);
        // end
        break;
      
      case 4:
        // Theo ten Z-A
        usersBy.sort( (a, b) => {
          let x = toSlug(a.displayName);
          let y = toSlug(b.displayName);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // displayName same same
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
    const index = [...originUsers].map( item => (toSlug(item.displayName).indexOf(toSlug(val)) !== -1) ? item : null).filter( item => item!=null);
    setUsers( index );
  }

  if(loading){
    return (
      <React.Fragment>
        <Card className={classes.cardLoading}>
          <CardContent className={classes.contentLoading}>
            <LinearProgress />
          </CardContent>
        </Card>
      </React.Fragment>
    )
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
              <SelectInput list={ list } action={ sortBy } />
            </div>

            <div className={classes.inner}>
              <Table>
                
                <TableHead>
                  <TableRow>
                    <TableCell>Chọn</TableCell>
                    <TableCell>Người dùng</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Ngày đăng kí</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  { users.slice( page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.uid}
                      selected={selectedUsers.indexOf(user.uid) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.indexOf(user.uid) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, user.uid)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box className={classes.nameContainer}>
                          <Avatar
                            className={classes.avatar}
                            src={user.photoURL}
                          >
                            {getInitials(user.displayName)}
                          </Avatar>
                          <div>
                            <Typography variant="h6">{user.displayName}</Typography>
                            <Link href={'mailto:'+user.email} variant="body2" color="inherit">
                              {user.email}
                            </Link>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Link href={'tel:'+user.phoneNumber} color="inherit">
                            {user.phoneNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        { user.emailVerified ? <Typography className={classes.textHighLightVerify}>Active email</Typography> : <Typography className={classes.textHighLightNoVerify}>Chưa kích hoạt email</Typography>}
                        { !user.disabled ? null : <Typography className={classes.textHighLightNoVerify}>Đang bị khóa</Typography>}
                      </TableCell>
                      <TableCell>{dayjs(user.creationTime).format('DD/MM/YYYY | HH:MM')}</TableCell>
                      <TableCell align="right">
                        <Link component={RouterLink} to={"/user-editor/" + toSlug(user.displayName).replace(/(\s+)/g, '-') + "." + user.uid}>
                          <IconButton><EditAttributesIcon /></IconButton>
                        </Link>
                        <Link component={RouterLink} to={"/user-detail/" + toSlug(user.displayName).replace(/(\s+)/g, '-') + "." + user.uid}>
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
                selectedUsers.length > 0 && selectedUsers.length < users.length
              }
              onChange={handleSelectAll}
            />
          <Button 
            variant="outlined" 
            disabled={ !selectedUsers.length ? true : false } 
            className={ classes.gutterLeft} 
            onClick={ lockUsersSelect }
          >
            ĐÓNG TK{ selectedUsers.length ? `(${selectedUsers.length})` : ''}
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
    </React.Fragment>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  mockData: PropTypes.array.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  lockUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

  const mapStateToProps = state => ({
    mockData: state.dataMannegerUser.users,
    loading: state.dataMannegerUser.loadingPage,
  });

  const mapDispatchToProps = dispatch => ({

    getAllUsers: () => dispatch( GetAllUsers() ),

    lockUsers: (usersTick, content) => dispatch({
      type: OPEN_DIALOG_CONFIRM,
      dataConfirm: usersTick,
      contentConfirm: content
    })
  });

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
