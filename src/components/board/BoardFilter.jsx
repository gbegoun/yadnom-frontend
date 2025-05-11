import { useState, useRef, useEffect } from 'react'

import { TaskAdd } from "../task/TaskAdd.jsx"
import { useModal } from '../../contexts/modal/useModal.jsx'
import { PersonFilterModal } from '../modal_types/PersonFilterModal.jsx'
import { AdvancedFilterModal } from '../modal_types/AdvancedFilterModal.jsx'
import { SortTasksModal } from '../modal_types/SortTasksModal.jsx'
import { HideColumnsModal } from '../modal_types/HideColumnsModal.jsx'
import { GroupByModal } from '../modal_types/GroupByModal.jsx'
import { OptionsModal } from '../modal_types/OptionsModal.jsx'

export const BoardFilter = (/* { board } */) => {
    const { openModal } = useModal()
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [searchText, setSearchText] = useState('')
    const searchContainerRef = useRef(null)

    useEffect(() => {
        // Only add the listener if the search is visible
        if (!isSearchVisible) return

        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchVisible]) // Only re-run if isSearchVisible changes

    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        alert(`Searching for: ${searchText}`)
        setIsSearchVisible(false)
        // Here you would implement the search functionality
    }

    const handlePersonClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<PersonFilterModal />, { x: rect.left, y: rect.bottom })
    }

    const handleFilterClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<AdvancedFilterModal />, { x: rect.left, y: rect.bottom })
    }

    const handleSortClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<SortTasksModal />, { x: rect.left, y: rect.bottom })
    }

    const handleHideClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<HideColumnsModal />, { x: rect.left, y: rect.bottom })
    }

    const handleGroupByClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<GroupByModal />, { x: rect.left, y: rect.bottom })
    }

    const handleOptionsClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        openModal(<OptionsModal />, { x: rect.left, y: rect.bottom + 5 })
    }

    return (
        <div className="board-filter-container">
            <TaskAdd />
            <div className="search-container" ref={searchContainerRef}>
                {isSearchVisible ? (
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search tasks..."
                            autoFocus
                            className="search-input"
                        />
                        <button type="submit" className="search-submit">
                            <img src="..\src\assets\icons\search_icon.svg" alt="search" />
                        </button>
                    </form>
                ) : (
                    <button className="filter-btn" onClick={handleSearchClick}>
                        <img src="..\src\assets\icons\search_icon.svg" alt="search" />
                        Search
                    </button>
                )}
            </div>
            <button className="filter-btn" onClick={handlePersonClick}>
                <img src="..\src\assets\icons\person_icon.svg" alt="person" />
                Person
            </button>
            <button className="filter-btn" onClick={handleFilterClick}>
                <img src="..\src\assets\icons\filter_icon.svg" alt="filter" />
                Filter
            </button>
            <button className="filter-btn" onClick={handleSortClick}>
                <img src="..\src\assets\icons\sort_icon.svg" alt="sort" />
                Sort
            </button>
            <button className="filter-btn" onClick={handleHideClick}>
                <img src="..\src\assets\icons\hide_icon.svg" alt="hide" />
                Hide
            </button>
            <button className="filter-btn" onClick={handleGroupByClick}>
                <img src="..\src\assets\icons\group_by_icon.svg" alt="group by" />
                Group by
            </button>
            <button className="filter-btn" onClick={handleOptionsClick}>
                <img src="..\src\assets\icons\options_icon.svg" alt="options" />
            </button>
        </div>
    )
}