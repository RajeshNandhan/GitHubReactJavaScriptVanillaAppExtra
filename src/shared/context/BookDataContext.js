import { createContext, useState, useEffect } from 'react';
import fetchGet from '../apiFetch/fetchGet';
import { Environments } from '../environment/environment';
//import useAxiosFetch from '../hooks/useAxiosFetch';

const BookDataContext = createContext({});

export const BookDataProvider = ({ children }) => {
    const [bookItems, setBookItems] = useState([])
    const [bookFetchError, setBookFetchError] = useState(null);
    const [isBookLoading, setIsBookLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //BookItems is going to maintain all the records received from API
    //this useEffect is effective only on load that is on empty data == []
    useEffect(() => {
      setBookFetchError(null);
      setIsBookLoading(true);

      const fetchItems = async () => {
        try {
          //console.log('--> Call to BookDataProvider.useEffect to load setBookItems');
          const getRequestUrl = `${Environments.apiAdditionalServiceEndPoint}book`;
          const listItems = await fetchGet(getRequestUrl);
          setBookItems(listItems);
        } catch (err) {
          //console.log('--> Call to PersonDataProvider.useEffect catch error');
          setBookFetchError(err.message);
        } finally {
          //console.log('--> Call to PersonDataProvider.useEffect finally');
          setIsBookLoading(false);
        }
      }

      //setTimeout just for load delay testing
      setTimeout(() => fetchItems(), 2000);
      //fetchItems();
    }, []);


    /*this useEffect is effective only when search and bookItems available
      search is set by BookSearch component via setSearch
      here bookItems is filtered based on search and value updated to searchResults
      searchResults is actualy used in UI*/
    useEffect(() => {
        const filteredResults = bookItems?.filter((book) =>
            ((book.bookName).toLowerCase()).includes(search.toLowerCase())
            || ((book.bookCategory).toLowerCase()).includes(search.toLowerCase())
          );

        setSearchResults(filteredResults.reverse());

    }, [bookItems, search])

    return (
        <BookDataContext.Provider value={{
            bookItems, setBookItems,
            bookFetchError, setBookFetchError,
            isBookLoading, setIsBookLoading,
            search, setSearch,
            searchResults, setSearchResults
        }}>
            {children}
        </BookDataContext.Provider>
    )
}

export default BookDataContext;