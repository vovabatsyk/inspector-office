import { SearchOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { InputRef, Popconfirm } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/lib/table'
import type { FilterConfirmProps } from 'antd/lib/table/interface'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useNavigate } from 'react-router-dom'
import { IViolation } from '../models/IViolation'
import { routes } from '../routes'
import { useGetUsersQuery } from '../services/UserApi'
import { useDeleteViolationMutation } from '../services/ViolationApi'
import { COLORS } from '../theme'

interface DataType {
  violation_number: string
  car_number: string
  date: string
  address: string
  id: string
  userId: number
}

type DataIndex = keyof DataType
type TablePaginationPosition = 'bottomCenter' | 'topCenter'

type TableProps = {
  violations: IViolation[]
}

export const TableViolations: React.FC<TableProps> = ({ violations }) => {
  const { data: usersData } = useGetUsersQuery(500)
  const [deleteViolation] = useDeleteViolationMutation()

  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const [top, setTop] = useState<TablePaginationPosition>('topCenter')
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter')

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const onDeleteViolation = async (id: any) => {
    try {
      await deleteViolation(id)
    } catch (e: any) {
      console.error(e)
    }
  }

  const findUser = (id: number) => {
    const user: any = usersData?.find((u: any) => u.id === id)
    if (user) {
      return user.username
    }
  }

  const getColumnRenderProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    render: (_: any, record) => (
      <p>
        {moment(record.date).format('DD.MM.YYYY') === 'Invalid date'
          ? record.date
          : moment(record.date).utcOffset('+3').format('DD.MM.YYYY HH:mm')}
      </p>
    ),
  })

  const getColumnActionProps = (): ColumnType<DataType> => ({
    render: (_: any, record) => (
      <Space size='middle'>
        <Button
          type='text'
          style={{ color: COLORS.secondary }}
          icon={<EyeOutlined />}
          key='show'
          onClick={() => navigate(`../${routes.VIOLATION_DETAIL}/${record.id}`)}
        />
        <Popconfirm
          title='Ви впевнені？'
          okText='Так'
          cancelText='Ні'
          placement='left'
          onConfirm={() => onDeleteViolation(record.id)}
        >
          <Button
            type='text'
            style={{ color: COLORS.danger }}
            icon={<DeleteOutlined />}
            key='delete'
          />
        </Popconfirm>
      </Space>
    ),
  })

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Пошук`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Пошук
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Очистити
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Повідомлення',
      dataIndex: 'violation_number',
      key: 'violation_number',
      ...getColumnSearchProps('violation_number'),
    },

    {
      title: 'Марка',
      dataIndex: 'car_mark',
      key: 'car_mark',
    },
    {
      title: 'Модель',
      dataIndex: 'car_model',
      key: 'car_model',
    },
    {
      title: 'ДНЗ',
      dataIndex: 'car_number',
      key: 'car_number',
      ...getColumnSearchProps('car_number'),
    },
    {
      title: 'Дата',
      key: 'date',
      ...getColumnRenderProps('date'),
    },
    {
      title: 'Адреса',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      width: '20%',
    },
    {
      key: 'userId',
      title: 'Інспектор',
      render: (item) => (item.userId === null ? 'Unip' : findUser(item.userId)),
      sorter: (a, b) => a.userId - b.userId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      ...getColumnActionProps(),
    },
  ]

  return (
    <Table
      rowKey={'id'}
      columns={columns}
      dataSource={violations}
      pagination={{ position: [top as TablePaginationPosition, bottom] }}
      scroll={{ y: '90vh', x: 1000 }}
    />
  )
}
