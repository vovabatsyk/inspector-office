import { Button, Card, Divider, List, message, Popconfirm, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { IViolation } from '../models/IViolation'
import { useDeleteViolationMutation, useGetViolationsQuery } from '../services/ViolationApi'
import { DeleteOutlined, EditOutlined, FolderAddOutlined, EyeOutlined } from '@ant-design/icons'
import { COLORS } from '../theme'
import jwt from 'jwt-decode'
import { useGetUserQuery, useGetUsersQuery } from '../services/UserApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes'

export const HomePage = () => {
  const { data: violationsData, isLoading } = useGetViolationsQuery(500)
  const navigate = useNavigate()
  const [violations, setViolations] = useState<IViolation[]>([])
  const userToken = localStorage.getItem('token')
  const decodedToken: any = jwt(userToken!)
  const id = decodedToken.id
  const { data: userData } = useGetUserQuery(id!)
  const { data: usersData } = useGetUsersQuery(500)
  const [deleteViolation] = useDeleteViolationMutation()

  useEffect(() => {
    if (violationsData) {
      setViolations(violationsData)
    }
  }, [violationsData])

  useEffect(() => {
    if (userData) {
      console.log(userData)
    }
  }, [userData])

  const findUser = (id: number) => {
    const user: any = usersData?.find((u: any) => u.id === id)
    if (user) {
      return user.username
    }
  }

  const onDeleteViolation = async (id: any) => {
    try {
      await deleteViolation(id)
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <>
      <Divider orientation='left'>Усі порушення</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(routes.ADD_VIOLATION)}
        >
          Додати
        </Button>
      </Row>
      <Card style={{ margin: 20 }}>
        <List
          className='demo-loadmore-list'
          loading={isLoading}
          itemLayout='horizontal'
          dataSource={[...violations].reverse()}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EyeOutlined />}
                  key='show'
                  onClick={() => navigate(`${routes.VIOLATION_DETAIL}/${item.id}`)}
                />,
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EditOutlined />}
                  key='edit'
                  // onClick={() => navigate(`${routes.EDIT_NOTICE_PAGE}/${item.id}`)}
                />,

                <Popconfirm
                  title='Ви впевнені？'
                  okText='Так'
                  cancelText='Ні'
                  placement='left'
                  onConfirm={() => onDeleteViolation(item.id)}
                >
                  <Button
                    type='text'
                    style={{ color: COLORS.danger }}
                    icon={<DeleteOutlined />}
                    key='delete'
                  />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta title={`ЛВ${item.violation_number}`} description={item.car_number} />
              <p>{findUser(item.userId ? item.userId : 1)}</p>
            </List.Item>
          )}
        />
      </Card>
    </>
  )
}
