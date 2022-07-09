import { Button, PageHeader, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableViolations } from '../components/Table'
import { IViolation } from '../models/IViolation'
import { routes } from '../routes'
import { useGetViolationsQuery } from '../services/ViolationApi'
import { FolderAddOutlined } from '@ant-design/icons'

import { COLORS } from '../theme'

export const HomePage = () => {
  const { data: violationsData, isLoading } = useGetViolationsQuery(500)
  const navigate = useNavigate()
  const [violations, setViolations] = useState<IViolation[]>([])

  useEffect(() => {
    if (violationsData) {
      const ubm = violationsData.filter((v) => v.unip_id === null)
      setViolations(ubm)
    }
  }, [violationsData])

  return (
    <>
      <PageHeader className='site-page-header' title='Управління безпеки' />
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
      <TableViolations violations={violations} />
    </>
  )
}
