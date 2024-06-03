'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';

export const EventCard = ({
    name,
    image,
    location,
    date,
    eventId,
    numberOfSpots,
    bookedUsers,
}) => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const router = useRouter();

    const numberOfBookedUsers = bookedUsers ? bookedUsers.length : 0;

    const isMaxUsers = Number(numberOfBookedUsers) === Number(numberOfSpots);

    const goToEvent = () => { setModalIsOpen(true);
        setTimeout(() => {
            setModalIsOpen(false);
            router.push(`/${eventId}`);
        }, 3000);
    };

    return (
        <div
            onClick={goToEvent}
            className={`p-6 bg-primary rounded-md shadow-lg ring-1 ring-gray-900/5 transform transition duration-500 cursor-pointer m-5 max-w-96 w-full sm:w-[370px] h-[360px] sm:h-auto text-gray-800 flex flex-col ${
                isMaxUsers
                    ? 'opacity-80'
                    : 'hover:bg-primary-muted hover:scale-105'
            }`}>
                <Modal
                className={`text-tertiary bg-navfoot p-6 rounded-md mt-96 shadow-lg text-center`}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Redirecting Modal"
                
            >
                <h2>Hold on as we redirect you to the next page...</h2>
                <BeatLoader color="#123abc" />

            </Modal>
            <div className='justify-center bg-gray text-left'>
                <h3 className='mb-2 w-fit px-3 shadow-black bg-tertiary shadow-md rounded-md font-semibold text-h1color'>
                    {name}
                </h3>
                <div className='w-full h-[150px]'>
                    <Image
                        src={image || '/assets/placeholder.jpg'}
                        width={200}
                        height={200}
                        alt='Event image'
                        className='w-full h-[150px] object-cover rounded-md'
                    />
                    {isMaxUsers && (
                        <h3 className='font-medium w-fit px-3 bg-error text-primary border border-slate-100/70 -rotate-45 absolute right-0 bottom-[150px] uppercase shadow-md z-10'>
                            Sold out
                        </h3>
                    )}
                </div>
                <div className='flex flex-col gap-2 mt-4 text-sm'>
                    <span>
                        <span className='font-semibold'>Location: </span>
                        {location}
                    </span>
                    <span>
                        <span className='font-semibold'>Date: </span>
                        {date}
                    </span>
                    <span>
                        <span className='font-semibold'>Booked: </span>
                        {numberOfBookedUsers}/{numberOfSpots}
                    </span>
                </div>
            </div>
        </div>
    );
};
