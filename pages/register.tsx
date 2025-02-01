// pages/login.tsx
import React from 'react';
import {Register} from '../components/register/page';

const RegisterPage = () => {
   return <Register />;
};

RegisterPage.noLayout = true; // Layout'u devre dışı bırak

export default RegisterPage;
