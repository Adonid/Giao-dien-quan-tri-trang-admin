import React, { useState, useEffect } from 'react';
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
import { getInitials, filterPost } from 'helpers';
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
    label: 'Bài mới nhất',
  },
  {
    value: '2',
    label: 'Bài cũ nhất',
  },
  {
    value: '3',
    label: 'Tên bài viết A-Z',
  },
  {
    value: '4',
    label: 'Tên bài viết Z-A',
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
    label: 'Tất cả danh mục',
  },
  {
    value: '1',
    label: 'Sức khỏe',
  },
  {
    value: '2',
    label: 'Du lịch',
  },
  {
    value: '3',
    label: 'Khoa học',
  },
];


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

  const [ pramFilter, setPramFilter ] = useState({
    sort: 1,
    searchText: '',
    searchCategory: 0,
    isApproved: false,
    isMyPost: false,
  });

  useEffect( () => {
    const postSort = filterPost(originUsers, pramFilter);
    setUsers(postSort);
  }, [pramFilter]);

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
    setPramFilter( pramFilter => ({...pramFilter, sort : Number(val)}) );

  }

  const handleCheck = val => {
    const nameCheck = val.target.name;
    const valCheck = val.target.checked;
    setPramFilter( pramFilter => ({...pramFilter, [nameCheck] : valCheck }) );
  }

  const handleSearch = val => {
    setPramFilter( pramFilter => ({...pramFilter, searchText : val}) );
    const index = [...originUsers].map( item => (item.name.indexOf(val) !== -1) ? item : null).filter( item => item!=null);
    setUsers( index );
  }

  const handleCategory = val => {
    setPramFilter( pramFilter => ({...pramFilter, searchCategory : Number(val)}) );
    let index = [...users];
    Number(val) ? setUsers(index.map( item => (item.category.id === Number(val)) ? item : null).filter( item => item!=null)) : setUsers( index );
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
              <SelectInput list={ categorys } label="Danh mục" action={ handleCategory } />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isApproved"
                    onChange={ handleCheck }
                    color="primary"
                  />
                }
                label={ <Typography variant="body1">Đang ĐĂNG</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isMyPost"
                    onChange={ handleCheck }
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
                    <TableCell>Like/Viewer</TableCell>
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
                            <Typography className={ classes.textCategory } variant="body2" color="inherit">{ user.category.label }</Typography>
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
