import React,{Component} from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi/Auxi'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    //should component update make sure we are not updating unneccessary component
    //because the children of modal change, therefore to display spinner
    //we need to set nextProps.children is diff with this.props.children
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show ||
          nextProps.children !==this.props.children
        }
    componentWillUpdate () {
        console.log('[MODal] will update')
    }
    render(){
        return (
            <Auxi>
                <Backdrop 
                    clicked ={this.props.modalClosed}
                    show ={this.props.show} />
                <div   
                       className={classes.Modal}
                     style ={{
                     transform: this.props.show ? 'translateY(0)': 'translate(-100vh)',
                     opacity: this.props.show ? '1':'0' }} 
                   >
                          {this.props.children}
                </div>
            </Auxi>
           
        )
      
    }
}

export default Modal;