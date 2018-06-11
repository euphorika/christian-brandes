import React from "react"
import styles from "./about.module.scss"

class AboutComponent extends React.Component {

  render() {
    return (
      <div className={styles.about}>
        <h1>Christian Brandes</h1>
        <h2>Visual Storytelling</h2>
        <ul className={styles.bio}>
          <li>Born 1988</li>
          <li>2007: Abitur</li>
          <li>2008: Civil Service</li>
          <li>2011: Graduated Photography School &amp; moved to Hamburg</li>
          <li>2011 - 2015: Assisting to Bernd Opitz</li>
          <li>Since 2015: Freelancing</li>
        </ul>
        <div className={styles.claim}>
          <p><strong>Love what I do, love travelling, love finding MacGyver-Like solutions.</strong></p>
          <p>Family first. Love the family. And Pizza. Well and Burgers.</p>
        </div>
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <div className={styles.label}>Office</div>
            <div className={styles.value}>
              Eppendorfer Weg 87a<br />
              20259 Hamburg
            </div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.label}>Email</div>
            <div className={styles.value}>
              kontakt[at]christianbrandes.de
            </div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.label}>Cell</div>
            <div className={styles.value}>
              <a href="tel:+4917641250470">+49(0)176 41250470</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default AboutComponent
