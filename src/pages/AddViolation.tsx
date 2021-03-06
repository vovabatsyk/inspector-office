import { Button, Form, Input, message, Upload, Select, DatePicker } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import {
  useAddViolationMutation,
  useGetViolationStoriesQuery,
  useGetViolationAdminQuery,
} from '../services/ViolationApi'
import { useAddViolationImagesMutation } from '../services/ViolationImagesApi'
import { useGetUsersQuery } from '../services/UserApi'
import { UploadOutlined } from '@ant-design/icons'
import { SIZES } from '../theme'
import { IViolation } from '../models/IViolation'
import locale from 'antd/es/date-picker/locale/uk_UA'
import moment from 'moment'
import 'moment/locale/uk'

const { Option } = Select

export const AddViolation = () => {
  const [addViolation] = useAddViolationMutation()
  const [addImages, { isLoading: isImagesLoading }] = useAddViolationImagesMutation()
  const { data: stories } = useGetViolationStoriesQuery(500)
  const { data: violationAdmins } = useGetViolationAdminQuery(500)
  const { data: users, isLoading } = useGetUsersQuery(500)
  const navigate = useNavigate()
  const [images, setImages] = useState<any>([])

  const onFinish = async (values: any) => {
    console.log(values)

    try {
      const violation: IViolation = await addViolation({
        ...values,
      }).unwrap()
      message.success('Додано успішно!')

      const formData = new FormData()
      images.forEach((image: any) => {
        formData.append('image', image)
      })
      formData.append('violationId', violation.id!)
      try {
        await addImages(formData).unwrap()
        navigate('/')
      } catch (error: any) {
        message.error(error.data.message as string)
      }
    } catch (e: any) {
      message.error(e.data.message as string)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <PageContainer title='Створити порушення'>
      <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='Імя інспектора' name='userId'>
          <Select style={{ width: '100%' }} loading={isLoading}>
            {users &&
              users.map((user: any, idx) => (
                <Option key={idx} value={user.id}>
                  {user.username}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label='Номер постанови' name='violation_number'>
          <Input />
        </Form.Item>

        <Form.Item label='Модель авто' name='car_model'>
          <Input />
        </Form.Item>

        <Form.Item label='Марка авто' name='car_mark'>
          <Input />
        </Form.Item>

        <Form.Item label='ДНЗ авто' name='car_number'>
          <Input />
        </Form.Item>

        <Form.Item label='Дата і час' name='date'>
          <DatePicker style={{ width: '100%' }} showTime locale={locale} />
        </Form.Item>

        <Form.Item label='Адреса' name='address'>
          <Input />
        </Form.Item>

        <Form.Item label='Фабула' name='violationStoryId'>
          <Select style={{ width: '100%' }}>
            {stories &&
              stories.map((story, idx) => (
                <Option key={idx} value={story.id}>
                  {story.title}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label='КУпАП' name='violationAdminId'>
          <Select style={{ width: '100%' }}>
            {violationAdmins &&
              violationAdmins.map((viol, idx) => (
                <Option key={idx} value={viol.id}>
                  {viol.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Upload name='logo' beforeUpload={(f) => setImages([...images, f])} action='' accept='.jpg'>
          <Button style={{ marginBottom: SIZES.margin }} icon={<UploadOutlined />}>
            Загрузити картинку
          </Button>
        </Upload>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isImagesLoading}>
            Зберегти
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  )
}
