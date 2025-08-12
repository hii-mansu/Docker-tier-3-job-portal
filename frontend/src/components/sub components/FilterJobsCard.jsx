import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const filterJobs = [
  {
    filterType:"Location",
    array:["Delhi", "Prayagraj", "Noida", "Raipur", "Bhopal", "Jaipur"]
  },
  {
    filterType:"Industry",
    array:["Frontend", "BAckend", "Fullstack", "Data Analyst"]
  },
  {
    filterType:"Salary",
    array:["0-2 LPA", "2-6 LPA", "6-15 LPA", "15-30 LPA", "30-50 LPA", "50 LPA <"]
  }
]
const FilterJobsCard = () => {
  return (
    <div>
      <h1 className='font-bold text-blue-600'>Filter Jobs</h1>
      <hr />
      <RadioGroup>
      {
        filterJobs.map((data, index)=>
        <div>
          <h1 className='font-semibold' key={index}>{data.filterType}</h1>
          {
            data.array.map((item, index)=>{
              return(
                <div className="flex items-center space-x-2 my-2" key={index}>
                             <RadioGroupItem value={item} />
                             <Label className='text-gray-600' >{item}</Label>
                          </div>
                   )
            }
            )
          }
        </div>)
      }
      </RadioGroup>
    </div>
  )
}

export default FilterJobsCard