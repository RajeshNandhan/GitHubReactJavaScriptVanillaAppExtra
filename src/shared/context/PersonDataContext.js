import { createContext, useState, useEffect } from 'react';
import axiosBase from '../apiAxios/axiosBase';
//import useAxiosFetch from '../hooks/useAxiosFetch';

const PersonDataContext = createContext({});

export const PersonDataProvider = ({ children }) => {
    const [personItems, setPersonItems] = useState([]);
    const [personFetchError, setPersonFetchError] = useState(null);
    const [isPersonLoading, setIsPersonLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setIsPersonLoading(true);
        setPersonFetchError(null);
        const fetchItems = async () => {
          try {
            const getRequestUrl = `person`;
            //console.log('--> Call to PersonDataProvider.useEffect to load setPersonItems');
            /*axiosBase is alreday set with base url for additional service*/
            const result = await axiosBase.get(getRequestUrl);
            setPersonItems(result.data);
          } catch (err) {
            //console.log('--> Call to PersonDataProvider.useEffect catch error');
            setPersonFetchError(err.message);
          } finally {
           //console.log('--> Call to PersonDataProvider.useEffect finally');
            setIsPersonLoading(false);
          }
        }

        //setTimeout for load testing
        setTimeout(() => fetchItems(), 3000);
        //fetchItems();
    
    }, []);


    //const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    /*this useEffect is effective only when search and personItems available
      search is set by PersonSearch component via setSearch
      here personItems is filtered based on search and value updated to setSearchResults
      setSearchResults is actually used in UI*/
    
    useEffect(() => {
        
        const results = personItems?.filter((person) =>
          ((person.category).toLowerCase()).includes(search.toLowerCase())
          || ((person.firstName).toLowerCase()).includes(search.toLowerCase())
          || ((person.category).toLowerCase()).includes(search.toLowerCase())
        );

        setSearchResults(results);

    }, [personItems, search])

    return (
        <PersonDataContext.Provider value={{
            personItems, setPersonItems,
            personFetchError, setPersonFetchError,
            isPersonLoading, setIsPersonLoading,
            search, setSearch,
            searchResults, setSearchResults
        }}>
            {children}
        </PersonDataContext.Provider>
    )
}

export default PersonDataContext;