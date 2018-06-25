import React from "react"
import Helmet from "react-helmet"
import Lightbox from "../components/lightbox"

export default ({ data, transition }) => (
  <div style={transition && transition.style}>
    <Helmet>
      <title>{data.contentfulPage.title}</title>
      <meta name="description" content={data.contentfulPage.metaDescription} />
    </Helmet>
    <Lightbox visible={true}>
      <div>
        <h2>Christian Brandes</h2>
        <div>Office:</div>
        <div>
          Eppendorfer Weg 87a<br />
          20259 Hamburg
        </div>
        <div>Email:</div>
        <div>kontakt[at]christianbrandes.de</div>
        <div>Cell:</div>
        <div>
          <a href="tel:+4917641250470">+49(0)176 41250470</a>
        </div>
        <div>UStId:</div>
        <div>DE281648859</div>
        <div dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[0].body.childMarkdownRemark.html }} />
      </div>
      <div>
        <h2>Datenschutzerklärung</h2>
        <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:<br />
           Christian Brandes</p>
        <div dangerouslySetInnerHTML={{__html: data.contentfulPage.textBlocks[1].body.childMarkdownRemark.html }} />
      </div>
    </Lightbox>
  </div>
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
  }
`
