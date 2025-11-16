
import { useRef }  from 'react'


const AddMovieDialog = ({ formDialogRef, showForm, setShowForm, menuButtonRef, isTelevision, newMovie, handleNewMovieChange, handleAddMovie }) => {
 const firstFormInputRef = useRef(null);

    return (
        <dialog
            ref={formDialogRef}
            className="fixed inset-0 z-50 w-screen h-screen bg-transparent flex items-center  border-none justify-center p-4 m-0 rounded-none "
            open={showForm}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setShowForm(false);
                    menuButtonRef.current?.focus();
                }
            }}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4  border-8 border-neutral-500 flex-col">
                <h3 className="text-2xl font-bold text-gray-900 ">Add New Movie</h3>
                <form className='p-4'>

                    <label htmlFor='title' >Movie Title</label>
                    <input
                        ref={firstFormInputRef}
                        type='text'
                        id='title'
                        value={newMovie.title}
                        name='title'
                        onChange={handleNewMovieChange}
                        placeholder='title'
                        className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                        tabIndex={0}
                    />

                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        value={newMovie.description}
                        name='description'
                        onChange={handleNewMovieChange}
                        placeholder='description'
                        className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                        tabIndex={0}
                    />

                    <label htmlFor='posterURL'>Cover Image</label>
                    <input
                        type='text'
                        id='posterURL'
                        value={newMovie.posterURL}
                        name='posterURL'
                        onChange={handleNewMovieChange}
                        placeholder='https://fake.Ur/l/coolImage'
                        className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                        tabIndex={0}
                    />

                    <label htmlFor='rating'>Rating</label>
                    <input
                        type='number'
                        min={1}
                        max={10}
                        step={0.1}
                        id='rating'
                        value={newMovie.rating}
                        name='rating'
                        onChange={handleNewMovieChange}
                        placeholder='rating'
                        className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                        tabIndex={0}
                    />

                    <button
                        type='submit'
                        className={`w-full mt-5 px-4 py-2 bg-neutral-600 text-white rounded hover:bg-amber-700 ${isTelevision ? 'focusable' : ''}`}
                        onClick={(e) => {
                            handleAddMovie(e);
                            menuButtonRef.current?.focus();
                        }}
                        tabIndex={0}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowForm(false);
                            menuButtonRef.current?.focus();
                        }}
                        className={`w-full mt-2 px-4 py-2 bg-white-600 text-neutral-600 border-neutral-600 border rounded hover:bg-amber-700 hover:text-white ${isTelevision ? 'focusable' : ''}`}
                        tabIndex={0}
                    >
                        Cancel
                    </button>

                </form>


            </div>

        </dialog>
    )
}

export default AddMovieDialog