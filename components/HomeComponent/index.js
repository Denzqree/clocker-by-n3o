import { useEffect, useState } from "react";

import { AgendaComponent, LoginComponent, LogoComponent, SignUpComponent } from "../";

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

    const [homeChoice, setHomeChoice] = useState({
        login:props.login || false,
        signup:props.signup || false
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
        const onLogin = firebase.auth().onAuthStateChanged(user => {
            console.log('user state changed');
                setAuth({
                    loading: false,
                    user: user
                });
        });

        return () => onLogin();
    }, []);

    console.log('--------------render------------------');
    console.log(auth);
    console.log(homeChoice);
    console.log('------------------------------------');

    if(auth.loading) {
        console.log('------------------------------------');
        console.log('Loading..');
        console.log(auth);
        console.log(homeChoice);
        console.log('------------------------------------');
        return (
            <Container p={4} centerContent>
                <Spinner />
            </Container>
        )
    }


    if(homeChoice.login){
        return <LoginComponent setAuth={setAuth} setHomeChoice={setHomeChoice}/>;
    }

    if(homeChoice.signup){
        return <SignUpComponent setHomeChoice={setHomeChoice}/>;
    }
    
    return auth.user ? <AgendaComponent /> : <SignOptions setHomeChoice={setHomeChoice} />;
};
