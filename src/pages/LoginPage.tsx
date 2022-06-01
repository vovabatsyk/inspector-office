import { Layout, Row, Form, Input, Button, Card, message } from 'antd'
import React from 'react'
// import { useAppDispatch, useAppSelector } from '../hooks/redux'
// import { login } from '../store/reducers/ActionCreators'
import { useLoginMutation } from '../services/AuthApi'
import { useNavigate } from 'react-router-dom'
import { rules } from '../utils/rules'
// import { setUser } from '../store/reducers/AuthSlice'

export const LoginPage = () => {
  //   const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const token: any = await login({ email: values.email, password: values.password })
      if (token.data.token) {
        console.log('Success:', token.data.token.token)
        await localStorage.setItem('token', token.data.token.token)
      }
      navigate('../')
    } catch (error) {
      message.error('Не правельний email або пароль')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Layout>
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <>
          {/* {error && message.error(error)} */}

          <Card title='Управління безпеки'>
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                label='email'
                name='email'
                rules={[rules.required('Введіть email користувача!')]}
              >
                <Input />
              </Form.Item>

              <Form.Item label='Пароль' name='password' rules={[rules.required('Введіть пароль!')]}>
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Вхід
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      </Row>
    </Layout>
  )
}
