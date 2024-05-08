'use client';
import { getLocalStorage, setLocalStorage } from '../../lib/storageHelper';
import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function CookieBanner(){
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    
    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

        //For Testing
        console.log("Cookie Consent: ", cookieConsent)

    }, [cookieConsent]);
    return (
        <div data-test="cookie-item" role="banner"className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        ${cookieConsent != null ? "hidden" : "flex"} 
                        px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-gray-700 rounded-lg shadow`}>

            <div data-test="cookie-text" role="dialog" className='text-center' >
                <p>This website uses cookies to enhance the user experience. By clicking "Agree," you consent to the use of cookies, including the collection of your location data for tracking purposes.</p>
            </div>

            
            <div className='flex gap-2'>
                <button data-test="cookieDecline-button" className='bg-gray-900 px-5 py-2 text-white rounded-lg'onClick={() => setCookieConsent(false)}>Decline</button>
                <button data-test="cookieAllow-button" className='bg-gray-900 px-5 py-2 text-white rounded-lg'onClick={() => setCookieConsent(true)}>Allow Cookies</button>
            </div>   
        </div>
    )}