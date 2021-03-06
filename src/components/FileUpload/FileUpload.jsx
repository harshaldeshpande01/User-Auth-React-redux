import React, { Component } from "react";
import {Box, Button, ListItem, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
// import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import DragAndDrop from '../DragAndDrop/DragandDrop';


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
      message: "",
      uploading: false,
      isError: false,
    };
  }

  selectFile(files) {
    const {length} = files;
    let i;
    for(i=0; i<length; i+=1) {
      const currentFile = files[i];
      const {size} = currentFile;
      if(size > 10485760) {
        this.setState({
          isError: true,
          message: `${currentFile.name} exceeds maximum allowed file size (4MB)`
        });
        break;
      }
    }
    if(i === length){
      const {selectedFiles} = this.state;
      this.setState({
        selectedFiles: [...selectedFiles, ...files] 
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
          message: 'Uploaded files successfully'
        });
      }, 
    2000);
  }

  cancel() {
    this.setState({
	    selectedFiles: [],
      message: "",
      uploading: false,
      isError: false,
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
      message,
      uploading,
      isError,
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
      <Box 
        m={1} 
        border={1}
        borderColor="grey.400"
        borderRadius={10}
      >
        <DragAndDrop handleDrop={this.selectFile}>
        <div style={{display: 'flex', flexDirection:'column', width: "90vw", maxWidth: "1100px", height: '280px', alignItems: 'center', justifyContent: 'center'}}>
          <InsertDriveFileOutlinedIcon style={{color: 'BDBDBD'}}/>
          <Box mt={1} style={{maxWidth: '80vw'}}>
            <Typography variant="h5" align="center">
              Drag files here to add them to your bucket 
            </Typography>
          </Box> 
          <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            multiple
            onChange={(e) => this.selectFile(e.target.files)} />
          <Button
            className="btn-choose"
            component="span"
            color="primary"
            style={{backgroundColor: 'transparent', textTransform: 'none'}}
          >
            <Typography variant="body2">
              Or choose your files
            </Typography>
          </Button>
        </label>
        </div>
        </DragAndDrop>
      </Box>

        {uploading ? <LinearProgress style={{width: '90vw', maxWidth: '1100px', '& > * + *': {marginTop: '5px',},}}/> : null}

        {isError ? 
          <div style={{display: 'flex', width: "90vw", maxWidth: "1100px", justifyContent: 'center', alignItems: 'center', marginTop: '0.5em'}}>
            <Alert severity="error">{message}</Alert>
            <IconButton onClick={() => this.setState({isError: false, message: ""})}>
              <ClearIcon/>
            </IconButton>
          </div> 
          : <></>
        }
        {(!isError && message) ? 
          <div style={{display: 'flex', width: "90vw", maxWidth: "1100px", justifyContent: 'center', alignItems: 'center', marginTop: '0.5em'}}>
            <Alert severity="success">{message}</Alert>
            <IconButton onClick={() => this.setState({ message: ""})}>
              <ClearIcon/>
            </IconButton>
          </div> 
          : <></>
        }

        <List>
        {selectedFiles &&
          selectedFiles.map((file) => (
            <Box 
              border={1}
              borderColor="grey.400"
              borderRadius={10}
              key={file.name}
            >
            <ListItem button style={{width: "90vw", maxWidth: "1100px"}}>
              <ListItemIcon>
                {uploading ? <CircularProgress size={20}/> : <InsertDriveFileOutlinedIcon style={{color: 'BDBDBD'}}/>}
              </ListItemIcon>
              <ListItemText primary={file.name}/>
              {/* secondary={this.formatBytes(file.size) */}
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => this.deleteFile(file.name)}>
                  <ClearIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            </Box>
          )
        )}
        </List>

        <div style={{display: 'flex', width: "90vw", maxWidth: "1100px", justifyContent: 'flex-end', marginTop: '1em', marginBottom: '5em'}}>
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
            endIcon={<CloudUploadIcon />}
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
