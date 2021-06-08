import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Container, Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: [],
      progress: 0,
      message: "",
      uploading: false,
      isError: false,
    };
  }

  selectFile(event) {
    const {selectedFiles} = this.state;
    this.setState({
	    selectedFiles: [...selectedFiles, event.target.files[0]] 
    });
  }

  deleteFile(fileName) {
    const {selectedFiles} = this.state;
    const index = selectedFiles.findIndex((o) => {
        return o.name === fileName;
    })
    if (index !== -1) selectedFiles.splice(index, 1);
    this.setState({
	    selectedFiles 
    });
  }

  upload() {
    this.setState({
      uploading: true,
      progress: 50
    });

    setTimeout(() => 
      { 
        this.setState({
          uploading: false,
          selectedFiles: undefined,
          progress: 100,
          message: 'Uploaded files successfully'
        });
      }, 
    3000);
  }

  render() {

    const {
      selectedFiles,
      progress,
      message,
      uploading,
      isError
    } = this.state;
    
    return (

      <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >

        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em'}}>Upload files</span>
        </Typography>

        {isError ? <Alert severity="error">{isError}</Alert> : <></>}
        {message ? <Alert severity="success">{message}</Alert> : <></>}

          <Grid container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid item xs={12}>
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={this.selectFile} />
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  Choose Files
                </Button>
              </label>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={uploading}
                onClick={this.upload}
              >
                Upload
              </Button>
            </Grid>

            <Grid item xs={12}>
              <List>
                {selectedFiles &&
                  selectedFiles.map((file) => (
                    <ListItem
                      key={file.name}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText primary={file.name}/>

                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>

                    </ListItem>
                  ))}

              </List>
              </Grid>
          </Grid>
      </div>
    </Container>

      //       {uploading ? (
      //         <Box className="mb25" display="flex" alignItems="center">
      //           <Box width="100%" mr={1}>
      //             <BorderLinearProgress variant="determinate" value={progress} />
      //           </Box>
      //           <Box minWidth={35}>
      //             <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
      //           </Box>
      //         </Box>)

    );
  }
}
