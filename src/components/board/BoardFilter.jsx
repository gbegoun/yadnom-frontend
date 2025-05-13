import { useState, useRef, useEffect } from 'react'

import { TaskAdd } from "../task/TaskAdd.jsx"
import { useModal } from '../../contexts/modal/useModal.jsx'
import { PersonFilterModal } from '../modal_types/PersonFilterModal.jsx'
import { AdvancedFilterModal } from '../modal_types/AdvancedFilterModal.jsx'
import { SortTasksModal } from '../modal_types/SortTasksModal.jsx'
import { HideColumnsModal } from '../modal_types/HideColumnsModal.jsx'
import { GroupByModal } from '../modal_types/GroupByModal.jsx'
import { OptionsModal } from '../modal_types/OptionsModal.jsx'
import SVGService from '../../services/svg/svg.service'

export const BoardFilter = (/* { board } */) => {    
    const { openModal } = useModal()
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const searchContainerRef = useRef(null)

    useEffect(() => {
        // Only add the listener if the search is visible
        if (!isSearchVisible) return

        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) 
                setIsSearchVisible(false)
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
        const formData = new FormData(e.target)
        const searchText = formData.get('search')
        alert(`Searching for: ${searchText}`)
        setIsSearchVisible(false)
        e.target.reset()
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
                    <form onSubmit={handleSearchSubmit} className="search-form">                        <input
                            type="text"
                            name="search"
                            placeholder="Search tasks..."
                            autoFocus
                            className="search-input"
                        />
                        <button type="submit" className="search-submit">
                            {/* <SVGService.SearchIcon /> */}
                        </button>
                    </form>
                ) : (
                    <button className="filter-btn" onClick={handleSearchClick}>
                        <SVGService.SearchIcon />
                        Search
                    </button>
                )}
            </div>
            <button className="filter-btn" onClick={handlePersonClick}>
                <SVGService.PersonIcon />
                Person
            </button>
            <button className="filter-btn" onClick={handleFilterClick}>
                <SVGService.FilterIcon />
                Filter
            </button>
            <button className="filter-btn" onClick={handleSortClick}>
                <SVGService.SortIcon />
                Sort
            </button>
            <button className="filter-btn" onClick={handleHideClick}>
                <SVGService.HideIcon />
                Hide
            </button>
            <button className="filter-btn" onClick={handleGroupByClick}>
                <SVGService.GroupByIcon />
                Group by
            </button>
            <button className="filter-btn" onClick={handleOptionsClick}>
                <SVGService.OptionsIcon />
            </button>
        </div>
    )
}