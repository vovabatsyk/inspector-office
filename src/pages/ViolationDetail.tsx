import { Image, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { IViolation } from '../models/IViolation'
import { useGetViolationQuery } from '../services/ViolationApi'
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
    photos: '',
    userId: 0,
  })

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
            {/* {violation.photos &&
            violation.photos.map((photo: string, index) => (*/}
            <Image
              width={250}
              style={{ margin: SIZES.margin }}
              src='https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200'
            />
            <Image
              width={250}
              style={{ margin: SIZES.margin }}
              src='https://www.bugatti.com/fileadmin/_processed_/9/5/csm_HEADER_22de7ed3a8.jpg'
            />
            <Image
              width={250}
              style={{ margin: SIZES.margin }}
              src='https://maserati.scene7.com/is/image/maserati/maserati/international/Models/my22/grecale/my22/modena/169/Maserati_Grecale_Modena_FULL_FRONT.jpg?$1920x2000$&fit=constrain'
            />

            {/* ))} */}
          </Image.PreviewGroup>
        </Row>
      </>
    </PageContainer>
  )
}

export default ViolationDetail
