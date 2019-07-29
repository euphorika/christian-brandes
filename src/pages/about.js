import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"
import styles from "./about.module.scss"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ location, data }) => (
  <Layout>
    <Helmet>
      <title>{data.contentfulPage.title}</title>
      <meta name="description" content={data.contentfulPage.metaDescription} />
    </Helmet>
    <Lightbox visible={true} location={location}>
      <div className={styles.about}>
        <h1>{data.contentfulSettings.name}</h1>
        <h2>Visual Storytelling</h2>
        <div className={styles.bio} dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[0].body.childMarkdownRemark.html }} />
        <div className={styles.claim} dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[1].body.childMarkdownRemark.html }} />
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <div className={styles.label}>Office</div>
            <div className={styles.value}>
              {data.contentfulSettings.street}<br />
              {data.contentfulSettings.city}
            </div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.label}>Email</div>
            <div className={styles.value}>{data.contentfulSettings.mail}</div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.label}>Cell</div>
            <div className={styles.value}>
              <a href={"tel:" + data.contentfulSettings.phone}>{data.contentfulSettings.phoneText}</a>
            </div>
          </div>
        </div>
      </div>
    </Lightbox>
  </Layout>
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
    contentfulSettings {
      name
      street
      city
      mail
      phone
      phoneText
    }
  }
`
