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
  Typography,
  CircularProgress
} from '@material-ui/core';
import { SelectAddress } from 'components';
import { GetProvinces, GetDistricts, GetCommunes, UpdateMyProfile } from 'redux/actions';

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
  displayName: {
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

    getProvinces,
    getDistricts,
    getCommunes,
    provinces,
    provincesLoading,
    districts,
    districtsLoading,
    communes,
    communesLoading,
    streetLoading,

    updateMyProfile,
    profileExtend,

    loadingButton,
    ...rest 
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [formOptions, setFormOptions] = useState({
    province: profileExtend.address.province,
    district: profileExtend.address.district,
    commune: profileExtend.address.commune,
    street: profileExtend.address.street
  });


  useEffect( () => {
    getProvinces();
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
    getDistricts(val.code);
    setFormOptions( formOptions => ({...formOptions, province: val.name_with_type, district: "-", commune: "-", street: "-"}));
  }
  
  const getDistrict = val => {
    getCommunes(val.code);
    setFormOptions( formOptions => ({...formOptions, district: val.name_with_type, commune: "-", street: "-"}));
  }
  
  const getCommune = val => {
    setFormOptions( formOptions => ({...formOptions, commune: val.name_with_type, street: "-"}));
  }

  const handleStreet = event => {
    event.persist();
    setFormOptions( formOptions => ({...formOptions, street: event.target.value}));
    };

  const handleSubmit = event => {
    event.preventDefault();
    const newProfile = {...formState.values, address: {...formOptions}};
    updateMyProfile( newProfile );
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
                name="displayName"
                required
                variant="outlined"
                defaultValue={ profileExtend.displayName }
                onChange={handleChange}
                error={hasError('displayName')}
                helperText={
                    hasError('displayName') ? formState.errors.displayName[0] : null
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
                defaultValue={ profileExtend.email }
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
                defaultValue={ profileExtend.phoneNumber ? profileExtend.phoneNumber.replace("+84", "0") : '' }
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
              <SelectAddress list={ provinces } fullWidth={true} disable={provincesLoading} margin="dense" action={ getProvince } label="Tỉnh/thành phố" />
              &nbsp;
              <SelectAddress list={districts} fullWidth={true} disable={districtsLoading} margin="dense" action={ getDistrict } label="Quận/huyện" />
              &nbsp;
              <SelectAddress list={communes} fullWidth={true} disable={communesLoading} margin="dense" action={ getCommune } label="Phường/xã" />
              &nbsp;
              <TextField
                fullWidth
                label="Số nhà/đường/thôn/xóm"
                margin="dense"
                name="street"
                variant="outlined"
                defaultValue={ profileExtend.address.street }
                disabled={streetLoading}
                onChange={ handleStreet }
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="caption" color="textSecondary">
                  Địa chỉ: { formOptions.street||profileExtend.address.street } { formOptions.commune||profileExtend.address.commune } { formOptions.district||profileExtend.address.district } { formOptions.province||profileExtend.address.province }
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
            disabled={!formState.isValid||loadingButton}
          >
            {loadingButton && <CircularProgress size={15} />} Cập nhật
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  profileExtend: PropTypes.object.isRequired,

  provinces: PropTypes.array.isRequired,
  provincesLoading: PropTypes.bool.isRequired,
  districts: PropTypes.array.isRequired,
  districtsLoading: PropTypes.bool.isRequired,
  communes: PropTypes.array.isRequired,
  communesLoading: PropTypes.bool.isRequired,
  streetLoading: PropTypes.bool.isRequired,

  getProvinces: PropTypes.func.isRequired,
  getDistricts: PropTypes.func.isRequired,
  getCommunes: PropTypes.func.isRequired,
  updateMyProfile: PropTypes.func.isRequired,

  loadingButton: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    provinces: state.dataAddress.provinces,
    provincesLoading: state.dataAddress.provincesLoading,
    districts: state.dataAddress.districts,
    districtsLoading: state.dataAddress.districtsLoading,
    communes: state.dataAddress.communes,
    communesLoading: state.dataAddress.communesLoading,
    streetLoading: state.dataAddress.streetLoading,

    loadingButton: state.dataMyProfile.loadingButton
});

const mapDispatchToProps = dispatch => ({
  getProvinces: () => dispatch( GetProvinces() ),
  getDistricts: code => dispatch( GetDistricts(code) ),
  getCommunes: code => dispatch( GetCommunes(code) ),
  updateMyProfile: profile => dispatch( UpdateMyProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
