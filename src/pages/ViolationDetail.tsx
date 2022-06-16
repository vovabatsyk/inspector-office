import { Image, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { URL } from '../constants/url'
import { IViolation } from '../models/IViolation'
import { useGetViolationQuery } from '../services/ViolationApi'
import { useGetViolationImagesQuery } from '../services/ViolationImagesApi'
import { SIZES } from '../theme'

const { Text } = Typography
const ViolationDetail = () => {
  const { id } = useParams()
  const { data } = useGetViolationQuery(id!)
  const [violation, setViolation] = useState<IViolation>({
    date: '',
    violation_number: '',
    address: '',
    car_mark: '',
    car_model: '',
    car_number: '',
    userId: 0,
  })
  const { data: images, isLoading } = useGetViolationImagesQuery(id!)

  useEffect(() => {
    try {
      if (data) {
        setViolation(data)
      }
    } catch (e) {
      console.error(e)
    }
  }, [data])

  return (
    <PageContainer title={`Порушення №${violation.violation_number}`}>
      <>
        <Space direction='vertical'>
          <Text type='secondary'>
            Номер повідомлення/постанови: <Text>ЛВ {violation.violation_number}</Text>
          </Text>
          <Text type='secondary'>
            Дата порушення: <Text>{violation.date}</Text>
          </Text>
          <Text type='secondary'>
            Марка: <Text>{violation.car_mark}</Text>
          </Text>
          <Text type='secondary'>
            Модель: <Text>{violation.car_model}</Text>
          </Text>
          <Text type='secondary'>
            Номерний знак: <Text>{violation.car_number}</Text>
          </Text>
          <Text type='secondary'>
            Адреса: <Text>м. Львів, {violation.address}</Text>
          </Text>
        </Space>
        <Row justify='space-around' align='middle'>
          <Image.PreviewGroup>
            {images &&
              images.map((photo, index) => (
                <Image
                  key={index}
                  width={250}
                  style={{ margin: SIZES.margin }}
                  src={`${URL.DEFAULT}/${photo.image}`}
                />
              ))}
          </Image.PreviewGroup>
        </Row>
      </>
    </PageContainer>
  )
}

export default ViolationDetail
