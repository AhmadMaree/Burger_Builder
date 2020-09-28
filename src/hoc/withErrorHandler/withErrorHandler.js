import React, { Component } from 'react'
import Model from '../../components/UI/Modal/Modal';



const withErrorHandler = (WrappedComponent , axios) => {

    return class ErrorHandling extends Component {

        constructor(props) {
            super(props);
            this.state ={
                error: null,
            };
          this.reqInterceptor =  axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
              });

           this.resInterceptor = axios.interceptors.response.use((res)=> res , err =>{
                this.setState({
                    error : err
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        errorConfirmedHandler =() =>{
            this.setState({
                error : null
            })
        }
        render() {
            return (
                <React.Fragment>
                    <Model show={this.state.error} closeModal ={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                                           </Model>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }




}

export default withErrorHandler;