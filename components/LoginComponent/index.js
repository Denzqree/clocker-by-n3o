import Link from 'next/link';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { 
  Container,
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl, 
  FormLabel, 
  FormHelperText,
} from '@chakra-ui/react';

import { LogoComponent } from '../LogoComponent';

import firebase, { persistenceMode } from '../../config/firebase';


const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
});

export const LoginComponent = (props) => {

  const goToSignup = () => {
    props.setHomeChoice({login:false,signup:true})
  }

  const goToHome = (user) => {
     props.setHomeChoice({login:false,signup:false});
     props.setAuth({loading:true});
  }

  const onAuthSubmit = (values, form) => {
    signInOnSubmit(values, form);
    goToHome();
  }

  const signInOnSubmit = async (values, form) => {
      firebase.auth().setPersistence(persistenceMode);

      try{
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        console.log(user);
      }catch(err){
        console.log(err);
      }
  }

  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: (values, form) => onAuthSubmit(values, form),
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    }
  });
  return (
    <Container p={4} centerContent>

      <Link href="./"><a><LogoComponent /></a></Link>

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box p={4} width="100%" >
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
        </FormControl>
        
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
        </FormControl>
      </Box>

      <Box p={4}>
        <Button width="100%" onClick={handleSubmit} colorScheme="blue" isLoading={isSubmitting}>Entrar</Button>
      </Box>

      <a onClick={goToSignup}>Ainda não tem uma conta ? Cadastre-se.</a>
    </Container>
  )
};
