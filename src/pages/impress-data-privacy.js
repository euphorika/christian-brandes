import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data, transition }) => (
  <Layout style={transition && transition.style}>
    <Helmet>
      <title>{data.contentfulPage.title}</title>
      <meta name="description" content={data.contentfulPage.metaDescription} />
    </Helmet>
    <Lightbox visible={true}>
      <div>
        <h2>{data.contentfulSettings.name}</h2>
        <div>Office:</div>
        <div>
          {data.contentfulSettings.street}<br />
          {data.contentfulSettings.city}
        </div>
        <div>Email:</div>
        <div>{data.contentfulSettings.mail}</div>
        <div>Cell:</div>
        <div>
          <a href={"tel:" + data.contentfulSettings.phone}>{data.contentfulSettings.phoneText}</a>
        </div>
        <div>UStId:</div>
        <div>{data.contentfulSettings.vatId}</div>
        <div dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[0].body.childMarkdownRemark.html }} />
      </div>
      <div>
        <h2>Datenschutzerklärung</h2>
        <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:<br />
           Christian Brandes</p>
        <div dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[1].body.childMarkdownRemark.html }} />
      </div>
    </Lightbox>
  </Layout>
)

export const pageQuery = graphql`
  query ImpressContent {
    contentfulPage(slug: {eq: "impress-dataprivacy"}) {
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
      vatId
    }
  }
`
