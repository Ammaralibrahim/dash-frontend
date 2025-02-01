import {Avatar, Dropdown, Navbar, Text} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {DarkModeSwitch} from './darkmodeswitch';
import axios from 'axios';

export const UserDropdown = () => {
   const [user, setUser] = useState<{ email: string } | null>(null);

   useEffect(() => {
     const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
 
     if (token) {
       // Kullanıcı bilgilerini almak için API'ye istek gönder
       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
           headers: { Authorization: `Bearer ${token}` }, // Token'ı header'a ekle
         })
         .then((response) => {
           setUser({ email: response.data.email }); // Kullanıcı verisini al
         })
         .catch((error) => {
           console.error('Error fetching user data:', error);
           localStorage.removeItem('token'); // Hata durumunda token'ı kaldır
         });
     }
   }, []);
   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({actionKey})}
         >
            <Dropdown.Item key="profile" css={{height: '$18'}}>
               <Text b color="inherit" css={{d: 'flex'}}>
                  Signed in as
               </Text>
               <Text b color="inherit" css={{d: 'flex'}}>
               {user ? (
            <Text css={{ mt: '$5' }}> {user.email}</Text> // Kullanıcıyı buraya ekleyin
          ) : (
            <Text css={{ mt: '$5' }}>Not logged in</Text> // Eğer kullanıcı girişi yapılmamışsa
          )}
               </Text>
            </Dropdown.Item>
            {/* <Dropdown.Item key="settings" withDivider>
               My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
               Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
               Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
               Log Out
            </Dropdown.Item>
            <Dropdown.Item key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item> */}
         </Dropdown.Menu>
      </Dropdown>
   );
};
