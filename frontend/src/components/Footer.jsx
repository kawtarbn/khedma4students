export default function Footer() {
    return (
        <footer className="footer">
            <div className="items">
                
                {/* item 1 */}
                <div className="item1">
                    <img src="/media/logo.png" alt="logo" className="imgfooter" />
                    <p className="foo">
                        Connecting Algerian students with opportunities that fit their schedules and skills.
                    </p>

                    <div className="socials">
                        <img className="social" src="/media/facebook.png" alt="facebook" />
                        <img className="social" src="/media/twitter.png" alt="twitter" />
                        <img className="social" src="/media/instagram.png" alt="instagram" />
                        <img className="social" src="/media/linkedin.png" alt="linkedin" />
                    </div>
                </div>

                {/* item 2 */}
                <div className="item2">
                    <h3 style={{ color: "white" }}>Quick links</h3>
                    <a className="afooter" href="/"><b>Home</b></a>
                    <a className="afooter" href="/jobs"><b>Browse Jobs</b></a>
                    <a className="afooter" href="/student-services"><b>Student Services</b></a>
                    <a className="afooter" href="/rating"><b>Ratings & Reviews</b></a>
                    <a className="afooter" href="/contact"><b>Contact Us</b></a>
                </div>

                {/* item 3 */}
                <div className="item3">
                    <h3 style={{ color: "white" }}>Categories</h3>
                    <h4 className="h4item3">Tutoring & Education</h4>
                    <h4 className="h4item3">Freelance & Digital Work</h4>
                    <h4 className="h4item3">Part-Time & Small Jobs</h4>
                    <h4 className="h4item3">Babysitting & Household Help</h4>
                    <h4 className="h4item3">Delivery & Errands</h4>
                </div>

                {/* item 4 */}
                <div className="item4">
                    <h3 style={{ color: "white" }}>Contact Us</h3>

                    <div className="contact-row">
                        <img src="/media/mail.png" className="social" />
                        <a className="pitem4" href="mailto:khedma4students@gmail.com">
                            khedma4students@gmail.com
                        </a>
                    </div>

                    <div className="contact-row">
                        <img src="/media/phone-call.png" className="social" />
                        <p className="pitem4">+213 797 87 65 44</p>
                    </div>

                    <div className="contact-row">
                        <img src="/media/locationk.png" className="social" />
                        <p className="pitem4">Algiers, Algeria</p>
                    </div>

                    <a href="/contact" className="btnfoo"><b>Get in touch</b></a>
                </div>
            </div>

            <hr className="hline" />

            <div className="underline">
                <h4 className="h4last">® 2025 Khedma4Students. All rights reserved.</h4>

                <div className="h4lastright">
                    <h4 className="h4last">Privacy Policy</h4>
                    <h4 className="h4last">Terms of Service</h4>
                    <h4 className="h4last">Cookie Policy</h4>
                </div>
            </div>
        </footer>
    );
}
