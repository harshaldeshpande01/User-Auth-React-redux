import React, { Component } from 'react'
import {Typography} from '@material-ui/core';

class DragAndDrop extends Component {
    dropRef = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            drag: false
        }
      }

      componentDidMount() {
        const div = this.dropRef.current
        this.dragCounter = 0
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
      }

      componentWillUnmount() {
        const div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
      }
  
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter+=1
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        this.setState({drag: true})
        }
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter-=1
        if (this.dragCounter === 0) {
        this.setState({drag: false})
        }
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.handleDrop(e.dataTransfer.files)
        e.dataTransfer.clearData()
        this.dragCounter = 0    
        }
    }
  
  render() {
    const {drag} = this.state
    const {children} = this.props
    return (
      <div
        style={{display: 'inline-block', position: 'relative'}}
        ref={this.dropRef}
      >
        {drag ?
          <div 
            style={{
              // border: 'dashed grey 1px',
              // borderRadius: '10px',
              backgroundColor: '#eaf1f8',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
              }}
            >
              <Typography variant="h5" align="center">Drop to upload your files</Typography>
            </div>
          </div>
        :
        <></>
        }
        {children}
      </div>
    )
  }
}
export default DragAndDrop