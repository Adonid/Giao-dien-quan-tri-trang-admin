import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import { Button, Card, CardContent, CircularProgress, Divider, Grid } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

const buttonStore = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#5850EC'
        },
    },
  });

const Content = props => {

    const { className, isLoading, updatedTerm, dataTerm, ...rest } = props;
    
    const [ contentTerm, setContentTerm ] = useState( '' );
    const [ loading, setLoading ] = useState( false );

    useEffect(() => {
        setLoading(false);
    }, [isLoading]);

    const handlePost = event => {
        event.preventDefault();
        /** API xu ly dang nhap o day */

        /** END */
        setLoading( true );

        updatedTerm(contentTerm);
    }
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <br/>
                <Card
                    {...rest}
                >
                    <Divider/>
                    <CardContent>
                        <Editor
                            apiKey="g6j5aqzhhcuqyw9tlkubpsl1x1hd0l0ze7exfz3id0xqxs97"
                            initialValue={ dataTerm }
                            init={{
                                height: 500,
                                menubar: true,
                                placeholder: "Điều khoản sử dụng...",
                                plugins: [
                                    "advlist autolink lists link charmap print anchor fullscreen preview ",
                                    "searchreplace  code fullscreen code codesample ",
                                    "insertdatetime table paste code help wordcount",
                                ],
                                toolbar:
                                    // eslint-disable-next-line no-multi-str
                                    "undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist | \
                                    outdent indent | \
                                    table link codesample | \
                                    fullscreen preview | \
                                    | help",
                                a11y_advanced_options: true,
                            }}
                            onEditorChange={ (content, editor) => { setContentTerm(content) } }
                        />
                    </CardContent>
                </Card>
            </Grid>
            &nbsp;
            <Grid item xs={12}>
                <ThemeProvider theme={buttonStore}>
                    <Button 
                        startIcon={<AssignmentTurnedInOutlinedIcon />}
                        variant="contained" 
                        color="primary"
                        onClick={ handlePost }
                        disabled={loading}
                    >
                        {loading && <CircularProgress size={24} />} Lưu lại
                    </Button>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
};

Content.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    updatedTerm: PropTypes.func.isRequired,
    dataTerm: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.dataTerm.isLoading,
        dataTerm: state.dataTerm.contentTerm,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatedTerm: data => {
            dispatch({
                type: "UPDATE_TERM",
                data: data,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)