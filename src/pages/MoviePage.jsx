import React from 'react'
import { films } from '../data/films'
import { useParams } from 'react-router-dom'

const MoviePage = () => {
  const { id } = useParams()
  console.log(id)
  const movie = films.find(m => m.id === parseInt(id))
  console.log(movie)
  return (
    <div className='min-h-screen bg-amber-50'>
      {/* Header Section with Movie Title */}
      <div className='bg-linear-to-b from-amber-100 to-amber-50 pb-12'>
        <div className='container mx-auto px-4 pt-8'>
          <h1 className='text-5xl font-bold text-amber-900 mb-2'>{movie.title}</h1>
          <div className='h-1 w-24 bg-linear-to-r from-amber-600 to-amber-400'></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12'>
        {/* Iframe Container with Glassmorphism */}
        <div className='mb-12'>
          <div className='relative w-full bg-white/30 backdrop-blur-md rounded-2xl p-1 shadow-2xl border border-white/40 overflow-hidden group hover:shadow-3xl transition-all duration-300'>
            <div className='relative w-full aspect-video bg-black/10 rounded-xl overflow-hidden'>
              <iframe 
                src={movie.trailerURL} 
                title={movie.title} 
                allowFullScreen
                className='w-full h-full'
              >
              </iframe>
            </div>
          </div>
        </div>

        {/* Description with Glassmorphism */}
        <div className='max-w-4xl'>
          <div className='bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50 hover:bg-white/50 transition-all duration-300'>
            <h2 className='text-2xl font-semibold text-amber-900 mb-4'>Synopsis</h2>
            <p className='text-lg leading-relaxed text-amber-900/80 font-light'>
              {movie.description}
            </p>
          </div>
         
        </div>

      
      </div>
    </div>
  )
}

export default MoviePage