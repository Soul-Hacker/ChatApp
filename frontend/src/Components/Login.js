import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'


const Login = () => {
  const toast = useToast();

  const[Show,setShow]=useState(false);

  const [email,setemail]=useState()
  const [password,setpassword]=useState()
  const [loading, setloading] = useState(false);

  const handleclick=()=>setShow(!Show)
const Submit=async(e)=>{
  {
    e.preventDefault();
   
    setloading(true);
    if ( !email || !password ) {
      toast({
        title: "Please fill all the details.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
 
     console.log( email, password);
 
       try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/user/Login",
        {
         
          email,
          password,
        
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("data");

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      window.location.href = "/ChatPage";

    }
    catch (err) {
      console.log(err);
      toast({
        title: "An error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }

  };
   

}
  return (
    <VStack spacing='5px' >
   
      <FormControl id='emaillogin' isRequired>
      <FormLabel>E-mail</FormLabel>
      <Input type='email' placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)}/>
      </FormControl> 
      <FormControl id='passwordlogin' isRequired>
      <FormLabel>password</FormLabel>
      <InputGroup>
      <Input type={Show?'text':'password'}  placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)}/>
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleclick}>
          {Show?"Hide":"Show"}
        </Button>
      </InputRightElement>
      </InputGroup>
      </FormControl> 
     
      <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={Submit} isLoading={loading}>
        Login
      </Button>
      <Button colorScheme='red' variant='solid' width='100%' onClick={()=>{
        setemail("guest@gmail.com"); setpassword("12345678");
      }}>
        Guest Login
      </Button>
      
     
    </VStack>
  )
}

export default Login