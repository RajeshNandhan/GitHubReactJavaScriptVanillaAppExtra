import React, { useContext } from 'react'
import BookDataContext from '../shared/context/BookDataContext';

//to do - DUE TO Multiple DataContext Created unable to maintain a single Search common compenent for book and person UI
//This componenet just set the value of "serch" defined in the BookDataCOntext
//BookDataCOntext uses this value of "serch" to filter bookItems by useEffect
const BookSearch = () => {
    
    const {search, setSearch } = useContext(BookDataContext);

    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                placeholder="Search Book Name and Category only"
                value={search}
                onChange={(e) => {setSearch(e.target.value);}}
            />
        </form>
    )
}

export default BookSearch