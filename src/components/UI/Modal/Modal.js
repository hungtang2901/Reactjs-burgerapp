import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props) => {
    return (
        <Auxi>
            <Backdrop 
                clicked ={props.modalClosed}
                show ={props.show} />
            <div
                 style ={{
                 transform: props.show ? 'translateY(0)': 'translate(-100vh)',
                 opacity: props.show ? '1':'0' }} 
                 className={classes.Modal}>
                      {props.children}
            </div>
        </Auxi>
       
    )
  
}

export default modal;