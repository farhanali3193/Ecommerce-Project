import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart,}) => {
    const [ userCredentials, setUserCredentials ] = useState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
    })    
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert(`Passwords don't match`);
            return;
        }
        signUpStart(email,password, displayName);

        // try{
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);
        //     await createUserProfileDocument(user, { displayName }); //createUserProfileDoc takes in additional data as the second arg in the form of an obj.
        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })
        // } catch(error){
        //     console.log('ERROR',error);
        // }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials({...userCredentials, [name]: value })
    }

    return(
        <div className='sign-up'>
            <h2 className='title'> I do not have an account </h2>
            <span> Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type='text' 
                    name = 'displayName'
                    value={displayName}
                    handleChange = {handleChange}
                    label='Display Name'
                    required
                />

                <FormInput 
                    type='email' 
                    name = 'email'
                    value={email}
                    handleChange = {handleChange}
                    label='Email'
                    required
                />
                <FormInput 
                    type='password' 
                    name = 'password'
                    value={password}
                    handleChange = {handleChange}
                    label='Password'
                    required
                />
                <FormInput 
                    type='password' 
                    name = 'confirmPassword'
                    value={confirmPassword}
                    handleChange = {handleChange}
                    label='Confirm Password'
                    required
                />

                <CustomButton 
                    type='submit'
                > 
                    SIGN UP 
                </CustomButton>
            </form>
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart({email, password, displayName}))
})

export default connect(null, mapDispatchToProps)(SignUp);
