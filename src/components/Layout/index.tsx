import * as React from 'react';
import { Layout as AntdLayout, Typography } from 'antd';
import Meta from '@/components/Meta';
import { InboxOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Header, Content } = AntdLayout;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  textAlign: 'center',
  paddingTop: 16,
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '32px',
  backgroundColor: '#fff',
};

const typographyTitleStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Meta />
      <AntdLayout>
        <Header style={headerStyle}>
          <Typography.Title level={4} onClick={() => { router.push('/') }} style={typographyTitleStyle} data-testid="txtHeading">
            Pokémon Gotta Catch Em All!
          </Typography.Title>
        </Header>
        <Content style={contentStyle}>
          <Typography.Link onClick={() => { router.push('/my-pokemon') }} data-testid="txtMyPokemon">
            <InboxOutlined height={100} /> My Pokémon
          </Typography.Link>
        </Content>
        <Content style={{...contentStyle, height: 'calc(100vh - 96px)' }}>{children}</Content>
      </AntdLayout>
    </>
  );
};

export default Layout;
