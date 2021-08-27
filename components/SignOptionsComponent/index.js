import Link from 'next/link';
    
import { 
    Container, 
    Box, 
    Button, 
    Text, 
  } from '@chakra-ui/react';

  
import { LogoComponent } from '../LogoComponent';

export const SignOptionsComponent = () => {

    return (
            
        <Container p={4} centerContent>

        <LogoComponent />

        <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
        </Box>


        <Box p={4,2} mt={8} width="100%">
        <Link href="/login"><Button width="100%">Login</Button></Link>
        </Box>

        <Box p={4,2} width="100%">
        <Link href="/signup"><Button width="100%" colorScheme="green">Cadastrar-se</Button></Link>
        </Box>

        </Container>
    )

};