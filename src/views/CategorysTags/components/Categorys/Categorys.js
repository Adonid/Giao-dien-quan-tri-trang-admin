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
    CircularProgress
 } from '@material-ui/core';
 import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
 import { InputNotBorder, UploadCropSingleImage } from 'components';
import { getCategoryPhotoUrl, getInitials } from 'helpers';
import { CreateCategory } from 'redux/actions';
import dayjs from 'dayjs';

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

    const { className, categorys, createCategory, deleteCategory, updateCategory, ...rest } = props;

    const classes = useStyles();

    const [chipsCat, setChipsCat] = useState(categorys);

    const [ openUploadImage, setOpenUploadImage ] = useState(false);
    const [ dataImage, setDataImage ] = useState('/images/products/contemplative-reptile.jpg');
    const [ dataChip, setDataChip ] = useState(null);
    
      const handleDelete = chipToDelete => () => {
        deleteCategory(Number(chipToDelete));
      };

    const handleAddCategory = name => {
        createCategory({name, time: dayjs().format("MM/DD/YYYY | hh:mm A")});
        // console.log({category, time: dayjs().format("MM/DD/YYYY | hh:mm A")});
    }
    
    const handleClick = chip => {
        setOpenUploadImage(!openUploadImage);
        const updateDataChip = [...chipsCat].filter( item => item.id===Number(chip))[0];
        setDataChip( { ...updateDataChip, title: "Tên danh mục"}); 
    }

    const updateCat = dataCat => {
        updateCategory( dataCat );
    };

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
                                <InputNotBorder callBack={ handleAddCategory } placeholder={<CircularProgress size={18} />} icon={ <CategoryOutlinedIcon /> } fullWidth autoFocus />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentCategorys}>
                                {categorys.map( chip => (
                                    <li key={ chip.id }>
                                        <Chip
                                            label={chip.name + `(${chip.postsList.length})`}
                                            onDelete={ chip.id==="default" ? undefined : handleDelete( chip.id ) }
                                            className={classes.chip}
                                            variant="outlined"
                                            onClick={ event => handleClick(chip.id) }
                                            avatar={
                                                <Avatar
                                                className={classes.avatar}
                                                src={ chip.tokenImg ? getCategoryPhotoUrl(chip.tokenImg) : "" }
                                                >
                                                {getInitials( chip.name )}
                                                </Avatar>
                                            }
                                        />
                                    </li>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ updateCat} titleName="Cập nhật ảnh danh mục" dataName={dataChip} />
        </React.Fragment>
    );
};

Categorys.propTypes = {
    categorys: PropTypes.array.isRequired,

    createCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // categorys: state.dataCategoryTag.categorys,
})

const mapDispatchToProps = dispatch => ({
    createCategory: category => dispatch( CreateCategory(category) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categorys)