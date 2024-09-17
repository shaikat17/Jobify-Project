import { useMemo, useState } from "react"
import Wrapper from "../assets/wrappers/SearchContainer"
import { useAppContext } from "../context/AppContext"
import InputFrom from "./InputFrom"
import InputSelectForm from "./InputSelectForm"

const SearchContainer = () => {
    const [ localSearch, setLocalSearch ] = useState('')
    const { isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
     } = useAppContext()

    const handleSearch = (e) => {
        handleChange({name: e.target.name, value: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }
    const debounce = () => {
        let timeoutID;
        return (e) => {
          setLocalSearch(e.target.value);
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleChange({ name: e.target.name, value: e.target.value });
          }, 1000);
        };
      };
      const optimizedDebounce = useMemo(() => debounce(), []);
  return (
      <Wrapper>
          <form className="form">
              <h4>search form</h4>
              <div className="form-center">
                  <InputFrom
                      labelText={'search'}
                      type={'text'}
                      name={'search'}
                      value={localSearch}
                      handleChange={optimizedDebounce}
                  />
                  <InputSelectForm
                      labelText={'job status'}
                      name={'searchStatus'}
                      value={searchStatus}
                      handleChange={handleSearch}
                      list={['all', ...statusOptions]} />
                  <InputSelectForm
                      labelText={'job types'}
                      name={'searchType'}
                      value={searchType}
                      handleChange={handleSearch}
                      list={['all', ...jobTypeOptions]} />
                  <InputSelectForm
                      labelText={'sort'}
                      name={'sort'}
                      value={sort}
                      handleChange={handleSearch}
                      list={sortOptions} />
                  <button className="btn btn-block btn-danger"
                      onClick={handleSubmit}
                  disabled={isLoading}>clear filters</button>
              </div>
          </form>
    </Wrapper>
  )
}
export default SearchContainer