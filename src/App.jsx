import { useState, useEffect } from 'react'
import { CircleUserRound } from 'lucide-react';
import './App.css'

function App() {
  
  async function fetchData(){
    try {
      // doesn't contain confidential data, but best practice is to use .env for this
      const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1ngtARJVgYGj-si3VtHCeYnj_XnYQIbxvdDjd-RXHpcA/values/RawData!A2:G2?key=AIzaSyBlp3hAo18x2KZfW8qYac2YqiyTEIYIxHI')
      const row = await res.json()
      return row.values
    } catch(e) {
      throw e;
    }
  }

  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
    .then(values => setData(values[0]))
  }, [])

  const [id_num, full_name, acc_num, college, reg_date, payment_status, yearbook_package] = data;

  return (
    <>
      <div className='sm:w-1/4 rounded overflow-hidden shadow-lg bg-green-600'>
        <span class="bg-green-300 text-green-900 inline-block text-center px-2 py-1 rounded text-md font-semibold mt-4">
          {payment_status}
        </span>
        <div className='flex justify-center mt-5'><CircleUserRound size={72} /></div>
        <div className='px-6 py-4'>
          <div className='text-white font-bold text-xl mb-4'>{full_name}</div>
          <div className='flex justify-center'>
            <p className='text-white text-base space-y-4 text-left'>
            <p>Account Number: {acc_num}</p>
            <p>ID Number: {id_num}</p>
            <p>College: {college}</p>
            <p>Yearbook Package: {yearbook_package}</p>
            <p>Registration date: {reg_date}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
