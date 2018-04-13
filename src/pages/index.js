import React from "react"
import styles from "./index.module.scss"

export default () =>
  <div>
    <div className={styles.posts + ' ' + styles.sticky}>
      <div className={styles.row}>
        <figure>
          <img src="/assets/cb-placeholder-1.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
    </div>
    <div className={styles.posts}>
      <div className={styles.row}>
        <div className={styles.teaser}>
          Photographer<br />based in Hamburg
        </div>
        <figure>
          <img src="/assets/cb-placeholder-2.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
      <div className={styles.row}>
        <div className={styles.teaser}>
          Motion<br />all<br />over the world
        </div>
        <figure>
          <img src="/assets/cb-placeholder-3.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
      <div className={styles.row}>
        <div className={styles.teaser}>
          Pain ist temporary<br />Pride is forever
        </div>
        <figure>
          <img src="/assets/cb-placeholder-4.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
      <div className={styles.row}>
        <figure>
          <img src="/assets/cb-placeholder-2.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
      <div className={styles.row}>
        <figure>
          <img src="/assets/cb-placeholder-3.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
      <div className={styles.row}>
        <figure>
          <img src="/assets/cb-placeholder-4.jpg" alt="" />
          <figcaption>
            <h1>Rooftop Basketball</h1>
            <p>Barcelona, June 2016</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
