import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import get from 'lodash/get'
import ArticlePreview from '../components/article-preview'
import FeaturePost from '../components/featurePost'

class TagTemplate extends React.Component {
  render() {
    const { tag } = get(this.props, 'pageContext')
    const { edges, totalCount } = get(this.props, 'data.allContentfulBlogPost')
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline">{tagHeader}</h2>
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

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String) {
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
