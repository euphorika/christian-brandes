import React from "react";
import Teaser from "../components/teaser"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  const { cmsGeneratedPosts, stickyImage } = data;
  const { sticky, teasers } = cmsGeneratedPosts;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title} Test</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Teaser teaser={sticky} img={stickyImage} />

      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query IndexByPath($slug: String!, $thumbnail: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    cmsGeneratedPosts {
      sticky {
        title
        date
        location
        meta_description
        thumbnail
        root
      }
      teasers {
        marginTop
        cols {
          title
          location
          date
          meta_description
          thumbnail
          root
          width
          marginTop
        }
      }
    }
    stickyImage: imageSharp(id: { regex: $thumbnail }) {
      sizes(maxWidth: 900) {
        ...GatsbyImageSharpSizes
      }
    }

  }
`;
