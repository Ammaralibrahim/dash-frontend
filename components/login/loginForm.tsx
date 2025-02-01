import { Button, Input, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '../styles/flex';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm: React.FC = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const router = useRouter();

   const handleLogin = async () => {
      try {
         const response = await axios.post('http://localhost:5000/login', {
            email,
            password
         });

         const { token } = response.data;

         // Token'ı localStorage veya sessionStorage'a kaydediyoruz
         localStorage.setItem('token', token);

         // Başarı mesajı
         toast.success('Login successful!', { autoClose: 3000 });

         // /admin-dashboard sayfasına yönlendiriyoruz
         router.push('/');
      } catch (error: any) {
         toast.error(error.response?.data?.message || 'Something went wrong', { autoClose: 3000 });
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
               Admin Panel Login
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

            <Button
               color="primary"
               onClick={handleLogin}
               css={{ width: '100%', padding: '15px 0', fontSize: '1.2rem' }}
            >
               Login to Admin Panel
            </Button>

            <Text css={{ textAlign: 'center', marginTop: '20px' }}>
               Forgot your password? <a href="/reset-password">Reset it here</a>
            </Text>
         </Flex>

         <ToastContainer />
      </div>
   );
};
