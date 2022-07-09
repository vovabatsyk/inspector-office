import { Image, Row, Skeleton, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { URL } from '../constants/url'
import { IViolation } from '../models/IViolation'
import { IViolationAdmin } from '../models/IViolationAdmin'
import {
  useGetViolationAdminQuery,
  useGetViolationImagesUnipQuery,
  useGetViolationPaymentUnipQuery,
  useGetViolationQuery,
} from '../services/ViolationApi'
import { useGetViolationImagesQuery } from '../services/ViolationImagesApi'
import { SIZES } from '../theme'

const { Text } = Typography
const ViolationDetail = () => {
  const { id } = useParams()
  const { data } = useGetViolationQuery(id!)
  const [unipId, setUnipId] = useState(0)
  const [violation, setViolation] = useState<IViolation>({
    id: '',
    date: '',
    violation_number: '',
    address: '',
    car_mark: '',
    car_model: '',
    car_number: '',
    userId: 0,
    violationAdminId: 0,
    unip_id: 0,
  })
  const [violationAdmin, setViolationAdmin] = useState<IViolationAdmin>()
  const { data: images, isLoading } = useGetViolationImagesQuery(id!)
  const { data: unipImages, isLoading: isLoadingUnipImages } =
    useGetViolationImagesUnipQuery(unipId)
  const { data: unipPayment } = useGetViolationPaymentUnipQuery(unipId)
  const { data: violAdmins } = useGetViolationAdminQuery(200)

  useEffect(() => {
    try {
      if (data) {
        setViolation(data)
        setUnipId(data.unip_id!)
      }
      if (violAdmins) {
        const viol = violAdmins.find((v) => v.id === data?.violationAdminId)
        setViolationAdmin(viol)
      }
    } catch (e) {
      console.error(e)
    }
  }, [data, violAdmins])

  return (
    <PageContainer title={`Порушення №${violation.violation_number}`}>
      <>
        <Space direction='vertical'>
          <Text type='secondary'>
            {' '}
            {violation.unip_id}
            Номер повідомлення/постанови: <Text>ЛВ {violation.violation_number}</Text>
          </Text>
          <Text type='secondary'>
            КУпАП: <Text>{violationAdmin?.name}</Text>
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
          {unipPayment && (
            <>
              <Text type='secondary'>
                До оплати: <Text>{unipPayment.FineAmount} грн.</Text>
              </Text>
              <Text type='secondary'>
                Статус: <Text>{unipPayment.PaymentState}</Text>
              </Text>
              <Text type='secondary'>
                Оплачено:{' '}
                <Text>{unipPayment.PayedAmount === null ? '0' : unipPayment.PayedAmount} грн.</Text>
              </Text>
            </>
          )}
        </Space>
        <Row justify='space-around' align='middle'>
          {isLoading || (isLoadingUnipImages && <Skeleton active />)}
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
            {unipImages &&
              unipImages.map((photo, index) => (
                <Image
                  key={index}
                  width={250}
                  style={{ margin: SIZES.margin }}
                  src={`data:image/png;base64, ${photo.PreviewBase64}`}
                />
              ))}
          </Image.PreviewGroup>
        </Row>
      </>
    </PageContainer>
  )
}

export default ViolationDetail
