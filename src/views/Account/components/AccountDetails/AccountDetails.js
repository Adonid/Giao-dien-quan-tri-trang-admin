import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import validate from 'validate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { SelectAddress } from 'components';
import { AdminDetail, DistrictBelongToProvince, CommunesBelongToDistrict } from 'redux/actions';

const useStyles = makeStyles(() => ({
  root: {},
  skeletonDetail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skeletonText: {
    position: 'relative',
    width: '100%',
  }
}));

const schema = {
  userName: {
      presence: { allowEmpty: false, message: '^Tên người dùng không được trống!' },
      length: {
          minimum: 3,
          message: "^Tối thiểu 3 ký tự!",
        }
  },
  email: {
    presence: { allowEmpty: false, message: 'không để trống!' },
    email: {
      is: true,
      message: "không đúng!",
    },
    length: {
      maximum: 64,
      message: "tối đa 64 ký tự!",
    }
  },
  phoneNumber: {
      presence: { allowEmpty: false, message: '^Số điện thoại không để trống' },
      length: {
        is: 10,
        message: "^Số điện thoại phải đúng 10 số!"
      },
      format: {
        pattern: "^(086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|078|077|076|094|091|088|085|084|083|082|081|092|058|056).[0-9]+",
        flags: "i",
        message: "^Số điện thoại không đúng!"
      }
  }
};

const AccountDetails = props => {
  const { 
    className, 
    updateDetail, 
    mockDataRequire, 
    mockDataOptions, 
    loading, 
    getProfileDetail,
    districtsBelongToProvince,
    communesBelongToDistrict,
    profileDetail, 
    provinces, 
    districts,
    communes,
    enableProvince,
    enableDistrict,
    enableCommune,
    ...rest 
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {phoneNumber: mockDataRequire.phone , userName: mockDataRequire.userName , email: mockDataRequire.email },
    touched: {},
    errors: {}
  });

  const [formOptions, setFormOptions] = useState({
    province: profileDetail.address.province,
    district: profileDetail.address.district,
    commune: profileDetail.address.commune,
    street: profileDetail.address.street
  });

  const [ enableStreet, setEnableStreet ] = useState(false);

  useEffect( () => {
    getProfileDetail();
  },[]);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
  }

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  const getProvince = val => {
    setFormOptions( formOptions => ({...formOptions, province: val.name_with_type}));
    setEnableStreet(false);
    districtsBelongToProvince(val.code);
    setFormOptions( formOptions => ({...formOptions, district: ""}));
    setFormOptions( formOptions => ({...formOptions, commune: ""}));
  }
  
  const getDistrict = val => {
    setFormOptions( formOptions => ({...formOptions, district: val.name_with_type}));
    setEnableStreet(false);
    communesBelongToDistrict(val.code);
    setFormOptions( formOptions => ({...formOptions, commune: ""}));
  }
  
  const getCommune = val => {
    setFormOptions( formOptions => ({...formOptions, commune: val.name_with_type}));
    
    setEnableStreet(true);
  }

  const handleStreet = event => {
    event.persist();
    setFormOptions( formOptions => ({...formOptions, street: event.target.value}));
    };

  const handleSubmit = event => {
    event.preventDefault();
    const required = formState.values;
    const options = formOptions;
    const newProfile = {...formState.values, address: {...formOptions}}
    console.log(newProfile);
    props.updateDetail({required, options});
  }

  if(loading){
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          title={<Skeleton animation="wave" style={{ marginBottom: 5 }} width="20%" />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={5} >
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
              <Skeleton animation="wave" width="100%" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
              <Skeleton animation="wave" width="100%" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={ handleSubmit }
      >
        <CardHeader
          subheader="Thông tin cơ bản của người dùng"
          title="Hồ sơ"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Họ tên"
                margin="dense"
                name="userName"
                required
                variant="outlined"
                defaultValue={ profileDetail.userName }
                onChange={handleChange}
                error={hasError('userName')}
                helperText={
                    hasError('userName') ? formState.errors.userName[0] : null
                }
              />
              &nbsp;
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                required
                variant="outlined"
                defaultValue={ profileDetail.email }
                onChange={handleChange}
                error={hasError('email')}
                helperText={
                    hasError('email') ? formState.errors.email[0] : null
                }
              />
              &nbsp;
              <TextField
                fullWidth
                label="Số điện thoại"
                margin="dense"
                name="phoneNumber"
                type="number"
                required
                variant="outlined"
                defaultValue={ profileDetail.phoneNumber }
                onChange={handleChange}
                error={hasError('phoneNumber')}
                helperText={
                    hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null
                }
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAddress list={ provinces } fullWidth={true} disable={!enableProvince} margin="dense" action={ getProvince } label="Tỉnh/thành phố" />
              &nbsp;
              <SelectAddress list={districts} fullWidth={true} disable={!enableDistrict} margin="dense" action={ getDistrict } label="Quận/huyện" />
              &nbsp;
              <SelectAddress list={communes} fullWidth={true} disable={!enableCommune} margin="dense" action={ getCommune } label="Phường/xã" />
              &nbsp;
              <TextField
                fullWidth
                label="Số nhà/đường/thôn/xóm"
                margin="dense"
                name="street"
                variant="outlined"
                defaultValue={ profileDetail.address.street }
                disabled={!enableStreet}
                onChange={ handleStreet }
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="caption" color="textSecondary">
                  Địa chỉ: { formOptions.street??"." } { formOptions.commune??"." } { formOptions.district??"." } { formOptions.province??".." }
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!formState.isValid}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateDetail: PropTypes.func.isRequired,
  mockDataRequire: PropTypes.object.isRequired,
  mockDataOptions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getProfileDetail: PropTypes.func.isRequired,
  districtsBelongToProvince: PropTypes.func.isRequired,
  profileDetail: PropTypes.object.isRequired,
  provinces: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
  communes: PropTypes.array.isRequired,
  enableProvince: PropTypes.bool.isRequired,
  enableDistrict: PropTypes.bool.isRequired,
  enableCommune: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    mockDataRequire: state.dataUserEditor.dataUser.require,
    mockDataOptions: state.dataUserEditor.dataUser.options,
    loading: state.dataAdminProfile.loadingDetail,
    profileDetail: state.dataAdminProfile.profileDetail,
    provinces: state.dataAdminProfile.provinces,
    districts: state.dataAdminProfile.districts,
    communes: state.dataAdminProfile.communes,
    enableProvince: state.dataAdminProfile.enableProvince,
    enableDistrict: state.dataAdminProfile.enableDistrict,
    enableCommune: state.dataAdminProfile.enableCommune,
});

const mapDispatchToProps = dispatch => ({
  getProfileDetail: () => dispatch( AdminDetail() ),
  updateDetail: data => dispatch({type: "UPDATE_PROFILE",data: data}),
  districtsBelongToProvince: provinceCode => dispatch( DistrictBelongToProvince(provinceCode) ),
  communesBelongToDistrict: districtCode => dispatch( CommunesBelongToDistrict(districtCode) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
