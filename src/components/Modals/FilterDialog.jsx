import React from 'react'
import ReactStars from 'react-stars';
import { Circle, CircleCheckBig } from 'lucide-react';
const ratingFilters = [
  { minValue: 2, starValue: 1 },
  { minValue: 4, starValue: 2 },
  { minValue: 6, starValue: 3 },
  { minValue: 8, starValue: 4 },

]

const FilterDialog = ({dialogRef, filterDialogOpen, setFilterDialogOpen, filterButtonRef, isTelevision, minRating, setMinRating}) => {
  return (
    <dialog
            ref={dialogRef}
            id="myDialog"
            className="fixed inset-0 z-50 w-screen h-screen bg-transparent flex items-center  border-none justify-center p-4 m-0 rounded-none "
            open={filterDialogOpen}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setFilterDialogOpen(false);
                filterButtonRef.current?.focus();
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4  border-8 border-neutral-500">
              <div className='flex flex-row  justify-between'>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Ratings</h3>
                <button 
                  onClick={() => setMinRating(0)} 
                  className={`hover:underline ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                >
                  Clear all
                </button>
              </div>

              <div>
                {ratingFilters.map((_r) =>
                  <div 
                    key={_r.minValue}
                    className={`flex flex-row items-center justify-between border border-black rounded-md p-2 mb-2 bg-neutral-100 cursor-pointer ${isTelevision ? 'focusable' : ''}`}
                    onClick={() => setMinRating(_r.minValue)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMinRating(_r.minValue);
                        e.preventDefault();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={minRating === _r.minValue}
                  >
                    <div className='flex flex-row'>
                      <ReactStars key={_r.minValue} value={_r.starValue} edit={false} size={24} />
                      <p style={{ fontSize: 24 }}>&nbsp;& Up</p>
                    </div>
                    {minRating == _r.minValue ? <CircleCheckBig size={24} className='mr-2' /> : <Circle size={24} className='mr-2' />}
                  </div>
                )}
              </div>






              <button
                className={`w-full px-4 py-2 bg-neutral-600 text-white rounded hover:bg-blue-700 ${isTelevision ? 'focusable' : ''}`}
                onClick={() => {
                  setFilterDialogOpen(false);
                  filterButtonRef.current?.focus();
                }}
                tabIndex={0}
              >
                Confirm
              </button>
            </div>
          </dialog>
  )
}

export default FilterDialog