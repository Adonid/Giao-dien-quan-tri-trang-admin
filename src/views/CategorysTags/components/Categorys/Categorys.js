import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    FormControl,
    Divider,
    CardActions, 
    Box, 
    Chip, 
    Avatar,
    CircularProgress,
    Tooltip
 } from '@material-ui/core';
 import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
 import { InputNotBorder } from 'components';
import { getCategoryPhotoUrl, getInitials } from 'helpers';
import { CreateCategory, DeleteCategory } from 'redux/actions';
import dayjs from 'dayjs';
import { OPEN_DIALOG_UPLOAD_IMG } from 'redux/constans';

const useStyles = makeStyles(theme => ({
    root: {},
    padding: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    contentCategorys: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
      },
    chip: {
        margin: theme.spacing(0.5),
      },
      avatar: {
          
      }
}));

const Categorys = props => {

    const { 
        className, 
        categorys, 
        createCategory, 
        deleteCategory, 
        updateCategory, 
        loadingCreate,
        loadingEdit,
        openEditCategory,
        ...rest } = props;

    const classes = useStyles();
    
      const handleDelete = id => () => {
        deleteCategory(id);
      };

    const handleAddCategory = name => {
        createCategory({name, time: dayjs().format("MM/DD/YYYY | hh:mm A")});
    }
    
    const handleUpdateCategory = (id, tokenImg, name) => {
        const contentUpload = {
            type: 'edit-category',
            idCategory: id,
            imageInit: tokenImg ? getCategoryPhotoUrl(tokenImg) : "",
            titleName: 'Upload ảnh danh mục',
            valueText: name,
            labelText: 'Tên danh mục',
            options:{}
          };
          openEditCategory(contentUpload);
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardActions disableSpacing className={classes.padding}>
                            <FormControl fullWidth >
                                <InputNotBorder callBack={ handleAddCategory } placeholder="Tên danh mục" icon={ loadingCreate ? <CircularProgress size={15} /> : <CategoryOutlinedIcon /> } fullWidth autoFocus />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentCategorys}>
                                {categorys.map( chip => (
                                    <li key={ chip.id }>
                                        <Tooltip 
                                            placement="bottom" 
                                            title={ Object.keys(chip.postsList).length ? Object.values(chip.postsList).map( post => <React.Fragment><span>{ post.name }</span> <br/></React.Fragment>) : <React.Fragment><span>Chưa có bài viết</span> <br/></React.Fragment> }
                                        >
                                            <Chip
                                                label={chip.name + ` (${Object.keys(chip.postsList).length})`}
                                                onDelete={ chip.id==="default" ? undefined : handleDelete( chip.id ) }
                                                className={classes.chip}
                                                disabled={loadingEdit}
                                                variant="outlined"
                                                onClick={ event => handleUpdateCategory(chip.id, chip.tokenImg, chip.name) }
                                                avatar={
                                                    <Avatar
                                                    className={classes.avatar}
                                                    src={ chip.tokenImg ? getCategoryPhotoUrl(chip.tokenImg) : "" }
                                                    >
                                                    {getInitials( chip.name )}
                                                    </Avatar>
                                                }
                                            />
                                        </Tooltip>
                                    </li>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Categorys.propTypes = {
    categorys: PropTypes.array.isRequired,
    loadingCreate: PropTypes.bool.isRequired,
    loadingEdit: PropTypes.bool.isRequired,

    createCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    openEditCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loadingCreate: state.dataCategoryTag.loadingCreate,
    loadingEdit: state.dataCategoryTag.loadingEdit,
})

const mapDispatchToProps = dispatch => ({
    createCategory: category => dispatch( CreateCategory(category) ),
    deleteCategory: id => dispatch( DeleteCategory(id) ),
    openEditCategory: content => dispatch({
        type: OPEN_DIALOG_UPLOAD_IMG,
        content: content
      }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categorys)