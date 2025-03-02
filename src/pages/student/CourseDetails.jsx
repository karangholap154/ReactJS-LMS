import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'

const CourseDetails = () => {

  const { id } = useParams()
  
  const [courseData, setCourseData] = useState(null)
  
  const { allCourses, calculateRating } = useContext(AppContext)
  
  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [])

  return courseData ? (
    <>
    <div className='relative flex flex-col-reverse items-start justify-between gap-10 px-8 pt-20 text-left md:flex-row md:px-36 md:pt-30'>

      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>
      
      <div className='z-10 max-w-xl text-gray-500'>
        <h1 className='font-semibold text-gray-800 md:text-course-details-heading-large text-course-details-heading-small'>{courseData.courseTitle}</h1>
        <p className='pt-4 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>
        <div className='flex items-center pt-3 pb-1 space-x-2 text-sm'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img className='w-3.5 h-3.5' key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />
            ))}
          </div>
            <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'})</p>
            <p>{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'Students' : 'Student'}</p>
          </div>
          <p className='text-sm'>Course By <span className='text-blue-600 underline'>Admin Sir</span></p>
      </div>
      
      <div></div>
      
      </div>
    </>
  ) : <Loading/>
}

export default CourseDetails