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
    <Dropdown placement="bottom-right" borderWeight={'extrabold'}>
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
      {/* <Dropdown.Menu
        onAction={(e) => {
          // Handle dropdown actions
        }}
        aria-label="Avatar Actions"
        css={{
          $$dropdownMenuWidth: '340px',
          $$dropdownItemHeight: '60px',
          '& .nextui-dropdown-item': {
            py: '$2',
            svg: { color: '$secondary', mr: '$4' },
            '& .nextui-dropdown-item-content': { w: '100%', fontWeight: '$semibold' },
          },
        }}
      >
        <Dropdown.Section title="Companies">
          <Dropdown.Item key="1" icon={<AcmeIcon />} description="San Francisco, CA">
            Facebook
          </Dropdown.Item>
          <Dropdown.Item key="2" icon={<AcmeLogo />} description="Austin, TX">
            Instagram
          </Dropdown.Item>
          <Dropdown.Item key="3" icon={<AcmeIcon />} description="Brooklyn, NY">
            Twitter
          </Dropdown.Item>
          <Dropdown.Item key="4" icon={<AcmeIcon />} description="Palo Alto, CA">
            Acme Co.
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu> */}
    </Dropdown>
  );
};
