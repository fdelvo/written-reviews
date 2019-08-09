import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'

class TagTemplate extends React.Component {
  render() {
    const { tag } = get(this.props, 'pageContext')
    const { edges, totalCount } = get(this.props, 'data.allContentfulBlogPost')
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2 className="section-headline">{tagHeader}</h2>
            <ul className="article-list">
              {edges.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      limit: 2000
      sort: { fields: [publishDate], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          slug
          title
          author {
            name
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          tags
          publishDate(formatString: "MMMM Do, YYYY")
          thumbnail: heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
