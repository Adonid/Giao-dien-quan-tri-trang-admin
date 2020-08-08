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
    label: 'Theo tên A-Z',
  },
  {
    value: '2',
    label: 'Theo tên Z-A',
  },
  {
    value: '3',
    label: 'Theo ngày đăng ký mới nhất',
  },
  {
    value: '4',
    label: 'Theo ngày đăng ký cũ nhất',
  },
];

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const list =  lists;

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

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
  };

  return (
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
            />
            <SelectInput list={ list } />
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
                {users.slice(0, rowsPerPage).map(user => (
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
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
