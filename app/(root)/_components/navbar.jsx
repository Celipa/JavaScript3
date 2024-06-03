'use client';

import SignOutButton from '@/app/(auth)/_components/sign-out-button';
import Image from 'next/image';
import { useAuth } from './auth-provider';
import Link from 'next/link';
import { IoCog } from 'react-icons/io5';
import Modal from 'react-modal';
import router from 'next/router';
import React from 'react';
import { BeatLoader } from 'react-spinners';

const Navbar = () => {
    const { user } = useAuth();

    const initials = user?.displayName
        ?.split(' ')
        .map((name) => name[0])
        .join('');

    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    return (
        <div className='flex justify-between items-center px-6 md:px-16 lg:px-36 py-4 bg-secondary-muted border-b border-tertiary shadow'>
            <Link href='/'>
                <Image
                    src='/assets/Eventfinder-logo.jpg'
                    alt='logo'
                    width={60}
                    height={60}
                    className='w-16 h-16 rounded-full cursor-pointer shadow-s shadow-inner shadow-white'
                />
            </Link>
            <div className="flex gap-8 text-textsecondary ml-28 px-48">
            <a href='/' className='px-3'>Home</a>
            <a href="#">About</a>
            <a href="#events">Events</a>
            <a href="#">Review</a>
            </div>
            <div className='flex gap-2 justify-between items-center text-textsecondary'>
                {user ? (
                    <SignOutButton />
                ) : (
                    <Link href='/sign-in'>
                        <button onClick={() => {
                        setModalIsOpen(true);
                        setTimeout(() => {
                        setModalIsOpen(false);
                        router.push('/sign-in');
                        }, 3000);
                        }}>
                        Sign in
                        </button>
                    </Link>
                    
                )}
                <Modal
                className={`text-tertiary bg-navfoot p-6 rounded-md mt-96 shadow-lg text-center`}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Redirecting Modal"
                
            >
                <h2>Hold on as we redirect you to the next page...</h2>
                <BeatLoader color="#ffffff" />

            </Modal>
                {!user && (
                    <Link href='/sign-up'>
                        <button onClick={() => {
                        setModalIsOpen(true);
                        setTimeout(() => {
                        setModalIsOpen(false);
                        router.push('/sign-up');
                        }, 3000);
                        }}>Sign Up</button>
                    </Link>
                )}
                {user && (
                    <div className='inline-flex justify-center items-center bg-secondary size-12 mx-3 rounded-full shadow-sm outline outline-1 outline-slate-200/10'>
                        <span className='font-medium tracking-wide'>
                            {initials}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Navbar;
