import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
    Avatar
    
 } from '@material-ui/core';
 import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
 import { InputNotBorder, UploadCropSingleImage } from 'components';
import { getInitials } from 'helpers';
import { connect } from 'react-redux';

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

    const { className, categorys, addCategory, deleteCategory, ...rest } = props;

    const classes = useStyles();

    const [chipsCat, setChipsCat] = useState(categorys);

    const [ openUploadImage, setOpenUploadImage ] = useState(false);
    const [ dataImage, setDataImage ] = useState('/images/products/contemplative-reptile.jpg');
    const [ dataChip, setDataChip ] = useState(null);

    useEffect( () => {
        setChipsCat(categorys);
    },[categorys])
    
      const handleDelete = chipToDelete => () => {
        // setChipsCat( (chipsCat) => chipsCat.filter( chip => chip.id !== Number(chipToDelete)) );
        deleteCategory(Number(chipToDelete));
      };

    const handleAddCategory = category => {
        // setChipsCat( chipsCat => [ ...chipsCat, { id: Math.floor(Math.random() * (99999 - 99)) + 99, label: category, qtyProducts: 0 } ]);
        addCategory(category);
    }
    
    const handleClick = chip => {
        setOpenUploadImage(!openUploadImage);
        const updateDataChip = [...chipsCat].filter( item => item.id===Number(chip))[0];
        setDataChip( { ...updateDataChip, title: "Tên danh mục"}); 
    }

    const getDataImage = dataCat => {
        // Tat ca thong tin de cat nhat danh muc nam trong : dataCat
        const updateChipCats = [ ...chipsCat ].map( chip => chip.id===dataCat.id ? dataCat : chip);
        setChipsCat( updateChipCats );
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
                                <InputNotBorder callBack={ handleAddCategory } placeholder="Thêm danh mục" icon={ <CategoryOutlinedIcon /> } fullWidth autoFocus />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentCategorys}>
                                {chipsCat.map( chip => (
                                    <li key={ chip.key }>
                                        <Chip
                                            label={chip.label + ` (${chip.qtyProducts})`}
                                            onDelete={ chip.id===1 ? undefined : handleDelete( chip.id ) }
                                            className={classes.chip}
                                            variant="outlined"
                                            onClick={ event => handleClick(chip.id) }
                                            avatar={
                                                <Avatar
                                                className={classes.avatar}
                                                src={ chip.avatar }
                                                >
                                                {getInitials( chip.label )}
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
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ getDataImage} titleName="Cập nhật ảnh danh mục" dataName={dataChip} />
        </React.Fragment>
    );
};

Categorys.propTypes = {
    categorys: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        categorys: state.dataCategoryTag.categorys,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCategory: name => {
            dispatch({
                type: "ADD_NEW_CAT",
                name: name,
            })
        },
        deleteCategory: id => {
            dispatch({
                type: "DELETE_CAT",
                idCat: id,
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorys)