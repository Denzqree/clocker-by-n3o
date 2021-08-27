import Link from 'next/link';

import { LogoComponent } from "../";

import { 
  Container, 
  Box, 
  Button, 
  Text, 
} from '@chakra-ui/react';

import firebase from '../../config/firebase'

export const AgendaComponent = () => {
    const logout = () => firebase.auth().signOut();
    return (
      <Container p={4} centerContent>

      <Link href="./"><a><LogoComponent /></a></Link>

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>


      <Box p={4,2} mt={8} width="100%">
        Agenda
      </Box>

      <Box p={4,2} width="100%">
        <Button onClick={logout}>Sair</Button>
      </Box>

      </Container>
    )
}