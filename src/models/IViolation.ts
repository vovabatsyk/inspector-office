export interface IViolation {
  id: string
  violation_number: string
  date: string
  car_mark: string
  car_model: string
  car_number: string
  address: string
  userId: number
  violationStoryId?: string
  violationAdminId?: number
  unip_id?: number
}
