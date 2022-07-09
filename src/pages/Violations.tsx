import { PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'

import { TableViolations } from '../components/Table'
import { IViolation } from '../models/IViolation'

import { useGetViolationsQuery } from '../services/ViolationApi'

export const Violations: React.FC = () => {
  const { data: violationsData } = useGetViolationsQuery(500)
  const [violations, setViolations] = useState<IViolation[]>([])

  useEffect(() => {
    if (violationsData) {
      const unip = violationsData.filter((v) => v.unip_id !== null)
      setViolations(unip)
    }
  }, [violationsData])

  return (
    <>
      <PageHeader className='site-page-header' title='UNIP' />
      <TableViolations violations={violations} />
    </>
  )
}
