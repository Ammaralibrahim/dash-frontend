import axios from 'axios';
import { Button, Input, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '../styles/flex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterForm: React.FC = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const router = useRouter();

   const handleRegister = async () => {
      if (password !== confirmPassword) {
         toast.error("Passwords do not match!", { autoClose: 2000 });
         return;
      }
   
      try {
         const response = await axios.post(
            'https://brightedu-c4379ad14cc3.herokuapp.com/register', 
            {
               email,
               password,
               confirmPassword
            },
            {
               headers: {
                  'Content-Type': 'application/json',  // Ensure Content-Type is set to 'application/json'
               },
               withCredentials: true, // Allow cookies or session info to be sent along with the request
            }
         );
   
         toast.success('Registration successful!', {
            autoClose: false,
         });
   
         // Clear the form after successful registration
         setEmail('');
         setPassword('');
         setConfirmPassword('');
   
         setTimeout(() => {
            router.push('/login');
         }, 3000);  // Wait for 3 seconds before redirecting
   
      } catch (error: any) {
         toast.error(`Error: ${error.response?.data?.message || 'Something went wrong'}`, { autoClose: 3000 });
      }
   };
   
   return (
      <div style={{ width: '100%' }}>
         <Flex
            direction="column"
            css={{
               gap: '$6',
               width: '100%',
               maxWidth: '1000px',
               padding: '40px',
               borderRadius: '16px',
               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
         >
            <Text h3 css={{ textAlign: 'center' }}>
               Admin Panel Registration
            </Text>

            <Input
               clearable
               fullWidth
               label="Admin Email"
               placeholder="Enter your admin email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <Input
               clearable
               fullWidth
               type="password"
               label="Password"
               placeholder="Enter your admin password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <Input
               clearable
               fullWidth
               type="password"
               label="Confirm Password"
               placeholder="Confirm your password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
               color="primary"
               onClick={handleRegister}
               css={{ width: '100%', padding: '15px 0', fontSize: '1.2rem' }}
            >
               Register to Admin Panel
            </Button>

            <Text css={{ textAlign: 'center', marginTop: '20px' }}>
               Already have an account? Login here
            </Text>
         </Flex>

         {/* ToastContainer for notifications */}
         <ToastContainer />
      </div>
   );
};
