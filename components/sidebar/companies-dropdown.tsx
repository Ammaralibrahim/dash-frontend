import { Dropdown, Text } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { AcmeIcon } from '../icons/acme-icon';
import { AcmeLogo } from '../icons/acmelogo';
import { BottomIcon } from '../icons/sidebar/bottom-icon';
import axios from 'axios';

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: 'Acme Co.',
    location: 'Palo Alto, CA',
    logo: <AcmeIcon />,
  });
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
      <>
        <Box>
          <Flex align={'center'} css={{ gap: '$7' }}>
            {company.logo}
            <Box>
              <Text
                h3
                size={'$xl'}
                weight={'medium'}
                css={{ m: 0, color: '$accents9', lineHeight: '$lg', mb: '-$5' }}
              >
                {user ? (
                  <Text css={{ mt: '$5' }}>{user.email}</Text> // Kullanıcıyı buraya ekleyin
                ) : (
                  <Text css={{ mt: '$5' }}>Not logged in</Text> // Eğer kullanıcı girişi yapılmamışsa
                )}
              </Text>
              <Text
                span
                weight={'medium'}
                size={'$xs'}
                css={{ color: '$accents8' }}
              >
                {company.location}
              </Text>
            </Box>
            <BottomIcon />
          </Flex>
        </Box>
        {/* Burada birden fazla öğe de eklenebilir */}
      </>
    </Dropdown>
  );
  
};
