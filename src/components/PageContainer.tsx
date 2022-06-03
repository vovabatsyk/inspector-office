import React, { FC } from 'react'
import { Layout, PageHeader, Row, Card } from 'antd'
import { SIZES } from '../theme'

type Props = {
  title: string
  children: JSX.Element
}

export const PageContainer: FC<Props> = ({ title, children }) => {
  return (
    <Layout>
      <PageHeader ghost={false} onBack={() => window.history.back()} title='Назад'></PageHeader>
      <Layout.Content style={{ padding: SIZES.padding }} className='h100'>
        <Row justify='center' align='middle'>
          <Card title={title} style={{ width: '90%' }}>
            {children}
          </Card>
        </Row>
      </Layout.Content>
    </Layout>
  )
}
