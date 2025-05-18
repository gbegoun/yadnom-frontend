import { useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'

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
    const personBtnRef = useRef(null)
    const filterBtnRef = useRef(null)
    const sortBtnRef = useRef(null)
    const hideBtnRef = useRef(null)
    const groupByBtnRef = useRef(null)
    const optionsBtnRef = useRef(null)

    useClickOutside(searchContainerRef, () => {
        if (isSearchVisible) {
            setIsSearchVisible(false)
        }
    })

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

    const handlePersonClick = () => {
        const rect = personBtnRef.current.getBoundingClientRect()
        openModal(<PersonFilterModal />, rect)
    }

    const handleFilterClick = () => {
        const rect = filterBtnRef.current.getBoundingClientRect()
        openModal(<AdvancedFilterModal />, rect)
    }

    const handleSortClick = () => {
        const rect = sortBtnRef.current.getBoundingClientRect()
        openModal(<SortTasksModal />, rect)
    }

    const handleHideClick = () => {
        const rect = hideBtnRef.current.getBoundingClientRect()
        openModal(<HideColumnsModal />, rect)
    }

    const handleGroupByClick = () => {
        const rect = groupByBtnRef.current.getBoundingClientRect()
        openModal(<GroupByModal />, rect)
    }

    const handleOptionsClick = () => {
        const rect = optionsBtnRef.current.getBoundingClientRect()
        openModal(<OptionsModal />, rect)
    }

    return (
        <div className="board-filter-container">
            <TaskAdd />
            <div className="search-container" ref={searchContainerRef}>
                {isSearchVisible ? (
                    <form onSubmit={handleSearchSubmit} className="search-form">                        
                    <input
                        type="text"
                        name="search"
                        placeholder="Search tasks..."
                        autoFocus
                        className="search-input"
                    />
                        <button type="submit" className="search-submit">
                            <SVGService.SearchIcon className="search-icon" />
                        </button>
                    </form>
                ) : (
                    <button className="filter-btn" onClick={handleSearchClick}>
                        <SVGService.SearchIcon />
                        Search
                    </button>
                )}
            </div>
            <button className="filter-btn" ref={personBtnRef} onClick={handlePersonClick}>
                <SVGService.PersonIcon />
                Person
            </button>
            <button className="filter-btn" ref={filterBtnRef} onClick={handleFilterClick}>
                <SVGService.FilterIcon />
                Filter
            </button>
            <button className="filter-btn" ref={sortBtnRef} onClick={handleSortClick}>
                <SVGService.SortIcon />
                Sort
            </button>
            <button className="filter-btn" ref={hideBtnRef} onClick={handleHideClick}>
                <SVGService.HideIcon />
                Hide
            </button>
            <button className="filter-btn" ref={groupByBtnRef} onClick={handleGroupByClick}>
                <SVGService.GroupByIcon />
                Group by
            </button>
            <button className="filter-btn" ref={optionsBtnRef} onClick={handleOptionsClick}>
                <SVGService.OptionsIcon />
            </button>
        </div>
    )
}