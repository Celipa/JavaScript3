'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from './(root)/_components/EventCard';
import { useState, useEffect } from 'react';
import { useAuth } from './(root)/_components/auth-provider';
import { getAllEvents } from './lib/event.db';
import { useUsers } from './(root)/_components/users-provider';
import Loading from './(root)/_components/Loading';
import { useEvents } from './(root)/_components/events-provider';

const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const { events } = useEvents();

    const {
        onSort,
        inc,
        onSearch,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
        removeEventFunction
    } = useUsers();

    const checkDatesOnEvents = () => {
        events.forEach((event) => {
            const eventDate = new Date(event.date);
            const currentDate = new Date();
            if (eventDate < currentDate) {
                removeEventFunction(event.id);
            }
        });
    }

    useEffect(() => {
        setEventList(events)
        setEventListOriginal(events);
        checkDatesOnEvents();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [events]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col px-6 md:px-16 lg:px-36 justify-center items-center' id='body'>
            <div 
                className='flex flex-col bg-frontimg w-screen py-40 -ml-4 overflow-hidden' 
                id='section0'
                style={{ 
                    backgroundImage: 'url(https://cdn.i-scmp.com/sites/default/files/styles/landscape/public/d8/images/canvas/2022/06/09/ef093796-8cb6-404b-a4b4-d29ac356d603_ac8630e3.jpg?itok=dTUdKmJZ&v=1654756937)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className='flex flex-col bg-textbox w-2/6 py-5 pl-5 pr-4 ml-36 rounded-3xl' id='section1'>
                    <h1 className='text-h1color text-6xl'>Event Finder</h1>
                    <span className='text-3xl text-h2color'> Find The Event For You </span>
                    <p className=' text-base tracking-wide leading-7' >
                    Eventfinder Is An Excellent Choice For Customers Who Are Looking For An Easy, Fast, And Reliable Way To Purchase Tickets For Events. With A Wide Range Of Events To Choose From And A User-Friendly Interface, Eventfinder Is The Perfect Online Event Shop For Customers Who Want To Find And Buy Tickets For Events Quickly And Easily..
                    </p>
                </div>
            </div>
            <div className='flex flex-col bg-textbox w-screen' id='section2'>
                <div className='flex justify-center items-center py-3'>
                    <button
                      className='flex items-center w-fit p-2 m-2 rounded-md'
                        onClick={onSort}>
                        <span className='text-textsecondary px-2'>
                            {<FontAwesomeIcon icon={inc ? faSortUp : faSortDown} />}
                        </span>{' '}
                        <span className='text-textsecondary'>Sort by availability</span>
                    </button>
                    <input
                        type='text'
                        value={searchValue}
                        onChange={onSearch}
                        className='text-black text-sm placeholder:text-sm rounded-md p-2 m-2 w-1/5'
                        placeholder='Search for an event...'
                    />
                </div>
                <h3 className='flex justify-center items-center'>
                    Check out the current events!
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-3' id="events">
                    {eventList.map((item, i) => {
                        return (
                            <EventCard
                                name={item.name}
                                key={i}
                                image={item.image}
                                location={item.location}
                                date={item.date}
                                numberOfSpots={item.numberOfSpots}
                                eventId={item.id}
                                userId={user?.uid}
                                bookedUsers={item.bookedUsers}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
