import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"
import styles from "./about.module.scss"

export default ({ data, transition }) => (
  <div style={transition && transition.style}>
    <Helmet>
      <title>{data.contentfulPage.title}</title>
      <meta name="description" content={data.contentfulPage.metaDescription} />
    </Helmet>
    <Lightbox visible={true}>
      <div className={styles.about}>
        <h1>Christian Brandes</h1>
        <h2>Visual Storytelling</h2>
        <div className={styles.bio} dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[0].body.childMarkdownRemark.html }} />
        <div className={styles.claim} dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[1].body.childMarkdownRemark.html }} />
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
    </Lightbox>
  </div>
)

export const pageQuery = graphql`
  query AboutContent {
    contentfulPage(slug: {eq: "about"}) {
      title
      slug
      metaDescription
      textBlocks {
        title
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
