

function SearchBar({ setTerm }) {
    return (
        <div className="search_input_wrapper">
            <input type="text"
                name="search"
                className="search_input"
                placeholder='Search Images'
                onChange={(e) => { setTerm(e.target.value) }} />
        </div>
    )
}

export default SearchBar;