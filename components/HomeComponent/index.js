import { useEffect, useState } from "react";

import { AgendaComponent, LoginComponent, LogoComponent, SignUpComponent } from "../";

import Link from 'next/link';

import { 
    Container, 
    Spinner,
    Box, 
    Button, 
    Text, 
  } from '@chakra-ui/react';

import firebase from '../../config/firebase';

export const HomeComponent = (props) => {

    const [auth, setAuth] = useState({
        loading: true,
        user: false
    });

    const [HomeChoice, setHomeChoice] = useState({
        login:false,
        signup:false
    });
    
    const SignOptions = () => {

        return (
        
            <Container p={4} centerContent>
        
                <a href="/"><LogoComponent /></a>
        
                <Box p={4} mt={8}>
                <Text>Crie sua agenda compartilhada</Text>
                </Box>
        
        
                <Box p={4,2} mt={8} width="100%">
                <Button width="100%" onClick={() => setHomeChoice({login:true,signup:false})}>Login</Button>
                </Box>
        
                <Box p={4,2} width="100%">
                <Button width="100%" onClick={() => setHomeChoice({login:false,signup:true})} colorScheme="green">Cadastrar-se</Button>
                </Box>
        
            </Container>

        )
            
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setAuth({
                loading: false,
                user
            })
        });
    }, []);

    if(auth.loading) {
        return (
            <Container p={4} centerContent>
                <Spinner />
            </Container>
        )
    }


    if(HomeChoice.login){
        return <LoginComponent setHomeChoice={setHomeChoice}/>;
    }

    if(HomeChoice.signup){
        return <SignUpComponent setHomeChoice={setHomeChoice}/>;
    }

    if(HomeChoice.login || props.login) {
        return <LoginComponent setHomeChoice={setHomeChoice}/>;
    }

    if(HomeChoice.signup || props.signup){
        return <SignUpComponent setHomeChoice={setHomeChoice}/>;
    }

    // const authenticatedUser = firebase.auth().currentUser;
    if(!HomeChoice.login && !HomeChoice.signup){
        return auth.user ? <AgendaComponent /> : <SignOptions />;
    }
};
