"use client";
import React, { useEffect, useState  } from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';


const HeaderWithSidebar: React.FC = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    // If the 'storedUser' exists in localStorage, parse it
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.username || parsedUser.email ) {
          setUsername(parsedUser.username || parsedUser.email || ''); // Use username if available, fallback to email
        } else {
          console.error("Invalid user data: Missing username or email");
          clearUserData();
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        clearUserData(); // Clear invalid data if there's an error during parsing
      }
    } else {
      console.error("No user data found in localStorage");
      clearUserData(); // Clear if no data exists
    }

    // Handle the navbar toggle functionality for mobile view
    const navbarToggle = document.getElementById('navbar-toggle');
    const mobileNavbar = document.getElementById('mobile-navbar');

    const handleToggle = () => {
      mobileNavbar?.classList.toggle('hidden');
    };

    navbarToggle?.addEventListener('click', handleToggle);

    return () => {
      navbarToggle?.removeEventListener('click', handleToggle);
    };
  }, []);

  // Logout function that clears user data and redirects to login
  const handleLogout = () => {
    clearUserData();
    router.push('/ui/login'); // Redirect to login page
  };
  const handleRedirect = () => {
    clearUserData();
    router.push('/'); // Redirect to login page
  };

  // Helper function to clear user data from localStorage
  const clearUserData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Optional: Remove token if you store it separately
    setUsername(''); // Reset the username state
  };

  return (
    <div className="relative">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-900 py-3.5 px-6 w-full lg:shadow-none shadow-sm fixed z-50">
        <div className="flex items-center justify-between gap-1 sm:gap-6 lg:flex-row flex-col">
          <div className="flex justify-between items-center lg:w-auto w-full">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <span className="ml-3 text-xl">UNISYNC</span>
                    </a>
            <button
              id="navbar-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="mobile-navbar"
            className="hidden lg:flex flex-row w-full flex-1"
          >
          <ul className="text-center flex lg:flex-row flex-col lg:gap-2 xl:gap-4 gap-2 items-center lg:ml-auto">
            <li>
              <Link
                href="/ui/dashboard"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-gray-600 text-white"
                >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/ui/department"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Department
              </Link>
            </li>
            <li>
              <Link
                href="/ui/calendar"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href="/ui/tasksandreminders"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Tasks & Reminders
              </Link>
            </li>
            <li>
              <Link
                href="/ui/schedule"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/ui/profile"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/ui/about"
                className="py-1.5 px-3 transition-all duration-500 ease-in-out text-xs font-semibold rounded-md bg-transparent text-gray-500 dark:text-white hover:bg-black-600 hover:text-white"
                >
                About
              </Link>
            </li>
          </ul>



            <div className="text-center lg:flex items-center gap-1 sm:gap-4 lg:ml-auto">
              <div className="flex items-center lg:justify-start justify-center gap-1 sm:gap-2">
                <div className="relative w-max p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5001 17.5L15.4167 15.4167M15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16673 2.5C5.48483 2.5 2.50006 5.48477 2.50006 9.16667C2.50006 12.8486 5.48483 15.8333 9.16673 15.8333C11.0006 15.8333 12.6615 15.0929 13.8668 13.8947C15.0814 12.6872 15.8334 11.0147 15.8334 9.16667Z"
                      stroke="#6B7280"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-200 dark:text-gray-700 font-normal">|</p>
                <button className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center lg:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M11.3235 2.5H9.16667C6.02397 2.5 4.45262 2.5 3.47631 3.47631C2.5 4.45262 2.5 6.02397 2.5 9.16667V10.8333C2.5 13.976 2.5 15.5474 3.47631 16.5237C4.45262 17.5 6.02397 17.5 9.16667 17.5H10.8333C13.976 17.5 15.5474 17.5 16.5237 16.5237C17.5 15.5474 17.5 13.976 17.5 10.8333V9.55882M10 10H5.83333M12.5 13.3333H5.83333M17.5 4.58333C17.5 5.73393 16.5673 6.66667 15.4167 6.66667C14.2661 6.66667 13.3333 5.73393 13.3333 4.58333C13.3333 3.43274 14.2661 2.5 15.4167 2.5C16.5673 2.5 17.5 3.43274 17.5 4.58333Z"
                      stroke="#6B7280"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <button className="group py-2 px-2 lg:pr-5 lg:pl-3.5 lg:mx-0 mx-auto flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 4.5V13.5M13.5 9H4.5"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="max-lg:hidden">Create Event</span>
              </button>
              <button 
              onClick={handleLogout}
              className="group py-2 px-2 lg:pr-5 lg:pl-3.5 lg:mx-0 mx-auto flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>

            <span className="max-lg:hidden">Logout</span>
            </button>
        </div>
        </div>
    </div>
    </nav>

      {/* Main Content */}
      <div className="pt-[68px]">
      <div className="py-3.5 lg:px-8 px-3 bg-gray-50 dark:bg-gray-800">
    
    {/* Flex container to space items */}
    <div className="flex justify-between items-center max-lg:px-6">
      
      {/* Left side: Welcome text */}
      <h6 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap mb-1.5">
  <span className="text-sm font-medium text-gray-700 dark:text-white ml-4">
    {username ? `Hello, ${username}` : 'Welcome, Guest'}
  </span>
</h6>

      {/* Right side: Home button */}
      <button 
        onClick={handleRedirect}
        className="group py-2 px-2 lg:pr-5 lg:pl-3.5 flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-gray-600 bg-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-700">
        <span className="max-lg:hidden">Home</span>
      </button>
    </div>
    
  </div>
        <div className="w-full p-8">
        <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Monday, 7th April, 2025.</h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Of the five House Calendars, the Private Calendar is the one to which all Private Bills are referred. Private Bills deal with specific individuals, corporations, institutions, and so forth, as distinguished from public bills which deal with classes only..</p>
                </div>
            </section>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
 
    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Today's Agenda</h2>
    </div>


    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
    
      <a href="#" className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96">
        <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent"></div>

        <div className="relative mt-auto p-4">
          <span className="block text-sm text-gray-200">July 19, 2021</span>
          <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">New trends in Tech</h2>

          <span className="font-semibold text-indigo-300">Read more</span>
        </div>
      </a>
      

   
      <a href="#" className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent"></div>

        <div className="relative mt-auto p-4">
          <span className="block text-sm text-gray-200">April 07, 2021</span>
          <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">Working with legacy stacks</h2>

          <span className="font-semibold text-indigo-300">Read more</span>
        </div>
      </a>
   

   
      <a href="#" className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96">
        <img src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Magicle" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent"></div>

        <div className="relative mt-auto p-4">
          <span className="block text-sm text-gray-200">March 15, 2021</span>
          <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">10 best smartphones for devs</h2>

          <span className="font-semibold text-indigo-300">Read more</span>
        </div>
      </a>
    

     
      <a href="#" className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96">
        <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Martin Sanchez" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent md:via-transparent"></div>

        <div className="relative mt-auto p-4">
          <span className="block text-sm text-gray-200">January 27, 2021</span>
          <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">8 High performance Notebooks</h2>

          <span className="font-semibold text-indigo-300">Read more</span>
        </div>
      </a>
   
    </div>
  </div>
</div>
                          

            <section className="relative bg-stone-50">
                <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
                    <div className="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
                        <div className="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
                            <div className="w-full py-24 relative z-10 backdrop-blur-3xl">
                                <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
                                    <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
                                        <div className="col-span-12 xl:col-span-5">
                                            <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">Upcoming Events</h2>
                                            <p className="text-lg font-normal text-gray-600 mb-8">Don’t miss schedule</p>
                                                <div className="flex gap-5 flex-col">
                                                    <div className="p-6 rounded-xl bg-white">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                                                                    <p className="text-base font-medium text-gray-900">Jan 10,2020 - 10:00 - 11:00</p>
                                                            </div>
                                                            <div className="dropdown relative inline-flex">
                                                                <button type="button" data-target="dropdown-default" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600  ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                                                                        <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                                     </svg>
                          
                                                                </button>
                                                                <div id="dropdown-default" className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden" aria-labelledby="dropdown-default">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Meeting with a friends</h6>
                    <p className="text-base font-normal text-gray-600">Meet-Up for Travel Destination Discussion</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        <p className="text-base font-medium text-gray-900">Jan 10,2020 - 05:40 - 13:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-a" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-sky-400  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                          </svg>
                          
                        </button>
                        <div id="dropdown-a" className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden" aria-labelledby="dropdown-a">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Visiting online courcse</h6>
                    <p className="text-base font-normal text-gray-600">Checks updates for design course</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                        <p className="text-base font-medium text-gray-900">Jan 14, 2020 10:00 - 11:00</p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button type="button" data-target="dropdown-b" className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-emerald-600  ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentcolor" strokeWidth="2.5" strokeLinecap="round"></path>
                          </svg>
                          
                        </button>
                        <div id="dropdown-b" className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden" aria-labelledby="dropdown-b">
                          <ul className="py-2">
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="javascript:;">
                               Remove
                              </a>
                            </li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">Development meet</h6>
                    <p className="text-base font-normal text-gray-600">Discussion with developer for upcoming project</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <h5 className="text-xl leading-8 font-semibold text-gray-900">January 2024</h5>
                    <div className="flex items-center">
                      <button className="text-gray-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                      <button className="text-gray-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center rounded-md p-1 bg-gray-50 gap-px">
                    <button className="py-2.5 px-5 rounded-lg bg-gray-50 text-gray-600 text-sm font-medium transition-all duration-300 hover:bg-gray-600 hover:text-white">Day</button>
                    <button className="py-2.5 px-5 rounded-lg bg-gray-600 text-white text-sm font-medium transition-all duration-300 hover:bg-gray-600 hover:text-white">Week</button>
                    <button className="py-2.5 px-5 rounded-lg bg-gray-50 text-gray-600 text-sm font-medium transition-all duration-300 hover:bg-gray-600 hover:text-white">Month</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl">
                  <div className="grid grid-cols-7 rounded-t-3xl border-b border-gray-200">
                    <div className="py-3.5 border-r rounded-tl-xl border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Sun</div>
                    <div className="py-3.5 border-r border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Mon</div>
                    <div className="py-3.5 border-r border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Tue</div>
                    <div className="py-3.5 border-r border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Wed</div>
                    <div className="py-3.5 border-r border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Thu</div>
                    <div className="py-3.5 border-r border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Fri</div>
                    <div className="py-3.5 rounded-tr-xl bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600">Sat</div>
                  </div>
                  <div className="grid grid-cols-7 rounded-b-xl">
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50">
                      <span className="text-xs font-semibold text-gray-400">27</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">28</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">29</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">30</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">31</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">1</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">2</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">3</span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-purple-50 ">
                        <p className="hidden xl:block text-xs font-medium text-purple-600 mb-px">Meeting</p>
                        <span className="hidden xl:block text-xs font-normal text-purple-600 whitespace-nowrap">10:00 - 11:00</span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-purple-600"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">4</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">5</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">6</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white relative border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">7</span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-emerald-50 ">
                        <p className="hidden xl:block text-xs font-medium text-emerald-600 mb-px whitespace-nowrap">Developer Meetup</p>
                        <span className="hidden xl:block text-xs font-normal text-emerald-600 whitespace-nowrap">10:00 - 11:00</span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-emerald-600"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">8</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-600 sm:text-white sm:w-6 sm:h-6 rounded-full sm:flex items-center justify-center sm:bg-gray-600">9</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">10</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">11</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">12</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">13</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">14</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">15</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">16</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">17</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">18</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">19</span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-sky-50 ">
                        <p className="hidden xl:block text-xs font-medium text-sky-600 mb-px whitespace-nowrap">Developer Meetup</p>
                        <span className="hidden xl:block text-xs font-normal text-sky-600 whitespace-nowrap">10:00 - 11:00</span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-sky-600"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">20</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">21</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">22</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">23</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">24</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">25</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">26</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">27</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">28</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">29</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">30</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-gray-200 rounded-bl-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">31</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">1</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">2</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">3</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-gray-50 border-r border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">4</span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-purple-50 ">
                        <p className="hidden xl:block text-xs font-medium text-purple-600 mb-px whitespace-nowrap">Friends Meet</p>
                        <span className="hidden xl:block text-xs font-normal text-purple-600 whitespace-nowrap">09:00 - 13:42</span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-purple-600"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-gray-200 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">5</span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-gray-200 rounded-br-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                                            



    </div>
</div>
   
  <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
        <span className="ml-3 text-xl">UNISYNC</span>
      </a>
      <p className="mt-2 text-sm font-semibold text-gray-500">Revolutionary way to build the Organisations</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ABOUT</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">LICENSE AGREEMENT</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">TERMS AND CONDITIONS</h2>
      </div>
    </div>
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2025 UNISYNC —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">All Rights Reserverd.</a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
    </div>
    
  );
};

export default HeaderWithSidebar;