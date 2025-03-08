import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { redirect } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
  )

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, [])

  return (
    <div className='flex flex-col items-start justify-between h-screen p-4 pt-8 pb-0 overflow-scroll md:p-8 md:pb-0'>
      <form className='flex flex-col w-full max-w-md gap-3 text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle}
            type="text" placeholder='Type Here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required/>
        </div>
        <div className='flex flex-col'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>
        
        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice}
            type='number' placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
          </div>
          
          <div className='flex flex-col items-center gap-3 md:flex-row'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' />
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ''} alt="" />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount} type="number"
          placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
        </div>
        

        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='mb-4 bg-white border rounded-lg'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center'>
                  <img src={assets.dropdown_icon} alt="" width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} />
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img src={assets.cross_icon} className='cursor-pointer' alt="" />
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex items-center justify-between mb-2'>
                      <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>
                      <img src={assets.cross_icon} className='cursor-pointer' alt="" />
                    </div>
                  ))}
                  <div className='inline-flex p-2 mt-2 bg-gray-100 rounded cursor-pointer'>
                    + Add lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className='flex items-start justify-center p-2 bg-blue-100 rounded-lg cursor-pointer'>
            + Add Chapter
          </div>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div className='relative w-full p-4 text-gray-700 bg-white rounded max-w-80'>
                <h2 className='mb-4 text-lg font-semibold'>Add Lecture</h2>

                <div className='mb-2'>
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className='block w-full px-2 py-1 mt-1 border rounded'
                    value={lectureDetails.lectureTitle}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
                  />
                </div>

                <div className='mb-2'>
                  <p>Duration (in minutes)</p>
                  <input
                    type="number"
                    className='block w-full px-2 py-1 mt-1 border rounded'
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
                  />
                </div>

                <div className='mb-2'>
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className='block w-full px-2 py-1 mt-1 border rounded'
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
                  />
                </div>

                <div className='flex gap-2 my-4'>
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className='mt-1 scale-125'
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.value})}
                  />
                </div>

                <button type='button' className='w-full px-4 py-2 text-white bg-blue-400 rounded'>Add</button>

                <img onClick={() => setShowPopup(false)} src={assets.cross_icon} alt="" className='absolute w-4 cursor-pointer top-4' />
              </div>
            </div>
          )}
        </div>
        <button type='submit' className='text-white bg-black w-max py-2.5 px-8 rounded my-4'>ADD</button>
      </form>
    </div>
  )
}

export default AddCourse