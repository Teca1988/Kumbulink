import { lazy, Suspense, useState, useRef, useEffect } from 'react'

import { Datepicker, type CustomFlowbiteTheme } from 'flowbite-react'
import validator from 'validator'

import { useRegisterStore } from '../../../contexts/RegisterStore'

import CalendarIcon from '/icons/calendar.svg'

import 'react-datepicker/dist/react-datepicker.css'
import '../style.css'

import countries from '../../../shared/countries.json'

const Flag = lazy(() => import('react-world-flags'))

const customTheme: CustomFlowbiteTheme['datepicker'] = {
  root: {
    base: 'relative',
    input: {
      base: 'w-full rounded-lg border border-gray-300 p-2 text-gray-600 placeholder:text-gray-400 !bg-white',
      field: {
        base: 'block w-full p-0 text-gray-600 !bg-white',
        input: {
          base: 'w-full border-0 p-0 focus:outline-none focus:ring-0 !bg-white !text-base !pl-2'
        }
      }
    }
  },
  popup: {
    footer: {
      button: {
        today: 'hidden',
        clear: 'hidden'
      }
    }
  }
}

const validatePassport = (passport: string, country: string) => {
  const countryCode = countries.find(c => c.name === country)?.passportLocale
  if (!countryCode) return false
  return validator.isPassportNumber(passport, countryCode)
}

export const Step2: React.FC = () => {
  const { currentStep, prevStep, nextStep } = useRegisterStore()
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDocument, setSelectedDocument] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDocumentValid, setIsDocumentValid] = useState<boolean>(false)
  const [isCountryListOpen, setIsCountryListOpen] = useState(false)
  const [fullName, setFullName] = useState<string>('')
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCountryInputClick = () => {
    setIsCountryListOpen(true)
    inputRef.current?.focus()
  }

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName)
    setSelectedDocument('')
    setIsCountryListOpen(false)
  }

  const handleDocumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDocument(event.target.value)
  }

  const handleDocumentNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDocumentValid(validatePassport(event.target.value, selectedCountry))
  }

  const selectedCountryData = countries.find(c => c.name === selectedCountry)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryListOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isFormValid = () => {
    const isNameValid = fullName.trim().length >= 3 && fullName.includes(' ')
    const isDateValid = selectedDate !== null && selectedDate < new Date()

    return isNameValid && isDateValid && isDocumentValid && termsAccepted
  }

  return (
    <div className='flex min-h-screen flex-col bg-white px-6'>
      <div className='flex items-center pt-4'>
        {currentStep > 1 && (
          <>
            <button className='mr-4' onClick={prevStep}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M15 18L9 12L15 6'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <span className='text-lg'>Cadastro</span>
          </>
        )}
      </div>

      <h1 className='text-2xl font-light mt-20 mb-8'>Insira seus dados</h1>

      <div className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Nome completo'
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
          />
        </div>

        <div className='relative'>
          <Datepicker
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            icon={() => false}
            rightIcon={() => (
              <img src={CalendarIcon} alt='Calendar' className='w-6 h-6' />
            )}
            theme={customTheme}
            placeholder='Data de nascimento'
            language='pt-BR'
          />
        </div>

        <div className='relative flex items-center'>
          {selectedCountry && (
            <div className='absolute left-4 z-10 flex items-center pointer-events-none'>
              <Suspense fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}>
                <Flag
                  code={selectedCountryData?.iso}
                  height={20}
                  width={30}
                  className='mr-2'
                />
              </Suspense>
            </div>
          )}
          <input
            ref={inputRef}
            type='text'
            value={selectedCountry}
            onClick={handleCountryInputClick}
            readOnly
            placeholder='Selecione o país'
            className={`w-full rounded-lg border border-gray-300 p-4 text-gray-600 appearance-none bg-white cursor-pointer ${
              selectedCountry ? 'pl-16' : 'pl-4'
            }`}
          />
          <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
            ▼
          </span>

          {isCountryListOpen && (
            <div
              ref={dropdownRef}
              className='absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg'
            >
              {countries.map(country => (
                <button
                  key={country.name}
                  onClick={() => handleCountrySelect(country.name)}
                  className='flex w-full items-center p-4 hover:bg-gray-100'
                >
                  <Suspense
                    fallback={<div className='w-6 h-4 mr-2 bg-gray-200' />}
                  >
                    <Flag
                      code={country.iso}
                      height={20}
                      width={30}
                      className='mr-2'
                    />
                  </Suspense>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedCountry && (
          <div className='relative'>
            <select
              value={selectedDocument}
              onChange={handleDocumentChange}
              className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 appearance-none bg-white'
            >
              <option value='' disabled>
                Selecione o tipo de documento
              </option>
              {countries
                .find(c => c.name === selectedCountry)
                ?.documents.map(doc => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
            </select>
            <span className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
              ▼
            </span>
          </div>
        )}

        {!selectedDocument && (
          <p className='text-sm text-gray-500'>
            Selecione o país e tipo de documento
          </p>
        )}

        {selectedDocument && (
          <div>
            <input
              type='text'
              placeholder='Número do passaporte'
              className='w-full rounded-lg border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400'
              onChange={handleDocumentNumberChange}
            />
          </div>
        )}

        {/* Terms checkbox */}
        <label className='mt-4 flex items-start'>
          <input
            type='checkbox'
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
            className='mt-1 mr-2 accent-primary-orange'
          />
          <span className='text-sm text-gray-600'>
            Li e concordo com os termos da{' '}
            <a href='#' className='text-primary-orange'>
              termos da política de privacidade
            </a>
          </span>
        </label>

        {/* Continue button */}
        <button
          type='submit'
          className={`mt-20 w-full rounded-lg py-4 text-white ${
            isFormValid()
              ? 'bg-primary-green'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={nextStep}
          disabled={!isFormValid()}
        >
          Seguir para validação
        </button>
      </div>

      {/* Progress bar */}
      <div className='mt-6 h-1 w-1/3 bg-primary-orange' />
    </div>
  )
}

export default Step2
