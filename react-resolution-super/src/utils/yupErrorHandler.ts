import { FormikErrors } from 'formik'

export const yupErrorHandler = <T>(errors: FormikErrors<T>): string => {
  const firstErrorValues: string[] = Object.values(errors)
  return firstErrorValues.length > 0 ? firstErrorValues[0] : ''
}
