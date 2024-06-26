'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useEvents } from '@/app/(root)/_components/events-provider';
import { getEventById } from '@/app/lib/event.db';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useUsers } from '../_components/users-provider';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { event, setEvent } = useEvents();
    const {
        bookEventFunction,
        isMaxUsers,
        numberOfBookedUsers,
        hasBooked,
        undoBookedEventFunction,
    } = useUsers();

    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEventById(id);
            setEvent(event);
        };

        fetchEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            {event && (
                <>
                    <Link
                        href='/'
                        className='z-10 p-2 md:p-4 absolute flex items-center gap-2 transition-all hover:-translate-x-2 bg-primary-muted rounded-full shadow-sm w-fit mt-2 md:mt-4 mx-6 md:mx-16 lg:mx-36'>
                        <FaArrowLeft className='size-3 md:size-4 text-black' />
                    </Link>
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className='px-3 py-1.5 font-bold tracking-tight bg-tertiary w-fit'>
                            {event.name}
                        </h1>
                        <h3 className='my-0 flex items-center gap-1 bg-primary w-fit px-3 py-1.5 font-bold text-black tracking-tight'>
                            <FaLocationDot />
                            <span>{event.location}</span>
                        </h3>
                    </div>
                    <Image
                        src={event.image}
                        width={400}
                        height={400}
                        alt='event'
                        className='w-screen h-96 object-cover'
                    />

                    <div className='px-6 md:px-16 lg:px-36 pb-2 md:py-8'>
                        <h3>{event.description}</h3>

                        {/* Event details container */}
                        <dl className=''>
                            <div className='py-4 flex justify-center items-center border-b-4 flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit '>
                                    <FaRegCalendarAlt className='size-8 ' />
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='py-4 flex border-b-4 justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit'>
                                    <MdPersonAddAlt1 className='size-8' />
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    <span className='font-semibold'>
                                        {event.numberOfSpots -
                                            numberOfBookedUsers}
                                    </span>
                                    <span className='ml-1'>spots left</span>
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center sm:items-start flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit text-lg font-semibold'>
                                    Participants
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 flex flex-col text-sm gap-y-2 leading-6 sm:mt-0'>
                                    {event && event.bookedUsers?.length ? (
                                        event.bookedUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className='items-center sm:items-start min-w-0 flex-auto flex flex-col'>
                                                <span className='text-sm border-b-4  leading-6 text-gray-900'>
                                                    {user.email}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-sm leading-6 text-gray-500/80'>
                                            No participants yet.
                                        </span>
                                    )}
                                </dd>
                            </div>
                            <div className='bg-slate-900/10 p-6 sm:flex sm:px-6'>
                                <button
                                    onClick={
                                        hasBooked
                                            ? undoBookedEventFunction
                                            : bookEventFunction
                                    }
                                    className={`text-sm text-primary py-3 ${
                                        isMaxUsers ? 'opacity-50' : ''
                                    }`}>
                                    {hasBooked ? 'Undo booking' : 'Book now!'}
                                </button>
                            </div>
                        </dl>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventDetailsPage;
