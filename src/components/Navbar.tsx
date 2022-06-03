import { Menu, MenuProps, Layout } from 'antd'
import { LogoutOutlined, PicLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes'

const menuItems: MenuProps['items'] = [
  {
    label: 'Порушення',
    key: 'home',
    icon: <PicLeftOutlined />,
  },
  {
    label: 'Вийти',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
]

export const NavBar = () => {
  const localToken = localStorage.getItem('token')

  const navigate = useNavigate()

  const onClickMenu: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case 'logout':
        localStorage.removeItem('token')
        navigate(routes.LOGIN_PAGE)
        break
      case 'home':
        navigate('/')
        break

      default:
        break
    }
  }

  return (
    <Layout.Header>
      {localToken && (
        <>
          <Menu
            theme='dark'
            mode='horizontal'
            selectable={false}
            items={menuItems}
            style={{ justifyContent: 'flex-end' }}
            onClick={onClickMenu}
          ></Menu>
        </>
      )}
    </Layout.Header>
  )
}
