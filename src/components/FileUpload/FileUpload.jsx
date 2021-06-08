import React, { Component } from "react";
// import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, ListItem} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 15,
//     borderRadius: 5,
//   },
//   colorPrimary: {
//     backgroundColor: "#EEEEEE",
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }))(LinearProgress);

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
    this.upload = this.upload.bind(this);
    this.cancel = this.cancel.bind(this);

    this.state = {
      selectedFiles: [],
      progress: 0,
      message: "",
      uploading: false,
      isError: false,
      uploaded: false
    };
  }

  selectFile(event) {
    const currentFile = event.target.files[0];
    const {size} = currentFile;
    if(size > 1048576) {
      this.setState({
        isError: true,
        message: 'Maximum file size allowed is 4MB'
      });
    }
    else{
      const {selectedFiles} = this.state;
      this.setState({
        selectedFiles: [...selectedFiles, currentFile] 
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  deleteFile(fileName) {
    const {selectedFiles} = this.state;
    selectedFiles.splice(selectedFiles.findIndex(a => a.name === fileName) , 1)
    this.setState({
	    selectedFiles 
    });
  }

  upload () {
    this.setState({
      uploading: true
    });

    setTimeout(() => 
      { 
        this.setState({
          uploading: false,
          selectedFiles: [],
          progress: 0,
          message: 'Uploaded files successfully'
        });
      }, 
    2000);
  }

  cancel() {
    this.setState({
	    selectedFiles: [],
      progress: 0,
      message: "",
      uploading: false,
      isError: false,
      uploaded: true
    });
  }

  // eslint-disable-next-line class-methods-use-this
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / (k ** i)).toFixed(dm))}  ${sizes[i]}`;
  }

  render() {

    const {
      selectedFiles,
      progress,
      message,
      uploading,
      isError,
      uploaded
    } = this.state;
    
    return (

      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >

        <div style={{display: 'flex', flexDirection:'column', width: "90vw", maxWidth: "600px", height: '150px', alignItems: 'center', justifyContent: 'center', border: '1px dashed gray', borderRadius: '5px'}}>
          <InsertDriveFileOutlinedIcon/>
          <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            component="span"
            color="primary"
          >
            Choose Your Files
          </Button>
        </label>
        </div>

        {uploading ? <LinearProgress style={{width: '100%', '& > * + *': {marginTop: '5px',},}}/> : null}

        {isError ? 
          <div style={{display: 'flex', width: "90vw", maxWidth: "600px", justifyContent: 'center', alignItems: 'center', marginTop: '0.5em'}}>
            <Alert severity="error">{message}</Alert>
            <IconButton onClick={() => this.setState({isError: false, message: ""})}>
              <ClearIcon/>
            </IconButton>
          </div> 
          : <></>
        }
        {(!isError && message) ? 
          <div style={{display: 'flex', width: "90vw", maxWidth: "600px", justifyContent: 'center', alignItems: 'center', marginTop: '0.5em'}}>
            <Alert severity="success">{message}</Alert>
            <IconButton onClick={() => this.setState({ message: ""})}>
              <ClearIcon/>
            </IconButton>
          </div> 
          : <></>
        }

        {/* {uploading && 
          <CircularProgress/>
            <Box className="mb25" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
              </Box>
            </Box>
        } */}

        <List>
        {selectedFiles &&
          selectedFiles.map((file) => (
            <ListItem key={file.name} button style={{width: "90vw", maxWidth: "600px"}}>
              <ListItemIcon>
                {uploading ? <CircularProgress size={20}/> : <InsertDriveFileOutlinedIcon/>}
              </ListItemIcon>
              <ListItemText primary={file.name} secondary={this.formatBytes(file.size)} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => this.deleteFile(file.name)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
        </List>

        <div style={{display: 'flex', width: "90vw", maxWidth: "600px", justifyContent: 'flex-end', marginTop: '1em'}}>
          <Button 
            variant="outlined" 
            color="secondary" 
            style={{marginRight: '4px'}}
            onClick={this.cancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!(selectedFiles.length>0) || uploading}
            onClick={this.upload}
          >
            Upload
          </Button>
        </div>

        </div>
      </div>

    );
  }
}
