import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Stack,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const [Show, setShow] = useState(false);
   let navigate = useNavigate();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirm, setconfirm] = useState();
  const [pic, setpic] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  // let history=useHistory()
  
  const handleclick = () => setShow(!Show);

  // This is the method for uploading the image to cloud

  const postDetails = (pic) => {
    setloading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an Image!!.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "dxopvvfln");
      fetch("https://api.cloudinary.com/v1_1/dxopvvfln/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Please select an Image!!.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
  };

  //  When we click on submit button it will post the data to mongodb

  const Submit = async (e) => {
   
    setloading(true);
    if (!name || !email || !password || !confirm) {
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
  else if (password !== confirm) {
      toast({
        title: "confirm password does not matches with the password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
     console.log(name, email, password, pic);
 
       try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/user/Create",
        {
          name,
          email,
          password,
          pic
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("data");

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      window.location.href = "/";

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
   

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={Show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {Show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>confirm password</FormLabel>
        <InputGroup>
          <Input
            type={Show ? "text" : "password"}
            placeholder="Enter your password again"
            onChange={(e) => setconfirm(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {Show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <Input
          type="file"
          p="1.5"
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={Submit}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default Signup;
