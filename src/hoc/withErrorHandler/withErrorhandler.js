import React,{ Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi'


//Making a global error handler
//to get information from component, use axios
//turn withErrorHandler to class based component to use lifecycle
const withErrorHandler = (WrappedCommponent, axios ) => {
    return class extends Component{
        state = {
            error: null
        }
        //
        componentWillMount (){
            // whenever I sent a request,I want the error disappear 
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
             this.resInterceptor = axios.interceptors.response.use(res => res, err =>{
                this.setState({
                    error: err
                })

            })
        }
        //this lifecycle method will execute at the time a component NOT NEEDED
        //
        componentWillUnmount(){
            console.log("WILL unmount");
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render (){
            return (
                <Auxi>
                <Modal
                   modalClosed={this.errorConfirmedHandler} 
                    show={this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedCommponent {...this.props} />
            </Auxi>
            )
        }
    }
    
}

export default withErrorHandler;