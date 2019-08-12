import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import get from 'lodash/get'
import ArticlePreview from '../components/article-preview'
import FeaturePost from '../components/featurePost'

class AuthorTemplate extends React.Component {
  render() {
    const { author } = get(this.props, 'pageContext')
    const { edges, totalCount } = get(this.props, 'data.allContentfulBlogPost')
    const authorHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } by ${author}`
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline">{authorHeader}</h2>
            {edges.length == 1 && <FeaturePost data={featurePost.node} />}
            {edges.length > 1 && (
              <ul className="article-list">
                {edges.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default AuthorTemplate

export const pageQuery = graphql`
  query($author: String) {
    allContentfulBlogPost(
      limit: 2000
      sort: { fields: [publishDate], order: DESC }
      filter: { author: { name: { in: [$author] } } }
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
          coverImage: heroImage {
            fluid(maxWidth: 1180, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
