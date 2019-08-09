import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class AboutIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`About | ${siteTitle}`} />
          <div className="wrapper">
            <h2 className="section-headline">About Written Reviews</h2>
            <p>
              Written Reviews is a blog by Florian Delvo. On this blog I'll be
              reviewing products and content of any kind. Whatever I like I'll
              write about it. I'm in love with the recent album release of an
              artist? I'll write about it. I acquired a new tablet and can't
              stop using it? I'll review it. My mouth is still watering when I
              think about the food I had at a restaurant the day before? I'll
              write about it. Days passed without notice because I'm deep into a
              game? I'll write about it.
            </p>
            <p>
              Albeit there will be one common feature for all my posts. I will
              only write positive reviews. When a company approaches me asking
              if I could write about their product I'll only do it if I like it.
              Integrity is valued by this blog. So when you read post marked as
              a paid review you can be sure I wrote about it because I enjoyed
              the reviewed subject. Not because I received money for it. Also
              I'll try to keep advertisement as unobtrusive as possible.
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutIndex

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, limit: 10) {
      edges {
        node {
          title
          slug
          author {
            name
          }
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          thumbnail: heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          coverImage: heroImage {
            fluid(maxWidth: 1180, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
