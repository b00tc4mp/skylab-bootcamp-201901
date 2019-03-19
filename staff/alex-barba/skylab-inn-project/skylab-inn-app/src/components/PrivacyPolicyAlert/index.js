import React, { useState } from 'react'

import './index.sass'

export default function PrivacyPolicyAlert({ showPrivacyPolicyAlert, setShowPrivacyPolicyAlert }) {

    const [showContent, setShowContent] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [feedback, setFeedback] = useState(null)

    const visible = showPrivacyPolicyAlert ? `pp-alert display-block  ` : 'pp-alert display-none'

    const handleOnSubmit = () => {
        if (answer) {
            setFeedback(null)
            setShowPrivacyPolicyAlert(null)
        } else {
            setFeedback(true)
        }
    }


    return (
        <div className={visible}>
            <div className='pp-alert__content'>
                {!showContent ? <div>
                    <div className='pp-alert__content-checkbox'>
                        <input className='checkbox__input'type='checkbox' id='current' name='current' onChange={e => setAnswer(e.target.checked)} />
                        <a href className='link pointer'onClick={e => {e.preventDefault(); setShowContent(true)}}>I accept thep privacy policy and data processing</a>
                    </div>
                    <div className='pp-alert__content-submit'>
                        <button className='btn btn--primary' onClick={e => { e.preventDefault(); handleOnSubmit()}}>Submit</button>
                    </div>
                </div>
                : 
                <div className='pp-container'>
                    <button className='btn btn--primary' onClick={e=> {e.preventDefault(); setShowContent(null)}}>Close</button>
                    <p className='pp-container__text'>I ACCEPT THE PRIVACY POLICY AND DATA PROCESSING
                    SUBMIT
                    For companies
                    If you want to contact our talent services and contact our students, please fill the form and we will contact you shortly.

                    Where we are
                    Roc Boronat 35 - 1st floor

                    08005 Barcelona

                    Tel. +34 93 176 02 20 (Mo-Fr 9h-17h)

                    HOW TO GET THERE

                    HOMECOURSESFACULTYWHY CODE?COMPANIESCOMMUNITYCONTACT
                    SKYLAB CODERS ACADEMY

                    Roc Boronat 35 - 08005 Barcelona

                    +34 93 176 0220

                    Web design

                    ENTERPRISE PRIVACY AND COOKIES POLICY
                    Privacy policy
                    In accordance with the provisions of General Data Protection Regulation, to all those who access and navigate (hereinafter, reported the "users") by the website accessible through the domain name www.skylabcoders.com and its subdomains (hereinafter, "the Website") that all personal data collected through the Website, including data provided by the user to achieve the contracted services or obtained through cookies will be incorporated and processed in files owned by SKYLAB CODERS ACADEMY, SL (Hereinafter "SCA") for the following purposes: to provide the services requested by the user, manage and maintain the Web Site; respond to queries or requests made; and keep users informed, including by electronic means, about new products and services and / or products of SCA.

                    If not wish to receive these communications, the user must indicate by checking the empowered to that effect in the Website box; or by sending an email to info@skylabcoders.com.

                    The completion of all data requested through the Website is necessary for optimal performance of the User made available services. Not contain all the information, SCA does not guarantee that the requested information and services can be provided, they are provided properly or fit the needs of the user.

                    In order to provide the forementioned service, we share some of the data you provide to:

                    Pipedrive: Privacy policy
                    Campaign Monitor: Privacy policy
                    Zapier: Privacy policy
                    The User can exercise their rights of access, rectification, cancellation and opposition under the Data Protection Act, by written communication addressed to SKYLAB CODERS ACADEMY, S.L., 13B Street Floridablanca, 2-2, 08031 - Barcelona; or by mail addressed to info@skylabcoders.com.. In both cases, the user must submit a copy of your national identity card, passport or other valid identification document.

                    Cookies policy
                    SCA uses third party cookies in order to measure and monitor the activity of the Website.

                    Al click on any button, check box or link contained on the website, fill out a form or login, download any content or scrolling, you acknowledge your agreement to the use of cookies makes Web site and installing the same on the used computer (including mobile devices and browsers) by it to access and navigate through it, and the collection and processing of personal data of the user in the manner and purposes described in this Cookies policy.

                    In case you are not agree with this Cookies Policy, the User must refrain from using the website and leave it immediately.

                    1. What is a cookie?
                    A cookie is a file that is downloaded to the terminal (eg, a computer, a mobile phone, tablet, etc.) the user when access and browse certain websites, such as this one. Cookies allow, among other things, to monitor such websites, store and retrieve information about browsing habits of the user (eg, preferences, profile, passwords, etc.) and technical information relating to the seaworthiness of websites. Cookies also contribute to the functionality, usability and accessibility of web pages.

                    Depending on the function and purpose of cookies, there are several types:

                    Analytical: These cookies collect information in order to allow web sites to evaluate the different users use them and their general activity and collect statistics ago. Analytical cookies collect data and measure website (visits, traffic parameters, clicks, page views, etc.) to understand and optimize the website.
                    Social: They are required to manage external social networks (Facebook, Google, Twitter, Pinterest, etc.). Its function is to control the interaction with social widgets inside a web page.
                    Technical: These cookies are strictly necessary to the functionality and usability of websites, allowing navigation through the same by the user and the use of different options and services.
                    Adevertising and behavioral cookies: They collect information on user browsing habits and behavior in order to identify the preferences, tastes and habits within a specific website. These cookies allow adapt the advertising content based on the analysis of the user's browsing habits and deducing its characteristics as location, age group, gender.
                    Customization Cookies: These are those that allow websites to retain certain preferences (eg, language, country, locale, etc.) predefined by the user on his first visit (and later) on the website.
                    Third party cookies: Third-party cookies are owned by third parties and used by websites in order to manage and improve the content and services offered.
                    For more information about cookies, the User can visit the website All About Cookies.org, accessible through the following link http://www.allaboutcookies.org/

                    2. What types of cookies using the Website?
                    Analytical cookies

                    Google Analytics

                    SCA uses Google Analytics (third party cookies) on the Website. It is an analytical service provided by the company Google, Inc. ("Google"). Through the Google Analytics, SCA analyzes the user interaction with the Web site, follows up browsing habits thereof within it, collects data from its activity for SCA can measure the performance of this.

                    Google is a company located in the United States. Therefore, the data collected and processed by Google Analytics (including the user's IP address) may be transferred to the United States and stored on Google servers located in that country.

                    The Users can manage and block the processing of their personal data through Google Analytics by configuring the browser used to access the Web Site.

                    The User can expand the information contained herein about Google Analytics by clicking here.

                    On the other hand, the User can deactivate Google Analytics by installing an opt. User can get more information about the supplement by clicking here.

                    3. How I can disable or delete cookies using the Website?
                    Users can manage the activity of cookies, block or delete them by activating and / or selecting the appropriate settings of the browser used to navigate on the Website. Otherwise, browsing through the Website by the User implies acceptance of the use thereof as set forth herein.

                    PC BROWSERS

                    Mozilla Firefox: When using the Mozilla Firefox browser, the user can learn how to manage or block the use of cookies and delete them by clicking here.
                    Internet Explorer: When using the Internet Explorer browser, the user can learn how to manage or block the use of cookies and delete them by clicking here.
                    Google Chrome: If you use the Google Chrome browser, the user can learn how to manage or block the use of cookies and delete them by clicking here.
                    Apple Safari: When using the Apple Safari browser, the user can learn how to manage or block the use of cookies and eliminate them in the Safari 6/7 (Mavericks) version by clicking here and the Safari version 8 (Yosemite) here.
                    Opera: When using the Opera browser, the user can learn how to manage or block the use of cookies and delete them by clicking here.
                    MOBILE BROWSER

                    IOS: Users can learn how to manage or block the use of cookies and eliminate them in Opera (in English) by clicking here at Safari here and Google Chrome and here.
                    Android: The user can learn how to manage or block the use of cookies and eliminate them by clicking here for Mozilla Firefox and Google Chrome here.
                    Windows Phone: Users can learn how to manage or block the use of cookies and delete the Windows Phone 7 version by clicking here on the Windows Phone 8 version here and in the Windows Phone 10 release here.
                    Blocking, disabling or deleting cookies used by SCA on the Website may affect the full functionality of the same; causing some services or features of the Website are not available to the user.</p>
                </div>
                }
                {feedback && <p className='feedback'>Privacy policy and data processing must be accepted</p>}
            </div>
        </div>
    )
}