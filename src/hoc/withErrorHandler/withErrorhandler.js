import React,{ Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi'

const withErrorHandler = (WrappedCommponent, axios ) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount (){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error:null
                
                });
                return req;
            })
             this.reqInterceptor = axios.interceptors.response.use(res => res, err =>{
                this.setState({
                    error: err
                })

            })
        }
        //this lifecycle method will execute at the time a component NOT NEEDED
        componentWillUnmount(){
            console.log("WILL unmount");
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
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