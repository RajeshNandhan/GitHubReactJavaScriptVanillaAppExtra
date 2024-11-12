import { format } from 'date-fns';
import { useContext, useState } from 'react';
import axiosBase from '../shared/apiAxios/axiosBase';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PersonDataContext from '../shared/context/PersonDataContext';
import PersonSearch from './PersonSearch';

const PersonList = () => {

    const { personItems, setPersonItems, personFetchError, setPersonFetchError, isPersonLoading, setIsPersonLoading,
      search, setSearch, searchResults, setSearchResults} = useContext(PersonDataContext);

    const [personDeleteError, setPersonDeleteError] = useState(null);

    const handleDelete = async (personId) => {
      setPersonDeleteError(null);
      try {
        const deleteRequestUrl = `person/${personId}`;
        /*axiosBase is alreday set with base url for additional service*/
        await axiosBase.delete(deleteRequestUrl);
        const newItems = personItems.filter(item => item.personId !== personId);
        setPersonItems(newItems);
      } catch (err) {
        setPersonDeleteError(err.message);
      }
    }

    return (
        <main>
           {personDeleteError && <p className="statusMsg" style={{ color: "red" }}>{personDeleteError}</p>}
           {isPersonLoading && <p className="statusMsg">Loading persons data...</p>}
           {!isPersonLoading && personFetchError && <p className="statusMsg" style={{ color: "red" }}>{personFetchError}</p>}
           {!isPersonLoading && !personFetchError && searchResults && (
            <>
              <PersonSearch />
              <table>
              <thead>
                  <tr>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Category</th>
                  <th>Date Of Birth</th>
                  <th>Play Cricket?</th>
                  <th></th>
                  <th></th>
                  </tr>
              </thead>
              <tbody>
                  {searchResults.map((item) => (
                  <tr className="item" key={item.id}>
                      <td><span>{item.firstName}</span> , <span>{item.lastName}</span></td>
                      <td>{item.rank}</td>
                      <td>{item.category}</td>
                      <td>{format(item.dateOfBirth,'MMMM dd, yyyy')}</td>
                      <td>{item.isPlayCricket?'true':'false'}</td>
                      <td>
                        <Link to={`/person/${item.personId}`}><FaEdit title="Press to edit a Person"/></Link>
                      </td>
                      <td>
                        <FaTrashAlt role='button' title="Press to delete a Person"
                          onClick={() => handleDelete(item.personId)}/>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
            </>
            )}
        </main>
    )
}

export default PersonList