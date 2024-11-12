import React, { useContext } from 'react'
import PersonDataContext from '../shared/context/PersonDataContext';

//to do - DUE TO Multiple DataContext Created unable to maintain a single Search common compenent for book and person UI
//This componenet just set the value of "serch" defined in the PersonDataContext
//PersonDataContext uses this value of "serch" to filter personItems by useEffect
const PersonSearch = () => {
    
    const {search, setSearch} = useContext(PersonDataContext);

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

export default PersonSearch